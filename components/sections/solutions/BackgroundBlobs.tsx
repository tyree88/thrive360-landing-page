"use client"

import { motion } from "framer-motion"

export function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top-right blob */}
      <motion.div
        className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-thrive-purple-100 rounded-full opacity-30 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Bottom-left blob */}
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-thrive-purple-200 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Center blob */}
      <motion.div
        className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-thrive-purple-300 rounded-full opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}
