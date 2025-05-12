"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart3, TrendingUp, Users } from "lucide-react"
import { FlowButton } from "@/components/ui/flow-button"
import { CASE_STUDIES } from "@/lib/case-studies-data"

export default function FeaturedCaseStudy() {
  // Get the first featured case study
  const featuredStudy = CASE_STUDIES.find((study) => study.featured) || CASE_STUDIES[0]
  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "results">("challenge")

  const tabContent = {
    challenge: {
      title: "The Challenge",
      icon: <Users className="h-6 w-6 text-thrive-purple-600" />,
      content: featuredStudy.challenge,
    },
    solution: {
      title: "Our Solution",
      icon: <TrendingUp className="h-6 w-6 text-thrive-purple-600" />,
      content: featuredStudy.solution,
    },
    results: {
      title: "The Results",
      icon: <BarChart3 className="h-6 w-6 text-thrive-purple-600" />,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {featuredStudy.results.map((result, index) => (
            <div key={index} className="bg-thrive-purple-50 p-4 rounded-lg text-center">
              <div className="text-thrive-purple-600 font-bold text-2xl md:text-3xl">{result.value}</div>
              <div className="text-sm text-gray-600">{result.title}</div>
            </div>
          ))}
        </div>
      ),
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
            Featured Case Study
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-thrive-purple-800 mb-4">{featuredStudy.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{featuredStudy.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px]">
            <Image
              src={featuredStudy.imageUrl || "/placeholder.svg"}
              alt={featuredStudy.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-center gap-3">
                {featuredStudy.logoUrl && (
                  <div className="h-12 w-12 relative rounded-full bg-white p-1">
                    <Image
                      src={featuredStudy.logoUrl || "/placeholder.svg"}
                      alt={featuredStudy.client}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div>
                  <p className="text-white/80 text-sm">{featuredStudy.industry}</p>
                  <h3 className="text-white font-bold text-xl">{featuredStudy.client}</h3>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {(Object.keys(tabContent) as Array<keyof typeof tabContent>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center px-4 py-3 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-thrive-purple-600 text-thrive-purple-800"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="mr-2">{tabContent[tab].icon}</span>
                  {tabContent[tab].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {typeof tabContent[activeTab].content === "string" ? (
                <p className="text-gray-600 leading-relaxed">{tabContent[activeTab].content}</p>
              ) : (
                tabContent[activeTab].content
              )}
            </motion.div>

            {featuredStudy.testimonial && (
              <div className="bg-thrive-purple-50 p-6 rounded-lg border-l-4 border-thrive-purple-600 mb-8">
                <blockquote className="text-gray-700 italic mb-4">"{featuredStudy.testimonial.quote}"</blockquote>
                <div className="font-semibold">{featuredStudy.testimonial.author}</div>
                <div className="text-sm text-gray-600">{featuredStudy.testimonial.position}</div>
              </div>
            )}

            <FlowButton asChild>
              <Link href={`/case-studies/${featuredStudy.id}`} className="inline-flex items-center">
                Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </FlowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
