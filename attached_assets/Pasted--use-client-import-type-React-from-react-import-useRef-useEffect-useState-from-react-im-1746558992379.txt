"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { ScrollSequenceSection } from "./types"

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollSequenceRefs {
  containerRef: React.RefObject<HTMLDivElement>
  bgRef: React.RefObject<HTMLDivElement>
  titleRef: React.RefObject<HTMLDivElement>
  phoneRef: React.RefObject<HTMLDivElement>
  leftContainerRef: React.RefObject<HTMLDivElement>
  rightContainerRef: React.RefObject<HTMLDivElement>
  contentContainerRef: React.RefObject<HTMLDivElement>
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  sectionContentRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  sectionTitleRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  sectionDescRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

export const useScrollSequence = (sections: ScrollSequenceSection[]) => {
  // Create refs for all elements that will be animated
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const rightContainerRef = useRef<HTMLDivElement>(null)
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionContentRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionTitleRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionDescRefs = useRef<(HTMLDivElement | null)[]>([])

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Main animation setup
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || typeof window === "undefined") return

    // Ensure refs arrays are the right length
    sectionRefs.current = sectionRefs.current.slice(0, sections.length)
    sectionContentRefs.current = sectionContentRefs.current.slice(0, sections.length)
    sectionTitleRefs.current = sectionTitleRefs.current.slice(0, sections.length)
    sectionDescRefs.current = sectionDescRefs.current.slice(0, sections.length)

    while (sectionRefs.current.length < sections.length) {
      sectionRefs.current.push(null)
      sectionContentRefs.current.push(null)
      sectionTitleRefs.current.push(null)
      sectionDescRefs.current.push(null)
    }

    // Clear existing ScrollTrigger instances
    const triggers = ScrollTrigger.getAll().filter((trigger) => trigger.vars.trigger === containerRef.current)
    triggers.forEach((trigger) => trigger.kill())

    // Position the phone in the center of the viewport initially - completely stationary
    if (phoneRef.current) {
      gsap.set(phoneRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: 50,
      })
    }

    // Hide title initially if we're starting with the phone centered
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        opacity: 0,
        y: -50,
      })
    }

    // Set up the main timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start at the top of the container
        end: `bottom+=${sections.length * 100}%`, // Extend the end point for smoother scrolling
        pin: true,
        pinSpacing: true,
        scrub: 0.7, // Smoother scrubbing
        id: "scroll-sequence",
        markers: false, // Set to true for debugging
      },
    })

    // Define different transition types for variety
    const transitions = [
      // Slide from right with 3D perspective
      {
        enter: (el: HTMLElement) => {
          gsap.set(el, {
            opacity: 0,
            x: 50,
            rotationY: 15,
            transformPerspective: 600,
            transformOrigin: "left center",
          })
        },
        show: (el: HTMLElement, duration = 0.5) => {
          gsap.to(el, {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration,
            ease: "power2.out",
          })
        },
        hide: (el: HTMLElement, duration = 0.5) => {
          gsap.to(el, {
            opacity: 0,
            x: -50,
            rotationY: -15,
            duration,
            ease: "power2.in",
          })
        },
      },
      // Zoom in from center
      {
        enter: (el: HTMLElement) => {
          gsap.set(el, {
            opacity: 0,
            scale: 0.8,
            transformOrigin: "center center",
          })
        },
        show: (el: HTMLElement, duration = 0.5) => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration,
            ease: "back.out(1.2)",
          })
        },
        hide: (el: HTMLElement, duration = 0.5) => {
          gsap.to(el, {
            opacity: 0,
            scale: 1.1,
            duration,
            ease: "power1.in",
          })
        },
      },
      // Slide from bottom with fade
      {
        enter: (el: HTMLElement) => {
          gsap.set(el, {
            opacity: 0,
            y: 40,
          })
        },
        show: (el: HTMLElement, duration = 0.5) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            ease: "power3.out",
          })
        },
        hide: (el: HTMLElement, duration = 0.5) => {
          gsap.to(el, {
            opacity: 0,
            y: -40,
            duration,
            ease: "power3.in",
          })
        },
      },
    ]

    // Enhanced section content animations
    sections.forEach((section, index) => {
      const sectionRef = sectionRefs.current[index]
      const sectionContentRef = sectionContentRefs.current[index]
      const sectionTitleRef = sectionTitleRefs.current[index]
      const sectionDescRef = sectionDescRefs.current[index]
      const nextIndex = index + 1
      const nextSection = sections[nextIndex]

      // Skip if the section ref is not available
      if (!sectionRef) return

      // Position in the timeline
      const position = index * (1 / sections.length)

      // Choose a transition style based on index (cycle through them)
      const transitionStyle = transitions[index % transitions.length]

      // Set initial state for all sections
      if (sectionRef) {
        gsap.set(sectionRef, { opacity: index === 0 ? 1 : 0 })
      }

      // Set initial states for section elements
      if (sectionTitleRef) {
        transitionStyle.enter(sectionTitleRef)
        if (index === 0) {
          transitionStyle.show(sectionTitleRef, 0)
        }
      }

      if (sectionDescRef) {
        transitionStyle.enter(sectionDescRef)
        if (index === 0) {
          transitionStyle.show(sectionDescRef, 0)
        }
      }

      if (sectionContentRef) {
        transitionStyle.enter(sectionContentRef)
        if (index === 0) {
          transitionStyle.show(sectionContentRef, 0)
        }
      }

      // Animate section in
      if (index > 0) {
        // Fade in the section container
        tl.to(
          sectionRef,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power1.inOut",
          },
          position,
        )

        // Staggered animations for section elements
        if (sectionTitleRef) {
          tl.add(() => transitionStyle.show(sectionTitleRef, 0.6), position + 0.05)
        }

        if (sectionDescRef) {
          tl.add(() => transitionStyle.show(sectionDescRef, 0.6), position + 0.1)
        }

        if (sectionContentRef) {
          tl.add(() => transitionStyle.show(sectionContentRef, 0.6), position + 0.15)
        }
      }

      // Animate section out (except the last one)
      if (index < sections.length - 1) {
        // Staggered animations for section elements going out
        if (sectionContentRef) {
          tl.add(() => transitionStyle.hide(sectionContentRef, 0.5), position + 1 / sections.length - 0.25)
        }

        if (sectionDescRef) {
          tl.add(() => transitionStyle.hide(sectionDescRef, 0.5), position + 1 / sections.length - 0.2)
        }

        if (sectionTitleRef) {
          tl.add(() => transitionStyle.hide(sectionTitleRef, 0.5), position + 1 / sections.length - 0.15)
        }

        // Fade out the section container
        tl.to(
          sectionRef,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
          },
          position + 1 / sections.length - 0.1,
        )
      }

      // Change background color with a smoother transition
      if (nextSection && bgRef.current) {
        tl.to(
          bgRef.current,
          {
            backgroundColor: nextSection.bgColor,
            duration: 0.8,
            ease: "power1.inOut",
          },
          position + 1 / sections.length - 0.25,
        )
      }
    })

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === "scroll-sequence") {
          trigger.kill()
        }
      })

      // Reset phone position
      if (phoneRef.current) {
        gsap.set(phoneRef.current, {
          clearProps: "all",
        })
      }
    }
  }, [sections, prefersReducedMotion])

  const refs: ScrollSequenceRefs = {
    containerRef,
    bgRef,
    titleRef,
    phoneRef,
    leftContainerRef,
    rightContainerRef,
    contentContainerRef,
    sectionRefs,
    sectionContentRefs,
    sectionTitleRefs,
    sectionDescRefs,
  }

  return { refs, prefersReducedMotion }
}
