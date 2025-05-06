'use client';

import { useState, useEffect } from 'react';

const DEFAULT_THROTTLE = 1000; // 1 second
const DEFAULT_THRESHOLD = 30; // 30fps is the threshold for janky frames
const ANIMATION_FRAME_BUDGET = 1000 / 60; // ~16.67ms for 60fps

interface PerformanceMonitorOptions {
  throttleMs?: number;
  fpsThreshold?: number;
  debugMode?: boolean;
}

export function usePerformanceMonitor(options: PerformanceMonitorOptions = {}) {
  const {
    throttleMs = DEFAULT_THROTTLE,
    fpsThreshold = DEFAULT_THRESHOLD,
    debugMode = false,
  } = options;

  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (!debugMode || typeof window === 'undefined') return;

    let frameTimes: number[] = [];
    let lastFrameTime = performance.now();
    let rafId: number;
    let throttleTimeout: ReturnType<typeof setTimeout>;
    let monitoring = true;

    console.log('[Performance Monitor] Performance monitoring started');
    setIsActive(true);

    // Monitor long tasks using PerformanceObserver
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Log only substantial long tasks (>50ms)
          if (entry.duration > 50) {
            console.log(`[Performance Monitor] Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        console.warn('[Performance Monitor] Long task observation not supported');
      }
    }

    // Monitor layout shifts using PerformanceObserver
    if ('PerformanceObserver' in window) {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (entry.hadRecentInput) return;
          console.log(`[Performance Monitor] Layout shift detected: ${entry.value.toFixed(4)}`);
        });
      });

      try {
        layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('[Performance Monitor] Layout shift observation not supported');
      }
    }

    // Frame rate monitoring function
    const monitorFrameRate = () => {
      if (!monitoring) return;
      
      const now = performance.now();
      const delta = now - lastFrameTime;
      
      // Track frame times for averaging
      frameTimes.push(delta);
      if (frameTimes.length > 60) { // Keep last 60 frames
        frameTimes.shift();
      }
      
      // Check for janky frames
      if (delta > ANIMATION_FRAME_BUDGET * 2) { // More than twice the budget for a frame
        console.warn(`Janky frame detected: ${delta.toFixed(0)}ms (${(1000 / delta).toFixed(0)}fps)`);
      }
      
      lastFrameTime = now;
      rafId = requestAnimationFrame(monitorFrameRate);
    };

    // Start the frame rate monitoring
    rafId = requestAnimationFrame(monitorFrameRate);

    // Periodically calculate and log FPS
    const logPerformance = () => {
      if (frameTimes.length === 0) return;
      
      // Calculate average frame time and convert to FPS
      const averageFrameTime = frameTimes.reduce((sum, time) => sum + time, 0) / frameTimes.length;
      const currentFps = 1000 / averageFrameTime;
      
      // Reset for next measurement
      frameTimes = [];
      
      // Log only if FPS is below threshold
      if (currentFps < fpsThreshold) {
        console.warn(`[Performance Monitor] Low FPS detected: ${currentFps.toFixed(1)}`);
      }
      
      if (monitoring) {
        throttleTimeout = setTimeout(logPerformance, throttleMs);
      }
    };
    
    // Start periodic logging
    throttleTimeout = setTimeout(logPerformance, throttleMs);

    // Cleanup
    return () => {
      monitoring = false;
      setIsActive(false);
      cancelAnimationFrame(rafId);
      clearTimeout(throttleTimeout);
    };
  }, [debugMode, fpsThreshold, throttleMs]);

  return { isActive };
}