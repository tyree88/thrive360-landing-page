"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import AnimatedButton from "@/components/ui/animated-button"
import { ROUTES } from "@/lib/constants"

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      id="floatingCTA"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? "visible" : ""}`}
    >
      <AnimatedButton
        href={ROUTES.DEMO}
        variant="gradient"
        size="md"
        icon={<ArrowRight className="h-5 w-5" />}
        className="shadow-lg"
      >
        Book a Demo
      </AnimatedButton>
    </div>
  )
}

export default FloatingCTA
