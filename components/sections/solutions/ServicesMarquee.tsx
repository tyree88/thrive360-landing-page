"use client"

import type React from "react"

import { motion } from "framer-motion"

interface ServicesMarqueeProps {
  services: string[]
}

export const ServicesMarquee: React.FC<ServicesMarqueeProps> = ({ services }) => {
  // Duplicate the services array for continuous scrolling effect
  const marqueeServices = [...services, ...services]

  return (
    <div className="relative overflow-hidden py-6 bg-thrive-purple-50 rounded-xl">
      {/* Gradient fade on left */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-thrive-purple-50 to-transparent"></div>

      {/* Gradient fade on right */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-thrive-purple-50 to-transparent"></div>

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 30, repeat: Number.POSITIVE_INFINITY }}
      >
        {marqueeServices.map((service, index) => (
          <div
            key={index}
            className="mx-8 px-6 py-3 bg-white rounded-full shadow-sm border border-thrive-purple-100 text-thrive-purple-800 font-medium"
          >
            {service}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
