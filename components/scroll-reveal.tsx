"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
  once?: boolean
}

const ScrollReveal = ({ children, className = "", delay = 0, y = 20, x = 0, once = true }: ScrollRevealProps) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y, x },
        visible: { opacity: 1, y: 0, x: 0 },
      }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
