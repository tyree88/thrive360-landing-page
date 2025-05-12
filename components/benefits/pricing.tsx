"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { FlowButton } from "../ui/flow-button"
import { Check, Star, Zap, Users, Settings } from "lucide-react"
import { motion } from "framer-motion"

const pricingTiers = [
  {
    name: "Starter",
    icon: <Zap className="w-10 h-10 text-thrive-purple-light" />,
    description: "Core Neuroplastic package for up to 500 employees",
    features: [
      "Neuroplastic Engagement™ Platform",
      "Basic Well-being Journeys",
      "Standard Analytics Dashboard",
      "Email Support",
    ],
    cta: "Choose Starter",
  },
  {
    name: "Enterprise",
    icon: <Star className="w-10 h-10 text-yellow-400" />,
    description: "Fully branded, API-enabled, custom content + dedicated CSM",
    features: [
      "All Starter Features",
      "Custom Branded Portal & App",
      "API & SSO Integration",
      "Advanced Analytics & Alerts",
      "Dedicated Customer Success Manager",
      "Custom Content Modules",
    ],
    cta: "Get Enterprise Quote",
    highlight: true,
  },
]

const addOns = [
  {
    name: "Leadership Mastery Series",
    icon: <Users className="w-6 h-6 text-thrive-teal" />,
  },
  {
    name: "Burnout Prevention Toolkit",
    icon: <Settings className="w-6 h-6 text-thrive-teal" />,
  },
]

const BenefitsPricing = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

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
          Partnership & Pricing Models
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="h-full"
            >
              <Card
                className={`flex flex-col glassmorphic h-full ${tier.highlight ? "border-thrive-teal-light shadow-2xl lg:scale-105" : "border-thrive-purple/50"}`}
              >
                <CardHeader className="items-center text-center">
                  {tier.icon}
                  <CardTitle className="text-3xl mt-4 text-gray-100">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-md h-12">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <FlowButton
                    size="lg"
                    className={`w-full ${tier.highlight ? "bg-gradient-to-r from-thrive-teal hover:from-thrive-teal-light to-thrive-purple hover:to-thrive-purple-light text-white" : "bg-thrive-purple hover:bg-thrive-purple-light text-white"}`}
                  >
                    {tier.cta}
                  </FlowButton>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h3 className="text-3xl font-semibold text-center mb-6 text-thrive-teal-light">Optional Add-Ons</h3>
          <div className="max-w-md mx-auto space-y-4">
            {addOns.map((addon) => (
              <Card key={addon.name} className="glassmorphic border-thrive-teal/30">
                <CardContent className="p-4 flex items-center space-x-3">
                  {addon.icon}
                  <p className="text-lg text-gray-200">{addon.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <FlowButton
            size="lg"
            className="bg-gradient-to-r from-thrive-teal hover:from-thrive-teal-light to-thrive-purple hover:to-thrive-purple-light text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Get Your Tailored Proposal
          </FlowButton>
        </motion.div>
      </div>
    </section>
  )
}

export default BenefitsPricing
