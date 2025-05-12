"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AnimatedCounterProps {
  value: string
  duration?: number
  delay?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({ value, duration = 1.5, delay = 0, className = "", formatter }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const controls = useAnimation()

  // Parse the value to get the numeric part
  const parseValue = () => {
    // Handle percentage values
    if (value.endsWith("%")) {
      return Number.parseFloat(value)
    }

    // Handle currency values
    if (value.startsWith("$")) {
      return Number.parseFloat(value.substring(1))
    }

    // Handle values with 'x' multiplier
    if (value.endsWith("x")) {
      return Number.parseFloat(value)
    }

    // Default case - try to parse as float
    return Number.parseFloat(value)
  }

  // Format the value back to its original format
  const formatValue = (num: number) => {
    if (formatter) {
      return formatter(num)
    }

    if (value.endsWith("%")) {
      return `${num.toFixed(0)}%`
    }

    if (value.startsWith("$")) {
      return `$${num.toFixed(1)}M`
    }

    if (value.endsWith("x")) {
      return `${num.toFixed(1)}x`
    }

    return num.toString()
  }

  useEffect(() => {
    if (isInView) {
      const numericValue = parseValue()

      // Don't animate if we can't parse the value
      if (isNaN(numericValue)) {
        setDisplayValue(value)
        return
      }

      let startTimestamp: number | null = null
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
        const currentValue = progress * numericValue

        setDisplayValue(formatValue(currentValue))

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          setDisplayValue(value) // Ensure we end with the exact value
        }
      }

      // Start the animation after the delay
      const timer = setTimeout(() => {
        window.requestAnimationFrame(step)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, value, duration, delay])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.95 }}
      transition={{ duration: 0.4, delay }}
    >
      {displayValue}
    </motion.span>
  )
}
