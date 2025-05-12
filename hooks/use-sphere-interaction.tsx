"use client"

import { useState, useEffect, type RefObject } from "react"

interface UseSphereInteractionOptions {
  threshold?: number
  onEnter?: () => void
  onLeave?: () => void
}

export function useSphereInteraction(elementRef: RefObject<HTMLElement>, options: UseSphereInteractionOptions = {}) {
  const [isInteracting, setIsInteracting] = useState(false)
  const [spherePosition, setSpherePosition] = useState({ x: 0, y: 0 })
  const { threshold = 300, onEnter, onLeave } = options

  useEffect(() => {
    if (!elementRef.current) return

    // Function to check if sphere is near the element
    const checkSphereProximity = () => {
      // Get the sphere element
      const sphere = document.querySelector(".sphere-element") as HTMLElement
      if (!sphere || !elementRef.current) return

      // Get positions
      const sphereRect = sphere.getBoundingClientRect()
      const elementRect = elementRef.current.getBoundingClientRect()

      // Calculate center points
      const sphereCenter = {
        x: sphereRect.left + sphereRect.width / 2,
        y: sphereRect.top + sphereRect.height / 2,
      }

      const elementCenter = {
        x: elementRect.left + elementRect.width / 2,
        y: elementRect.top + elementRect.height / 2,
      }

      // Calculate distance between centers
      const distance = Math.sqrt(
        Math.pow(sphereCenter.x - elementCenter.x, 2) + Math.pow(sphereCenter.y - elementCenter.y, 2),
      )

      // Update state based on proximity
      const isNear = distance < threshold
      if (isNear !== isInteracting) {
        setIsInteracting(isNear)
        if (isNear) {
          onEnter?.()
        } else {
          onLeave?.()
        }
      }

      // Update sphere position
      setSpherePosition(sphereCenter)
    }

    // Set up scroll and animation frame listeners
    let animationFrameId: number
    const onScroll = () => {
      animationFrameId = requestAnimationFrame(checkSphereProximity)
    }

    window.addEventListener("scroll", onScroll)
    const interval = setInterval(checkSphereProximity, 100) // Regular checks for non-scroll updates

    // Initial check
    checkSphereProximity()

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(animationFrameId)
      clearInterval(interval)
    }
  }, [elementRef, threshold, isInteracting, onEnter, onLeave])

  return { isInteracting, spherePosition }
}
