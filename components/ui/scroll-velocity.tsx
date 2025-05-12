"use client"

import * as React from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollVelocityProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[] | string
  velocity: number
  movable?: boolean
  clamp?: boolean
  pauseOnHover?: boolean
}

const ScrollVelocity = React.forwardRef<HTMLDivElement, ScrollVelocityProps>(
  ({ children, velocity = 5, movable = true, clamp = false, pauseOnHover = false, className, ...props }, ref) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 100,
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 10000], [0, 5], {
      clamp,
    })

    const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`)

    const directionFactor = React.useRef<number>(1)
    const scrollThreshold = React.useRef<number>(5)
    const [isPaused, setIsPaused] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)

    useAnimationFrame((t, delta) => {
      if (isPaused) return

      if (movable) {
        move(delta)
      } else {
        if (Math.abs(scrollVelocity.get()) >= scrollThreshold.current) {
          move(delta)
        }
      }
    })

    function move(delta: number) {
      let moveBy = directionFactor.current * velocity * (delta / 1000)
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      if (pauseOnHover) {
        // Add a small delay before pausing to make it feel smoother
        setTimeout(() => {
          setIsPaused(true)
        }, 50)
      }
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      if (pauseOnHover) {
        // Add a small delay before resuming to make it feel smoother
        setTimeout(() => {
          setIsPaused(false)
        }, 50)
      }
    }

    return (
      <motion.div
        ref={ref}
        className={cn("relative m-0 flex flex-nowrap overflow-hidden whitespace-nowrap", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          scale: isHovered ? 0.99 : 1,
        }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <motion.div
          className="flex flex-row flex-nowrap whitespace-nowrap *:mr-6"
          style={{ x }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          {typeof children === "string" ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx}>{children}</span>
              ))}
            </>
          ) : (
            children
          )}
        </motion.div>
      </motion.div>
    )
  },
)
ScrollVelocity.displayName = "ScrollVelocity"

export { ScrollVelocity, type ScrollVelocityProps }
