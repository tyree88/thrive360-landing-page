"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { Sparkles, X, Info, Plus, Smartphone, Tablet, Laptop } from "lucide-react"
import DesktopMockup from "./DesktopMockup"
import MobileMockup from "./MobileMockup"
import TabletMockup from "./TabletMockup"
import UnifiedSection from "@/components/ui/unified-section"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Define feature hotspots for each service
const serviceHotspots = {
  "wic-fmnp": [
    {
      id: "wic-eligibility",
      title: "Eligibility Checker",
      description: "Quickly determine eligibility with our smart assessment tool.",
      position: { desktop: { x: 20, y: 20 }, tablet: { x: 15, y: 15 }, mobile: { x: 15, y: 15 } },
      device: "desktop",
    },
    {
      id: "wic-appointment",
      title: "Appointment Scheduling",
      description: "Book and manage appointments with WIC counselors.",
      position: { desktop: { x: 70, y: 40 }, tablet: { x: 70, y: 30 }, mobile: { x: 50, y: 30 } },
      device: "tablet",
    },
    {
      id: "wic-benefits",
      title: "Benefit Tracker",
      description: "Track available benefits and usage history.",
      position: { desktop: { x: 40, y: 70 }, tablet: { x: 40, y: 60 }, mobile: { x: 30, y: 60 } },
      device: "mobile",
    },
  ],
  snap: [
    {
      id: "snap-application",
      title: "Streamlined Application",
      description: "Complete your SNAP application in minutes with guided assistance.",
      position: { desktop: { x: 30, y: 30 }, tablet: { x: 25, y: 25 }, mobile: { x: 20, y: 20 } },
      device: "desktop",
    },
    {
      id: "snap-documents",
      title: "Document Upload",
      description: "Securely upload verification documents directly from your device.",
      position: { desktop: { x: 60, y: 50 }, tablet: { x: 60, y: 40 }, mobile: { x: 40, y: 40 } },
      device: "tablet",
    },
    {
      id: "snap-balance",
      title: "Balance Checker",
      description: "Check your SNAP balance and transaction history on the go.",
      position: { desktop: { x: 50, y: 80 }, tablet: { x: 30, y: 70 }, mobile: { x: 50, y: 70 } },
      device: "mobile",
    },
  ],
  "sun-bucks": [
    {
      id: "sun-wallet",
      title: "Digital Wallet",
      description: "Manage your SUN Bucks balance in a secure digital wallet.",
      position: { desktop: { x: 25, y: 25 }, tablet: { x: 20, y: 20 }, mobile: { x: 25, y: 25 } },
      device: "desktop",
    },
    {
      id: "sun-vendors",
      title: "Vendor Locator",
      description: "Find participating vendors and markets that accept SUN Bucks.",
      position: { desktop: { x: 65, y: 45 }, tablet: { x: 65, y: 35 }, mobile: { x: 45, y: 35 } },
      device: "tablet",
    },
    {
      id: "sun-transfer",
      title: "Quick Transfer",
      description: "Easily transfer SUN Bucks to approved family members.",
      position: { desktop: { x: 45, y: 75 }, tablet: { x: 35, y: 65 }, mobile: { x: 35, y: 65 } },
      device: "mobile",
    },
  ],
  medicaid: [
    {
      id: "medicaid-eligibility",
      title: "Eligibility Engine",
      description: "Our advanced eligibility engine determines qualification in real-time.",
      position: { desktop: { x: 35, y: 35 }, tablet: { x: 30, y: 30 }, mobile: { x: 30, y: 30 } },
      device: "desktop",
    },
    {
      id: "medicaid-enrollment",
      title: "Enrollment Portal",
      description: "Complete enrollment and select your plan through our guided portal.",
      position: { desktop: { x: 55, y: 55 }, tablet: { x: 55, y: 45 }, mobile: { x: 35, y: 45 } },
      device: "tablet",
    },
    {
      id: "medicaid-providers",
      title: "Provider Directory",
      description: "Find in-network providers and schedule appointments.",
      position: { desktop: { x: 40, y: 65 }, tablet: { x: 40, y: 55 }, mobile: { x: 40, y: 55 } },
      device: "mobile",
    },
  ],
}

// Define the screens/features to showcase
const showcaseScreens = [
  {
    id: "wic-fmnp",
    title: "WIC & FMNP",
    description:
      "Streamlined benefit management for Women, Infants, and Children and Farmers Market Nutrition Program.",
    desktop: "/screens/wic-desktop.png",
    tablet: "/screens/wic-tablet.png",
    mobile: "/screens/wic-mobile.png",
  },
  {
    id: "snap",
    title: "SNAP",
    description: "Simplified Supplemental Nutrition Assistance Program application and management process.",
    desktop: "/screens/snap-desktop.png",
    tablet: "/screens/snap-tablet.png",
    mobile: "/screens/snap-mobile.png",
  },
  {
    id: "sun-bucks",
    title: "SUN Bucks",
    description: "Digital currency system for nutrition assistance with seamless vendor integration.",
    desktop: "/screens/sun-desktop.png",
    tablet: "/screens/sun-tablet.png",
    mobile: "/screens/sun-mobile.png",
  },
  {
    id: "medicaid",
    title: "Medicaid IE&E",
    description: "Integrated eligibility and enrollment platform for Medicaid services.",
    desktop: "/screens/medicaid-desktop.png",
    tablet: "/screens/medicaid-tablet.png",
    mobile: "/screens/medicaid-mobile.png",
  },
]

export function DeviceShowcase() {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [activeApp, setActiveApp] = useState<"wic" | "snap" | "sun" | "medicaid">("wic")

  const apps = [
    { id: "wic", name: "WIC" },
    { id: "snap", name: "SNAP" },
    { id: "sun", name: "SUN Bucks" },
    { id: "medicaid", name: "Medicaid" },
  ]

  const devices = [
    { id: "desktop", icon: <Laptop className="h-5 w-5" />, label: "Desktop" },
    { id: "tablet", icon: <Tablet className="h-5 w-5" />, label: "Tablet" },
    { id: "mobile", icon: <Smartphone className="h-5 w-5" />, label: "Mobile" },
  ]

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const tabletRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLDivElement>(null)

  // State for tracking active screen and final transition
  const [activeScreen, setActiveScreen] = useState(0)
  const [showFinalTransition, setShowFinalTransition] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Get current service ID
  const currentServiceId = showcaseScreens[activeScreen]?.id || "wic-fmnp"

  // Get hotspots for current service
  const currentHotspots = serviceHotspots[currentServiceId as keyof typeof serviceHotspots] || []

  useEffect(() => {
    // Add a style tag for the pin-spacer class if it doesn't exist
    if (typeof window !== "undefined" && !document.getElementById("pin-spacer-style")) {
      const style = document.createElement("style")
      style.id = "pin-spacer-style"
      style.innerHTML = `
        .pin-spacer {
          z-index: 10;
        }
        .gsap-pin-spacer {
          z-index: 10 !important;
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      // Clean up the style tag when component unmounts
      if (typeof window !== "undefined") {
        const style = document.getElementById("pin-spacer-style")
        if (style) style.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !desktopRef.current || !tabletRef.current || !mobileRef.current) return

    // Clear any existing ScrollTriggers to prevent duplicates
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Pin at the top of the viewport
        end: "+=300%", // Makes the section 3x its height for scrolling space
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        pinReparent: true, // This helps with positioning when pinned
        onUpdate: (self) => {
          // Skip updates if paused (user is interacting with hotspots)
          if (isPaused) return

          // Calculate which screen to show based on scroll progress
          const progress = self.progress

          // Use the first 80% of the scroll for feature transitions
          const contentProgress = Math.min(progress / 0.8, 1)

          // Calculate which screen to show
          const screenIndex = Math.min(Math.floor(contentProgress * showcaseScreens.length), showcaseScreens.length - 1)

          setActiveScreen(screenIndex)

          // Trigger final transition in the last 20% of the scroll
          setShowFinalTransition(progress > 0.8)
        },
      },
    })

    // Enhanced initial animations with staggered entrance and subtle rotation
    tl.fromTo(
      desktopRef.current,
      {
        y: 100,
        opacity: 0,
        rotateX: 10, // Slight tilt for 3D effect
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      0,
    )

    tl.fromTo(
      tabletRef.current,
      {
        y: 100,
        opacity: 0,
        rotation: -5,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      0.15, // Slight delay after desktop
    )

    tl.fromTo(
      mobileRef.current,
      {
        y: 100,
        opacity: 0,
        rotation: 5,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      0.3, // Slight delay after tablet
    )

    // Enhanced final transition with more dynamic movement
    tl.to(
      desktopRef.current,
      {
        y: -15,
        rotateX: 5,
        duration: 0.4,
        boxShadow: "0 25px 50px rgba(138, 75, 255, 0.4)",
      },
      0.8, // Start at 80% of the timeline
    )

    tl.to(
      tabletRef.current,
      {
        y: -25,
        rotation: -2,
        scale: 1.05,
        duration: 0.4,
        boxShadow: "0 25px 50px rgba(138, 75, 255, 0.4)",
      },
      0.85, // Slight delay after desktop
    )

    tl.to(
      mobileRef.current,
      {
        y: -35,
        rotation: 2,
        scale: 1.1,
        duration: 0.4,
        boxShadow: "0 25px 50px rgba(138, 75, 255, 0.4)",
      },
      0.9, // Slight delay after tablet
    )

    // Enhanced glow effect animation
    tl.fromTo(
      ".device-glow",
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 0.7,
        scale: 1,
        duration: 0.5,
      },
      0.8, // Start at 80% of the timeline
    )

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isPaused])

  // Reset active hotspot when changing screens
  useEffect(() => {
    setActiveHotspot(null)
  }, [activeScreen])

  // Handle hotspot click
  const handleHotspotClick = (hotspotId: string) => {
    // Toggle hotspot
    setActiveHotspot(activeHotspot === hotspotId ? null : hotspotId)

    // Pause scroll animations while viewing hotspot details
    setIsPaused(activeHotspot !== hotspotId)
  }

  // Close hotspot detail
  const closeHotspot = () => {
    setActiveHotspot(null)
    setIsPaused(false)
  }

  // Get active hotspot data
  const getActiveHotspotData = () => {
    if (!activeHotspot) return null
    return currentHotspots.find((hotspot) => hotspot.id === activeHotspot)
  }

  const activeHotspotData = getActiveHotspotData()

  return (
    <div className="flex flex-col">
      {/* App selector */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveApp(app.id as "wic" | "snap" | "sun" | "medicaid")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeApp === app.id
                  ? "bg-thrive-purple-100 text-thrive-purple-800"
                  : "text-gray-600 hover:text-thrive-purple-600"
              }`}
            >
              {app.name}
            </button>
          ))}
        </div>
      </div>

      {/* Device selector */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white p-1 rounded-full shadow-sm border border-gray-200">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setActiveDevice(device.id as "desktop" | "tablet" | "mobile")}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeDevice === device.id
                  ? "bg-thrive-purple-500 text-white"
                  : "text-gray-600 hover:text-thrive-purple-600"
              }`}
            >
              <span className="mr-2">{device.icon}</span>
              <span>{device.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Device display */}
      <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {activeDevice === "desktop" && (
            <motion.div
              key="desktop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <DesktopMockup app={activeApp} />
            </motion.div>
          )}

          {activeDevice === "tablet" && (
            <motion.div
              key="tablet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <TabletMockup app={activeApp} />
            </motion.div>
          )}

          {activeDevice === "mobile" && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <MobileMockup app={activeApp} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        ref={containerRef}
        className="relative min-h-[600px] w-full pin-spacer"
        style={{ zIndex: 10 }} // Ensure pinned content appears above other elements
      >
        {/* Feature description that changes with screens - empty but kept for structure */}
        <div className="absolute top-0 left-0 w-full text-center mb-8 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto px-4"
            >
              {/* Content removed as requested */}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Device mockups container with enhanced animations */}
        <UnifiedSection
          variant="light"
          spacing="lg"
          width="full"
          heading="Multi-Device Experience"
          subheading="Our solutions are designed to work seamlessly across all devices, providing a consistent user experience."
          className="relative"
          contentClassName="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8"
          animation="fade"
        >
          {/* Enhanced glow effect with subtle animation */}
          <div className="device-glow absolute inset-0 bg-gradient-to-t from-thrive-purple-500/30 to-transparent rounded-3xl pointer-events-none opacity-0">
            {/* Animated particles for enhanced glow effect */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-thrive-purple-300 opacity-40"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Desktop mockup with enhanced animations */}
          <div
            ref={desktopRef}
            className={`relative z-10 w-full max-w-xl opacity-0 transition-all duration-700 ${
              showFinalTransition ? "shadow-[0_20px_50px_rgba(138,75,255,0.3)]" : ""
            }`}
          >
            <div className="relative">
              <DesktopMockup>
                <AnimatePresence mode="wait">
                  {showcaseScreens.map(
                    (screen, index) =>
                      activeScreen === index && (
                        <motion.div
                          key={screen.id}
                          className="relative"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={
                              screen.desktop ||
                              "/placeholder.svg?height=600&width=800&query=desktop+application+interface" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={`${screen.title} desktop view`}
                            className="w-full h-auto"
                          />

                          {/* Desktop Hotspots with enhanced animations */}
                          {currentHotspots
                            .filter((hotspot) => hotspot.device === "desktop")
                            .map((hotspot) => (
                              <motion.button
                                key={hotspot.id}
                                onClick={() => handleHotspotClick(hotspot.id)}
                                className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-20
                                ${
                                  activeHotspot === hotspot.id
                                    ? "bg-thrive-purple-600 text-white scale-125"
                                    : "bg-white text-thrive-purple-600 border-2 border-thrive-purple-300 hover:border-thrive-purple-600"
                                }`}
                                style={{
                                  left: `${hotspot.position.desktop.x}%`,
                                  top: `${hotspot.position.desktop.y}%`,
                                  transform: "translate(-50%, -50%)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: activeHotspot === hotspot.id ? 1.25 : 1,
                                  opacity: 1,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                  delay: 0.2 + Math.random() * 0.3, // Randomized delay for natural feel
                                }}
                                aria-label={`Feature: ${hotspot.title}`}
                              >
                                {activeHotspot === hotspot.id ? <X size={16} /> : <Plus size={16} />}

                                {/* Enhanced pulse animation for inactive hotspots */}
                                {activeHotspot !== hotspot.id && (
                                  <motion.span
                                    className="absolute inset-0 rounded-full bg-thrive-purple-400 opacity-30"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.3, 0.1, 0.3],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                    }}
                                  />
                                )}
                              </motion.button>
                            ))}
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </DesktopMockup>
            </div>
          </div>

          {/* Tablet mockup with enhanced animations */}
          <div
            ref={tabletRef}
            className={`relative z-20 w-full max-w-[320px] opacity-0 transition-all duration-700 ${
              showFinalTransition ? "shadow-[0_20px_50px_rgba(138,75,255,0.3)]" : ""
            }`}
          >
            <div className="relative">
              <TabletMockup>
                <AnimatePresence mode="wait">
                  {showcaseScreens.map(
                    (screen, index) =>
                      activeScreen === index && (
                        <motion.div
                          key={screen.id}
                          className="relative"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={
                              screen.tablet ||
                              "/placeholder.svg?height=600&width=450&query=tablet+application+interface" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={`${screen.title} tablet view`}
                            className="w-full h-auto"
                          />

                          {/* Tablet Hotspots with enhanced animations */}
                          {currentHotspots
                            .filter((hotspot) => hotspot.device === "tablet")
                            .map((hotspot) => (
                              <motion.button
                                key={hotspot.id}
                                onClick={() => handleHotspotClick(hotspot.id)}
                                className={`absolute w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 z-20
                                ${
                                  activeHotspot === hotspot.id
                                    ? "bg-thrive-purple-600 text-white scale-125"
                                    : "bg-white text-thrive-purple-600 border-2 border-thrive-purple-300 hover:border-thrive-purple-600"
                                }`}
                                style={{
                                  left: `${hotspot.position.tablet.x}%`,
                                  top: `${hotspot.position.tablet.y}%`,
                                  transform: "translate(-50%, -50%)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: activeHotspot === hotspot.id ? 1.25 : 1,
                                  opacity: 1,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                  delay: 0.3 + Math.random() * 0.3, // Randomized delay for natural feel
                                }}
                                aria-label={`Feature: ${hotspot.title}`}
                              >
                                {activeHotspot === hotspot.id ? <X size={14} /> : <Plus size={14} />}

                                {/* Enhanced pulse animation for inactive hotspots */}
                                {activeHotspot !== hotspot.id && (
                                  <motion.span
                                    className="absolute inset-0 rounded-full bg-thrive-purple-400 opacity-30"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.3, 0.1, 0.3],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                    }}
                                  />
                                )}
                              </motion.button>
                            ))}
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </TabletMockup>
            </div>
          </div>

          {/* Mobile mockup with enhanced animations */}
          <div
            ref={mobileRef}
            className={`relative z-30 w-full max-w-[180px] opacity-0 transition-all duration-700 ${
              showFinalTransition ? "shadow-[0_20px_50px_rgba(138,75,255,0.3)]" : ""
            }`}
          >
            <div className="relative">
              <MobileMockup>
                <AnimatePresence mode="wait">
                  {showcaseScreens.map(
                    (screen, index) =>
                      activeScreen === index && (
                        <motion.div
                          key={screen.id}
                          className="relative"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={
                              screen.mobile ||
                              "/placeholder.svg?height=600&width=300&query=mobile+application+interface" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={`${screen.title} mobile view`}
                            className="w-full h-auto"
                          />

                          {/* Mobile Hotspots with enhanced animations */}
                          {currentHotspots
                            .filter((hotspot) => hotspot.device === "mobile")
                            .map((hotspot) => (
                              <motion.button
                                key={hotspot.id}
                                onClick={() => handleHotspotClick(hotspot.id)}
                                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 z-20
                                ${
                                  activeHotspot === hotspot.id
                                    ? "bg-thrive-purple-600 text-white scale-125"
                                    : "bg-white text-thrive-purple-600 border-2 border-thrive-purple-300 hover:border-thrive-purple-600"
                                }`}
                                style={{
                                  left: `${hotspot.position.mobile.x}%`,
                                  top: `${hotspot.position.mobile.y}%`,
                                  transform: "translate(-50%, -50%)",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                  scale: activeHotspot === hotspot.id ? 1.25 : 1,
                                  opacity: 1,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20,
                                  delay: 0.4 + Math.random() * 0.3, // Randomized delay for natural feel
                                }}
                                aria-label={`Feature: ${hotspot.title}`}
                              >
                                {activeHotspot === hotspot.id ? <X size={12} /> : <Plus size={12} />}

                                {/* Enhanced pulse animation for inactive hotspots */}
                                {activeHotspot !== hotspot.id && (
                                  <motion.span
                                    className="absolute inset-0 rounded-full bg-thrive-purple-400 opacity-30"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.3, 0.1, 0.3],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                    }}
                                  />
                                )}
                              </motion.button>
                            ))}
                        </motion.div>
                      ),
                  )}
                </AnimatePresence>
              </MobileMockup>
            </div>
          </div>
        </UnifiedSection>

        {/* Enhanced Hotspot Detail Popup with improved animations */}
        <AnimatePresence>
          {activeHotspotData && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="absolute left-1/2 bottom-24 transform -translate-x-1/2 bg-white rounded-xl shadow-xl p-4 max-w-md w-full z-50 border border-thrive-purple-100"
            >
              <button
                onClick={closeHotspot}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="Close feature details"
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-3">
                <motion.div
                  className="bg-thrive-purple-100 p-2 rounded-full text-thrive-purple-600"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Info size={20} />
                </motion.div>
                <div>
                  <motion.h4
                    className="text-lg font-bold text-thrive-purple-900"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {activeHotspotData.title}
                  </motion.h4>
                  <motion.p
                    className="text-thrive-purple-700 mt-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {activeHotspotData.description}
                  </motion.p>
                </div>
              </div>

              <motion.div
                className="mt-4 flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <button
                  onClick={closeHotspot}
                  className="px-4 py-2 bg-thrive-purple-600 text-white rounded-lg text-sm font-medium hover:bg-thrive-purple-700 transition-colors duration-200 hover:shadow-md"
                >
                  Got it
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Progress indicators with improved animations */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
          {showcaseScreens.map((screen, index) => (
            <motion.div
              key={screen.id}
              className="relative group cursor-pointer"
              animate={{
                scale: activeScreen === index ? 1.2 : 1,
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              onClick={() => {
                // Optional: Add functionality to jump to this screen
                // Would need to update ScrollTrigger position
              }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeScreen === index ? "bg-thrive-purple-600" : "bg-thrive-purple-300"
                }`}
                animate={{
                  boxShadow: activeScreen === index ? "0 0 10px rgba(138, 75, 255, 0.5)" : "none",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Enhanced indicator label on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap">
                <div className="bg-thrive-purple-800 text-white text-xs rounded px-2 py-1 shadow-lg">
                  {screen.title}
                </div>
                <div className="w-2 h-2 bg-thrive-purple-800 transform rotate-45 absolute left-1/2 -bottom-1 -translate-x-1/2"></div>
              </div>

              {/* Enhanced sparkle effect for active indicator */}
              {activeScreen === index && (
                <motion.div
                  className="absolute -top-1 -right-1 text-thrive-purple-500"
                  animate={{
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                    filter: [
                      "drop-shadow(0 0 2px rgba(138, 75, 255, 0.3))",
                      "drop-shadow(0 0 4px rgba(138, 75, 255, 0.6))",
                      "drop-shadow(0 0 2px rgba(138, 75, 255, 0.3))",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  <Sparkles size={12} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced instruction tooltip with improved animations */}
        <motion.div
          className="absolute top-32 right-1/4 bg-thrive-purple-900 text-white px-3 py-2 rounded-lg shadow-lg z-50 max-w-[200px]"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          exit={{ opacity: 0 }}
        >
          <div className="text-xs">
            <motion.p
              className="font-medium"
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              Click the <Plus size={12} className="inline" /> icons to explore features
            </motion.p>
            <div className="w-3 h-3 bg-thrive-purple-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
