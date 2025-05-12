"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { type ReactNode, useRef } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  variants?: Variants
  className?: string
  viewport?: {
    once?: boolean
    amount?: number | "some" | "all"
    margin?: string
  }
  transition?: {
    duration?: number
    delay?: number
    ease?: string | number[]
    type?: string
  }
}

export function ScrollAnimation({
  children,
  variants,
  className,
  viewport = { once: true, amount: 0.3 },
  transition = { duration: 0.5, ease: "easeOut" },
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewport)

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants || defaultVariants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation
export function ScrollAnimationGroup({
  children,
  className,
  staggerChildren = 0.1,
  viewport = { once: true, amount: 0.3 },
  childVariants,
}: {
  children: ReactNode
  className?: string
  staggerChildren?: number
  viewport?: {
    once?: boolean
    amount?: number | "some" | "all"
    margin?: string
  }
  childVariants?: Variants
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, viewport)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
      },
    },
  }

  const defaultChildVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants || defaultChildVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
