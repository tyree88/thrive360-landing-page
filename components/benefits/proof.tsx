"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlowButton } from "../ui/flow-button"
import { Quote, Building, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

const logos = [
  { name: "Acme Corp", description: "Innovative solutions by Acme Corp" },
  { name: "InnovateX", description: "Cutting-edge technology from InnovateX" },
  { name: "GreenHealth", description: "Sustainable practices at GreenHealth" },
  { name: "Future Solutions", description: "Forward-thinking by Future Solutions" },
  { name: "Synergy Systems", description: "Collaborative efforts of Synergy Systems" },
]

const LogoCarousel = () => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold text-center mb-8 text-thrive-teal-light">Trusted by leading brands:</h3>
      <div className="overflow-hidden relative h-20">
        <motion.div
          className="flex absolute left-0"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Number.POSITIVE_INFINITY }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 w-48 h-20 flex items-center justify-center mx-4">
              <img
                className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                alt={logo.name + " logo"}
                src={`/abstract-geometric-shapes.png?height=48&width=120&query=${logo.name}%20logo`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

const BenefitsProof = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-thrive-purple-light to-thrive-teal-light"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          Proof & Social Validation
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="max-w-2xl mx-auto glassmorphic border-thrive-purple/50 shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Building className="w-8 h-8 text-thrive-purple-light" />
                <CardTitle className="text-2xl text-gray-100">Case Study: Global Tech Firm</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-lg text-gray-200">
                  <strong>Result:</strong> Cut attrition by 28%, saved $2.4M in recruiting costs.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Quote className="w-6 h-6 text-thrive-teal-light mt-1 flex-shrink-0 transform -scale-x-100" />
                <blockquote className="text-lg italic text-gray-300 border-l-4 border-thrive-teal pl-4">
                  "Thrive360 was our culture game-changer. The tangible ROI and the shift in employee morale were beyond
                  our expectations."
                </blockquote>
              </div>
              <div className="pt-4">
                <FlowButton
                  variant="outline"
                  className="border-thrive-teal text-thrive-teal-light hover:bg-thrive-teal hover:text-white"
                >
                  Read Full Case Study
                </FlowButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <LogoCarousel />
      </div>
    </section>
  )
}

export default BenefitsProof
