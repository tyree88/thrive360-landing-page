"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Hook for fading in elements when they enter the viewport
export const useFadeIn = (
  options: {
    trigger?: string | Element | null
    start?: string
    end?: string
    markers?: boolean
    duration?: number
    y?: number
    delay?: number
    stagger?: number
    once?: boolean
  } = {},
) => {
  const {
    trigger = null,
    start = "top 80%",
    end = "bottom 20%",
    markers = false,
    duration = 0.6,
    y = 20,
    delay = 0,
    stagger = 0.1,
    once = true,
  } = options

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const triggerElement = trigger || ref.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        markers,
        once,
      },
    })

    tl.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
      },
    )

    return () => {
      tl.kill()
    }
  }, [trigger, start, end, markers, duration, y, delay, once])

  return ref
}

// Hook for creating a sequence of animations
export const useSequence = (
  options: {
    trigger?: string | Element | null
    selector?: string
    start?: string
    end?: string
    markers?: boolean
    duration?: number
    y?: number
    stagger?: number
    once?: boolean
  } = {},
) => {
  const {
    trigger = null,
    selector = ".animate-item",
    start = "top 80%",
    end = "bottom 20%",
    markers = false,
    duration = 0.6,
    y = 20,
    stagger = 0.1,
    once = true,
  } = options

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const triggerElement = trigger || ref.current
    const items = ref.current.querySelectorAll(selector)

    if (items.length === 0) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        markers,
        once,
      },
    })

    tl.fromTo(
      items,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power2.out",
      },
    )

    return () => {
      tl.kill()
    }
  }, [trigger, selector, start, end, markers, duration, y, stagger, once])

  return ref
}

// Hook for parallax effects
export const useParallax = (
  options: {
    trigger?: string | Element | null
    speed?: number
    direction?: "vertical" | "horizontal"
    start?: string
    end?: string
  } = {},
) => {
  const { trigger = null, speed = 0.5, direction = "vertical", start = "top bottom", end = "bottom top" } = options

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const triggerElement = trigger || ref.current

    gsap.to(ref.current, {
      y: direction === "vertical" ? window.innerHeight * speed * -1 : 0,
      x: direction === "horizontal" ? window.innerWidth * speed * -1 : 0,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub: true,
      },
    })
  }, [trigger, speed, direction, start, end])

  return ref
}

export default {
  useFadeIn,
  useSequence,
  useParallax,
}
