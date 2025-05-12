"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import type { ScrollSequenceSection } from "./types"
import { Power, Volume1, Volume2 } from "lucide-react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"

interface PhoneMockupProps {
  sections: ScrollSequenceSection[]
  phoneRef: React.RefObject<HTMLDivElement>
  contentContainerRef: React.RefObject<HTMLDivElement>
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
  sectionContentRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>
  sectionTitleRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>
  sectionDescRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>
  sphereInteraction?: boolean
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  sections,
  phoneRef,
  contentContainerRef,
  sectionRefs,
  sectionContentRefs,
  sectionTitleRefs,
  sectionDescRefs,
  sphereInteraction = false,
}) => {
  const screenReflectionRef = useRef<HTMLDivElement>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)

  // Keep only the subtle screen reflection animation
  useEffect(() => {
    const reflection = screenReflectionRef.current

    if (reflection) {
      // Create a subtle animation for the reflection
      gsap.to(reflection, {
        opacity: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }, [])

  // Add entrance animation
  useEffect(() => {
    if (phoneRef.current) {
      gsap.fromTo(
        phoneRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
          rotation: -5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.5,
        },
      )
    }
  }, [phoneRef])

  // Add particle effects
  useEffect(() => {
    if (!contentContainerRef.current) return

    // Create particles container
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "absolute inset-0 pointer-events-none z-20"
    contentContainerRef.current.appendChild(particlesContainer)

    // Create particles
    const createParticle = () => {
      if (!isInteracting || !contentContainerRef.current) return

      const particle = document.createElement("div")
      particle.className = "absolute w-1.5 h-1.5 rounded-full bg-thrive-purple-400 opacity-70"

      // Random position
      const x = Math.random() * contentContainerRef.current.offsetWidth
      const y = Math.random() * contentContainerRef.current.offsetHeight

      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      particlesContainer.appendChild(particle)

      // Animate particle
      gsap.to(particle, {
        y: -20 - Math.random() * 30,
        x: (Math.random() - 0.5) * 20,
        opacity: 0,
        scale: 0,
        duration: 1 + Math.random(),
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        },
      })
    }

    // Create particles at intervals when interacting
    const particleInterval = setInterval(() => {
      if (isInteracting) {
        for (let i = 0; i < 3; i++) {
          createParticle()
        }
      }
    }, 200)

    return () => {
      clearInterval(particleInterval)
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer)
      }
    }
  }, [contentContainerRef, isInteracting])

  // Handle sphere interaction
  useEffect(() => {
    if (sphereInteraction) {
      setGlowIntensity(0.8)

      // Add subtle floating animation when sphere is nearby
      if (phoneRef.current) {
        gsap.to(phoneRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }
    } else {
      setGlowIntensity(0)

      // Remove floating animation when sphere is not interacting
      if (phoneRef.current) {
        gsap.killTweensOf(phoneRef.current, "y")
        gsap.to(phoneRef.current, {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      }
    }
  }, [sphereInteraction, phoneRef])

  return (
    <div
      ref={phoneRef}
      className="relative w-72 h-[600px] bg-black rounded-[40px] border-8 border-gray-800 shadow-2xl flex justify-center"
      style={{
        transform: "translateZ(0)", // Hardware acceleration
        willChange: "transform", // Performance optimization
        boxShadow: "0 15px 35px rgba(0,0,0,0.25), 0 5px 15px rgba(0,0,0,0.1), inset 0 2px 0 rgba(255,255,255,0.1)",
      }}
      aria-label="iPhone mockup displaying application screens"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {/* Sphere interaction glow effect */}
      <AnimatePresence>
        {sphereInteraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: glowIntensity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -inset-10 rounded-full pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
              mixBlendMode: "plus-lighter",
            }}
          />
        )}
      </AnimatePresence>

      {/* Phone buttons - Left side (Volume) */}
      <div className="absolute -left-[4px] top-32 flex flex-col gap-5">
        <div
          className="w-[4px] h-10 bg-gray-700 rounded-l-md flex items-center justify-center shadow-sm"
          aria-label="Volume up button"
        >
          <Volume2 size={10} className="text-gray-600 opacity-0" />
        </div>
        <div
          className="w-[4px] h-10 bg-gray-700 rounded-l-md flex items-center justify-center shadow-sm"
          aria-label="Volume down button"
        >
          <Volume1 size={10} className="text-gray-600 opacity-0" />
        </div>
      </div>

      {/* Phone buttons - Right side (Power) */}
      <div className="absolute -right-[4px] top-40">
        <div
          className="w-[4px] h-10 bg-gray-700 rounded-r-md flex items-center justify-center shadow-sm"
          aria-label="Power button"
        >
          <Power size={10} className="text-gray-600 opacity-0" />
        </div>
      </div>

      {/* Enhanced notch with camera and sensors */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-8 bg-black rounded-b-lg z-20 flex items-center justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-800 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-gray-700"></div>
        </div>
        <div className="w-8 h-1 rounded-full bg-gray-800"></div>
        <div className="w-2 h-2 rounded-full bg-gray-800 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-gray-700"></div>
        </div>
      </div>

      {/* Phone content */}
      <div
        ref={contentContainerRef}
        className="relative h-full w-full overflow-hidden rounded-3xl bg-white dark:bg-gray-900"
      >
        {/* Screen reflection effect */}
        <div
          ref={screenReflectionRef}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-10"
          style={{
            borderRadius: "inherit",
            opacity: 0.2,
          }}
          aria-hidden="true"
        ></div>

        {/* Inner shadow for screen effect */}
        <div
          className="absolute inset-0 shadow-inner pointer-events-none z-10"
          style={{ borderRadius: "inherit" }}
          aria-hidden="true"
        ></div>

        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="absolute inset-0 flex flex-col items-center p-8 opacity-0"
          >
            <h3
              ref={(el) => sectionTitleRefs && (sectionTitleRefs.current[index] = el)}
              className="text-2xl font-semibold mb-3 text-center dark:text-white"
            >
              {section.title}
            </h3>

            {section.description && (
              <p
                ref={(el) => sectionDescRefs && (sectionDescRefs.current[index] = el)}
                className="text-sm mb-4 text-center text-gray-600 dark:text-gray-300"
              >
                {section.description}
              </p>
            )}

            <div
              ref={(el) => sectionContentRefs && (sectionContentRefs.current[index] = el)}
              className="flex-grow w-full flex items-center justify-center"
            >
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhoneMockup
