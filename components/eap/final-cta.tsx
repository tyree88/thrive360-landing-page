"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FlowButton } from "@/components/ui/flow-button"

const FinalCtaSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 200) {
        setIsVisible(true)
      } else if (
        window.scrollY < document.documentElement.scrollHeight - window.innerHeight - 400 &&
        window.scrollY > 300
      ) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const atPageBottom = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setIsVisible(true)
      }
    }

    const handleScroll = () => {
      toggleVisibility()
      atPageBottom()
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          <div className="bg-background border-t border-border shadow-2xl p-6">
            <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-primary">Ready to transform your EAP?</h3>
                <p className="text-muted-foreground text-sm md:text-md">
                  Turn it into a habit-forming engine for employee wellbeing.
                </p>
              </div>
              <FlowButton text="Request a Personalized Demo" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FinalCtaSection
