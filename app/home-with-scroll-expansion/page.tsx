"use client"

import { useEffect } from "react"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"
import HeroSection from "@/components/sections/HeroSection"
import ProblemSection from "@/components/sections/ProblemSection"
import SolutionSection from "@/components/sections/SolutionSection"
import ImpactSection from "@/components/sections/ImpactSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import CTASection from "@/components/sections/CTASection"

export default function HomeWithScrollExpansion() {
  useEffect(() => {
    // Reset scroll position when the page loads
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1" // Replace with your video URL
        posterSrc="/abstract-digital-wellness.png" // Replace with your poster image
        bgImageSrc="/abstract-purple-gradient.png" // Replace with your background image
        title="Thrive With Purpose"
        date="Mental Wellness Platform"
        scrollToExpand="Scroll to explore our platform"
        textBlend={true}
      >
        {/* Your existing sections will be rendered here once the media is expanded */}
        <div className="space-y-0">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <ImpactSection />
          <TestimonialsSection />
          <CTASection />
        </div>
      </ScrollExpandMedia>
    </div>
  )
}
