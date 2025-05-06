'use client';

import { useEffect } from 'react';

/**
 * This component loads animation-related scripts after initial render
 * This helps with performance by deferring non-critical resources
 * 
 * Note: We're using a dual-loading strategy here:
 * 1. The main AnimationProvider loads GSAP synchronously for core animations
 * 2. This component loads GSAP again asynchronously to optimize and configure globally
 */
export default function AnimationScripts() {
  useEffect(() => {
    // Use requestIdleCallback (or fallback to setTimeout) to load when browser is idle
    const requestIdle = (window as any).requestIdleCallback || 
      ((cb: Function) => setTimeout(cb, 300));
    
    // Schedule the GSAP loading during an idle period
    const idleRequest = requestIdle(() => {
      // Load GSAP and plugins asynchronously after initial render
      const loadGSAP = async () => {
        try {
          const gsapModule = await import('gsap');
          // Use dynamic imports with a catch for each module to prevent cascading failures
          let ScrollTrigger;
          let ScrollToPlugin;
          
          try {
            const ScrollTriggerModule = await import('gsap/ScrollTrigger');
            ScrollTrigger = ScrollTriggerModule.default;
          } catch (e) {
            console.warn('Could not load ScrollTrigger:', e);
          }
          
          try {
            const ScrollToPluginModule = await import('gsap/ScrollToPlugin');
            ScrollToPlugin = ScrollToPluginModule.default;
          } catch (e) {
            console.warn('Could not load ScrollToPlugin:', e);
          }
          
          const gsap = gsapModule.default;
          
          // Register available plugins
          if (ScrollTrigger && ScrollToPlugin) {
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
          } else if (ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
          } else if (ScrollToPlugin) {
            gsap.registerPlugin(ScrollToPlugin);
          }
          
          // Performance optimizations
          gsap.ticker.lagSmoothing(0);
          // Set forces hardware acceleration and smooths animations
          gsap.config({ force3D: true });
          
          console.log('GSAP loaded and configured for optimal performance');
        } catch (error) {
          console.error('Error loading GSAP:', error);
          // Don't break the site if GSAP fails to load
        }
      };
      
      // Use requestAnimationFrame to ensure we don't block the main thread
      requestAnimationFrame(() => {
        loadGSAP();
      });
    });
    
    // Cleanup
    return () => {
      if ((window as any).cancelIdleCallback) {
        (window as any).cancelIdleCallback(idleRequest);
      } else {
        clearTimeout(idleRequest);
      }
    };
  }, []);
  
  return null;
}
