"use client"
import { useScrollSequence } from "./useScrollSequence"
import type React from "react"

import type { ThriveScrollSequenceProps } from "./types"
import { cn } from "@/lib/utils"
import PhoneMockup from "./PhoneMockup"
import SideContainers from "./SideContainers"
import StaticFallback from "./StaticFallback"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export type { ScrollSequenceSection } from "./types"

export const ThriveScrollSequence = ({
  title,
  subtitle,
  sections,
  className,
  showSideContainers = false,
  centerPhone = true,
  progressRef,
  lenisInstance,
  sphereInteraction = false,
}: ThriveScrollSequenceProps & {
  showSideContainers?: boolean
  centerPhone?: boolean
  progressRef?: React.RefObject<HTMLDivElement>
  lenisInstance?: any
  sphereInteraction?: boolean
}) => {
  const { refs, prefersReducedMotion, currentSectionIndex } = useScrollSequence(sections, lenisInstance)
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 })

  // Update progress indicators
  useEffect(() => {
    if (progressRef?.current && typeof currentSectionIndex === "number") {
      const indicators = progressRef.current.querySelectorAll("div > div")
      indicators.forEach((indicator, index) => {
        if (index === currentSectionIndex) {
          indicator.classList.remove("bg-gray-300")
          indicator.classList.add("bg-thrive-purple-500")
        } else {
          indicator.classList.remove("bg-thrive-purple-500")
          indicator.classList.add("bg-gray-300")
        }
      })
    }
  }, [currentSectionIndex, progressRef])

  // Track mouse/touch position for light effect when sphere is interacting
  useEffect(() => {
    if (!sphereInteraction) return

    const handleMouseMove = (e: MouseEvent) => {
      setLightPosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setLightPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [sphereInteraction])

  // If reduced motion is preferred, render a static version
  if (prefersReducedMotion) {
    return <StaticFallback title={title} subtitle={subtitle} sections={sections} className={className} />
  }

  return (
    <div ref={refs.containerRef} className={cn("h-[800px] md:h-[1000px] relative overflow-hidden", className)}>
      {/* Background layer with color transitions */}
      <div
        ref={refs.bgRef}
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: sections[0]?.bgColor || "white" }}
      ></div>

      {/* Dynamic light effect that follows the sphere */}
      <AnimatePresence>
        {sphereInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none z-20 mix-blend-plus-lighter"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
              left: lightPosition.x - 150,
              top: lightPosition.y - 150,
            }}
          />
        )}
      </AnimatePresence>

      {/* Container for title and phone mockup with side elements */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center py-10">
        {/* Title section (animates out on scroll) */}
        <div ref={refs.titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">{subtitle}</p>}
        </div>

        {/* Main content area with phone mockup and side containers */}
        <div
          className={cn(
            "relative w-full max-w-6xl flex items-center",
            centerPhone ? "justify-center" : "justify-between",
          )}
        >
          {/* Side containers - only shown if showSideContainers is true */}
          {showSideContainers && <SideContainers leftRef={refs.leftContainerRef} rightRef={refs.rightContainerRef} />}

          {/* Phone mockup - now positioned fixed in the center of the viewport */}
          <PhoneMockup
            sections={sections}
            phoneRef={refs.phoneRef}
            contentContainerRef={refs.contentContainerRef}
            sectionRefs={refs.sectionRefs}
            sectionContentRefs={refs.sectionContentRefs}
            sectionTitleRefs={refs.sectionTitleRefs}
            sectionDescRefs={refs.sectionDescRefs}
            sphereInteraction={sphereInteraction}
          />
        </div>
      </div>

      {/* Scroll indicators on the sides */}
      <TooltipProvider>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSectionIndex ? "bg-thrive-purple-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => {
                      // Scroll to this section
                      const sectionPosition = index * (1 / sections.length)
                      const scrollPosition = refs.containerRef.current?.offsetTop || 0
                      const scrollAmount =
                        scrollPosition + (refs.containerRef.current?.offsetHeight || 0) * sectionPosition

                      if (lenisInstance) {
                        lenisInstance.scrollTo(scrollAmount, { duration: 1.2 })
                      } else {
                        window.scrollTo({
                          top: scrollAmount,
                          behavior: "smooth",
                        })
                      }
                    }}
                    aria-label={`View ${section.title}`}
                  />
                </TooltipTrigger>
                <TooltipContent side="left">{section.title}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </TooltipProvider>

      {/* Spacer to ensure scrolling works properly with fixed phone */}
      <div className="h-[200vh]"></div>
    </div>
  )
}

export default ThriveScrollSequence
