"use client"

import type React from "react"
import { useSectionEntrance } from "@/hooks/use-standard-animations"
import UnifiedSection, { type SectionAnimation } from "./unified-section"

interface StandardSectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  containerClassName?: string
  heading?: string
  subheading?: string
  badge?: string
  transitionType?: "fade" | "slide" | "scale" | "none"
  bgColor?: string
  prevBgColor?: string
  fullWidth?: boolean
}

export function StandardSection({
  children,
  id,
  className,
  containerClassName,
  heading,
  subheading,
  badge,
  transitionType = "fade",
  bgColor = "bg-white",
  prevBgColor,
  fullWidth = false,
}: StandardSectionProps) {
  const { ref: headingRef } = useSectionEntrance()

  // Map the old transition types to the new animation types
  const animationMap: Record<string, SectionAnimation> = {
    fade: "fade",
    slide: "slide",
    scale: "scale",
    none: "none",
  }

  return (
    <UnifiedSection
      id={id}
      className={className}
      customBackground={bgColor}
      animation={animationMap[transitionType]}
      width={fullWidth ? "full" : "xl"}
      containerClassName={containerClassName}
      heading={heading}
      subheading={subheading}
      badge={badge}
      headerRef={headingRef}
      prevBgColor={prevBgColor}
    >
      {children}
    </UnifiedSection>
  )
}
