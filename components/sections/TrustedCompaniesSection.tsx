"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// Define the company data
const companies = [
  {
    id: "arcbest",
    name: "ArcBest",
    logo: "/logos/arcbest-logo.png",
    description:
      "Leading logistics company ArcBest enables its employees to find, access, and utilize the right program at the right time.",
    stats: [
      { value: "86%", label: "of employees registered" },
      { value: "72%", label: "employee monthly average users" },
      { value: "24K+", label: "searches to find care, benefit programs, and healthcare information" },
    ],
    image: "/images/truck-driver.jpg",
  },
  {
    id: "kroger",
    name: "Kroger",
    logo: "/logos/kroger-logo.png",
    description:
      "Retail giant Kroger improved employee wellbeing and reduced healthcare costs through personalized mental health support.",
    stats: [
      { value: "92%", label: "program satisfaction rate" },
      { value: "68%", label: "reduction in stress-related absences" },
      { value: "3.2x", label: "return on benefits investment" },
    ],
    image: "/images/retail-employee.jpg",
  },
  {
    id: "piedmont",
    name: "Piedmont Healthcare",
    logo: "/logos/piedmont-logo.png",
    description:
      "Piedmont Healthcare saw significant improvements in staff retention and wellbeing metrics after implementing Thrive360.",
    stats: [
      { value: "41%", label: "decrease in burnout reports" },
      { value: "78%", label: "of staff actively engaged" },
      { value: "29%", label: "improvement in retention rates" },
    ],
    image: "/images/healthcare-worker.jpg",
  },
  {
    id: "summit",
    name: "Summit Materials",
    logo: "/logos/summit-logo.png",
    description:
      "Construction materials company Summit Materials enhanced safety outcomes by addressing employee mental health.",
    stats: [
      { value: "54%", label: "reduction in workplace incidents" },
      { value: "81%", label: "of employees report improved focus" },
      { value: "12.5M", label: "in savings from reduced incidents" },
    ],
    image: "/images/construction-worker.jpg",
  },
]

export default function TrustedCompaniesSection() {
  const [activeCompany, setActiveCompany] = useState(companies[0])

  return (
    <section className="py-24 bg-gradient-to-b from-[#f5f5ff] to-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 max-w-5xl mx-auto"
        >
          Trusted by Fortune 500 companies to maximize member engagement and optimize benefits investments
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Company Selection */}
          <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => setActiveCompany(company)}
                className={`flex-shrink-0 p-4 border rounded-lg transition-all duration-300 ${
                  activeCompany.id === company.id
                    ? "border-l-4 border-thrive-purple shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="h-12 relative flex items-center">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={`${company.name} logo`}
                    width={120}
                    height={48}
                    className="object-contain h-full w-auto"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Case Study Content */}
          <motion.div
            key={activeCompany.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full lg:w-3/4 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="p-8 lg:p-12 lg:w-1/2">
                <h3 className="text-2xl font-bold mb-4">{activeCompany.name}</h3>
                <p className="text-gray-700 mb-8">{activeCompany.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {activeCompany.stats.map((stat, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-3xl font-bold text-thrive-purple">{stat.value}</span>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${activeCompany.id}`}
                  className="inline-flex items-center text-thrive-purple font-medium hover:underline"
                >
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="lg:w-1/2 h-64 lg:h-auto relative">
                <Image
                  src={activeCompany.image || "/placeholder.svg"}
                  alt={`${activeCompany.name} case study`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
