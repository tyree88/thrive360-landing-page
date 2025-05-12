"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import ThriveScrollSequence, { type ScrollSequenceSection } from "./ThriveScrollSequence"
import PersonalizedAssessmentContent from "./content/PersonalizedAssessmentContent"
import TreatmentPlanContent from "./content/TreatmentPlanContent"
import SupportContent from "./content/SupportContent"
import ExampleContent from "./content/ExampleContent"
import { useParallax } from "@/hooks/use-animation"
import gsap from "gsap"
import ScrollParallax from "@/components/ui/scroll-parallax"
import { useLenis } from "@/hooks/useLenis"
import { motion, useScroll, useTransform } from "framer-motion"

export const MultiStageScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // Get Lenis instance for smooth scrolling integration
  const { lenis } = useLenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    smoothTouch: false,
  })

  // Track if the section is in view for sphere interaction
  const [isInView, setIsInView] = useState(false)

  // Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Apply parallax effect to background elements
  useParallax(".parallax-bg", {
    speed: -10,
    start: "top bottom",
    end: "bottom top",
  })

  // Animation for section heading and sphere interaction
  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setIsInView(true),
        onLeave: () => setIsInView(false),
        onEnterBack: () => setIsInView(true),
        onLeaveBack: () => setIsInView(false),
        once: false,
      },
    })

    tl.fromTo(headingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }).fromTo(
      subheadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4",
    )

    // Create glow effect that follows the sphere when in view
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }

    return () => {
      // Clean up
      if (tl) tl.kill()
    }
  }, [])

  // Define the content sections with their titles, descriptions, and background colors
  const sections: ScrollSequenceSection[] = [
    {
      title: "Personalized Assessment",
      description: "Complete a comprehensive assessment to understand your needs",
      bgColor: "rgba(219, 234, 254, 0.8)", // Light blue
      content: <PersonalizedAssessmentContent />,
    },
    {
      title: "Custom Treatment Plan",
      description: "Receive a tailored plan designed for your specific goals",
      bgColor: "rgba(220, 252, 231, 0.8)", // Light green
      content: <TreatmentPlanContent />,
    },
    {
      title: "24/7 Support",
      description: "Access continuous guidance and resources on your journey",
      bgColor: "rgba(243, 232, 255, 0.8)", // Light purple
      content: <SupportContent />,
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvements and celebrate milestones",
      bgColor: "rgba(254, 242, 232, 0.8)", // Light orange
      content: <ExampleContent />,
    },
  ]

  // Transform values for interactive elements based on scroll
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const glowScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1.2, 1.2, 0.8])

  return (
    <div ref={sectionRef} className="w-full relative">
      {/* Glow effect that interacts with the sphere */}
      <motion.div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-0"
        style={{
          opacity: glowOpacity,
          scale: glowScale,
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-thrive-purple-light/30 to-transparent"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-20 w-full parallax-bg relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
            The Journey
          </span>
          <h2 ref={headingRef} className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How Thrive360 Works
          </h2>
          <p ref={subheadingRef} className="text-xl text-gray-600 max-w-3xl mx-auto">
            A seamless three-stage process designed to deliver personalized support.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-2">Scroll to explore</div>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mt-1"></div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div ref={progressRef} className="flex justify-center mb-12">
          <div className="flex space-x-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === 0 ? "bg-thrive-purple-500" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Main scroll sequence component */}
        <ThriveScrollSequence
          title="Your Mental Health Journey"
          subtitle="Experience personalized care every step of the way"
          sections={sections}
          showSideContainers={false}
          centerPhone={true}
          progressRef={progressRef}
          lenisInstance={lenis}
          sphereInteraction={isInView}
        />
      </div>

      {/* Background elements with parallax */}
      <ScrollParallax
        speed={0.1}
        direction="up"
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-thrive-purple-200 rounded-full opacity-30 z-0 parallax-bg"
      />
      <ScrollParallax
        speed={0.15}
        direction="down"
        className="absolute -top-32 -left-32 w-80 h-80 bg-thrive-purple-200 rounded-full opacity-20 z-0 parallax-bg"
      />
    </div>
  )
}

export default MultiStageScrollSection
