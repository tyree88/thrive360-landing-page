'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Used to disable or simplify animations for accessibility
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Default to false for SSR
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const onChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    // Use event listener to update when preference changes
    mediaQuery.addEventListener('change', onChange);
    
    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);
  
  return prefersReducedMotion;
}

/**
 * Utility to get animation durations based on reduced motion preference
 * @param standardDuration - Default duration when animations are enabled
 * @param reducedDuration - Duration when reduced motion is preferred (defaults to 0)
 */
export function getAnimationDuration(standardDuration: number, reducedDuration: number = 0) {
  // For server-side rendering, default to standard duration
  if (typeof window === 'undefined') return standardDuration;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches ? reducedDuration : standardDuration;
}

export default useReducedMotion;
