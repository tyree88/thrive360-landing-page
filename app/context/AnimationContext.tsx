'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import Observer from 'gsap/Observer';

// Register GSAP plugins once on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
}

type AnimationContextType = {
  lenis: any | null;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  registerScrollTrigger: (callback: () => void) => void;
  refreshScrollTriggers: () => void;
  scrollTo: (target: string | HTMLElement | number, options?: any) => void;
};

const AnimationContext = createContext<AnimationContextType | null>(null);

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<any | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const requestRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Early return for SSR
    if (typeof window === 'undefined') return;
    
    // Import Lenis dynamically to avoid SSR issues
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis');
        
        const lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
          infinite: false,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          autoResize: true,
        });
        
        // Connect GSAP to Lenis for synchronized animations
        lenisInstance.on('scroll', () => {
          ScrollTrigger.update();
        });
        
        const updateScroll = (time: number) => {
          lenisInstance.raf(time);
          requestRef.current = requestAnimationFrame(updateScroll);
        };
        
        requestRef.current = requestAnimationFrame(updateScroll);
        setLenis(lenisInstance);
        
        // Optimize GSAP ticker
        gsap.ticker.lagSmoothing(0);
        
        // Force recalculation of all ScrollTriggers
        // Added delay to ensure DOM is fully rendered
        setTimeout(() => {
          ScrollTrigger.refresh(true);
          setIsInitialized(true);
        }, 200);
      } catch (error) {
        console.error('Error initializing Lenis:', error);
      }
    };
    
    initLenis();
    
    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      
      if (lenis) {
        lenis.destroy();
      }
      
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Handle window resize to refresh ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      // Debounce resize events to prevent excessive refreshes
      if (isInitialized) {
        ScrollTrigger.refresh(true);
      }
    };
    
    const debouncedHandleResize = debounce(handleResize, 250);
    window.addEventListener('resize', debouncedHandleResize);
    
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [isInitialized]);
  
  // Safe way to register ScrollTrigger instances
  const registerScrollTrigger = (callback: () => void) => {
    if (typeof window === 'undefined' || !isInitialized) return;
    
    // Wrap in try/catch to prevent errors from breaking the app
    try {
      callback();
    } catch (error) {
      console.error('Error registering ScrollTrigger:', error);
    }
  };
  
  // Force refresh all ScrollTrigger instances
  const refreshScrollTriggers = () => {
    if (typeof window === 'undefined') return;
    ScrollTrigger.refresh(true);
  };
  
  // Scroll to target function utilizing Lenis
  const scrollTo = (target: string | HTMLElement | number, options: any = {}) => {
    if (!lenis) return;
    
    lenis.scrollTo(target, {
      offset: -100,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
  };
  
  return (
    <AnimationContext.Provider 
      value={{
        lenis,
        gsap,
        ScrollTrigger,
        registerScrollTrigger,
        refreshScrollTriggers,
        scrollTo
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook to use animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

// Utility function to debounce function calls
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
