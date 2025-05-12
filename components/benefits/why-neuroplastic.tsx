"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { BrainCircuit, Zap, TrendingUp } from "lucide-react"
import { ScrollAnimation } from "../scroll-animation"
import { useRef } from "react"

const BenefitsWhyNeuroplastic = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-thrive-purple-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-thrive-teal-light to-white">
            Why Neuroplastic Engagement™ Matters to You
          </h2>
          <p className="text-2xl md:text-3xl font-semibold text-center text-thrive-purple-light mb-12">
            Engagement That Rewires Habits—At Scale
          </p>
        </ScrollAnimation>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <ScrollAnimation
            className="lg:w-1/2 text-lg text-gray-200 space-y-6"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <p>
              Thrive360 embeds small, personalized micro-interventions into your employees' daily flow—retraining
              mindsets, cutting stress spikes, and building habits that stick.
            </p>
            <p>
              Our approach leverages the brain's natural ability to adapt and change, fostering lasting improvements in
              well-being and performance. This isn't just another wellness program; it's a fundamental shift in how your
              workforce operates and thrives.
            </p>
          </ScrollAnimation>

          <motion.div className="lg:w-1/2" style={{ opacity, scale }}>
            <div className="p-6 rounded-xl glassmorphic border-thrive-teal/50 shadow-2xl">
              <h3 className="text-xl font-semibold text-center mb-6 text-thrive-teal-light">
                Animated Diagram: Path to ROI
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-around space-y-4 sm:space-y-0 sm:space-x-4 text-center">
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  whileInView={{
                    y: [10, 0, 10],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                    },
                  }}
                  viewport={{ once: false, amount: 0.8 }}
                >
                  <BrainCircuit className="w-16 h-16 text-thrive-purple-light mb-2" />
                  <p className="font-medium text-gray-100">Employee</p>
                </motion.div>
                <Zap className="w-8 h-8 text-gray-400 transform sm:rotate-0 rotate-90" />
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  whileInView={{
                    y: [0, -10, 0],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                  }}
                  viewport={{ once: false, amount: 0.8 }}
                >
                  <div className="p-3 bg-thrive-teal rounded-full mb-2">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <p className="font-medium text-gray-100">Thrive360 Micro-Nudges</p>
                </motion.div>
                <Zap className="w-8 h-8 text-gray-400 transform sm:rotate-0 rotate-90" />
                <motion.div
                  className="flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                  whileInView={{
                    y: [10, 0, 10],
                    transition: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                      delay: 1,
                    },
                  }}
                  viewport={{ once: false, amount: 0.8 }}
                >
                  <TrendingUp className="w-16 h-16 text-green-400 mb-2" />
                  <p className="font-medium text-gray-100">Rewired Behavior & KPI Lift</p>
                </motion.div>
              </div>
              <p className="text-xs text-center mt-4 text-gray-400">
                Visual: Employee → Thrive360 Micro-Nudges → Rewired Behavior → Business KPI Lift
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsWhyNeuroplastic
