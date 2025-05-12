"use client"

import { useScroll, useTransform, MotionValue } from "framer-motion"
import { useEffect, useState } from "react"

interface ScrollAnimationProps {
  threshold?: [number, number] // Start and end points for the animation (0-1)
  outputRange?: any[] // Output values for the animation
  axis?: "y" | "x" // Scroll axis
  respectReducedMotion?: boolean // Whether to respect the user's reduced motion preference
}

export function useScrollAnimation({
  threshold = [0, 1],
  outputRange = [0, 1],
  axis = "y",
  respectReducedMotion = true,
}: ScrollAnimationProps = {}) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    if (respectReducedMotion && typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      setShouldAnimate(!prefersReducedMotion)
    }
  }, [respectReducedMotion])

  const { scrollYProgress, scrollXProgress } = useScroll()
  const scrollProgress = axis === "y" ? scrollYProgress : scrollXProgress

  // Create a transformed motion value based on scroll progress
  const transformedValue = useTransform(scrollProgress, threshold, outputRange)

  // If reduced motion is preferred, return a static value
  if (!shouldAnimate) {
    return {
      transformedValue: new MotionValue(outputRange[outputRange.length - 1]),
      scrollProgress,
      shouldAnimate,
    }
  }

  return { transformedValue, scrollProgress, shouldAnimate }
}
