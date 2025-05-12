"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Building2, Briefcase, Stethoscope, GraduationCap, ShoppingBag, Cpu } from "lucide-react"
import { FlowButton } from "../ui/flow-button"
import { useMobile } from "@/hooks/use-mobile"

const businessTypes = [
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    description: "Improve employee wellbeing and productivity across large organizations",
    color: "from-blue-500 to-blue-600",
    image: "/abstract-tech-logo.png",
  },
  {
    id: "professional",
    name: "Professional Services",
    icon: Briefcase,
    description: "Support high-performing teams with mental health and wellness resources",
    color: "from-purple-500 to-purple-600",
    image: "/finance-company-logo.png",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    description: "Reduce burnout and improve care quality through staff wellbeing",
    color: "from-green-500 to-green-600",
    image: "/healthcare-logo.png",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    description: "Support faculty and staff wellness to enhance educational outcomes",
    color: "from-yellow-500 to-yellow-600",
    image: "/diverse-classroom-teacher.png",
  },
  {
    id: "retail",
    name: "Retail",
    icon: ShoppingBag,
    description: "Reduce turnover and improve customer service through employee support",
    color: "from-red-500 to-red-600",
    image: "/generic-retail-logo.png",
  },
  {
    id: "technology",
    name: "Technology",
    icon: Cpu,
    description: "Maintain innovation and prevent burnout in fast-paced environments",
    color: "from-indigo-500 to-indigo-600",
    image: "/modern-retail-tech.png",
  },
]

const benefits = [
  {
    title: "32% Reduction",
    description: "in employee turnover",
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    title: "27% Increase",
    description: "in employee productivity",
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
  },
  {
    title: "41% Decrease",
    description: "in absenteeism",
    color: "bg-gradient-to-br from-pink-500 to-red-600",
  },
  {
    title: "3.8x ROI",
    description: "on wellness investment",
    color: "bg-gradient-to-br from-green-500 to-teal-600",
  },
]

export default function BusinessesOverview() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const isMobile = useMobile()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-light-purple-50 to-white z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-thrive-purple-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-light-purple-300 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-thrive-purple-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transform Your Business with Thrive360
            </motion.h1>
            <motion.p
              className="text-xl text-thrive-purple-700 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Enhance employee wellbeing, boost productivity, and improve retention with our comprehensive wellness
              platform
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-xl p-6 text-white shadow-lg" style={{ background: benefit.color }}>
                <h3 className="text-3xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-white/90">{benefit.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/business-solutions">
              <FlowButton className="bg-gradient-to-r from-thrive-purple-500 to-light-purple-400 hover:from-thrive-purple-600 hover:to-light-purple-500 text-white rounded-full px-8 py-6 text-lg shadow-md shadow-light-purple-200/30">
                Explore Detailed Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </FlowButton>
            </Link>
            <FlowButton
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-thrive-purple-300 text-thrive-purple-700 hover:bg-thrive-purple-50"
            >
              Schedule a Demo
            </FlowButton>
          </motion.div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-thrive-purple-900 mb-4">Solutions for Every Business</h2>
            <p className="text-lg text-thrive-purple-700 max-w-3xl mx-auto">
              Thrive360 adapts to the unique needs of different industries and business types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessTypes.map((business) => (
              <Link
                href="/business-solutions"
                key={business.id}
                onMouseEnter={() => setHoveredCard(business.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className={`h-3 w-full bg-gradient-to-r ${business.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${business.color} text-white mr-3`}>
                        <business.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-thrive-purple-900">{business.name}</h3>
                    </div>

                    <p className="text-thrive-purple-700 mb-6">{business.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-thrive-purple-500 font-medium">
                        Learn more
                        <ArrowRight
                          className={`ml-2 h-4 w-4 transition-transform duration-300 ${hoveredCard === business.id ? "translate-x-1" : ""}`}
                        />
                      </div>

                      <div className="w-10 h-10 relative">
                        <Image
                          src={business.image || "/placeholder.svg"}
                          alt={`${business.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-thrive-purple-500 to-light-purple-400 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 lg:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your workplace?</h2>
              <p className="text-white/90 text-lg max-w-2xl">
                Discover how Thrive360 can be tailored to your specific business needs with our comprehensive solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/business-solutions">
                <FlowButton className="bg-white text-thrive-purple-700 hover:bg-gray-100 rounded-full px-8 py-6 text-lg">
                  View Detailed Solutions
                </FlowButton>
              </Link>
              <FlowButton
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-white text-white hover:bg-white/10"
              >
                Contact Sales
              </FlowButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
