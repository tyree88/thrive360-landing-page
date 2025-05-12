"use client"

import { FlowButton } from "../ui/flow-button"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThriveLogo } from "@/components/ui/thrive-logo"

// Define the Sphere component
const Sphere = ({ size, position, delay, duration, color }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} opacity-70 blur-sm`}
      style={{
        width: size,
        height: size,
        top: position.y + "%",
        left: position.x + "%",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.2, 1],
        x: [0, position.xMove, 0],
        y: [0, position.yMove, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

// Define the FloatingSpheres component
const FloatingSpheres = ({ count = 20 }) => {
  const [spheres, setSpheres] = useState([])

  useEffect(() => {
    // Generate random spheres on component mount
    const newSpheres = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 30 + 10 // 10-40px
      const x = Math.random() * 100 // 0-100%
      const y = Math.random() * 100 // 0-100%
      const xMove = (Math.random() - 0.5) * 100 // -50 to 50px
      const yMove = (Math.random() - 0.5) * 100 // -50 to 50px
      const delay = Math.random() * 2 // 0-2s
      const duration = Math.random() * 10 + 10 // 10-20s

      // Choose a color class randomly
      const colors = ["bg-primary/30", "bg-secondary/30", "bg-purple-300/30", "bg-indigo-300/30", "bg-violet-300/30"]
      const color = colors[Math.floor(Math.random() * colors.length)]

      return { size, position: { x, y, xMove, yMove }, delay, duration, color }
    })

    setSpheres(newSpheres)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {spheres.map((sphere, i) => (
        <Sphere key={i} {...sphere} />
      ))}
    </div>
  )
}

const BenefitsHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-transparent">
      {/* Floating spheres background */}
      <FloatingSpheres count={30} />

      {/* Main content - vertically and horizontally centered */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center flex-grow z-10">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <ThriveLogo variant="black" type="full" size="large" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-slate-800">
            Innovative solutions designed to elevate your brand and engage your audience
          </h1>
          <FlowButton
            size="lg"
            className="bg-white hover:bg-white/90 text-primary border border-primary/20 font-medium py-2 px-8 rounded-full shadow-sm"
          >
            Get Started
          </FlowButton>
        </motion.div>
      </div>

      {/* Down arrow at bottom */}
      <motion.div
        className="mb-8 absolute bottom-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link href="#features">
          <ChevronDown className="h-8 w-8 text-slate-700 cursor-pointer" />
        </Link>
      </motion.div>
    </section>
  )
}

export default BenefitsHero
