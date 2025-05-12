"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps {
  children: React.ReactNode
  className?: string
  bgVariant?: "white" | "light" | "primary" | "secondary" | "accent"
  borderVariant?: "none" | "light" | "primary" | "secondary" | "accent"
  hoverEffect?: boolean
  onClick?: () => void
}

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className,
  bgVariant = "white",
  borderVariant = "light",
  hoverEffect = true,
  onClick,
}) => {
  // Background classes based on variant
  const bgClasses = {
    white: "bg-white",
    light: "bg-gradient-to-br from-white to-thrive-purple-50",
    primary: "bg-thrive-purple-50",
    secondary: "bg-thrive-teal-50",
    accent: "bg-thrive-purple-100",
  }[bgVariant]

  // Border classes based on variant
  const borderClasses = {
    none: "border-transparent",
    light: "border-thrive-purple-200",
    primary: "border-thrive-purple-300",
    secondary: "border-thrive-teal-300",
    accent: "border-thrive-purple-400",
  }[borderVariant]

  // Hover effect classes
  const hoverClasses = hoverEffect
    ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-opacity-50"
    : ""

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl border shadow-sm",
        bgClasses,
        borderClasses,
        hoverClasses,
        className,
        onClick ? "cursor-pointer" : "",
      )}
      onClick={onClick}
    >
      {/* Screen reflection effect for glossy cards */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-xl pointer-events-none" />

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GradientCard
