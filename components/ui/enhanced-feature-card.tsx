"use client"

import type React from "react"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { FlowButton } from "@/components/ui/flow-button"

interface EnhancedFeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color?: "indigo" | "pink" | "purple" | "blue" | "green" | "amber"
  percentage?: string
  percentageLabel?: string
  industry?: string
  index?: number
  learnMoreLink?: string
}

export function EnhancedFeatureCard({
  title,
  description,
  icon,
  color = "indigo",
  percentage,
  percentageLabel,
  industry,
  index = 0,
  learnMoreLink,
}: EnhancedFeatureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const colorVariants = {
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      gradient: "from-indigo-500 to-indigo-700",
      border: "border-indigo-200",
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-700",
      gradient: "from-pink-500 to-pink-700",
      border: "border-pink-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      gradient: "from-purple-500 to-purple-700",
      border: "border-purple-200",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      gradient: "from-blue-500 to-blue-700",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      gradient: "from-green-500 to-green-700",
      border: "border-green-200",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      gradient: "from-amber-500 to-amber-700",
      border: "border-amber-200",
    },
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <motion.div
      className="feature-card-container perspective-1000 w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      onKeyDown={handleKeyDown}
      onClick={() => setIsFlipped(!isFlipped)}
      ref={cardRef}
    >
      <div
        className={cn(
          "relative w-full h-full transform-style-3d transition-all duration-400",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl p-4 shadow-md border",
            "hover:shadow-lg transition-shadow duration-300",
            colorVariants[color].border,
          )}
        >
          <div className="h-full flex flex-col bg-white rounded-lg p-3">
            <div className="flex items-start mb-3">
              <div className={cn("p-2 rounded-full mr-3 flex items-center justify-center", colorVariants[color].bg)}>
                <div className={colorVariants[color].text}>{icon}</div>
              </div>
              <h3 className="font-semibold text-gray-800">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 flex-grow">{description}</p>
            {industry && <div className="mt-auto pt-2 text-xs text-gray-500">Industry: {industry}</div>}
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl p-4 shadow-md rotate-y-180 border",
            colorVariants[color].border,
          )}
        >
          <div
            className={cn(
              "h-full flex flex-col items-center justify-center text-white rounded-lg p-4",
              `bg-gradient-to-br ${colorVariants[color].gradient}`,
            )}
          >
            {percentage && (
              <div className="text-center mb-3">
                <div className="text-3xl font-bold mb-1">{percentage}</div>
                {percentageLabel && <div className="text-sm opacity-90">{percentageLabel}</div>}
              </div>
            )}
            <p className="text-center text-sm">{description}</p>
            {learnMoreLink && (
              <div className="mt-4">
                <FlowButton text="Learn More" asLink href={learnMoreLink} />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
