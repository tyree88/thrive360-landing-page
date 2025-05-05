'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// This hook safely handles scroll animations in Next.js
export const useScrollTriggerAnimation = (
  callback: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    // Ensure we're in the browser environment
    if (typeof window === 'undefined') return;
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Execute the animation setup callback
    callback();
    
    // Cleanup function
    return () => {
      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, dependencies);
};

// Scroll progress animation hook
export const useScrollProgressAnimation = (
  callback: (progress: number) => void, 
  options: {
    trigger?: React.RefObject<HTMLElement>;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    trigger,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;
  
  const progressRef = useRef<number>(0);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !trigger?.current) return;
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create context for cleanup
    const ctx = gsap.context(() => {
      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: trigger.current,
        start,
        end,
        scrub,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          callback(self.progress);
        }
      });
    });
    
    // Cleanup
    return () => ctx.revert();
  }, [trigger, start, end, scrub, callback]);
  
  return progressRef;
};

// Enhanced scroll-driven parallax effect for Next.js
export const useParallaxScroll = (
  options: {
    speed?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    clamp?: boolean;
    smoothness?: number;
  } = {}
) => {
  const {
    speed = 0.2,
    direction = 'up',
    clamp = true,
    smoothness = 0.1,
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const element = ref.current;
    
    const directionMultiplier = {
      up: -1,
      down: 1,
      left: -1,
      right: 1
    };
    
    const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
    const distance = speed * 100 * directionMultiplier[direction];
    
    const mm = gsap.matchMedia();
    
    // Don't apply parallax effect on mobile
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: smoothness,
        }
      });
      
      tl.fromTo(
        element,
        { [axis]: 0 },
        { [axis]: `${distance}%`, ease: "none" }
      );
      
      return () => {
        tl.kill();
      };
    });
    
    return () => {
      mm.revert();
    };
  }, [speed, direction, clamp, smoothness]);
  
  return ref;
};

// Enhanced batch reveal animations for Next.js
export const useBatchReveal = (
  options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
    start?: string;
    once?: boolean;
  } = {}
) => {
  const {
    stagger = 0.1,
    duration = 0.6,
    ease = "power2.out",
    delay = 0,
    start = "top 85%",
    once = true,
  } = options;
  
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const elements = ref.current.children;
    
    if (elements.length === 0) return;
    
    gsap.set(elements, { y: 30, opacity: 0 });
    
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(elements, {
        interval: 0.1,
        batchMax: 3,
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger,
            duration,
            ease,
            delay,
          });
        },
        start,
        once,
      });
    }, ref);
    
    return () => ctx.revert();
  }, [stagger, duration, ease, delay, start, once]);
  
  return ref;
};

export default {
  useScrollTriggerAnimation,
  useScrollProgressAnimation,
  useParallaxScroll,
  useBatchReveal
};