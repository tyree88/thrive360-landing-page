"use client"

import * as React from "react"
import type { MotionProps, Variants } from "framer-motion"
import { cn } from "@/lib/utils"
import { SolutionElement } from "@/components/sections/solutions/SolutionElement"

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const scale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export type SectionVariant = "default" | "light" | "dark" | "gradient" | "teal" | "purple" | "custom"

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl"

export type SectionWidth = "sm" | "md" | "lg" | "xl" | "full" | "none"

export type SectionAnimation = "fade" | "slide" | "scale" | "none"

export interface UnifiedSectionProps extends React.HTMLAttributes<HTMLElement> {
  // Structure
  children: React.ReactNode
  containerClassName?: string
  contentClassName?: string

  // Styling
  variant?: SectionVariant
  customBackground?: string
  spacing?: SectionSpacing
  width?: SectionWidth
  fullBleed?: boolean

  // Header
  heading?: React.ReactNode
  subheading?: React.ReactNode
  badge?: React.ReactNode
  headerClassName?: string
  headingClassName?: string
  subheadingClassName?: string
  badgeClassName?: string

  // Animation
  animation?: SectionAnimation
  animationDelay?: number
  motionProps?: MotionProps

  // Transitions
  showTransitionTop?: boolean
  showTransitionBottom?: boolean
  prevBgColor?: string
  nextBgColor?: string

  // Patterns
  showPatterns?: boolean
  patternOpacity?: number

  // Refs
  sectionRef?: React.RefObject<HTMLElement>
  headerRef?: React.RefObject<HTMLDivElement>
  contentRef?: React.RefObject<HTMLDivElement>
}

export const UnifiedSection = React.forwardRef<HTMLElement, UnifiedSectionProps>(
  (
    {
      // Structure
      children,
      className,
      containerClassName,
      contentClassName,
      id,

      // Styling
      variant = "default",
      customBackground,
      spacing = "md",
      width = "xl",
      fullBleed = false,

      // Header
      heading,
      subheading,
      badge,
      headerClassName,
      headingClassName,
      subheadingClassName,
      badgeClassName,

      // Animation
      animation = "none",
      animationDelay = 0,
      motionProps,

      // Transitions
      showTransitionTop = false,
      showTransitionBottom = false,
      prevBgColor,
      nextBgColor,

      // Patterns
      showPatterns = false,
      patternOpacity = 0.1,

      // Refs
      sectionRef,
      headerRef,
      contentRef,

      // Rest
      ...props
    },
    ref,
  ) => {
    // Background styles based on variant
    const getBackgroundClasses = () => {
      if (customBackground) return customBackground

      switch (variant) {
        case "light":
          return "bg-thrive-purple-50"
        case "dark":
          return "bg-thrive-purple-900 text-white"
        case "gradient":
          return "bg-gradient-to-b from-thrive-purple-50 to-white"
        case "teal":
          return "bg-thrive-teal-50"
        case "purple":
          return "bg-thrive-purple-100"
        default:
          return "bg-white"
      }
    }

    // Spacing classes
    const getSpacingClasses = () => {
      switch (spacing) {
        case "none":
          return ""
        case "sm":
          return "py-8 md:py-12"
        case "md":
          return "py-16 md:py-24"
        case "lg":
          return "py-20 md:py-32"
        case "xl":
          return "py-24 md:py-40"
        default:
          return "py-16 md:py-24"
      }
    }

    // Width classes
    const getWidthClasses = () => {
      if (fullBleed) return "w-full"

      switch (width) {
        case "sm":
          return "max-w-3xl w-full"
        case "md":
          return "max-w-5xl w-full"
        case "lg":
          return "max-w-7xl w-full"
        case "xl":
          return "max-w-[1600px] w-full"
        case "full":
          return "w-full"
        case "none":
          return "w-full"
        default:
          return "max-w-[1600px] w-full"
      }
    }

    // Animation variants
    const getAnimationVariant = (): Variants => {
      switch (animation) {
        case "fade":
          return fadeIn
        case "slide":
          return slideUp
        case "scale":
          return scale
        default:
          return {}
      }
    }

    // Determine if we should use motion
    const useMotion = animation !== "none"

    // Animation props
    const animationProps = useMotion
      ? {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-100px" },
          variants: getAnimationVariant(),
          transition: { delay: animationDelay },
          ...motionProps,
        }
      : {}

    return (
      <SolutionElement
        ref={sectionRef || ref}
        id={id}
        className={cn(
          "relative w-full flex flex-col items-center justify-center",
          getBackgroundClasses(),
          getSpacingClasses(),
          className,
        )}
        useMotion={useMotion}
        animationProps={animationProps}
        showPatterns={showPatterns}
        patternOpacity={patternOpacity}
        showTransitionTop={showTransitionTop}
        prevBgColor={prevBgColor}
        showTransitionBottom={showTransitionBottom}
        nextBgColor={nextBgColor}
        {...props}
      >
        {/* Container */}
        <div className={cn("relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8", getWidthClasses(), containerClassName)}>
          {/* Header */}
          {(heading || subheading || badge) && (
            <div ref={headerRef} className={cn("mb-12 md:mb-16 text-center w-full", headerClassName)}>
              {badge && (
                <div
                  className={cn(
                    "inline-block px-3 py-1 text-sm font-medium bg-light-purple-100 text-thrive-purple-700 rounded-full mb-4",
                    badgeClassName,
                  )}
                >
                  {badge}
                </div>
              )}

              {heading && (
                <h2
                  className={cn("text-3xl md:text-5xl font-bold text-thrive-purple-800 mb-4 w-full", headingClassName)}
                >
                  {heading}
                </h2>
              )}

              {subheading && (
                <p className={cn("text-xl text-thrive-purple-600 max-w-3xl mx-auto w-full", subheadingClassName)}>
                  {subheading}
                </p>
              )}
            </div>
          )}

          {/* Content */}
          <div ref={contentRef} className={cn("w-full", contentClassName)}>
            {children}
          </div>
        </div>
      </SolutionElement>
    )
  },
)

UnifiedSection.displayName = "UnifiedSection"

export default UnifiedSection
