"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type TransitionStyle = "fade" | "slide" | "reveal" | "wave" | "gradient"

interface SectionTransitionProps {
  id?: string
  style?: TransitionStyle
  direction?: "up" | "down"
  color?: string
  height?: number
  className?: string
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  id,
  style = "fade",
  direction = "up",
  color = "from-indigo-900 to-purple-900",
  height = 200,
  className = "",
}) => {
  const transitionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "end start"],
  })

  // Transform values based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    direction === "up" ? [height / 2, 0, -height / 2] : [-height / 2, 0, height / 2],
  )

  // Wave effect parameters
  const waveProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    if (!transitionRef.current) return

    // Additional GSAP animations for specific transition styles
    if (style === "reveal") {
      gsap.fromTo(
        transitionRef.current,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          scrollTrigger: {
            trigger: transitionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === transitionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [style])

  // Render different transition styles
  const renderTransition = () => {
    switch (style) {
      case "fade":
        return <motion.div className={`absolute inset-0 bg-gradient-to-b ${color} ${className}`} style={{ opacity }} />
      case "slide":
        return <motion.div className={`absolute inset-0 bg-gradient-to-b ${color} ${className}`} style={{ y }} />
      case "reveal":
        return <div className={`absolute inset-0 bg-gradient-to-b ${color} ${className}`} />
      case "wave":
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 w-full"
              style={{
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%234338ca' fillOpacity='0.5' d='M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundSize: "cover",
                y: waveProgress,
              }}
            />
          </div>
        )
      case "gradient":
        return (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-b ${color} backdrop-blur-sm ${className}`}
            style={{
              opacity,
              filter: "blur(8px)",
            }}
          />
        )
      default:
        return <motion.div className={`absolute inset-0 bg-gradient-to-b ${color} ${className}`} style={{ opacity }} />
    }
  }

  return (
    <div
      id={id}
      ref={transitionRef}
      className="relative w-full pointer-events-none z-10"
      style={{ height: `${height}px` }}
    >
      {renderTransition()}
    </div>
  )
}

export default SectionTransition
