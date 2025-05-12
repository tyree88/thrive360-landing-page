"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Feature {
  title: string
  description: string
}

interface SolutionsDescriptionProps {
  title?: string
  description?: string
  features?: Feature[]
}

export const SolutionsDescription: React.FC<SolutionsDescriptionProps> = ({
  title = "Digital Solutions That Drive Results",
  description = "We create digital experiences that engage users, streamline workflows, and deliver measurable business outcomes.",
  features = [],
}) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-thrive-purple-100 p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl font-bold text-thrive-purple-900 mb-4">{title}</h3>
      <p className="text-lg text-thrive-purple-700 mb-8">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features && features.length > 0 ? (
          features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-5 shadow-md border border-thrive-purple-50"
            >
              <h4 className="text-xl font-semibold text-thrive-purple-800 mb-2">{feature.title}</h4>
              <p className="text-thrive-purple-600">{feature.description}</p>
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-4">
            <p className="text-thrive-purple-500 italic">No features available</p>
          </div>
        )}
      </div>
    </div>
  )
}
