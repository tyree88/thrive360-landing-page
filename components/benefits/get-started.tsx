"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud, PlayCircle, Scaling } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: <UploadCloud className="w-12 h-12 text-thrive-purple-light" />,
    title: "1. Data Connect",
    description: '"Import basic HR & engagement data—no dev lift."',
  },
  {
    icon: <PlayCircle className="w-12 h-12 text-thrive-teal-light" />,
    title: "2. Launch Pilot",
    description: '"96-hour setup, then auto-deliver micro-lessons & alerts."',
  },
  {
    icon: <Scaling className="w-12 h-12 text-green-400" />,
    title: "3. Scale & Optimize",
    description: '"Roll out to all teams, track ROI in real-time dashboards."',
  },
]

const BenefitsGetStarted = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 to-thrive-purple-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-thrive-teal-light to-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          How to Get Started
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="glassmorphic border-thrive-teal/40 hover:shadow-2xl hover:border-thrive-teal transition-all duration-300 text-center h-full">
                <CardHeader className="items-center">
                  {step.icon}
                  <CardTitle className="mt-4 text-2xl text-gray-100">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsGetStarted
