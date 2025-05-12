"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const TRANSITION_CONFIG = {
  duration: 0.6,
  ease: [0.4, 0.0, 0.2, 1],
  transition: "0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
} as const

const TRANSFORM_STYLES: React.CSSProperties = {
  transformStyle: "preserve-3d",
  perspective: "1200px",
  backfaceVisibility: "hidden",
}

type FlipDirection = "horizontal" | "vertical"
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  flipDirection?: FlipDirection
  initialFlipped?: boolean
  onFlip?: (isFlipped: boolean) => void
  disabled?: boolean
}
interface FlipCardContextValue {
  isFlipped: boolean
  flipDirection: FlipDirection
  disabled?: boolean
}

const FlipCardContext = React.createContext<FlipCardContextValue | undefined>(undefined)
function useFlipCardContext() {
  const context = React.useContext(FlipCardContext)
  if (!context) {
    throw new Error("useFlipCardContext must be used within a FlipCard")
  }
  return context
}

const FlipCard = React.memo(
  React.forwardRef<HTMLDivElement, FlipCardProps>(
    ({ className, flipDirection = "horizontal", initialFlipped = false, onFlip, disabled, ...props }, ref) => {
      const [isFlipped, setIsFlipped] = React.useState(initialFlipped)
      const containerRef = useRef<HTMLDivElement>(null)

      // Use ScrollTrigger to control the flip animation
      useEffect(() => {
        if (typeof window === "undefined" || !containerRef.current) return

        const container = containerRef.current

        // Create a timeline for the flip animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 70%", // Start when the top of the container is 70% from the top of the viewport
            end: "bottom 30%", // End when the bottom of the container is 30% from the top of the viewport
            scrub: true, // Smooth scrubbing effect tied to scroll position
            markers: process.env.NODE_ENV === "development", // Show markers in development mode
            onEnter: () => {
              setIsFlipped(true)
              onFlip?.(true)
            },
            onLeaveBack: () => {
              setIsFlipped(false)
              onFlip?.(false)
            },
          },
        })

        // Clean up ScrollTrigger on component unmount
        return () => {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill()
          }
        }
      }, [onFlip])

      const contextValue = React.useMemo(
        () => ({ isFlipped, flipDirection, disabled }),
        [isFlipped, flipDirection, disabled],
      )

      return (
        <FlipCardContext.Provider value={contextValue}>
          <div
            ref={(node) => {
              // Handle both refs
              if (typeof ref === "function") {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
              containerRef.current = node
            }}
            className={cn(
              "relative border-none bg-none shadow-none w-[280px] h-[560px] p-4 flex-shrink-0",
              disabled && "pointer-events-none",
              className,
            )}
            style={{
              ...TRANSFORM_STYLES,
              ...props.style,
            }}
            role="region"
            aria-live="polite"
            aria-pressed={isFlipped}
            {...props}
          />
        </FlipCardContext.Provider>
      )
    },
  ),
)
FlipCard.displayName = "FlipCard"

const FlipCardFront = React.memo(
  React.forwardRef<HTMLDivElement, React.ComponentProps<typeof motion.div>>(({ className, ...props }, ref) => {
    const { isFlipped, flipDirection } = useFlipCardContext()

    const rotation = React.useMemo(() => {
      if (!isFlipped) return { rotateX: 0, rotateY: 0 }
      return flipDirection === "horizontal" ? { rotateY: -180, rotateX: 0 } : { rotateX: -180, rotateY: 0 }
    }, [isFlipped, flipDirection])

    return (
      <motion.div
        ref={ref}
        className={cn("absolute inset-0 z-20 size-full overflow-hidden rounded-3xl bg-white shadow-lg", className)}
        initial={false}
        animate={rotation}
        transition={TRANSITION_CONFIG}
        style={{
          ...TRANSFORM_STYLES,
          ...props.style,
        }}
        {...props}
      />
    )
  }),
)
FlipCardFront.displayName = "FlipCardFront"

const FlipCardBack = React.memo(
  React.forwardRef<HTMLDivElement, React.ComponentProps<typeof motion.div>>(({ className, ...props }, ref) => {
    const { isFlipped, flipDirection } = useFlipCardContext()

    const rotation = React.useMemo(() => {
      if (isFlipped) return { rotateX: 0, rotateY: 0 }
      return flipDirection === "horizontal" ? { rotateY: 180, rotateX: 0 } : { rotateX: 180, rotateY: 0 }
    }, [isFlipped, flipDirection])

    return (
      <motion.div
        ref={ref}
        className={cn(
          "absolute inset-0 z-10 size-full rounded-3xl bg-gradient-to-br from-thrive-purple-600 to-thrive-purple-800 shadow-lg",
          className,
        )}
        initial={false}
        animate={rotation}
        transition={TRANSITION_CONFIG}
        style={{
          ...TRANSFORM_STYLES,
          ...props.style,
        }}
        {...props}
      />
    )
  }),
)
FlipCardBack.displayName = "FlipCardBack"

export { FlipCard, FlipCardFront, FlipCardBack }
