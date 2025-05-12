"use client"

import React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useTransform, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface GridItemProps {
  children: React.ReactNode
  className?: string
  index: number
  staggerDelay?: number
  scrollProgress?: number
}

const GridItem: React.FC<GridItemProps> = ({
  children,
  className = "",
  index,
  staggerDelay = 0.1,
  scrollProgress = 0,
}) => {
  // Calculate different entrance effects based on index position
  const isEven = index % 2 === 0
  const delay = index * staggerDelay

  // Apply different transforms based on position
  const initialX = isEven ? -20 : 20
  const initialY = index < 4 ? -20 : 20

  // Create motion values
  const scrollMotionValue = useMotionValue(scrollProgress)

  // Set the value when it changes
  useEffect(() => {
    scrollMotionValue.set(scrollProgress)
  }, [scrollProgress, scrollMotionValue])

  // Transform properties controlled by scroll
  const scale = useTransform(scrollMotionValue, [0, 0.3, 1], [0.9, 1, 1])

  const opacity = useTransform(scrollMotionValue, [0, 0.2, 0.3], [0, 0.8, 1])

  const x = useTransform(scrollMotionValue, [0, 0.3], [initialX, 0])

  const y = useTransform(scrollMotionValue, [0, 0.3], [initialY, 0])

  return (
    <motion.div
      className={cn("grid-item relative", className)}
      style={{
        opacity,
        scale,
        x,
        y,
      }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}

interface GridScrollTransitionProps {
  children: React.ReactNode
  columnsSmall?: number
  columnsLarge?: number
  className?: string
  targetRef?: React.RefObject<HTMLElement> // Optional ref to track scroll of a specific element
  gridClassName?: string
  itemClassName?: string
  staggerDelay?: number
}

const GridScrollTransition: React.FC<GridScrollTransitionProps> = ({
  children,
  columnsSmall = 1,
  columnsLarge = 3,
  className = "",
  targetRef,
  gridClassName = "",
  itemClassName = "",
  staggerDelay = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const refElement = targetRef?.current || containerRef.current
      const { top, height } = refElement.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate scroll progress (0 to 1)
      let progress = (windowHeight - top) / (windowHeight + height)
      progress = Math.min(Math.max(progress, 0), 1) // Clamp between 0 and 1

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize

    return () => window.removeEventListener("scroll", handleScroll)
  }, [targetRef])

  // Extract children as an array
  const childrenArray = React.Children.toArray(children)

  return (
    <div ref={containerRef} className={cn("grid-scroll-transition", className)}>
      <div className={cn(`grid grid-cols-${columnsSmall} md:grid-cols-${columnsLarge} gap-4 md:gap-6`, gridClassName)}>
        {childrenArray.map((child, index) => (
          <GridItem
            key={index}
            index={index}
            staggerDelay={staggerDelay}
            scrollProgress={scrollProgress}
            className={itemClassName}
          >
            {child}
          </GridItem>
        ))}
      </div>
    </div>
  )
}

export default GridScrollTransition
