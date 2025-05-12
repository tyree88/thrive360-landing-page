"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { UnifiedSection } from "@/components/ui/unified-section"
import { FlowButton } from "@/components/ui/flow-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const CaseStudiesCardSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current || !ctaRef.current) return

    gsap.fromTo(
      [titleRef.current, subtitleRef.current, ctaRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: false,
          toggleActions: "play none none none",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <UnifiedSection
      id="case-studies-card"
      ref={sectionRef}
      variant="light"
      bgClassName="bg-light-purple-50"
      heading="Real Results from Real Organizations"
      headingRef={titleRef}
      subheadingRef={subtitleRef}
      subheading="See how organizations across industries have transformed their approach to mental health."
      badge="Success Stories"
      badgeClassName="bg-light-purple-100 text-thrive-purple-700"
      headingClassName="text-thrive-purple-800"
      subheadingClassName="text-thrive-purple-600"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <motion.div className="bg-white rounded-xl shadow-md p-6 border border-light-purple-100">
          <h3 className="text-xl font-bold mb-2 text-thrive-purple-800">Healthcare Provider</h3>
          <p className="text-sm text-thrive-purple-600">
            Reduced burnout and improved patient care with personalized mental health support.
          </p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-md p-6 border border-light-purple-100">
          <h3 className="text-xl font-bold mb-2 text-thrive-purple-800">Tech Company</h3>
          <p className="text-sm text-thrive-purple-600">
            Improved employee engagement and productivity through targeted wellness programs.
          </p>
        </motion.div>

        <motion.div className="bg-white rounded-xl shadow-md p-6 border border-light-purple-100">
          <h3 className="text-xl font-bold mb-2 text-thrive-purple-800">Financial Services Firm</h3>
          <p className="text-sm text-thrive-purple-600">
            Enhanced stress management and resilience training for high-pressure environments.
          </p>
        </motion.div>
      </div>

      <div ref={ctaRef} className="mt-16 text-center">
        <FlowButton text="View All Case Studies" asLink href="/case-studies" />
      </div>
    </UnifiedSection>
  )
}

export default CaseStudiesCardSection
