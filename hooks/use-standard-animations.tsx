"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import {
  DURATIONS,
  EASINGS,
  DELAYS,
  DISTANCES,
  entranceVariants,
  staggeredChildrenVariants,
  childVariants,
  hoverVariants,
  prefersReducedMotion,
} from "@/lib/animation-system"

// Hook for standard section entrance animations
export function useSectionEntrance(options = { threshold: 0.2, once: true }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: options.once,
    amount: options.threshold,
  })

  return { ref, isInView, variants: entranceVariants }
}

// Hook for staggered children animations
export function useStaggeredChildren(options = { threshold: 0.2, once: true, delayChildren: 0.1 }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: options.once,
    amount: options.threshold,
  })

  const customStaggerVariants = {
    ...staggeredChildrenVariants,
    visible: {
      ...staggeredChildrenVariants.visible,
      transition: {
        ...staggeredChildrenVariants.visible.transition,
        staggerChildren: options.delayChildren || DELAYS.stagger,
      },
    },
  }

  return {
    ref,
    isInView,
    containerVariants: customStaggerVariants,
    childVariants,
  }
}

// Hook for section transitions
export function useSectionTransition(options = { overlap: 0.3 }) {
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fromRef.current || !toRef.current || prefersReducedMotion) return

    // Implementation would use GSAP for more complex transitions
    // This is a simplified version
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && toRef.current) {
            toRef.current.style.opacity = "1"
            toRef.current.style.transform = "translateY(0)"
          }
        })
      },
      { threshold: options.overlap },
    )

    if (fromRef.current) {
      observer.observe(fromRef.current)
    }

    return () => {
      if (fromRef.current) {
        observer.unobserve(fromRef.current)
      }
    }
  }, [options.overlap])

  return { fromRef, toRef }
}

// Hook for parallax effects
export function useParallax(options = { speed: 0.5, direction: "y" as "x" | "y" }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const style = prefersReducedMotion
    ? {}
    : {
        transform:
          options.direction === "y"
            ? `translateY(${scrollY * options.speed * -1}px)`
            : `translateX(${scrollY * options.speed * -1}px)`,
      }

  return { ref, style }
}

// Hook for hover animations
export function useHoverAnimation() {
  return { variants: hoverVariants }
}

// Export all animation constants for direct use
export {
  DURATIONS,
  EASINGS,
  DELAYS,
  DISTANCES,
  entranceVariants,
  staggeredChildrenVariants,
  childVariants,
  hoverVariants,
  prefersReducedMotion,
}
