"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === "undefined") return

    // Initial check
    setIsMobile(window.innerWidth < 768)

    // Add event listener for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}

// Also export as default for backward compatibility
export default useMobile
