'use client';

import { useEffect } from 'react';

// Types for Web Vitals metrics
type MetricName = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB' | 'INP';

interface WebVitalsMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
}

interface WebVitalsReportOptions {
  debug?: boolean;
  reportTo?: 'console' | 'analytics' | 'both';
  analyticsEndpoint?: string;
  analyticsId?: string;
}

const defaultOptions: WebVitalsReportOptions = {
  debug: false,
  reportTo: 'console',
};

/**
 * Get the rating of a metric based on its value
 */
function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor';
    case 'FID':
      return value <= 100 ? 'good' : value <= 300 ? 'needs-improvement' : 'poor';
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
    case 'TTFB':
      return value <= 800 ? 'good' : value <= 1800 ? 'needs-improvement' : 'poor';
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor';
    default:
      return 'needs-improvement';
  }
}

/**
 * Report a Web Vitals metric
 */
function reportWebVitals(
  metric: WebVitalsMetric,
  options: WebVitalsReportOptions = defaultOptions
) {
  const { debug, reportTo, analyticsEndpoint, analyticsId } = options;

  // Enrich metric with rating if not already present
  if (!metric.rating) {
    metric.rating = getRating(metric.name, metric.value);
  }

  // Report to console if enabled
  if ((reportTo === 'console' || reportTo === 'both') && (debug || metric.rating !== 'good')) {
    console.log(
      `%c${metric.name} %c${Math.round(metric.value)}: %c${metric.rating}`,
      'color: #1E88E5; font-weight: bold;',
      'color: inherit',
      `color: ${
        metric.rating === 'good'
          ? '#4CAF50'
          : metric.rating === 'needs-improvement'
          ? '#FF9800'
          : '#F44336'
      }; font-weight: bold;`
    );
  }

  // Report to analytics if enabled
  if ((reportTo === 'analytics' || reportTo === 'both') && analyticsEndpoint) {
    // Use a beacon or fetch to send the data
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      delta: metric.delta,
      analyticsId,
    });

    // Use Beacon API if available (doesn't block page unload)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(analyticsEndpoint, body);
    } else {
      // Fall back to a fetch request
      fetch(analyticsEndpoint, {
        body,
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(err => {
        console.error('Error reporting web vitals:', err);
      });
    }
  }
}

/**
 * Hook to monitor and report Web Vitals metrics
 * 
 * @param options Options for reporting
 */
export function useWebVitalsMonitor(options: WebVitalsReportOptions = defaultOptions) {
  useEffect(() => {
    let isReporting = true;
    let reportedMetrics = new Set<string>();

    const reportMetric = (metric: WebVitalsMetric) => {
      // Avoid reporting the same metric more than once
      if (reportedMetrics.has(metric.id)) return;
      reportedMetrics.add(metric.id);

      if (isReporting) {
        reportWebVitals(metric, options);
      }
    };

    // Import Web Vitals dynamically to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB, onINP }) => {
      // Core Web Vitals
      onCLS(metric => reportMetric({ ...metric, name: 'CLS' }));
      onFID(metric => reportMetric({ ...metric, name: 'FID' }));
      onLCP(metric => reportMetric({ ...metric, name: 'LCP' }));
      
      // Additional metrics
      onFCP(metric => reportMetric({ ...metric, name: 'FCP' }));
      onTTFB(metric => reportMetric({ ...metric, name: 'TTFB' }));
      onINP(metric => reportMetric({ ...metric, name: 'INP' }));
    });
    
    // Setup custom metrics for animations
    if (options.debug) {
      setupAnimationMetrics();
    }

    return () => {
      isReporting = false;
    };
  }, [options]);
}

/**
 * Setup additional metrics specifically for animation performance
 */
function setupAnimationMetrics() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // Measure time to first animation frame
  let firstAnimationFrameTime: number | null = null;
  const recordFirstAnimationFrame = () => {
    if (firstAnimationFrameTime === null) {
      firstAnimationFrameTime = performance.now();
      console.log(`Time to First Animation Frame: ${Math.round(firstAnimationFrameTime)}ms`);
    }
  };
  
  // Use requestAnimationFrame to detect when animations start
  requestAnimationFrame(() => {
    recordFirstAnimationFrame();
  });

  // Detect animation jank
  let longFrameCount = 0;
  let lastFrameTime = 0;
  
  const detectJank = (timestamp: number) => {
    if (lastFrameTime > 0) {
      const frameDuration = timestamp - lastFrameTime;
      // A frame longer than 33ms is considered janky (less than 30fps)
      if (frameDuration > 33) {
        longFrameCount++;
        if (longFrameCount % 5 === 0) { // Log every 5th janky frame to avoid spam
          console.warn(`Janky frame detected: ${Math.round(frameDuration)}ms (${Math.round(1000 / frameDuration)}fps)`);
        }
      }
    }
    
    lastFrameTime = timestamp;
    requestAnimationFrame(detectJank);
  };
  
  requestAnimationFrame(detectJank);
  
  // Listen for input events to correlate with animation performance
  let lastInputTime = 0;
  const detectInputDelay = () => {
    lastInputTime = performance.now();
  };
  
  // Track various input types
  ['mousedown', 'keydown', 'touchstart', 'pointerdown'].forEach(eventType => {
    window.addEventListener(eventType, detectInputDelay, { passive: true });
  });
  
  // Track response time after input
  const frameAfterInput = (timestamp: number) => {
    if (lastInputTime > 0) {
      const inputDelay = timestamp - lastInputTime;
      if (inputDelay < 100) { // Only log if it's recent input
        console.log(`Input to animation response: ${Math.round(inputDelay)}ms`);
        lastInputTime = 0;
      }
    }
    requestAnimationFrame(frameAfterInput);
  };
  
  requestAnimationFrame(frameAfterInput);
}
