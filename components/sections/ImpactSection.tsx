"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TrendingUp, Brain, Heart, Users, Award, BarChart3 } from "lucide-react"
import { UnifiedSection } from "@/components/ui/unified-section"
import { cn } from "@/lib/utils"
import gsap from "gsap"

interface ImpactStatProps {
  value: string
  label: string
  icon: React.ReactNode
  color: string
  delay?: number
}

const ImpactStat: React.FC<ImpactStatProps> = ({ value, label, icon, color, delay = 0 }) => {
  const statRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!statRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(statRef.current)

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={statRef}
      className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center relative overflow-hidden border border-light-purple-100"
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4",
          `bg-${color}-100 text-${color}-600`,
        )}
      >
        {icon}
      </div>
      <motion.h3
        className="text-4xl font-bold mb-2 text-thrive-purple-800"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: delay }}
      >
        {value}
      </motion.h3>
      <motion.p
        className="text-thrive-purple-600"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        {label}
      </motion.p>
      <div className="absolute top-0 left-0 h-2 w-full" style={{ backgroundColor: `var(--${color}-500)` }}></div>
    </div>
  )
}

const ImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 1, 1, 0.6])

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !statsRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    })

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4",
    )
  }, [])

  const impactStats = [
    {
      value: "83%",
      label: "Engagement Rate",
      icon: <Users className="h-8 w-8" />,
      color: "thrive-purple",
    },
    {
      value: "76%",
      label: "Stress Reduction",
      icon: <Heart className="h-8 w-8" />,
      color: "thrive-purple",
    },
    {
      value: "68%",
      label: "Productivity Increase",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "thrive-purple",
    },
    {
      value: "92%",
      label: "User Satisfaction",
      icon: <Award className="h-8 w-8" />,
      color: "thrive-purple",
    },
    {
      value: "4.2x",
      label: "ROI for Companies",
      icon: <BarChart3 className="h-8 w-8" />,
      color: "thrive-purple",
    },
    {
      value: "57%",
      label: "Improved Neural Pathways",
      icon: <Brain className="h-8 w-8" />,
      color: "thrive-purple",
    },
  ]

  return (
    <UnifiedSection
      id="impact"
      ref={sectionRef}
      variant="light"
      bgClassName="bg-light-purple-50"
      spacing="lg"
      showTransitionTop={false}
      showTransitionBottom={true}
      heading="Measurable Impact on Mental Health"
      headingRef={titleRef}
      subheadingRef={subtitleRef}
      subheading="Our neuroscience-based approach delivers tangible improvements in wellbeing and performance."
      badge="Proven Results"
      badgeClassName="bg-light-purple-100 text-thrive-purple-700"
      headingClassName="text-thrive-purple-800"
      subheadingClassName="text-thrive-purple-600"
    >
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y, opacity }}>
        <div className="absolute top-20 left-10 w-64 h-64 bg-light-purple-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-thrive-purple-200 rounded-full opacity-30 blur-3xl"></div>
      </motion.div>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {impactStats.map((stat, index) => (
          <ImpactStat
            key={index}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            color={stat.color}
            delay={index * 0.1}
          />
        ))}
      </div>

      <div className="mt-16 md:mt-20 bg-white rounded-xl shadow-md p-6 md:p-12 border border-light-purple-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-thrive-purple-800">The Science Behind Our Impact</h3>
            <p className="text-thrive-purple-600 mb-6">
              Thrive360's approach is grounded in the latest neuroscience research on neuroplasticity - the brain's
              ability to form new neural connections throughout life.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-light-purple-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-thrive-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-thrive-purple-700">Targeted neural pathway stimulation</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-light-purple-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-thrive-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-thrive-purple-700">Personalized intervention sequences</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-light-purple-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-thrive-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-thrive-purple-700">Adaptive learning algorithms</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-light-purple-100 flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-thrive-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-thrive-purple-700">Continuous measurement and optimization</p>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-video bg-light-purple-50 rounded-lg overflow-hidden shadow-md border border-light-purple-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <Brain className="h-12 w-12 text-thrive-purple-500 mx-auto mb-4" />
                  <p className="text-thrive-purple-600">Interactive brain visualization</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-light-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-thrive-purple-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </UnifiedSection>
  )
}

export default ImpactSection
