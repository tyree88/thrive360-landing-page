"use client"

import { motion } from "framer-motion"
import { FlowButton } from "@/components/ui/flow-button"

export default function BenefitsCta() {
  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Workplace?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Join the thousands of organizations that have improved employee wellbeing, productivity, and retention with
            Thrive360.
          </p>
          <FlowButton text="Get Started" />
        </motion.div>
      </div>
    </section>
  )
}
