'use client';

import React, { useEffect } from 'react';

type AnimationPerformanceMetric = {
  name: string;
  value: number;
  timestamp: number;
};

type FPSData = {
  current: number;
  average: number;
  min: number;
  max: number;
  samples: number[];
};

interface PerformanceMonitorOptions {
  debugMode?: boolean;
  sampleSize?: number;
  throttleMs?: number;
  onMetricCollected?: (metrics: AnimationPerformanceMetric) => void;
}

// Custom interface for Layout Shift entries since TypeScript doesn't have built-in types for these
interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

/**
 * Performance monitoring system for animations
 * Tracks metrics like FPS, jank, CLS and long-running tasks
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private debugMode: boolean = false;
  private sampleSize: number = 60;
  private throttleMs: number = 1000;
  private onMetricCollected?: (metrics: AnimationPerformanceMetric) => void;
  
  private fpsData: FPSData = {
    current: 0,
    average: 0,
    min: 60,
    max: 0,
    samples: [],
  };
  
  private lastFrameTimestamp: number = 0;
  private framesSinceLastSample: number = 0;
  private longTasksCount: number = 0;
  private totalLayoutShiftScore: number = 0;
  private isMonitoring: boolean = false;
  private observers: PerformanceObserver[] = [];
  private rafId: number | null = null;
  
  private constructor(options: PerformanceMonitorOptions = {}) {
    this.debugMode = options.debugMode || false;
    this.sampleSize = options.sampleSize || 60;
    this.throttleMs = options.throttleMs || 1000;
    this.onMetricCollected = options.onMetricCollected;
  }
  
  public static getInstance(options: PerformanceMonitorOptions = {}): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(options);
    }
    return PerformanceMonitor.instance;
  }
  
  public startMonitoring(): void {
    if (typeof window === 'undefined' || this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.setupPerformanceObservers();
    this.monitorFrameRate();
    
    this.log('Performance monitoring started');
  }
  
  public stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    this.log('Performance monitoring stopped');
  }
  
  public getFPSData(): FPSData {
    return { ...this.fpsData };
  }
  
  public getLongTasksCount(): number {
    return this.longTasksCount;
  }
  
  public getLayoutShiftScore(): number {
    return this.totalLayoutShiftScore;
  }
  
  public getMetrics(): Record<string, number> {
    return {
      fps: this.fpsData.current,
      fpsAvg: this.fpsData.average,
      fpsMin: this.fpsData.min,
      fpsMax: this.fpsData.max,
      longTasks: this.longTasksCount,
      cls: this.totalLayoutShiftScore,
    };
  }
  
  private setupPerformanceObservers(): void {
    if (!window.PerformanceObserver) {
      this.log('PerformanceObserver API not supported');
      return;
    }
    
    try {
      // Monitor Layout Shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as unknown as LayoutShiftEntry;
          if (layoutShiftEntry.entryType === 'layout-shift' && !layoutShiftEntry.hadRecentInput) {
            this.totalLayoutShiftScore += layoutShiftEntry.value;
            
            this.reportMetric({
              name: 'layoutShift',
              value: layoutShiftEntry.value,
              timestamp: performance.now(),
            });
            
            this.log(`Layout shift detected: ${layoutShiftEntry.value.toFixed(4)}`);
          }
        }
      });
      
      layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(layoutShiftObserver);
      
      // Monitor Long Tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.longTasksCount++;
          
          this.reportMetric({
            name: 'longTask',
            value: entry.duration,
            timestamp: performance.now(),
          });
          
          this.log(`Long task detected: ${entry.duration.toFixed(2)}ms`);
        }
      });
      
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      this.observers.push(longTaskObserver);
    } catch (error) {
      console.error('Error setting up performance observers:', error);
    }
  }
  
  private monitorFrameRate(): void {
    const updateFPS = (timestamp: number) => {
      if (!this.isMonitoring) return;
      
      if (this.lastFrameTimestamp) {
        const delta = timestamp - this.lastFrameTimestamp;
        const fps = 1000 / delta;
        
        this.framesSinceLastSample++;
        this.fpsData.samples.push(fps);
        
        // Keep sample size limited
        if (this.fpsData.samples.length > this.sampleSize) {
          this.fpsData.samples.shift();
        }
        
        // Calculate stats
        this.fpsData.current = Math.round(fps);
        
        // Update min/max values
        if (fps < this.fpsData.min) this.fpsData.min = Math.round(fps);
        if (fps > this.fpsData.max) this.fpsData.max = Math.round(fps);
        
        // Calculate the average
        const sum = this.fpsData.samples.reduce((acc, curr) => acc + curr, 0);
        this.fpsData.average = Math.round(sum / this.fpsData.samples.length);
        
        // Report FPS periodically to avoid too frequent updates
        if (timestamp - this.lastReportTime > this.throttleMs) {
          this.reportMetric({
            name: 'fps',
            value: this.fpsData.current,
            timestamp
          });
          this.lastReportTime = timestamp;
        }
      }
      
      this.lastFrameTimestamp = timestamp;
      this.rafId = requestAnimationFrame(updateFPS);
    };
    
    this.lastReportTime = performance.now();
    this.rafId = requestAnimationFrame(updateFPS);
  }
  
  private reportMetric(metric: AnimationPerformanceMetric): void {
    if (this.onMetricCollected) {
      this.onMetricCollected(metric);
    }
  }
  
  private log(message: string): void {
    if (this.debugMode) {
      console.log(`[Performance Monitor] ${message}`);
    }
  }
  
  private lastReportTime: number = 0;
}

/**
 * React hook for using the performance monitor
 */
export function usePerformanceMonitor(options: PerformanceMonitorOptions = {}) {
  if (typeof window === 'undefined') return null;
  
  const monitor = PerformanceMonitor.getInstance(options);
  
  useEffect(() => {
    // Start monitoring when component mounts
    monitor.startMonitoring();
    
    // Stop monitoring when component unmounts
    return () => {
      monitor.stopMonitoring();
    };
  }, []);
  
  return monitor;
}
