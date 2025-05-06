'use client';

import { useRef, useEffect } from 'react';
import { useAnimation } from '@/context/AnimationContext';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface AnimationOptions {
  threshold?: number;
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  fromY?: number;
  fromOpacity?: number;
  fromScale?: number;
  once?: boolean;
}

/**
 * A hook for creating optimized animations with GSAP
 * This provides a unified interface for animations across the site
 * and handles reduced motion preferences automatically
 */
export function useOptimizedAnimations() {
  const prefersReducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger, registerScrollTrigger } = useAnimation();
  
  /**
   * Create a fade-in animation for a section or component
   */
  const createFadeIn = (
    elementRef: React.RefObject<HTMLElement>,
    options: AnimationOptions = {}
  ) => {
    const {
      threshold = 0.2,
      stagger = 0.1,
      delay = 0,
      duration = prefersReducedMotion ? 0.3 : 0.6,
      ease = 'power2.out',
      fromY = prefersReducedMotion ? 0 : 30,
      fromOpacity = 0,
      fromScale = prefersReducedMotion ? 1 : 0.95,
      once = true,
    } = options;
    
    useEffect(() => {
      if (!elementRef.current) return;
      
      registerScrollTrigger(() => {
        const element = elementRef.current;
        if (!element) return;
        
        const childElements = element.children;
        if (childElements.length === 0) return;
        
        // Set initial state
        gsap.set(childElements, {
          y: fromY,
          opacity: fromOpacity,
          scale: fromScale,
        });
        
        // Create the scroll trigger animation
        const trigger = ScrollTrigger.create({
          trigger: element,
          start: `top ${(1 - threshold) * 100}%`,
          once,
          onEnter: () => {
            gsap.to(childElements, {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger,
              duration,
              delay,
              ease,
              clearProps: 'transform',
              overwrite: 'auto',
            });
          },
        });
        
        return () => {
          trigger.kill();
        };
      });
    }, [elementRef, threshold, stagger, delay, duration, ease, fromY, fromOpacity, fromScale, once]);
  };
  
  /**
   * Create a parallax effect for background elements
   */
  const createParallax = (
    elementRef: React.RefObject<HTMLElement>,
    options: {
      speed?: number;
      direction?: 'up' | 'down' | 'left' | 'right';
    } = {}
  ) => {
    const { speed = prefersReducedMotion ? 0 : 0.2, direction = 'up' } = options;
    
    useEffect(() => {
      if (!elementRef.current || prefersReducedMotion) return;
      
      registerScrollTrigger(() => {
        const element = elementRef.current;
        if (!element) return;
        
        // Determine movement based on direction
        const yPercent = direction === 'up' ? speed * 100 : direction === 'down' ? -speed * 100 : 0;
        const xPercent = direction === 'left' ? speed * 100 : direction === 'right' ? -speed * 100 : 0;
        
        // Create the animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        
        tl.fromTo(
          element,
          { y: 0, x: 0 },
          { y: `${yPercent}%`, x: `${xPercent}%`, ease: 'none' }
        );
        
        return () => {
          tl.kill();
          ScrollTrigger.getAll()
            .filter((st) => st.vars.trigger === element)
            .forEach((st) => st.kill());
        };
      });
    }, [elementRef, speed, direction, prefersReducedMotion]);
  };
  
  /**
   * Create a smooth scroll-to action
   */
  const scrollToSection = (target: string | HTMLElement, offset: number = -100) => {
    const { scrollTo } = useAnimation();
    
    scrollTo(target, {
      offset,
      duration: prefersReducedMotion ? 0.3 : 1.2,
    });
  };
  
  return {
    createFadeIn,
    createParallax,
    scrollToSection,
  };
}
