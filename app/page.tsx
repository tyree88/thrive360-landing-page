import IntegratedScrollExpansion from "@/components/integrated-scroll-expansion"
import AlternativeHeroSection from "@/components/sections/AlternativeHeroSection"
import ProblemSection from "@/components/sections/ProblemSection"
import SolutionsSection from "@/components/sections/SolutionsSection"
import BusinessCaseStudiesSection from "@/components/sections/BusinessCaseStudiesSection"
import CaseStudiesCardSection from "@/components/sections/CaseStudiesCardSection"
import MultiDeviceSection from "@/components/sections/MultiDeviceSection"
import ImpactSection from "@/components/sections/ImpactSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import CTASection from "@/components/sections/CTASection"
import { SectionContainer } from "@/components/ui/section-container"
import { SuccessStoriesSection } from "@/components/sections/SuccessStoriesSection"

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <IntegratedScrollExpansion
        mediaType="video"
        mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1" // Replace with your actual video URL
        posterSrc="/mental-wellness-platform.png"
        bgImageSrc="/abstract-purple-particles.png"
        title="Thrive With Purpose"
        subtitle="Mental Wellness Platform"
        scrollPrompt="Scroll to explore our platform"
        textBlend={true}
      >
        {/* Hero Section with AuroraBackground */}
        <SectionContainer
          fullBleed={true}
          className="min-h-screen w-full"
          background="bg-transparent" // Keep transparent to let AuroraBackground show
          preserveScrollTrigger={true} // Add this to ensure scroll animations work
        >
          <AlternativeHeroSection />
        </SectionContainer>

        {/* Problem Section with full-bleed background */}
        <SectionContainer
          fullBleed={true}
          className="min-h-screen w-full"
          background="bg-gradient-to-b from-slate-950 to-indigo-950/30" // Add the gradient directly to the section
          preserveScrollTrigger={true} // Preserve the ScrollTrigger functionality
        >
          <ProblemSection />
        </SectionContainer>

        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-thrive-purple to-thrive-teal-dark"
          className="min-h-screen w-full"
          preserveScrollTrigger={true} // Add this line to preserve ScrollTrigger functionality
        >
          <SolutionsSection />
        </SectionContainer>

        {/* Add the new BusinessCaseStudiesSection */}
        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-slate-900 to-purple-950/70"
          className="min-h-screen w-full"
          preserveScrollTrigger={true}
        >
          <BusinessCaseStudiesSection />
        </SectionContainer>

        {/* Add the MultiDeviceSection with appropriate styling */}
        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-[#efe9ff] to-[#f5f5ff]"
          className="min-h-[300vh] w-full" // Match the original min-height
          preserveScrollTrigger={true}
        >
          <MultiDeviceSection />
        </SectionContainer>

        {/* Add the CaseStudiesCardSection with appropriate styling */}
        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-[#f5f5ff] to-[#e9f5ff]"
          className="min-h-screen w-full"
          preserveCarousel={true}
        >
          <CaseStudiesCardSection />
        </SectionContainer>

        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-[#e9f5ff] to-light-purple-800"
          className="min-h-screen w-full"
        >
          <SuccessStoriesSection />
        </SectionContainer>

        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-light-purple-800 to-light-purple-600"
          className="min-h-screen w-full"
        >
          <ImpactSection />
        </SectionContainer>

        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-thrive-purple to-thrive-purple-dark"
          className="min-h-screen w-full"
        >
          <TestimonialsSection />
        </SectionContainer>

        <SectionContainer
          fullBleed={true}
          background="bg-gradient-to-b from-thrive-teal to-thrive-teal-dark"
          className="min-h-screen w-full"
        >
          <CTASection />
        </SectionContainer>
      </IntegratedScrollExpansion>
    </div>
  )
}
