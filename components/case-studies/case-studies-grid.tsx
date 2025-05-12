"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CASE_STUDIES, INDUSTRIES, TAGS } from "@/lib/case-studies-data"
import { Badge } from "@/components/ui/badge"
import { FlowButton } from "@/components/ui/flow-button"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function CaseStudiesGrid() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Filter case studies based on selected industry and tag
  const filteredCaseStudies = CASE_STUDIES.filter((study) => {
    const matchesIndustry = !selectedIndustry || study.industry === selectedIndustry
    const matchesTag = !selectedTag || study.tags.includes(selectedTag)
    return matchesIndustry && matchesTag
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4"
          >
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-thrive-purple-800 mb-4"
          >
            Real Results for Real Organizations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            See how organizations are transforming employee wellbeing and achieving measurable outcomes
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Filter by Industry</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  onClick={() => setSelectedIndustry(null)}
                  className={`cursor-pointer ${
                    !selectedIndustry
                      ? "bg-thrive-purple-600 hover:bg-thrive-purple-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  All Industries
                </Badge>
                {INDUSTRIES.map((industry) => (
                  <Badge
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`cursor-pointer ${
                      selectedIndustry === industry
                        ? "bg-thrive-purple-600 hover:bg-thrive-purple-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Filter by Focus Area</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  onClick={() => setSelectedTag(null)}
                  className={`cursor-pointer ${
                    !selectedTag
                      ? "bg-thrive-purple-600 hover:bg-thrive-purple-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  All Areas
                </Badge>
                {TAGS.map((tag) => (
                  <Badge
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`cursor-pointer ${
                      selectedTag === tag
                        ? "bg-thrive-purple-600 hover:bg-thrive-purple-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCaseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={study.imageUrl || "/placeholder.svg"}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {study.featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-thrive-purple-600 text-white">Featured</Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-700">{study.industry}</Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {study.logoUrl && (
                    <div className="h-10 w-10 relative rounded-full bg-white p-1 border border-gray-100">
                      <Image
                        src={study.logoUrl || "/placeholder.svg"}
                        alt={study.client}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-thrive-purple-800">{study.client}</h3>
                </div>

                <h4 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">{study.title}</h4>

                <p className="text-gray-600 mb-4 line-clamp-3">{study.summary}</p>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  {study.results.slice(0, 3).map((result, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-thrive-purple-600 font-bold text-lg">{result.value}</div>
                      <div className="text-xs text-gray-500 line-clamp-2">{result.title}</div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {study.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {study.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{study.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Link
                    href={`/case-studies/${study.id}`}
                    className="text-thrive-purple-600 font-medium flex items-center hover:text-thrive-purple-800 transition-colors"
                  >
                    View Case <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCaseStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No case studies match your current filters. Try adjusting your selection.</p>
            <FlowButton
              onClick={() => {
                setSelectedIndustry(null)
                setSelectedTag(null)
              }}
              className="mt-4"
            >
              Reset Filters
            </FlowButton>
          </div>
        )}
      </div>
    </section>
  )
}
