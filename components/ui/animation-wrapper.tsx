"use client"

import type React from "react"
import { useEffect, useState, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import Observer from "gsap/Observer"
import type Lenis from "@studio-freight/lenis"
import { useLenis } from "@/hooks/useLenis"

interface AnimationWrapperProps {
  children: ReactNode
  smoothScroll?: boolean
  smoothScrollConfig?: Partial<Lenis>
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  smoothScroll = true,
  smoothScrollConfig = {},
}) => {
  const [isClient, setIsClient] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Create Lenis smooth scrolling when component mounts
  const { lenis } = useLenis(
    smoothScroll
      ? {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          smoothTouch: false,
          ...smoothScrollConfig,
        }
      : undefined,
  )

  // Register GSAP plugins on client-side only
  useEffect(() => {
    setIsClient(true)

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer)
    }

    return () => {
      // Clean up all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [pathname])

  // Add a separate effect for Lenis integration to avoid dependency issues
  useEffect(() => {
    if (!isClient || !lenis || !smoothScroll) return

    // Connect GSAP ScrollTrigger with Lenis for smooth scrolling
    const scrollHandler = () => ScrollTrigger.update()
    lenis.on("scroll", scrollHandler)

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", scrollHandler)
      gsap.ticker.remove(tickerHandler)
    }
  }, [isClient, lenis, smoothScroll])

  // Handle navigation - reset scroll position and update ScrollTrigger
  useEffect(() => {
    if (!isClient) return

    const handleRouteChange = () => {
      // Reset scroll position
      window.scrollTo(0, 0)

      // Refresh all ScrollTrigger instances
      ScrollTrigger.refresh()
    }

    handleRouteChange()
  }, [isClient, pathname])

  return (
    <div ref={scrollRef} className="w-full overflow-x-hidden">
      {children}
    </div>
  )
}

export default AnimationWrapper
