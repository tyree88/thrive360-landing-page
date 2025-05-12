"use client"

import { useState, useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"

interface LenisOptions {
  duration?: number
  easing?: (t: number) => number
  orientation?: "vertical" | "horizontal"
  gestureOrientation?: "vertical" | "horizontal"
  smoothWheel?: boolean
  smoothTouch?: boolean
  touchMultiplier?: number
  wheelMultiplier?: number
}

export function useLenis(options?: LenisOptions) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const reqIdRef = useRef<number | null>(null)
  const optionsRef = useRef(options)

  useEffect(() => {
    // Only update the ref if options actually changed
    if (JSON.stringify(optionsRef.current) !== JSON.stringify(options)) {
      optionsRef.current = options
    }
  }, [options])

  useEffect(() => {
    if (!optionsRef.current) return

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      ...optionsRef.current,
    })

    setLenis(lenisInstance)

    function raf(time: number) {
      lenisInstance.raf(time)
      reqIdRef.current = requestAnimationFrame(raf)
    }

    reqIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (reqIdRef.current) {
        cancelAnimationFrame(reqIdRef.current)
        reqIdRef.current = null
      }
      lenisInstance.destroy()
      setLenis(null)
    }
  }, []) // Empty dependency array to run only once

  return { lenis }
}
