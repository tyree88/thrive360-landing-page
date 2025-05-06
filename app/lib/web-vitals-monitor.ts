'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

// Define threshold values for each metric
const thresholds = {
  CLS: { good: 0.1, poor: 0.25 },    // Cumulative Layout Shift
  FID: { good: 100, poor: 300 },     // First Input Delay (ms)
  FCP: { good: 1800, poor: 3000 },   // First Contentful Paint (ms)
  LCP: { good: 2500, poor: 4000 },   // Largest Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 },   // Time to First Byte (ms)
  INP: { good: 200, poor: 500 },     // Interaction to Next Paint (ms)
};

type MetricName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
type Metric = {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType?: string;
};

interface WebVitalsOptions {
  debug?: boolean;
  reportTo?: 'console' | 'analytics' | 'both';
  analyticsEndpoint?: string;
}

/**
 * A hook to monitor Core Web Vitals metrics
 */
export function useWebVitalsMonitor(options: WebVitalsOptions = {}) {
  const {
    debug = false,
    reportTo = 'console',
    analyticsEndpoint = '/api/vitals',
  } = options;

  useEffect(() => {
    if (typeof window === 'undefined' || !debug) return;

    // Helper to categorize a metric value
    const getMetricCategory = (name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' => {
      if (value <= thresholds[name].good) return 'good';
      if (value <= thresholds[name].poor) return 'needs-improvement';
      return 'poor';
    };

    // Reporter function based on reportTo option
    const reportMetric = (metric: Metric) => {
      const name = metric.name as MetricName;
      const value = Math.round(name === 'CLS' ? metric.value * 1000 : metric.value);
      const category = getMetricCategory(name, name === 'CLS' ? metric.value : value);
      
      // Console reporting
      if (reportTo === 'console' || reportTo === 'both') {
        console.log(
          `%c${name} %c${value}: %c${category}`,
          'color: #1E88E5; font-weight: bold;',
          'color: inherit',
          `color: ${
            category === 'good' 
            ? '#4CAF50' 
            : category === 'needs-improvement' 
              ? '#FF9800' 
              : '#F44336'
          }; font-weight: bold;`
        );
      }
      
      // Analytics reporting
      if ((reportTo === 'analytics' || reportTo === 'both') && analyticsEndpoint) {
        const body = {
          name: metric.name,
          value,
          delta: metric.delta,
          id: metric.id,
          category,
          navigationType: metric.navigationType || 'navigate',
        };
        
        // Use the Beacon API if available, otherwise fallback to fetch
        const sendData = () => {
          if (navigator.sendBeacon) {
            navigator.sendBeacon(analyticsEndpoint, JSON.stringify(body));
          } else {
            fetch(analyticsEndpoint, {
              body: JSON.stringify(body),
              method: 'POST',
              keepalive: true,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        };
        
        // Only send analytics when the page is being unloaded
        // or after a timeout to allow initial rendering to complete
        if (document.visibilityState === 'hidden') {
          sendData();
        } else {
          setTimeout(sendData, 10000); // 10 seconds after page load
        }
      }
    };

    // Register all the metrics to be monitored
    onCLS(reportMetric);
    onFID(reportMetric);
    onFCP(reportMetric);
    onLCP(reportMetric);
    onTTFB(reportMetric);
    onINP(reportMetric);

    // Additional instrumentation: TTI (Time to Interactive)
    // Note: Not a standard web vital, but useful for performance analysis
    const recordTimeToInteractive = () => {
      setTimeout(() => {
        const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationTiming) {
          const tti = navigationTiming.domInteractive;
          console.log(`Time to Interactive: ${Math.round(tti)}ms`);
        }
      }, 5000); // Wait for page to stabilize
    };

    // Record first animation frame time
    requestAnimationFrame(() => {
      setTimeout(() => {
        const timeToFirstFrame = performance.now();
        console.log(`Time to First Animation Frame: ${Math.round(timeToFirstFrame)}ms`);
        recordTimeToInteractive();
      }, 0);
    });

  }, [debug, reportTo, analyticsEndpoint]);
}