"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Users, BarChart2, Smartphone, Settings, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollAnimationGroup } from "../scroll-animation"

const capabilities = [
  {
    icon: <Zap className="w-8 h-8 text-thrive-purple-light" />,
    title: "Neuroplastic Engagement™",
    impact: "• +82% program adoption\n• –72% stress-related absences",
  },
  {
    icon: <Users className="w-8 h-8 text-thrive-teal-light" />,
    title: "Dynamic Well-being Journeys",
    impact: '"Tailored paths for managers, frontline, remote teams"',
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-green-400" />,
    title: "Real-Time Analytics & Alerts",
    impact: '"Spot engagement dips before they become turnover spikes"',
  },
  {
    icon: <Smartphone className="w-8 h-8 text-blue-400" />,
    title: "Custom Branded Experience",
    impact: '"White-labeled portal & mobile app—your brand, your ethos"',
  },
  {
    icon: <Settings className="w-8 h-8 text-orange-400" />,
    title: "Team & Leader Dashboards",
    impact: '"Heatmaps of department well-being, action plans for your managers"',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-400" />,
    title: "API & Single-Sign-On",
    impact: '"Seamless to deploy within your existing HR tech stack"',
  },
]

const BenefitsCapabilities = () => {
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
          Capabilities & Business Outcomes
        </motion.h2>

        <ScrollAnimationGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerChildren={0.1}
          childVariants={{
            hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
          }}
        >
          {capabilities.map((capability, index) => (
            <Card
              key={index}
              className="glassmorphic border-thrive-purple/30 hover:shadow-xl hover:border-thrive-purple transition-all duration-300 flex flex-col h-full"
            >
              <CardHeader className="flex-row items-center space-x-4">
                {capability.icon}
                <CardTitle className="text-xl text-gray-100">{capability.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-300 whitespace-pre-line">{capability.impact}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollAnimationGroup>
      </div>
    </section>
  )
}

export default BenefitsCapabilities
