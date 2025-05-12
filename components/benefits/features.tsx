"use client"

import { motion } from "framer-motion"
import { Brain, Heart, TrendingUp, Users, Shield, BarChart3 } from "lucide-react"

const features = [
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "Mental Health Support",
    description: "Comprehensive mental health resources and support for all employees, accessible 24/7.",
  },
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: "Wellbeing Programs",
    description: "Personalized wellbeing programs that adapt to individual needs and preferences.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Performance Enhancement",
    description: "Tools and techniques to boost productivity and performance in the workplace.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Team Building",
    description: "Activities and resources designed to strengthen team bonds and improve collaboration.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Stress Management",
    description: "Effective strategies to manage stress and prevent burnout in high-pressure environments.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Data-Driven Insights",
    description: "Analytics and reporting to track progress and measure the impact of wellbeing initiatives.",
  },
]

export default function BenefitsFeatures() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Benefits for Your Organization</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Thrive360 offers a wide range of benefits designed to improve employee wellbeing, boost productivity, and
            create a positive workplace culture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-2 bg-primary/10 inline-block rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
