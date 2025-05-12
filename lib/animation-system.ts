"use client"

import type React from "react"

import type { Variants } from "framer-motion"
import gsap from "gsap"

// ======================================================
// ANIMATION CONSTANTS
// ======================================================

export const DURATIONS = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.8,
  extraSlow: 1.2,
}

export const EASINGS = {
  // Entrance animations
  entrance: "cubic-bezier(0.22, 1, 0.36, 1)", // Smooth entrance with slight overshoot
  // Exit animations
  exit: "cubic-bezier(0.22, 0, 0.36, 1)", // Quick start, slower end
  // Hover animations
  hover: "cubic-bezier(0.33, 1, 0.68, 1)", // Smooth with slight acceleration
  // Scroll-based animations
  scroll: "cubic-bezier(0.16, 1, 0.3, 1)", // Emphasized end (similar to power2.out)
  // Linear animations (for continuous motion)
  linear: "linear",
}

export const DELAYS = {
  stagger: 0.1, // Base stagger delay between elements
  sectionTransition: 0.2, // Delay between section transitions
}

export const DISTANCES = {
  y: {
    short: 10,
    medium: 20,
    long: 40,
  },
  x: {
    short: 10,
    medium: 20,
    long: 40,
  },
  scale: {
    subtle: 0.02, // 2% size change
    medium: 0.05, // 5% size change
    large: 0.1, // 10% size change
  },
}

// ======================================================
// FRAMER MOTION VARIANTS
// ======================================================

// Base entrance animation variants
export const entranceVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCES.y.medium },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.medium,
      ease: EASINGS.entrance,
    },
  },
  exit: {
    opacity: 0,
    y: -DISTANCES.y.medium,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.exit,
    },
  },
}

// Staggered children animation variants
export const staggeredChildrenVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DELAYS.stagger,
    },
  },
}

// Child item variants for staggered animations
export const childVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCES.y.medium },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.medium,
      ease: EASINGS.entrance,
    },
  },
}

// Hover animation variants
export const hoverVariants = {
  initial: { scale: 1, y: 0, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)" },
  hover: {
    scale: 1 + DISTANCES.scale.medium,
    y: -DISTANCES.y.short,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.hover,
    },
  },
  tap: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: DURATIONS.fast * 0.5,
      ease: EASINGS.hover,
    },
  },
}

// Section transition variants
export const sectionTransitionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.entrance,
      staggerChildren: DELAYS.stagger * 2,
    },
  },
}

// ======================================================
// GSAP ANIMATION UTILITIES
// ======================================================

// Standard GSAP timeline for section entrance
export const createSectionEntrance = (
  sectionRef: React.RefObject<HTMLElement>,
  elements: { ref: React.RefObject<HTMLElement>; delay?: number }[],
  options = { once: true, start: "top 80%" },
) => {
  if (!sectionRef.current) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: options.start,
      once: options.once,
    },
  })

  elements.forEach(({ ref, delay = 0 }) => {
    if (ref.current) {
      tl.fromTo(
        ref.current,
        { opacity: 0, y: DISTANCES.y.medium },
        {
          opacity: 1,
          y: 0,
          duration: DURATIONS.medium,
          ease: EASINGS.entrance,
          delay,
        },
        delay > 0 ? `+=${delay}` : "<+=0.1",
      )
    }
  })

  return tl
}

// Create a scroll-based animation
export const createScrollAnimation = (
  sectionRef: React.RefObject<HTMLElement>,
  animations: {
    element: React.RefObject<HTMLElement> | HTMLElement | string
    from: gsap.TweenVars
    to: gsap.TweenVars
    position?: string | number
  }[],
  options = { scrub: 0.5, start: "top bottom", end: "bottom top" },
) => {
  if (!sectionRef.current) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: options.start,
      end: options.end,
      scrub: options.scrub,
    },
  })

  animations.forEach(({ element, from, to, position }) => {
    if (element) {
      tl.fromTo(element, from, to, position)
    }
  })

  return tl
}

// Create a parallax effect
export const createParallax = (
  element: React.RefObject<HTMLElement> | HTMLElement | string,
  options = { speed: 0.5, direction: "y", start: "top bottom", end: "bottom top" },
) => {
  if (!element) return null

  const distance = options.direction === "y" ? window.innerHeight * options.speed * -1 : 0
  const distanceX = options.direction === "x" ? window.innerWidth * options.speed * -1 : 0

  return gsap.to(element, {
    y: distance,
    x: distanceX,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: options.start,
      end: options.end,
      scrub: true,
    },
  })
}

// ======================================================
// SECTION TRANSITION SYSTEM
// ======================================================

// Create a smooth transition between sections
export const createSectionTransition = (
  fromSection: React.RefObject<HTMLElement>,
  toSection: React.RefObject<HTMLElement>,
  options = { duration: DURATIONS.medium, overlap: 0.3 },
) => {
  if (!fromSection.current || !toSection.current) return null

  // Calculate the overlap point
  const overlapPoint = fromSection.current.offsetHeight * (1 - options.overlap)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: fromSection.current,
      start: `top+=${overlapPoint} bottom`,
      end: "bottom top",
      scrub: true,
    },
  })

  // Fade out the from section slightly
  tl.to(fromSection.current, {
    opacity: 0.8,
    scale: 0.98,
    duration: options.duration,
  })

  // Prepare the to section
  gsap.set(toSection.current, {
    opacity: 0,
    y: DISTANCES.y.long,
  })

  // Animate in the to section
  tl.to(
    toSection.current,
    {
      opacity: 1,
      y: 0,
      duration: options.duration * 1.5,
    },
    `-=${options.duration * 0.5}`,
  )

  return tl
}

// ======================================================
// RESPONSIVE ANIMATION SYSTEM
// ======================================================

// Adjust animation values based on screen size
export const getResponsiveValue = (
  values: { mobile: number; tablet: number; desktop: number },
  windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200,
) => {
  if (windowWidth < 768) {
    return values.mobile
  } else if (windowWidth < 1024) {
    return values.tablet
  }
  return values.desktop
}

// Create responsive animation variants
export const createResponsiveVariants = (
  windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200,
): Variants => {
  const yDistance = getResponsiveValue(
    {
      mobile: DISTANCES.y.short,
      tablet: DISTANCES.y.medium,
      desktop: DISTANCES.y.medium,
    },
    windowWidth,
  )

  const duration = getResponsiveValue(
    {
      mobile: DURATIONS.fast,
      tablet: DURATIONS.medium,
      desktop: DURATIONS.medium,
    },
    windowWidth,
  )

  return {
    hidden: { opacity: 0, y: yDistance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: EASINGS.entrance,
      },
    },
  }
}

// ======================================================
// PERFORMANCE OPTIMIZATION
// ======================================================

// Check if reduced motion is preferred
export const prefersReducedMotion =
  typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

// Get animation values respecting reduced motion preferences
export const getAccessibleAnimationValues = (values: { standard: any; reduced: any }) => {
  return prefersReducedMotion ? values.reduced : values.standard
}

// Create accessible variants
export const createAccessibleVariants = (): Variants => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: DURATIONS.fast,
        },
      },
    }
  }

  return entranceVariants
}
