"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface UnifiedBackgroundProps {
  variant?: "light" | "medium" | "dark"
  withPattern?: boolean
  withParallax?: boolean
}

export function UnifiedBackground({
  variant = "light",
  withPattern = true,
  withParallax = true,
}: UnifiedBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Get background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case "medium":
        return "bg-thrive-purple-500"
      case "dark":
        return "bg-thrive-purple-900"
      case "light":
      default:
        return "bg-thrive-purple-50"
    }
  }

  // Get pattern colors based on variant
  const getPatternColors = () => {
    switch (variant) {
      case "medium":
        return {
          first: "bg-thrive-purple-400/30",
          second: "bg-thrive-purple-600/30",
        }
      case "dark":
        return {
          first: "bg-thrive-purple-800/30",
          second: "bg-thrive-purple-950/30",
        }
      case "light":
      default:
        return {
          first: "bg-thrive-purple-100/50",
          second: "bg-thrive-purple-200/50",
        }
    }
  }

  const patternColors = getPatternColors()

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden -z-10 ${getBgColor()}`}>
      {withPattern && (
        <motion.div className="absolute inset-0 pointer-events-none" style={withParallax ? { y } : undefined}>
          <div
            className={`absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-3xl opacity-50 ${patternColors.first}`}
            style={{ top: "10%", left: "5%" }}
          />
          <div
            className={`absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-50 ${patternColors.second}`}
            style={{ bottom: "5%", right: "10%" }}
          />
        </motion.div>
      )}
    </div>
  )
}
