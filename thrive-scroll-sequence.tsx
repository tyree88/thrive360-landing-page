"use client"
import { useScrollSequence } from "./scroll-sequence/useScrollSequence"
import type { ThriveScrollSequenceProps } from "./scroll-sequence/types"
import { cn } from "@/lib/utils"
import PhoneMockup from "./scroll-sequence/PhoneMockup"
import SideContainers from "./scroll-sequence/SideContainers"
import StaticFallback from "./scroll-sequence/StaticFallback"

export type { ScrollSequenceSection } from "./scroll-sequence/types"

export const ThriveScrollSequence = ({
  title,
  subtitle,
  sections,
  className,
  showSideContainers = false,
  centerPhone = true,
}: ThriveScrollSequenceProps & {
  showSideContainers?: boolean
  centerPhone?: boolean
}) => {
  const { refs, prefersReducedMotion } = useScrollSequence(sections)

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
          />
        </div>
      </div>

      {/* Spacer to ensure scrolling works properly with fixed phone */}
      <div className="h-[200vh]"></div>
    </div>
  )
}

export default ThriveScrollSequence
