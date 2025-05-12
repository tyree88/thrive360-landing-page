"use client"

import type React from "react"
import { motion } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

interface HeroSectionProps {
  sectionVariants: any
}

const CaseStudiesHero: React.FC<HeroSectionProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      className="relative py-20 md:py-32 min-h-[70vh] flex items-center justify-center text-center bg-gradient-to-br from-purple-100 via-background to-pink-50"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="container px-4 mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-500"
          variants={itemVariants}
          custom={0}
        >
          Case Studies
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-4 font-semibold"
          variants={itemVariants}
          custom={1}
        >
          Documented Success • Backed by Medical & Scientific Data
        </motion.p>
        <motion.p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto" variants={itemVariants} custom={2}>
          Explore real-world outcomes from our pilot studies in corporations, hospitals, and beyond. See how
          neuroplastic engagement drives measurable improvements.
        </motion.p>
      </div>
    </motion.section>
  )
}

export default CaseStudiesHero
