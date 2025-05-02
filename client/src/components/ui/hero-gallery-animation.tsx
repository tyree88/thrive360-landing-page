"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
      `,
        fourCells: `
        grid-cols-3 grid-rows-2
        [&>*:first-child]:col-span-1
        [&>*:nth-child(2)]:col-span-2
        [&>*:nth-child(3)]:col-span-2
      `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ScrollContextType = {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}

const ScrollContext = React.createContext<ScrollContextType | null>(null)

const useScrollContext = () => {
  const context = React.useContext(ScrollContext)
  if (!context) {
    throw new Error("useScrollContext must be used within a ContainerScroll")
  }
  return context
}

export interface ContainerScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ContainerScroll = ({
  children,
  className,
  ...props
}: ContainerScrollProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={containerRef}
        className={cn("relative min-h-[300vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  )
}

export interface BentoGridProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>
(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  )
})
BentoGrid.displayName = "BentoGrid"

export interface BentoCellProps extends React.HTMLAttributes<HTMLDivElement> {}

const BentoCell = React.forwardRef<HTMLDivElement, BentoCellProps>
(({ className, children, ...props }, ref) => {
  const { scrollYProgress } = useScrollContext()
  const y = useTransform(scrollYProgress, [0, 0.9], ["30%", "0%"])
  const scale = useTransform(scrollYProgress, [0, 0.9], [0.8, 1])
  
  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden rounded-xl", className)}
      style={{ y, scale }}
      {...props}
    >
      {children}
    </motion.div>
  )
})
BentoCell.displayName = "BentoCell"

export interface ContainerScaleProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContainerScale = React.forwardRef<HTMLDivElement, ContainerScaleProps>
(({ className, children, ...props }, ref) => {
  const { scrollYProgress } = useScrollContext()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{
        opacity,
        scale
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
})
ContainerScale.displayName = "ContainerScale"

export { ContainerScroll, BentoGrid, BentoCell, ContainerScale }
