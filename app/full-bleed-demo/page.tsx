"use client"

import { useEffect } from "react"
import IntegratedScrollExpansion from "@/components/integrated-scroll-expansion"
import { SectionContainer } from "@/components/ui/section-container"

export default function FullBleedDemo() {
  useEffect(() => {
    // Reset scroll position when the component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <IntegratedScrollExpansion
      mediaType="video"
      mediaSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1"
      posterSrc="/mental-wellness-platform.png"
      bgImageSrc="/abstract-purple-particles.png"
      title="Thrive With Purpose"
      subtitle="Mental Wellness Platform"
      scrollPrompt="Scroll to explore our platform"
      textBlend={true}
    >
      {/* First section with full-bleed background */}
      <SectionContainer
        fullBleed={true}
        background="bg-gradient-to-b from-thrive-purple-dark to-thrive-purple"
        className="min-h-screen py-20"
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Welcome to Thrive360</h2>
          <p className="text-xl max-w-3xl text-center mb-12">
            Our platform is designed to help you achieve mental wellness through personalized care and support.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Feature {i}</h3>
                <p>A detailed description of this amazing feature that helps users thrive.</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Second section with another full-bleed background */}
      <SectionContainer
        fullBleed={true}
        background="bg-gradient-to-b from-thrive-teal-dark to-thrive-teal"
        className="min-h-screen py-20"
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Approach</h2>
          <p className="text-xl max-w-3xl text-center mb-12">
            We combine cutting-edge technology with evidence-based practices to deliver personalized mental wellness
            solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Methodology {i}</h3>
                <p>A detailed explanation of our approach to mental wellness and how it benefits users.</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Third section with a different full-bleed background */}
      <SectionContainer
        fullBleed={true}
        background="bg-gradient-to-b from-light-purple-800 to-light-purple-600"
        className="min-h-screen py-20"
      >
        <div className="container mx-auto flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Success Stories</h2>
          <p className="text-xl max-w-3xl text-center mb-12">
            See how our platform has helped people improve their mental wellness and overall quality of life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Testimonial {i}</h3>
                <p>"A quote from a satisfied user describing how Thrive360 has positively impacted their life."</p>
                <p className="mt-4 font-medium">- User {i}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </IntegratedScrollExpansion>
  )
}
