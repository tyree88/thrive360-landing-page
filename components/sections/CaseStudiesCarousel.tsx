"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CaseStudiesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const caseStudies = [
    {
      id: 1,
      logo: "/digital-sphere-logo.png",
      logoAlt: "UFCU logo",
      title: "UFCU",
      quote:
        "Thrive360 has been a game-changer for our workforce, with engagement rates 5x higher than our previous solution.",
      stats: [
        { value: "78%", label: "of employees actively engaged" },
        { value: "41%", label: "reduction in reported stress" },
        { value: "3.2x", label: "ROI on healthcare costs" },
      ],
      link: "/case-studies/ufcu",
      videoThumbs: ["/corporate-executive-meeting.png", "/diverse-office-team.png"],
    },
    {
      id: 2,
      logo: "/modern-retail-tech.png",
      logoAlt: "Palo Alto Networks logo",
      title: "Palo Alto Networks",
      quote:
        "Our employees now have access to mental health support that truly meets them where they are, regardless of their location or specific needs.",
      person: {
        image: "/avatar-sarah.png",
        name: "Sarah Johnson",
        title: "Chief People Officer, Palo Alto Networks",
      },
      link: "/case-studies/palo-alto-networks",
      videoThumbs: ["/placeholder.svg?key=nc6ht", "/modern-office-collaboration.png"],
    },
    {
      id: 3,
      logo: "/healthcare-logo.png",
      logoAlt: "Healthcare Corp logo",
      title: "Healthcare Corp",
      quote:
        "The personalized approach has helped us address the unique mental health needs of our healthcare staff, especially after the challenges of recent years.",
      stats: [
        { value: "65%", label: "reduction in burnout indicators" },
        { value: "47%", label: "increase in staff retention" },
        { value: "4.8/5", label: "average user satisfaction" },
      ],
      link: "/case-studies/healthcare-corp",
      videoThumbs: ["/placeholder.svg?key=k2h3j", "/healthcare-workers-hospital.png"],
    },
  ]

  const nextCase = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudies.length)
  }

  const prevCase = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + caseStudies.length) % caseStudies.length)
  }

  const currentCase = caseStudies[currentIndex]

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 text-sm font-medium bg-light-purple-100 text-thrive-purple-700 rounded-full mb-4"
          >
            Success Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-thrive-purple-800 mb-4"
          >
            Real results from real organizations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-thrive-purple-600 max-w-3xl mx-auto"
          >
            See how organizations are transforming employee wellbeing
          </motion.p>
        </div>

        {/* Case Study Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-16 z-10 hidden md:block">
            <button
              onClick={prevCase}
              className="p-3 rounded-full bg-white shadow-md text-thrive-purple-600 hover:text-thrive-purple-800 hover:bg-light-purple-50 transition-colors"
              aria-label="Previous case study"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-16 z-10 hidden md:block">
            <button
              onClick={nextCase}
              className="p-3 rounded-full bg-white shadow-md text-thrive-purple-600 hover:text-thrive-purple-800 hover:bg-light-purple-50 transition-colors"
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
              className="bg-white rounded-xl shadow-md overflow-hidden border border-light-purple-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8">
                  <div className="h-8 w-24 relative mb-6">
                    <Image
                      src={currentCase.logo || "/placeholder.svg"}
                      alt={currentCase.logoAlt}
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-thrive-purple-800 mb-4">{currentCase.title}</h3>
                  <blockquote className="text-thrive-purple-600 mb-6 italic">"{currentCase.quote}"</blockquote>

                  {currentCase.stats ? (
                    <div className="space-y-3 mb-6">
                      {currentCase.stats.map((stat, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-12 text-thrive-purple-800 font-bold">{stat.value}</div>
                          <div className="text-thrive-purple-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : currentCase.person ? (
                    <div className="flex items-start mb-6">
                      <div className="w-12 h-12 rounded-full bg-light-purple-100 mr-4 relative overflow-hidden">
                        <Image
                          src={currentCase.person.image || "/placeholder.svg"}
                          alt={currentCase.person.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-thrive-purple-800">{currentCase.person.name}</div>
                        <div className="text-sm text-thrive-purple-600">{currentCase.person.title}</div>
                      </div>
                    </div>
                  ) : null}

                  <Link
                    href={currentCase.link}
                    className="inline-flex items-center text-thrive-purple-600 font-medium hover:text-thrive-purple-700"
                  >
                    Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>

                {/* Video Slots */}
                <div className="flex flex-col space-y-4 p-4">
                  {/* Video 1: Leadership */}
                  <div className="relative rounded-lg overflow-hidden flex-1 group cursor-pointer">
                    <Image
                      src={currentCase.videoThumbs[0] || "/placeholder.svg"}
                      alt={`${currentCase.title} leadership video`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-3 mb-3 group-hover:bg-thrive-purple-600 transition-colors">
                        <Play className="h-6 w-6 text-thrive-purple-600 group-hover:text-white" />
                      </div>
                      <h4 className="text-white font-medium text-center px-4 text-shadow">
                        Hear from {currentCase.title} Leadership
                      </h4>
                    </div>
                  </div>

                  {/* Video 2: Employees */}
                  <div className="relative rounded-lg overflow-hidden flex-1 group cursor-pointer">
                    <Image
                      src={currentCase.videoThumbs[1] || "/placeholder.svg"}
                      alt={`${currentCase.title} employees video`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-3 mb-3 group-hover:bg-thrive-purple-600 transition-colors">
                        <Play className="h-6 w-6 text-thrive-purple-600 group-hover:text-white" />
                      </div>
                      <h4 className="text-white font-medium text-center px-4 text-shadow">
                        Hear from {currentCase.title} Employees
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-6 space-x-2 md:hidden">
            <button
              onClick={prevCase}
              className="p-2 rounded-full bg-white shadow-md text-thrive-purple-600 hover:text-thrive-purple-800 hover:bg-light-purple-50 transition-colors"
              aria-label="Previous case study"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-1">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-thrive-purple-600" : "bg-thrive-purple-200"
                  }`}
                  aria-label={`Go to case study ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextCase}
              className="p-2 rounded-full bg-white shadow-md text-thrive-purple-600 hover:text-thrive-purple-800 hover:bg-light-purple-50 transition-colors"
              aria-label="Next case study"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
