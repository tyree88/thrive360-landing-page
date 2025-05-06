'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

type AnimationContextType = {
  lenis: Lenis | null;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  registerScrollTrigger: (callback: () => void) => void;
  refreshScrollTriggers: () => void;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
};

const defaultContext: AnimationContextType = {
  lenis: null,
  gsap: gsap,
  ScrollTrigger: ScrollTrigger,
  registerScrollTrigger: () => {},
  refreshScrollTriggers: () => {},
  scrollTo: () => {},
};

const AnimationContext = createContext<AnimationContextType>(defaultContext);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollTriggerCallbacks, setScrollTriggerCallbacks] = useState<Array<() => void>>([]);
  
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Wait a bit for the DOM to be fully ready
    const timeoutId = setTimeout(() => {
      // Create Lenis instance with optimized settings
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Improved easing function
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });
      
      // Connect GSAP's ticker to Lenis
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      
      // Override ScrollTrigger's scroll normalization to work with Lenis
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenisInstance.scrollTo(value, { immediate: true });
          }
          return lenisInstance.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: 'transform',
      });

      // Update on scroll (debounced)
      let timeout: ReturnType<typeof setTimeout>;
      lenisInstance.on('scroll', debounce(() => {
        ScrollTrigger.update();
      }, 100));
      
      // Set the instance to state
      setLenis(lenisInstance);
      
      // Initialize all registered ScrollTrigger callbacks
      scrollTriggerCallbacks.forEach(callback => callback());
      
      // Refresh all ScrollTriggers after a delay to ensure everything is positioned correctly
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      
      return () => {
        gsap.ticker.remove(lenisInstance.raf);
        lenisInstance.destroy();
        clearTimeout(timeout);
      };
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [scrollTriggerCallbacks]);
  
  // Handle window resize to refresh ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const resizeObserver = new ResizeObserver(debounce(() => {
      ScrollTrigger.refresh();
    }, 200));
    
    resizeObserver.observe(document.body);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  
  // Register a ScrollTrigger callback to be executed when Lenis is initialized
  const registerScrollTrigger = useCallback((callback: () => void) => {
    setScrollTriggerCallbacks(prev => [...prev, callback]);
  }, []);
  
  // Refresh all ScrollTriggers
  const refreshScrollTriggers = useCallback(() => {
    if (typeof window === 'undefined') return;
    ScrollTrigger.refresh();
  }, []);
  
  // Scroll to a target element or position
  const scrollTo = useCallback((target: string | HTMLElement | number, options?: any) => {
    if (!lenis) return;
    lenis.scrollTo(target, options);
  }, [lenis]);
  
  const value: AnimationContextType = {
    lenis,
    gsap,
    ScrollTrigger,
    registerScrollTrigger,
    refreshScrollTriggers,
    scrollTo,
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  return useContext(AnimationContext);
};

// Utility function to debounce function calls
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}