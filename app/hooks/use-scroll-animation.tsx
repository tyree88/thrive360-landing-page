'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for creating scroll-triggered animations
 * @param callback Function to execute for setting up the animation
 * @param dependencies Array of dependencies for the effect hook
 */
export function useScrollAnimation(
  callback: () => void | (() => void),
  dependencies: any[] = []
) {
  useEffect(() => {
    // Skip on server or if document is not available
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // Execute the callback to set up animations
    const cleanup = callback();

    // Clean up ScrollTrigger instances when component unmounts
    return () => {
      // Execute any cleanup returned from the callback
      if (typeof cleanup === 'function') {
        cleanup();
      }
      
      // Kill all ScrollTrigger instances created for the component
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, dependencies);
}