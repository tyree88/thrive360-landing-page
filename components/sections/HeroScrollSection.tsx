"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { ScrollAndSwapText } from "@/components/ui/scroll-and-swap-text"
import { Brain, TrendingUp, Heart } from "lucide-react"

interface HeroScrollSectionProps {
  className?: string
}

const HeroScrollSection: React.FC<HeroScrollSectionProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Setup smooth scrolling behavior
  useEffect(() => {
    if (!containerRef.current) return

    // Simple smooth scrolling function
    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault()

      const scrollAmount = e.deltaY
      const currentScroll = containerRef.current!.scrollTop
      const containerHeight = containerRef.current!.clientHeight

      // Calculate the nearest snap point
      const snapPoints = Math.floor(sectionRef.current?.children.length || 0)
      const currentSection = Math.round(currentScroll / containerHeight)
      let targetSection = currentSection

      // Determine direction and target section
      if (scrollAmount > 0 && currentSection < snapPoints - 1) {
        targetSection = currentSection + 1
      } else if (scrollAmount < 0 && currentSection > 0) {
        targetSection = currentSection - 1
      }

      // Scroll to the target section
      containerRef.current!.scrollTo({
        top: targetSection * containerHeight,
        behavior: "smooth",
      })
    }

    containerRef.current.addEventListener("wheel", smoothScroll, { passive: false })

    return () => {
      containerRef.current?.removeEventListener("wheel", smoothScroll)
    }
  }, [])

  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-b from-thrive-purple-darker to-thrive-purple-dark overflow-hidden ${
        className || ""
      }`}
    >
      <div
        ref={containerRef}
        className="w-full h-screen overflow-auto snap-y snap-mandatory relative hide-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        <div ref={sectionRef} className="w-full flex flex-col">
          {/* First section */}
          <div className="h-screen w-full flex items-center justify-center snap-start">
            <div className="text-center max-w-3xl mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <ScrollAndSwapText
                  label="Your wellbeing solutions aren't cutting it."
                  offset={["0 0.1", "0 0.3"]}
                  className="font-bold"
                  containerRef={containerRef}
                />
              </h2>
              <p className="text-xl text-gray-300">
                Scroll to discover why most solutions fail and how Thrive360 is different.
              </p>
            </div>
          </div>

          {/* Second section - Stat 1 */}
          <div className="h-screen w-full flex items-center justify-center snap-start bg-gradient-to-br from-thrive-purple-dark to-thrive-purple">
            <div className="text-center max-w-3xl mx-auto px-6">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <ScrollAndSwapText
                  label="76% of employees experience burnout"
                  offset={["0 0.1", "0 0.3"]}
                  className="font-bold"
                  containerRef={containerRef}
                />
              </h2>
              <p className="text-xl text-gray-300">
                Traditional wellness programs aren't designed to address the root cause of mental health challenges.
              </p>
            </div>
          </div>

          {/* Third section - Stat 2 */}
          <div className="h-screen w-full flex items-center justify-center snap-start bg-gradient-to-br from-thrive-purple to-thrive-blue">
            <div className="text-center max-w-3xl mx-auto px-6">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <ScrollAndSwapText
                  label="91% of programs lack measurable outcomes"
                  offset={["0 0.1", "0 0.3"]}
                  className="font-bold"
                  containerRef={containerRef}
                />
              </h2>
              <p className="text-xl text-gray-300">
                Most solutions can't demonstrate real, measurable improvements in mental health and performance.
              </p>
            </div>
          </div>

          {/* Fourth section - Stat 3 */}
          <div className="h-screen w-full flex items-center justify-center snap-start bg-gradient-to-br from-thrive-blue to-thrive-blue-light">
            <div className="text-center max-w-3xl mx-auto px-6">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <ScrollAndSwapText
                  label="Thrive360 delivers 83% engagement"
                  offset={["0 0.1", "0 0.3"]}
                  className="font-bold"
                  containerRef={containerRef}
                />
              </h2>
              <p className="text-xl text-gray-300">
                Our neuroplastic approach creates lasting change through personalized, science-backed interventions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroScrollSection
