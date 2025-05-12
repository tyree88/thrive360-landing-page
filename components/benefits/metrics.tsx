"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TrendingUp, AlertOctagon, Activity } from "lucide-react"

const metricsData = [
  {
    id: 1,
    value: "+47%",
    label: "improvement in employee Net Promoter Score",
    icon: <TrendingUp className="w-10 h-10 text-thrive-teal-light" />,
  },
  {
    id: 2,
    value: "–38%",
    label: "reduction in stress-driven errors",
    icon: <AlertOctagon className="w-10 h-10 text-yellow-400" />,
  },
  {
    id: 3,
    value: "+12%",
    label: "uplift in quarterly productivity",
    icon: <Activity className="w-10 h-10 text-green-400" />,
  },
]

const StickyKPIPane = ({ activeMetric }: { activeMetric: (typeof metricsData)[0] | null }) => {
  if (!activeMetric) return null

  return (
    <motion.div
      key={activeMetric.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="sticky top-[20vh] right-0 w-full md:w-1/3 lg:w-1/4 p-6 glassmorphic rounded-l-lg shadow-2xl border-l-4 border-thrive-teal z-20 hidden md:block"
    >
      <div className="flex items-center space-x-4 mb-3">
        {activeMetric.icon}
        <span className="text-4xl font-bold text-thrive-teal-light">{activeMetric.value}</span>
      </div>
      <p className="text-lg text-gray-200">{activeMetric.label}</p>
    </motion.div>
  )
}

const BenefitsMetrics = () => {
  const [activeMetricId, setActiveMetricId] = useState<number | null>(null)
  const [useFallback, setUseFallback] = useState(false)

  // Create a single ref that holds an array
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.2, 0.3], [50, 0])

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUseFallback(true)
      return
    }

    if (!("IntersectionObserver" in window)) {
      setUseFallback(true)
      return
    }

    // Initialize the array with the correct length
    sectionRefs.current = Array(metricsData.length).fill(null)

    const observers = metricsData.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveMetricId(metricsData[index].id)
          }
        },
        { threshold: 0.5 },
      )

      const currentRef = sectionRefs.current[index]
      if (currentRef) {
        observer.observe(currentRef)
      }

      return observer
    })

    return () => {
      observers.forEach((observer) => {
        if (observer) {
          observer.disconnect()
        }
      })
    }
  }, [])

  const activeMetric = metricsData.find((m) => m.id === activeMetricId) || null

  return (
    <section className="py-16 md:py-32 bg-gradient-to-bl from-slate-900 to-thrive-teal-dark relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        <motion.div
          className="md:w-2/3 lg:w-3/4 space-y-24 md:space-y-48 pr-0 md:pr-8"
          style={{ opacity: useFallback ? 1 : opacity, y: useFallback ? 0 : y }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center md:text-left mb-12 text-transparent bg-clip-text bg-gradient-to-r from-thrive-purple-light to-thrive-teal-light">
            Scroll-Triggered "People + Business" Metrics
          </h2>
          {metricsData.map((metric, index) => (
            <div
              key={metric.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className={`py-10 md:py-20 ${useFallback ? "mb-8" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0.5, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className={`p-6 rounded-lg ${useFallback ? "glassmorphic border-thrive-teal/30" : ""}`}
              >
                {useFallback && (
                  <div className="flex items-center space-x-4 mb-3">
                    {metric.icon}
                    <span className="text-3xl font-bold text-thrive-teal-light">{metric.value}</span>
                  </div>
                )}
                <h3
                  className={`text-2xl md:text-3xl font-semibold mb-3 ${useFallback ? "text-gray-100" : "text-gray-400"}`}
                >
                  {useFallback ? metric.label : `Story Beat ${index + 1}: Focus on ${metric.label.split(" ")[0]}`}
                </h3>
                {!useFallback && (
                  <p className="text-lg text-gray-500">
                    Detailed explanation or story related to achieving {metric.value} {metric.label}. This content area
                    expands as the user scrolls, providing context for the sticky KPI.
                  </p>
                )}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {!useFallback && <StickyKPIPane activeMetric={activeMetric} />}

        {useFallback && (
          <div className="mt-12 md:hidden">
            <h3 className="text-2xl font-semibold mb-4 text-center text-thrive-teal-light">Key Metrics Overview</h3>
            <div className="grid grid-cols-1 gap-6">
              {metricsData.map((metric) => (
                <div key={`fallback-${metric.id}`} className="p-4 glassmorphic rounded-lg border border-thrive-teal/50">
                  <div className="flex items-center space-x-3 mb-2">
                    {metric.icon}
                    <span className="text-2xl font-bold text-thrive-teal-light">{metric.value}</span>
                  </div>
                  <p className="text-md text-gray-200">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default BenefitsMetrics
