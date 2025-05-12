"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAndSwapTextProps {
  label: string
  offset?: [string, string]
  className?: string
  containerRef?: React.RefObject<HTMLElement>
}

export const ScrollAndSwapText = ({
  label,
  offset = ["0 0.2", "0 0.5"],
  className,
  containerRef,
}: ScrollAndSwapTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Use the provided container ref or default to the text element itself
  const targetRef = containerRef || textRef

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 0])

  useEffect(() => {
    const handleVisibility = () => {
      if (!textRef.current) return
      const rect = textRef.current.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      setIsVisible(isInView)
    }

    window.addEventListener("scroll", handleVisibility)
    handleVisibility() // Check initial visibility

    return () => window.removeEventListener("scroll", handleVisibility)
  }, [])

  return (
    <motion.span
      ref={textRef}
      className={cn("inline-block", className)}
      style={{
        opacity,
        y,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      {label}
    </motion.span>
  )
}
