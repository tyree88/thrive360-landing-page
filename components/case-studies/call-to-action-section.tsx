"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

interface CallToActionSectionProps {
  sectionVariants: any
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      className="py-16 md:py-24 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-r from-primary/20 via-purple-400/20 to-pink-500/20 opacity-70"></div>
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center bg-card p-8 md:p-12 rounded-lg shadow-2xl">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to See Thrive360 in Action?</h3>
            <p className="text-muted-foreground mb-6">
              Discover how our platform can transform your organization's well-being.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-400 hover:from-primary/90 hover:to-purple-400/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform"
            >
              <PlayCircle className="mr-2 h-5 w-5" /> See Live Demo Videos
            </Button>
          </motion.div>
          <motion.div
            className="text-center md:text-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Partner With Us</h3>
            <p className="text-muted-foreground mb-6">Become a content provider or get in touch to learn more.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <Button size="lg" variant="outline">
                Become a Content Provider
              </Button>
              <Button size="lg" variant="ghost" className="text-primary hover:text-primary/80">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default CallToActionSection
