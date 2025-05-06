'use client';

import { useEffect } from 'react';

/**
 * This component loads animation-related scripts after initial render
 * This helps with performance by deferring non-critical resources
 */
export default function AnimationScripts() {
  useEffect(() => {
    // Load GSAP and plugins asynchronously after initial render
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const ScrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollToPluginModule = await import('gsap/ScrollToPlugin');
        
        const gsap = gsapModule.default;
        const ScrollTrigger = ScrollTriggerModule.default;
        const ScrollToPlugin = ScrollToPluginModule.default;
        
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        // Optimize ticker for better performance
        gsap.ticker.lagSmoothing(0);
        
        // Initialize any critical animations here
        
        console.log('GSAP loaded successfully');
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };
    
    // Load immediately but allow main content to render first
    const timer = setTimeout(() => {
      loadGSAP();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return null;
}
