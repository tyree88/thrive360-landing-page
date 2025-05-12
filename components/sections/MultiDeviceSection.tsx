"use client"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, Tablet, Laptop, Monitor, Sparkles } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Define the device features
const deviceFeatures = [
  {
    id: 1,
    title: "Mobile Experience",
    description: "Fully responsive designs that provide a seamless experience on smartphones.",
    icon: <Smartphone className="h-6 w-6 text-thrive-purple-600" />,
    screen: "Mobile-First Design",
    screenContent: "Optimized for touch interactions and smaller screens with intuitive navigation patterns.",
  },
  {
    id: 2,
    title: "Tablet Optimization",
    description: "Tailored interfaces that take advantage of tablet screen real estate.",
    icon: <Tablet className="h-6 w-6 text-thrive-purple-600" />,
    screen: "Tablet Experience",
    screenContent:
      "Enhanced layouts that utilize the additional screen space while maintaining touch-friendly controls.",
  },
  {
    id: 3,
    title: "Laptop Performance",
    description: "Powerful features and interactions optimized for laptop users.",
    icon: <Laptop className="h-6 w-6 text-thrive-purple-600" />,
    screen: "Desktop Interface",
    screenContent: "Full-featured experience with keyboard shortcuts and advanced productivity tools.",
  },
  {
    id: 4,
    title: "Desktop Immersion",
    description: "Rich, immersive experiences that utilize the full potential of desktop screens.",
    icon: <Monitor className="h-6 w-6 text-thrive-purple-600" />,
    screen: "Immersive View",
    screenContent: "Expansive layouts with detailed visualizations and multi-panel workflows for power users.",
  },
]

const MultiDeviceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iphoneRef = useRef<HTMLDivElement>(null)
  const [activeScreen, setActiveScreen] = useState(0)
  const [showFinalTransition, setShowFinalTransition] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !iphoneRef.current) return

    // Clear any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top+=150px top", // Start pinning when the top of the section hits the top of the viewport
        end: "bottom top+=150px", // Pin for 3x the section height
        pin: contentRef.current, // Pin the content container
        pinSpacing: true,
        scrub: 0.5, // Smooth scrubbing effect
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate which screen to show based on scroll progress
          const progress = self.progress

          // Use the first 80% of the scroll for device transitions
          const contentProgress = Math.min(progress / 0.8, 1)

          // Create thresholds for each feature
          const thresholds = [0, 0.25, 0.5, 0.75, 1.0]
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

    // Initial iPhone animation
    tl.fromTo(
      iphoneRef.current,
      {
        y: 80,
        opacity: 0,
        rotation: -5,
        scale: 0.85,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      },
      0,
    )

    // Final iPhone transition
    tl.to(
      iphoneRef.current,
      {
        y: -30,
        scale: 0.9,
        rotation: -2,
        boxShadow: "0 20px 50px rgba(138, 75, 255, 0.3)",
        duration: 0.2,
      },
      0.8, // Start at 80% of the timeline
    )

    // Glow effect animation
    tl.fromTo(
      ".device-glow",
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 0.8,
        scale: 1.2,
        duration: 0.2,
      },
      0.8, // Start at 80% of the timeline
    )

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="multi-device"
      className="relative bg-gradient-to-b from-[#efe9ff] to-[#f5f5ff] min-h-[300vh] overflow-hidden"
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
            Multi-Device Support
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
            Consistent experiences that adapt perfectly to any screen size
          </motion.p>
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div className="grid grid-cols-5 grid-rows-2 gap-4 p-4 md:p-8 max-w-6xl mx-auto h-full">
            {Array.from({ length: 10 }).map((_, idx) => (
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

        <div className="w-full relative flex justify-center items-center z-10">
          {/* Glow Effect */}
          <div className="device-glow absolute inset-0 bg-gradient-to-t from-thrive-purple-500/30 to-transparent pointer-events-none z-0 opacity-0"></div>

          {/* iPhone Mockup */}
          <div
            ref={iphoneRef}
            className={`relative w-[320px] md:w-[375px] h-[692px] md:h-[812px] bg-black rounded-[50px] border-[14px] border-gray-800 shadow-2xl overflow-hidden opacity-0 transition-all duration-500 ${
              showFinalTransition ? "shadow-[0_0_50px_rgba(138,75,255,0.5)]" : ""
            }`}
          >
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>

            {/* iPhone Screen */}
            <div className="w-full h-full bg-gradient-to-br from-light-purple-100 to-white overflow-hidden">
              {/* iPhone Content */}
              <div className="w-full h-full flex flex-col">
                {/* iPhone Header */}
                <div className="p-4 bg-thrive-purple-600/50 backdrop-blur-sm">
                  <h3 className="text-white font-bold text-lg">{deviceFeatures[activeScreen].screen}</h3>
                </div>

                {/* iPhone Body */}
                <div className="flex-1 relative overflow-y-auto">
                  <div className="p-4">
                    <AnimatePresence mode="wait">
                      {deviceFeatures.map((feature, index) => (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          animate={{
                            opacity: activeScreen >= index ? 1 : 0.5,
                            y: 0,
                            scale: activeScreen === index ? 1.08 : 1,
                            rotateZ: activeScreen === index ? 0 : index % 2 === 0 ? -0.5 : 0.5,
                            zIndex: activeScreen === index ? 10 : 1,
                          }}
                          exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: activeScreen === index ? 0.1 : 0,
                            scale: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }}
                          whileHover={{
                            scale: activeScreen === index ? 1.12 : 1.05,
                            boxShadow: "0 10px 25px rgba(138, 75, 255, 0.2)",
                          }}
                          whileTap={{
                            scale: 0.98,
                            boxShadow: "0 5px 10px rgba(138, 75, 255, 0.1)",
                          }}
                          className={`p-4 rounded-xl transition-all duration-300 mb-4 ${
                            activeScreen === index
                              ? "bg-white shadow-lg border border-purple-100"
                              : "bg-white/70 backdrop-blur-sm"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <motion.div
                              className={`p-2 rounded-full transition-all duration-300 ${
                                activeScreen === index ? "bg-thrive-purple-100" : "bg-white/50"
                              }`}
                              animate={{
                                rotate: activeScreen === index ? [0, 5, 0, -5, 0] : 0,
                                scale: activeScreen === index ? [1, 1.1, 1, 1.1, 1] : 1,
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                                ease: "easeInOut",
                              }}
                            >
                              {feature.icon}
                            </motion.div>
                            <h3 className="text-lg font-bold text-thrive-purple-900">{feature.title}</h3>
                          </div>
                          <p className="text-thrive-purple-700 text-sm">{feature.description}</p>

                          {/* Add sparkle effect for active card */}
                          {activeScreen === index && (
                            <motion.div
                              className="absolute top-2 right-2 text-thrive-purple-500"
                              animate={{
                                rotate: [0, 15, 0, -15, 0],
                                scale: [1, 1.2, 1, 1.2, 1],
                                opacity: [0.5, 1, 0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "loop",
                              }}
                            >
                              <Sparkles size={16} />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* iPhone Footer */}
                <div className="p-4 bg-thrive-purple-600/30 backdrop-blur-sm flex justify-center">
                  <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {deviceFeatures.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-2 h-2 rounded-full bg-thrive-purple-300"
                animate={{
                  scale: activeScreen === idx ? 1.5 : 1,
                  backgroundColor: activeScreen === idx ? "rgb(138, 75, 255)" : "rgb(216, 180, 254)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MultiDeviceSection
