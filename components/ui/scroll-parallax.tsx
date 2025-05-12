"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollParallaxProps {
  children?: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  containerRef?: React.RefObject<HTMLElement>
}

const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children,
  className,
  speed = 0.1,
  direction = "up",
  containerRef,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  // Determine the transform property and direction
  const getTransformValues = () => {
    switch (direction) {
      case "up":
        return { y: [0, -1 * speed * 100], x: [0, 0] }
      case "down":
        return { y: [0, speed * 100], x: [0, 0] }
      case "left":
        return { x: [0, -1 * speed * 100], y: [0, 0] }
      case "right":
        return { x: [0, speed * 100], y: [0, 0] }
      default:
        return { y: [0, -1 * speed * 100], x: [0, 0] }
    }
  }

  const { y: yValues, x: xValues } = getTransformValues()

  const { scrollYProgress } = useScroll({
    target: containerRef || elementRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], yValues)
  const x = useTransform(scrollYProgress, [0, 1], xValues)

  return (
    <motion.div ref={elementRef} className={cn("", className)} style={{ x, y }}>
      {children}
    </motion.div>
  )
}

export default ScrollParallax
