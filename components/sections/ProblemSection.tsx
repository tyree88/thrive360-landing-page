"use client"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

// Problem cards data focused on digital experience challenges
const problemCards = [
  {
    id: "engagement",
    title: "Lack of Engagement",
    description:
      "Traditional digital experiences fail to capture and maintain user attention in today's fast-paced world.",
    impact: "High bounce rates and low time-on-site metrics, resulting in missed conversion opportunities.",
    solution: "Interactive, personalized experiences that adapt to user behavior and preferences.",
  },
  {
    id: "conversion",
    title: "Poor Conversion Rates",
    description:
      "Many websites struggle with converting visitors into customers due to confusing user journeys and calls-to-action.",
    impact: "Wasted marketing spend and unrealized revenue potential from existing traffic.",
    solution: "Streamlined user journeys with clear, compelling CTAs and reduced friction points.",
  },
  {
    id: "branding",
    title: "Inconsistent Branding",
    description:
      "Disjointed visual elements and messaging create a fragmented brand experience across different platforms.",
    impact: "Reduced brand recognition and trust, leading to lower customer loyalty.",
    solution: "Unified design systems and messaging frameworks that maintain consistency across all touchpoints.",
  },
  {
    id: "performance",
    title: "Slow Performance",
    description: "Sluggish loading times and unoptimized assets lead to high bounce rates and frustrated users.",
    impact: "Each second of delay can reduce conversions by up to 7% and damage SEO rankings.",
    solution: "Performance-optimized experiences with efficient loading strategies and lightweight assets.",
  },
]

const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)

  // Simple intersection observer to track active card
  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const index = problemCards.findIndex((card) => card.id === id)
            if (index !== -1) {
              setActiveCardIndex(index)
            }
          }
        })
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    const elements = document.querySelectorAll(".problem-card")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative w-full bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/30"
    >
      {/* Header section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 text-sm font-medium bg-white/10 text-pink-300 rounded-full mb-6"
        >
          The Challenge
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Problems We Solve
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-300 max-w-3xl"
        >
          Identifying the key challenges in modern digital experiences
        </motion.p>
      </div>

      {/* Problem cards */}
      <div className="relative">
        {/* Navigation tabs */}
        <div className="sticky top-0 z-30 w-full bg-slate-950/90 backdrop-blur-md border-b border-indigo-500/20 shadow-lg py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto hide-scrollbar">
              {problemCards.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => {
                    document.getElementById(card.id)?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className={`flex-shrink-0 px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors ${
                    activeCardIndex === index
                      ? "bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {card.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards content */}
        {problemCards.map((card, index) => (
          <div
            id={card.id}
            key={card.id}
            className="problem-card min-h-screen w-full flex flex-col items-center justify-center px-6 py-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-6xl mx-auto"
            >
              <div className="w-full bg-slate-900/80 backdrop-blur-sm px-8 pt-8 pb-16 md:px-12 md:pt-10 md:pb-20 rounded-2xl shadow-xl border border-indigo-500/20">
                <h3 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-8 text-center">
                  {card.title}
                </h3>

                <p className="text-2xl md:text-3xl text-slate-300 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
                  {card.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/20">
                    <h4 className="text-xl font-semibold mb-4 text-pink-300">Impact</h4>
                    <p className="text-slate-300">{card.impact}</p>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-indigo-500/20">
                    <h4 className="text-xl font-semibold mb-4 text-indigo-300">Solution Approach</h4>
                    <p className="text-slate-300">{card.solution}</p>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center justify-center mt-16 space-x-3">
                  {problemCards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        document.getElementById(problemCards[i].id)?.scrollIntoView({ behavior: "smooth" })
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-12 bg-gradient-to-r from-pink-500 to-indigo-500"
                          : "w-4 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to ${problemCards[i].title}`}
                    ></button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Custom CSS for visual effects */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}

export default ProblemSection
