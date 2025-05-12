"use client"

import { useEffect, useRef, useContext, useState } from "react"
import { motion, useMotionValue, useTransform, useAnimation, useSpring } from "framer-motion"
import { FloatingSphereContext } from "@/context/FloatingSphereContext"

// Define scroll thresholds for different effects
const SCROLL_THRESHOLDS = {
  INTRO: 0,
  FIRST_SECTION: 500,
  SECOND_SECTION: 1200,
  THIRD_SECTION: 2000,
  FOURTH_SECTION: 3000,
}

// Define color schemes for different sections
const COLOR_SCHEMES = {
  INTRO: {
    outer: "from-pink-400 via-purple-400 to-indigo-400",
    inner: "from-pink-200 to-indigo-300",
    glow: "rgba(219, 39, 119, 0.5)",
  },
  FIRST: {
    outer: "from-indigo-400 via-purple-400 to-pink-400",
    inner: "from-indigo-200 to-pink-300",
    glow: "rgba(99, 102, 241, 0.5)",
  },
  SECOND: {
    outer: "from-pink-400 via-purple-400 to-indigo-400",
    inner: "from-pink-200 to-indigo-300",
    glow: "rgba(219, 39, 119, 0.5)",
  },
  THIRD: {
    outer: "from-indigo-400 via-purple-400 to-pink-400",
    inner: "from-indigo-200 to-pink-300",
    glow: "rgba(99, 102, 241, 0.5)",
  },
  FOURTH: {
    outer: "from-pink-400 via-purple-400 to-indigo-400",
    inner: "from-pink-200 to-indigo-300",
    glow: "rgba(219, 39, 119, 0.5)",
  },
}

const FloatingSphere = () => {
  // Create a motion value for scrollY
  const scrollY = useMotionValue(0)
  const sphereRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const { setHasFloatingSphere } = useContext(FloatingSphereContext)
  const [currentSection, setCurrentSection] = useState("INTRO")
  const [showParticles, setShowParticles] = useState(false)

  // Set the context value when component mounts
  useEffect(() => {
    setHasFloatingSphere(true)
    return () => {
      setHasFloatingSphere(false)
    }
  }, [setHasFloatingSphere])

  // Track mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add smooth following with spring physics
  const x = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const y = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    // Update the motion value when mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Update the motion value when scrolling
    const handleScroll = () => {
      const newScrollY = window.scrollY
      scrollY.set(newScrollY)

      // Determine current section based on scroll position
      if (newScrollY < SCROLL_THRESHOLDS.FIRST_SECTION) {
        if (currentSection !== "INTRO") {
          setCurrentSection("INTRO")
          triggerSectionChange("INTRO")
        }
      } else if (newScrollY < SCROLL_THRESHOLDS.SECOND_SECTION) {
        if (currentSection !== "FIRST") {
          setCurrentSection("FIRST")
          triggerSectionChange("FIRST")
        }
      } else if (newScrollY < SCROLL_THRESHOLDS.THIRD_SECTION) {
        if (currentSection !== "SECOND") {
          setCurrentSection("SECOND")
          triggerSectionChange("SECOND")
        }
      } else if (newScrollY < SCROLL_THRESHOLDS.FOURTH_SECTION) {
        if (currentSection !== "THIRD") {
          setCurrentSection("THIRD")
          triggerSectionChange("THIRD")
        }
      } else {
        if (currentSection !== "FOURTH") {
          setCurrentSection("FOURTH")
          triggerSectionChange("FOURTH")
        }
      }
    }

    // Set initial values
    scrollY.set(window.scrollY)
    handleScroll()

    // Set initial mouse position to center of screen
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2)
      mouseY.set(window.innerHeight / 2)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mouseX, mouseY, scrollY, currentSection])

  // Trigger special effects when changing sections
  const triggerSectionChange = (section: string) => {
    // Trigger a particle burst
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 1500)

    // Update animation controls with new values
    updateAnimations(section)
  }

  // Update animations based on current section
  const updateAnimations = (section: string) => {
    const colors = COLOR_SCHEMES[section as keyof typeof COLOR_SCHEMES]

    // Different animation parameters for each section
    const animationParams = {
      INTRO: {
        scale: [1, 1.05, 1],
        duration: 4,
        rotationDuration: 20,
      },
      FIRST: {
        scale: [1, 1.08, 1],
        duration: 3.5,
        rotationDuration: 15,
      },
      SECOND: {
        scale: [1, 1.1, 1],
        duration: 3,
        rotationDuration: 12,
      },
      THIRD: {
        scale: [1, 1.12, 1],
        duration: 2.5,
        rotationDuration: 10,
      },
      FOURTH: {
        scale: [1, 1.15, 1],
        duration: 2,
        rotationDuration: 8,
      },
    }

    const params = animationParams[section as keyof typeof animationParams]

    // Update pulsing animation
    controls.start({
      scale: params.scale,
      boxShadow: [`0 0 30px 5px ${colors.glow}`, `0 0 50px 10px ${colors.glow}`, `0 0 30px 5px ${colors.glow}`],
      transition: {
        duration: params.duration,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }

  // Start the default pulsing animation when component mounts
  useEffect(() => {
    updateAnimations(currentSection)
  }, [controls])

  // Calculate size based on scroll position
  const sphereSize = useTransform(scrollY, [0, 1000, 2000, 3000, 4000], [60, 50, 40, 38, 34])

  const innerSphereSize = useTransform(scrollY, [0, 1000, 2000, 3000, 4000], [45, 38, 32, 30, 26])

  // Get current color scheme
  const colors = COLOR_SCHEMES[currentSection as keyof typeof COLOR_SCHEMES]

  return (
    <motion.div
      ref={sphereRef}
      className="fixed pointer-events-none z-40"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 1 }}
    >
      {/* Outer glow */}
      <motion.div className={`absolute inset-0 rounded-full bg-pink-400 blur-xl opacity-40`} animate={controls} />

      {/* Particles that appear on section change */}
      {showParticles && <Particles color={colors.glow} />}

      {/* Main sphere */}
      <motion.div
        className={`sphere-element rounded-full bg-gradient-to-br ${colors.outer} flex items-center justify-center`}
        style={{ width: sphereSize, height: sphereSize }}
        animate={controls}
      >
        {/* Inner sphere with rotation */}
        <motion.div
          className={`rounded-full bg-gradient-to-tr ${colors.inner}`}
          style={{ width: innerSphereSize, height: innerSphereSize }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration:
              currentSection === "INTRO"
                ? 20
                : currentSection === "FIRST"
                  ? 15
                  : currentSection === "SECOND"
                    ? 12
                    : currentSection === "THIRD"
                      ? 10
                      : 8,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {/* Inner details */}
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center"
            initial={{ opacity: 0.7 }}
          >
            <div className="w-12 h-12 rounded-full bg-white opacity-50 blur-sm"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Particle effect component
const Particles = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: color,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          animate={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            opacity: [1, 0],
            scale: [1, 0.5],
          }}
          transition={{
            duration: 1 + Math.random(),
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default FloatingSphere
