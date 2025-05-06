'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from './use-reduced-motion';
import { useAnimation } from '@/context/AnimationContext';

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
  const { gsap, ScrollTrigger, registerScrollTrigger } = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the animations once GSAP is loaded
  useEffect(() => {
    if (gsap && ScrollTrigger && !isInitialized) {
      setIsInitialized(true);
    }
  }, [gsap, ScrollTrigger, isInitialized]);

  /**
   * Create a fade-in animation for a section or component
   */
  const createFadeIn = useCallback((
    elements: string | Element | Element[] | NodeList,
    options: AnimationOptions = {}
  ) => {
    if (!gsap || !isInitialized) return;

    const {
      threshold = 0.2,
      stagger = 0.1,
      delay = 0,
      duration = prefersReducedMotion ? 0.1 : 0.8,
      ease = 'power2.out',
      fromY = prefersReducedMotion ? 0 : 30,
      fromOpacity = 0,
      fromScale = prefersReducedMotion ? 1 : 0.95,
      once = true
    } = options;

    // Create the animation timeline
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration, ease }
    });

    // Add the animation to the timeline
    tl.from(elements, {
      y: fromY,
      opacity: fromOpacity,
      scale: fromScale,
      stagger: prefersReducedMotion ? 0 : stagger,
      clearProps: 'transform', // Clean up transform properties after animation
    });

    // Return a function to play the animation
    // This allows the animation to be triggered manually if needed
    return {
      play: () => tl.play(),
      pause: () => tl.pause(),
      timeline: tl
    };
  }, [gsap, isInitialized, prefersReducedMotion]);

  /**
   * Create a parallax effect for background elements
   */
  const createParallax = useCallback((
    element: string | Element,
    { speed = 0.5, start = 'top bottom', end = 'bottom top' } = {}
  ) => {
    if (!gsap || !ScrollTrigger || !isInitialized || prefersReducedMotion) return;

    registerScrollTrigger(() => {
      // Create a ScrollTrigger instance
      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start,
        end,
        scrub: true,
        onUpdate: (self: any) => {
          // Apply transform directly using style for better performance
          if (element instanceof Element) {
            (element as HTMLElement).style.transform = `translateY(${self.progress * speed * 100}px)`;
          } else if (typeof element === 'string') {
            document.querySelectorAll(element).forEach(el => {
              (el as HTMLElement).style.transform = `translateY(${self.progress * speed * 100}px)`;
            });
          }
        }
      });

      return scrollTrigger;
    });
  }, [gsap, ScrollTrigger, isInitialized, prefersReducedMotion, registerScrollTrigger]);

  /**
   * Create a smooth scroll-to action
   */
  const scrollTo = useCallback((
    target: string | Element | number,
    { duration = 1, offset = 0 } = {}
  ) => {
    if (!gsap || !isInitialized) return;

    // If reduced motion is preferred, use a shorter duration
    const actualDuration = prefersReducedMotion ? 0.1 : duration;

    // Get the target position
    let position: number;
    if (typeof target === 'number') {
      position = target;
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) return;
      position = element.getBoundingClientRect().top + window.pageYOffset + offset;
    } else {
      position = target.getBoundingClientRect().top + window.pageYOffset + offset;
    }

    // Animate the scroll
    gsap.to(window, {
      scrollTo: {
        y: position,
        autoKill: true,
      },
      duration: actualDuration,
      ease: 'power2.inOut',
    });
  }, [gsap, isInitialized, prefersReducedMotion]);

  return {
    createFadeIn,
    createParallax,
    scrollTo,
    prefersReducedMotion,
    isInitialized
  };
}