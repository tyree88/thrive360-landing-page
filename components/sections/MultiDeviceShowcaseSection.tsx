"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { FlowButton } from "@/components/ui/flow-button"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Define the screens/features to showcase across devices
const showcaseScreens = [
  {
    id: 1,
    title: "User Dashboard",
    description: "Access all your information and tools from a centralized dashboard optimized for every device.",
    desktop: "/dashboard-desktop.png",
    tablet: "/dashboard-tablet.png",
    mobile: "/dashboard-mobile.png",
  },
  {
    id: 2,
    title: "Document Management",
    description: "Upload, organize, and access important documents with our intuitive interface.",
    desktop: "/documents-desktop.png",
    tablet: "/documents-tablet.png",
    mobile: "/documents-mobile.png",
  },
  {
    id: 3,
    title: "Communication Center",
    description: "Stay connected with support staff and community members through secure messaging.",
    desktop: "/messaging-desktop.png",
    tablet: "/messaging-tablet.png",
    mobile: "/messaging-mobile.png",
  },
  {
    id: 4,
    title: "Resource Library",
    description: "Access educational materials and resources tailored to your specific needs.",
    desktop: "/resources-desktop.png",
    tablet: "/resources-tablet.png",
    mobile: "/resources-mobile.png",
  },
]

export default function MultiDeviceShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const tabletRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)
  const [activeScreen, setActiveScreen] = useState(0)
  const [showFinalTransition, setShowFinalTransition] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    // Clear any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%", // Makes the section 3x its height for scrolling space
        pin: contentRef.current,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate which screen to show based on scroll progress
          const progress = self.progress

          // Use the first 80% of the scroll for feature transitions
          const contentProgress = Math.min(progress / 0.8, 1)

          // Create thresholds for each feature
          const thresholds = showcaseScreens.map((_, index) => index / showcaseScreens.length)
          thresholds.push(1) // Add the final threshold

          let screenIndex = 0
          // Find which threshold range we're in
          for (let i = 0; i < thresholds.length - 1; i++) {
            if (contentProgress >= thresholds[i] && contentProgress < thresholds[i + 1]) {
              screenIndex = i
              break
            }
          }

          setActiveScreen(screenIndex)

          // Trigger final transition in the last 20% of the scroll
          setShowFinalTransition(progress > 0.8)
        },
      },
    })

    // Initial animations for devices
    if (desktopRef.current && tabletRef.current && mobileRef.current) {
      // Desktop animation
      tl.fromTo(
        desktopRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0,
      )

      // Tablet animation (delayed slightly)
      tl.fromTo(
        tabletRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.85,
          rotation: -5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0.1,
      )

      // Mobile animation (delayed more)
      tl.fromTo(
        mobileRef.current,
        {
          y: 120,
          opacity: 0,
          scale: 0.8,
          rotation: 5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        0.2,
      )

      // Final transition for all devices
      tl.to(
        [desktopRef.current, tabletRef.current, mobileRef.current],
        {
          y: -20,
          stagger: 0.1,
          duration: 0.2,
        },
        0.8,
      )

      // Add glow effect
      tl.fromTo(
        ".devices-glow",
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 0.6,
          scale: 1.2,
          duration: 0.2,
        },
        0.8,
      )
    }

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[300vh] bg-gradient-to-b from-[#f8f5ff] to-[#f0ebff] overflow-hidden"
    >
      {/* Content Container - This will be pinned */}
      <div ref={contentRef} className="w-full min-h-screen flex flex-col items-center justify-start py-20">
        {/* Header */}
        <div className="container mx-auto px-6 text-center mb-16 relative z-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-block px-3 py-1 text-sm font-medium bg-white text-thrive-purple-700 rounded-full mb-4"
          >
            Cross-Platform Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-thrive-purple-900 mb-4"
          >
            Seamless Across All Devices
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="text-xl text-thrive-purple-700 max-w-3xl mx-auto"
          >
            Experience consistent functionality whether you're at your desk or on the go
          </motion.p>
        </div>

        {/* Feature Description */}
        <div className="container mx-auto px-6 mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={showcaseScreens[activeScreen].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-thrive-purple-800 mb-3">
                {showcaseScreens[activeScreen].title}
              </h3>
              <p className="text-lg text-thrive-purple-600">{showcaseScreens[activeScreen].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="grid grid-cols-5 grid-rows-3 gap-4 p-4 md:p-8 max-w-6xl mx-auto h-full">
            {Array.from({ length: 15 }).map((_, idx) => (
              <motion.div
                key={idx}
                className="bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.1 + (idx % 3) * 0.1,
                  scale: 1,
                  rotate: idx % 2 === 0 ? 2 : -2,
                  y: Math.sin(idx) * 10,
                }}
                transition={{
                  duration: 3 + idx,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: idx * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Devices Container */}
        <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-6 z-10">
          {/* Glow Effect */}
          <div className="devices-glow absolute inset-0 bg-gradient-to-t from-thrive-purple-500/30 to-transparent pointer-events-none z-0 opacity-0"></div>

          {/* Desktop Mockup */}
          <div
            ref={desktopRef}
            className={`relative w-full md:w-[55%] bg-gray-800 rounded-lg shadow-2xl overflow-hidden ${
              showFinalTransition ? "shadow-[0_0_30px_rgba(138,75,255,0.3)]" : ""
            }`}
          >
            {/* Browser chrome */}
            <div className="bg-gray-700 p-2 flex items-center">
              <div className="flex space-x-2 ml-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="mx-auto bg-gray-600 rounded-full px-4 py-1 text-xs text-gray-300 flex items-center">
                <span className="truncate">healthytogether.io</span>
              </div>
            </div>

            {/* Screen content */}
            <div className="relative bg-white aspect-[16/9] overflow-hidden">
              <AnimatePresence mode="wait">
                {showcaseScreens.map((screen, index) => (
                  <motion.div
                    key={`desktop-${screen.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeScreen === index ? 1 : 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                    style={{ zIndex: activeScreen === index ? 10 : 0 }}
                  >
                    <img
                      src={screen.desktop || "/placeholder.svg?height=720&width=1280&query=desktop dashboard interface"}
                      alt={`${screen.title} on desktop`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Tablet and Mobile Container */}
          <div className="relative flex flex-col items-center mt-8 md:mt-0 md:w-[45%]">
            {/* Tablet Mockup */}
            <div
              ref={tabletRef}
              className={`relative w-[70%] bg-black rounded-[1.5rem] border-[0.5rem] border-gray-800 shadow-xl overflow-hidden mb-8 ${
                showFinalTransition ? "shadow-[0_0_30px_rgba(138,75,255,0.3)]" : ""
              }`}
            >
              {/* Tablet camera */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full z-10"></div>

              {/* Screen content */}
              <div className="relative bg-white aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  {showcaseScreens.map((screen, index) => (
                    <motion.div
                      key={`tablet-${screen.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeScreen === index ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                      style={{ zIndex: activeScreen === index ? 10 : 0 }}
                    >
                      <img
                        src={screen.tablet || "/placeholder.svg?height=600&width=800&query=tablet interface"}
                        alt={`${screen.title} on tablet`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Mockup */}
            <div
              ref={mobileRef}
              className={`relative w-[35%] bg-black rounded-[2rem] border-[0.5rem] border-gray-800 shadow-xl overflow-hidden ${
                showFinalTransition ? "shadow-[0_0_30px_rgba(138,75,255,0.3)]" : ""
              }`}
            >
              {/* Phone Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-4 bg-black rounded-b-xl z-10"></div>

              {/* Screen content */}
              <div className="relative bg-white aspect-[9/16] overflow-hidden">
                <AnimatePresence mode="wait">
                  {showcaseScreens.map((screen, index) => (
                    <motion.div
                      key={`mobile-${screen.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeScreen === index ? 1 : 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                      style={{ zIndex: activeScreen === index ? 10 : 0 }}
                    >
                      <img
                        src={screen.mobile || "/placeholder.svg?height=800&width=450&query=mobile app interface"}
                        alt={`${screen.title} on mobile`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {showcaseScreens.map((_, idx) => (
            <motion.div
              key={idx}
              className="w-2.5 h-2.5 rounded-full bg-thrive-purple-300"
              animate={{
                scale: activeScreen === idx ? 1.5 : 1,
                backgroundColor: activeScreen === idx ? "rgb(138, 75, 255)" : "rgb(216, 180, 254)",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Next Feature Button (visible on mobile where scrolling might be difficult) */}
        <div className="md:hidden mt-8">
          <FlowButton
            text="Next Feature"
            onClick={() => setActiveScreen((prev) => (prev + 1) % showcaseScreens.length)}
          />
        </div>
      </div>
    </div>
  )
}
