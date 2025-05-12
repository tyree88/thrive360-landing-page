"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Define service stages for the marquee transitions
const SERVICE_STAGES = [
  ["WIC & FMNP", "SNAP", "Medicaid IE&E"], // Stage 1
  ["SUN Bucks", "Medicaid IE&E", "TANF"], // Stage 2
  ["Child Services", "Housing", "Employment"], // Stage 3
  ["Employment", "Other Services", "Community Programs"], // Stage 4
]

// Define stage descriptions
const STAGE_DESCRIPTIONS = [
  {
    title: "Integrated Service Delivery",
    description:
      "Seamlessly connect multiple services through a unified digital platform, improving accessibility and user experience.",
  },
  {
    title: "Cross-Program Eligibility",
    description:
      "Streamline eligibility determination across multiple benefit programs, reducing redundancy and administrative burden.",
  },
  {
    title: "User-Centered Design",
    description:
      "Create intuitive interfaces that prioritize user needs, making complex processes simple and accessible.",
  },
  {
    title: "Multi-Device Experience",
    description:
      "Deliver consistent experiences across desktop, tablet, and mobile devices, meeting users wherever they are.",
  },
]

export default function SolutionsSection() {
  // Create refs
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const progressRef = useRef(null)

  // State for current stage
  const [currentStage, setCurrentStage] = useState(0)
  const [previousStage, setPreviousStage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Effect for ScrollTrigger setup
  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === "undefined") return

    // Create a GSAP context for better cleanup
    const ctx = gsap.context(() => {
      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => t.kill())

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // 300% of the viewport height for scrolling distance
        pin: containerRef.current,
        pinSpacing: true,
        scrub: 1,
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          // Update progress bar
          if (progressRef.current) {
            gsap.set(progressRef.current, { width: `${self.progress * 100}%` })
          }

          // Update current stage based on scroll progress
          const newStage = Math.min(3, Math.floor(self.progress * 4))
          if (newStage !== currentStage) {
            setPreviousStage(currentStage)
            setCurrentStage(newStage)
            setIsTransitioning(true)

            // Reset transition state after animation completes
            setTimeout(() => {
              setIsTransitioning(false)
            }, 800)
          }
        },
      })
    }, sectionRef) // Scope GSAP context to our section

    // Return cleanup function
    return () => ctx.revert() // This properly cleans up all GSAP animations
  }, [currentStage]) // Re-run if currentStage changes

  // Get current content based on stage
  const currentServices = SERVICE_STAGES[currentStage]

  // Determine transition direction
  const direction = currentStage > previousStage ? 1 : -1

  // Animation variants for tablet
  const tabletVariants = {
    initial: (custom) => ({
      opacity: 0,
      scale: 0.9,
      y: custom * 40,
      rotateY: custom * 15,
    }),
    animate: {
      opacity: 1,
      scale: 1.1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    exit: (custom) => ({
      opacity: 0,
      scale: 0.9,
      y: custom * -40,
      rotateY: custom * -15,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  }

  // Animation variants for mobile
  const mobileVariants = {
    initial: (custom) => ({
      opacity: 0,
      scale: 0.8,
      x: custom * 50,
      rotateZ: custom * 10,
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateZ: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: 0.2,
        duration: 0.8,
      },
    },
    exit: (custom) => ({
      opacity: 0,
      scale: 0.8,
      x: custom * -50,
      rotateZ: custom * -10,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  }

  // Get app name for current stage
  const getTabletApp = () => {
    switch (currentStage) {
      case 1:
        return "snap"
      case 2:
        return "sun"
      case 3:
        return "medicaid"
      default:
        return "wic"
    }
  }

  const getMobileApp = () => {
    switch (currentStage) {
      case 2:
        return "sun"
      case 3:
        return "medicaid"
      default:
        return "wic"
    }
  }

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative bg-[#f8f5ff]"
      // Critical: This creates the scrolling space needed for pin effect
      style={{ height: "400vh" }}
    >
      {/* This container will be pinned while section scrolls */}
      <div ref={containerRef} className="min-h-screen py-16 flex flex-col items-center justify-start">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-light-purple-100 text-thrive-purple-700 rounded-full mb-4">
              Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-thrive-purple-800 mb-4">Integrated Digital Solutions</h2>
            <p className="text-xl text-thrive-purple-600 max-w-3xl mx-auto">
              Seamlessly connect multiple services through a unified platform
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 rounded-full mb-12">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-thrive-purple-500 to-thrive-purple-300 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>

          {/* Services marquee */}
          <div className="relative overflow-hidden py-6 bg-thrive-purple-50 rounded-xl mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={`services-${currentStage}`}
                initial={{ opacity: 0, y: direction * 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -20 }}
                transition={{ duration: 0.5 }}
                className="flex space-x-4 justify-center"
              >
                {currentServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-6 py-3 bg-white rounded-full shadow-sm border border-thrive-purple-100 text-thrive-purple-800 font-medium"
                  >
                    {service}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Device mockups */}
          <div className="relative min-h-[40vh] flex items-start justify-center pt-4 perspective-1000">
            {/* Tablet mockup */}
            <div className="w-full max-w-xl md:max-w-2xl">
              <AnimatePresence mode="wait">
                {currentStage >= 1 && (
                  <motion.div
                    key={`tablet-${getTabletApp()}`}
                    custom={direction}
                    variants={tabletVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    <div
                      className="relative w-full aspect-[4/3] bg-black rounded-[24px] border-[16px] border-gray-800 overflow-hidden origin-top"
                      style={{
                        boxShadow: `
                          0 10px 30px -5px rgba(138, 75, 255, 0.2),
                          0 20px 60px -10px rgba(138, 75, 255, 0.3),
                          0 -10px 60px -10px rgba(192, 132, 252, 0.15),
                          0 0 20px 0 rgba(138, 75, 255, 0.1),
                          inset 0 0 20px 5px rgba(0, 0, 0, 0.05)
                        `,
                      }}
                    >
                      <div className="absolute inset-0 bg-white">
                        <Image
                          src={`/screens/${getTabletApp()}-tablet.png`}
                          alt="Tablet interface"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile mockup */}
            <div className="absolute top-[10%] right-[15%] w-[30%] md:w-[20%]">
              <AnimatePresence mode="wait">
                {currentStage >= 2 && (
                  <motion.div
                    key={`mobile-${getMobileApp()}`}
                    custom={direction}
                    variants={mobileVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    <div
                      className="relative w-full aspect-[9/19] bg-black rounded-[36px] border-[8px] border-gray-800 overflow-hidden"
                      style={{
                        boxShadow: `
                          0 10px 25px -5px rgba(138, 75, 255, 0.25),
                          0 15px 40px -10px rgba(138, 75, 255, 0.35),
                          0 -5px 25px -5px rgba(192, 132, 252, 0.15),
                          0 0 15px 0 rgba(138, 75, 255, 0.1)
                        `,
                      }}
                    >
                      <div className="absolute inset-0 bg-white">
                        <Image
                          src={`/screens/${getMobileApp()}-mobile.png`}
                          alt="Mobile interface"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-1/3 h-[5px] bg-gray-600 rounded-full"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-thrive-purple-100 rounded-full blur-3xl opacity-30 -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-40 h-40 bg-thrive-purple-200 rounded-full blur-3xl opacity-30 translate-x-1/2"></div>
    </section>
  )
}
