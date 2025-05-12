"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const BenefitsFinalCta = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-thrive-purple to-thrive-teal text-center">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Ready to turn well-being into your competitive advantage?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
        >
          <Button
            size="lg"
            className="bg-white text-thrive-purple font-bold py-4 px-10 rounded-lg shadow-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Book Your Workforce Demo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default BenefitsFinalCta
