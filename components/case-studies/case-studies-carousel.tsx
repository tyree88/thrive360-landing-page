"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react"
import { CASE_STUDIES } from "@/lib/case-studies-data"
import { FlowButton } from "@/components/ui/flow-button"

export default function CaseStudiesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Only use featured case studies in the carousel
  const featuredCaseStudies = CASE_STUDIES.filter((study) => study.featured)
  const currentCase = featuredCaseStudies[currentIndex]

  const nextCase = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredCaseStudies.length)
  }

  const prevCase = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredCaseStudies.length) % featuredCaseStudies.length)
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextCase()
      }, 6000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentIndex])

  // Pause autoplay on hover
  const pauseAutoplay = () => setAutoplay(false)
  const resumeAutoplay = () => setAutoplay(true)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-thrive-purple-800 mb-4">
            Real results from real organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how organizations are transforming employee wellbeing
          </p>
        </div>

        {/* Case Study Carousel */}
        <div className="relative max-w-4xl mx-auto" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-16 z-10 hidden md:block">
            <button
              onClick={prevCase}
              className="p-3 rounded-full bg-white shadow-md text-thrive-purple-600 hover:text-thrive-purple-800 hover:bg-thrive-purple-50 transition-colors"
              aria-label="Previous case study"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-16 z-10 hidden md:block">
            <button
              onClick={nextCase}
              className="p-3 rounded-full bg-white shadow-md text-thrive-purple-600 hover:text-thrive-purple-800 hover:bg-thrive-purple-50 transition-colors"
              aria-label="Next case study"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Case Study Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <div className="h-12 w-24 relative mb-6">
                    {currentCase.logoUrl && (
                      <Image
                        src={currentCase.logoUrl || "/placeholder.svg"}
                        alt={`${currentCase.client} logo`}
                        fill
                        className="object-contain object-left"
                      />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-thrive-purple-800 mb-4">{currentCase.client}</h3>
                  <p className="text-gray-600 mb-4">{currentCase.summary}</p>

                  {currentCase.testimonial && (
                    <blockquote className="text-thrive-purple-600 mb-6 italic">
                      "{currentCase.testimonial.quote}"
                    </blockquote>
                  )}

                  <div className="space-y-3 mb-6">
                    {currentCase.results.slice(0, 3).map((result, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-16 text-thrive-purple-800 font-bold">{result.value}</div>
                        <div className="text-gray-600">{result.title}</div>
                      </div>
                    ))}
                  </div>

                  <FlowButton asChild>
                    <Link href={`/case-studies/${currentCase.id}`} className="inline-flex items-center">
                      Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </FlowButton>
                </div>

                {/* Media Section */}
                <div className="relative h-full min-h-[400px] bg-thrive-purple-50">
                  <Image
                    src={currentCase.imageUrl || "/placeholder.svg"}
                    alt={currentCase.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end p-6">
                    <div className="bg-white rounded-full p-4 mb-4 cursor-pointer hover:bg-thrive-purple-600 transition-colors group">
                      <Play className="h-6 w-6 text-thrive-purple-600 group-hover:text-white" />
                    </div>
                    <h4 className="text-white font-medium text-center text-lg">Watch {currentCase.client}'s Story</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredCaseStudies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoplay(false)
                  setTimeout(() => setAutoplay(true), 10000)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-thrive-purple-600 w-8"
                    : "bg-thrive-purple-200 hover:bg-thrive-purple-300"
                }`}
                aria-label={`Go to case study ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <FlowButton asChild variant="outline">
            <Link href="/case-studies">
              View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </FlowButton>
        </div>
      </div>
    </section>
  )
}
