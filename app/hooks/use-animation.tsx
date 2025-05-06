import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInOptions {
  y?: number;
  x?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  start?: string;
  opacity?: number;
  ease?: string;
  onComplete?: () => void;
}

export const useFadeIn = (
  selector: string,
  options: FadeInOptions = {}
) => {
  const {
    y = 30,
    x = 0,
    scale = 1,
    delay = 0,
    duration = 0.6,
    stagger = 0.1,
    once = true,
    start = 'top 85%',
    opacity = 0,
    ease = 'power2.out',
    onComplete,
  } = options;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined' || !ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Apply initial styles to prevent hydration mismatch
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        // Set initial transform to "none" to match server render
        element.style.transform = 'none';
        // Don't set opacity to 0 immediately to prevent flicker
        // We'll handle this in the animation after a slight delay
      }
    });

    // Small delay to ensure client hydration is complete
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          elements,
          { 
            y, 
            x, 
            scale, 
            opacity, 
            autoAlpha: opacity
          },
          { 
            y: 0, 
            x: 0, 
            scale: 1, 
            opacity: 1, 
            autoAlpha: 1,
            duration, 
            delay, 
            stagger, 
            ease, 
            scrollTrigger: {
              trigger: ref.current,
              start,
              once,
            },
            onComplete
          }
        );
      }, ref);
      
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selector, y, x, scale, delay, duration, stagger, once, start, opacity, ease, onComplete]);

  return ref;
};

interface ParallaxOptions {
  speed?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

export const useParallax = (
  selector: string,
  options: ParallaxOptions = {}
) => {
  const {
    speed = 20,
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined' || !ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Apply initial styles to prevent hydration mismatch
    elements.forEach((element) => {
      // Set initial transform to "none" to match server render
      if (element instanceof HTMLElement) {
        element.style.transform = 'none';
      }
    });

    // Small delay to ensure initial styles are applied before animation
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        elements.forEach((element) => {
          gsap.to(element, {
            y: `${speed}%`,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start,
              end,
              scrub,
            },
          });
        });
      }, ref);
      
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selector, speed, start, end, scrub]);

  return ref;
};

interface SequenceOptions {
  delay?: number;
  duration?: number;
  ease?: string;
  staggerDelay?: number;
  start?: string;
  once?: boolean;
}

export const useSequence = (
  selector: string,
  options: SequenceOptions = {}
) => {
  const {
    delay = 0,
    duration = 0.6,
    ease = 'power2.out',
    staggerDelay = 0.2,
    start = 'top 80%',
    once = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined' || !ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Apply initial styles to prevent hydration mismatch
    elements.forEach((element) => {
      if (element instanceof HTMLElement) {
        // Set initial transform to "none" to match server render
        element.style.transform = 'none';
      }
    });

    // Small delay to ensure client hydration is complete
    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration, 
            ease,
            delay,
            stagger: staggerDelay,
            scrollTrigger: {
              trigger: ref.current,
              start,
              once,
            },
          }
        );
      }, ref);
      
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selector, delay, duration, ease, staggerDelay, start, once]);

  return ref;
};

export const useScrollTriggerAnimation = (callback: () => void, dependencies: any[] = []) => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Small delay to ensure hydration is complete
    const timeoutId = setTimeout(() => {
      // Always register ScrollTrigger (safe to call multiple times)
      if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }
      
      // Create a context to make cleanup easier
      const ctx = gsap.context(() => {
        callback();
      });
      
      // Clean up all ScrollTriggers when component unmounts
      return () => {
        ctx.revert();
      };
    }, 150);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, dependencies);
};

export default {
  useFadeIn,
  useParallax,
  useSequence,
  useScrollTriggerAnimation
};
