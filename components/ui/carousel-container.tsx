"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface CarouselContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * A container component that ensures carousels work properly within the scroll expansion layout
 * This component handles any special positioning or styling needed for carousels
 */
export const CarouselContainer: React.FC<CarouselContainerProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This effect can be used to reinitialize carousels if needed
    // after the scroll expansion animation completes
    const container = containerRef.current
    if (!container) return

    // You might need to dispatch a resize event to ensure the carousel recalculates its dimensions
    const resizeEvent = new Event("resize")
    window.dispatchEvent(resizeEvent)

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("w-full max-w-full overflow-visible", className)}>
      {children}
    </div>
  )
}
