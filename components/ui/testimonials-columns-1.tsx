"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  text: string
  image: string
  name: string
  role: string
}

interface TestimonialsColumnProps {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}

export const TestimonialsColumn = ({ className, testimonials, duration = 15 }: TestimonialsColumnProps) => {
  return (
    <div
      className={cn("space-y-8 animate-marquee w-full", className)}
      style={{
        animationDuration: `${duration}s`,
      }}
    >
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="bg-light-purple-50 rounded-xl shadow-md p-6 flex flex-col text-left relative overflow-hidden border border-light-purple-100 mb-6"
                  key={i}
                >
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="text-thrive-purple-600 mb-6">{text}</div>
                    <div className="flex items-center gap-2">
                      <img
                        width={40}
                        height={40}
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="h-10 w-10 rounded-full border-2 border-thrive-purple-200"
                      />
                      <div className="flex flex-col">
                        <div className="font-medium tracking-tight leading-5 text-thrive-purple-800">{name}</div>
                        <div className="leading-5 text-thrive-purple-600 tracking-tight">{role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
