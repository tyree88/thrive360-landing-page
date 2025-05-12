"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/components/ui/animated-counter"

// Detailed case studies data
const caseStudies = [
  {
    id: "tech-company",
    title: "How TechNova Reduced Developer Burnout by 47%",
    industry: "Technology",
    companySize: "250+ employees",
    challenge:
      "TechNova, a fast-growing software development company, was experiencing high turnover rates among their engineering team. Exit interviews revealed that burnout was the primary reason developers were leaving, with 68% citing mental health challenges as a significant factor. The company's traditional wellness program had low engagement rates and wasn't addressing the specific stressors faced by technical teams.",
    approach:
      "Thrive360 implemented a comprehensive mental health platform tailored to the unique challenges of software developers. The solution included:\n\n1. Personalized stress management tools designed for high-cognitive load work\n2. Team-based wellbeing challenges to foster connection in hybrid work environments\n3. Micro-breaks integrated into development workflows to prevent cognitive fatigue\n4. Manager training on recognizing burnout signals in technical teams\n5. Anonymous support pathways to address mental health stigma in tech culture",
    results: [
      { metric: "47%", description: "reduction in reported burnout symptoms" },
      { metric: "32%", description: "decrease in developer turnover" },
      { metric: "41%", description: "improvement in sprint velocity" },
      { metric: "89%", description: "platform engagement rate" },
      { metric: "3.8x", description: "return on investment" },
    ],
    testimonial: {
      quote:
        "Thrive360 transformed our approach to developer wellbeing. The platform's ability to integrate with our existing tools and provide personalized support has been game-changing. Our teams are more resilient, collaborative, and ultimately more productive.",
      author: "Sarah Chen",
      position: "CTO, TechNova",
    },
    logoSrc: "/abstract-tech-logo.png",
    imageSrc: "/interconnected-purple-spheres.png",
    color: "purple",
  },
  {
    id: "retail-chain",
    title: "Regional Retail Chain Improves Employee Retention by 38%",
    industry: "Retail",
    companySize: "1,000+ employees across 23 locations",
    challenge:
      "ShopWell, a regional retail chain with 23 locations, was struggling with high employee turnover rates, particularly among frontline staff. The inconsistent employee experience across locations was leading to variable customer service quality and increasing training costs. Traditional employee assistance programs had low utilization rates of just 12%, and store managers lacked tools to support their teams effectively.",
    approach:
      "Thrive360 deployed a retail-specific mental health solution that addressed the unique challenges of shift work and customer-facing roles. The implementation included:\n\n1. Mobile-first platform accessible during and between shifts\n2. Location-specific wellbeing ambassadors to drive engagement\n3. Manager dashboards to identify stores with wellbeing challenges\n4. Customized content addressing retail-specific stressors like difficult customer interactions\n5. Gamified wellbeing challenges with team-based incentives",
    results: [
      { metric: "38%", description: "improvement in employee retention" },
      { metric: "42%", description: "increase in customer satisfaction scores" },
      { metric: "27%", description: "reduction in absenteeism" },
      { metric: "68%", description: "platform engagement rate" },
      { metric: "$1.2M", description: "annual savings in training costs" },
    ],
    testimonial: {
      quote:
        "The impact of Thrive360 on our retail operations has been remarkable. Not only are our employees happier and staying longer, but our customers are noticing the difference. The platform's ability to scale across all our locations while still feeling personalized to each store's needs has exceeded our expectations.",
      author: "Michael Rodriguez",
      position: "VP of Operations, ShopWell",
    },
    logoSrc: "/generic-retail-logo.png",
    imageSrc: "/modern-retail-tech.png",
    color: "blue",
  },
  {
    id: "healthcare-provider",
    title: "Major Healthcare Provider Reduces Clinical Staff Burnout by 43%",
    industry: "Healthcare",
    companySize: "5,000+ employees",
    challenge:
      "MediCare Health System, a large healthcare provider with multiple facilities, was facing a crisis of burnout among clinical staff. Nurse turnover had reached 34%, and physician burnout was affecting patient care quality. The COVID-19 pandemic had exacerbated existing stressors, and traditional wellness programs weren't addressing the unique trauma and compassion fatigue experienced by healthcare workers.",
    approach:
      "Thrive360 implemented a healthcare-specific mental health platform designed for the unique challenges of clinical environments. The solution included:\n\n1. Trauma-informed support tools accessible during shifts\n2. Peer support networks facilitated through the platform\n3. Micro-interventions designed for the limited breaks available to clinical staff\n4. Department-specific dashboards to identify units with elevated stress levels\n5. Integration with existing scheduling systems to provide support during high-stress periods",
    results: [
      { metric: "43%", description: "reduction in clinical staff burnout" },
      { metric: "29%", description: "decrease in nurse turnover" },
      { metric: "32%", description: "improvement in patient satisfaction scores" },
      { metric: "18%", description: "reduction in medical errors" },
      { metric: "76%", description: "platform engagement rate" },
    ],
    testimonial: {
      quote:
        "Thrive360 has been a lifeline for our clinical teams. The platform's understanding of healthcare-specific stressors and ability to provide meaningful support in the context of our demanding environment has made all the difference. We're seeing improvements not just in staff wellbeing, but in patient outcomes as well.",
      author: "Dr. Jennifer Williams",
      position: "Chief Medical Officer, MediCare Health System",
    },
    logoSrc: "/healthcare-logo.png",
    imageSrc: "/stylized-letters-sj.png",
    color: "green",
  },
]

// Animation variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
}

const resultItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
    },
  },
}

// Tab transition variants
const tabContentVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  }),
}

// Get color class based on industry
const getColorClass = (color: string) => {
  switch (color) {
    case "purple":
      return "from-purple-600/20 to-pink-600/20"
    case "blue":
      return "from-blue-600/20 to-cyan-600/20"
    case "green":
      return "from-green-600/20 to-teal-600/20"
    default:
      return "from-purple-600/20 to-pink-600/20"
  }
}

// Get badge color based on industry
const getBadgeClass = (color: string) => {
  switch (color) {
    case "purple":
      return "bg-purple-600"
    case "blue":
      return "bg-blue-600"
    case "green":
      return "bg-green-600"
    default:
      return "bg-purple-600"
  }
}

// Get metric color based on industry
const getMetricClass = (color: string) => {
  switch (color) {
    case "purple":
      return "text-green-400"
    case "blue":
      return "text-cyan-400"
    case "green":
      return "text-teal-400"
    default:
      return "text-green-400"
  }
}

// Get testimonial border color based on industry
const getTestimonialClass = (color: string) => {
  switch (color) {
    case "purple":
      return "border-purple-500"
    case "blue":
      return "border-blue-500"
    case "green":
      return "border-green-500"
    default:
      return "border-purple-500"
  }
}

export default function BusinessCaseStudiesSection() {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id)
  const [direction, setDirection] = useState(0)
  const [height, setHeight] = useState("auto")
  const contentRef = useRef<HTMLDivElement>(null)

  // Find the index of the active tab
  const activeIndex = caseStudies.findIndex((study) => study.id === activeTab)

  // Handle tab change with direction
  const handleTabChange = (value: string) => {
    const newIndex = caseStudies.findIndex((study) => study.id === value)
    const oldIndex = caseStudies.findIndex((study) => study.id === activeTab)
    setDirection(newIndex > oldIndex ? 1 : -1)
    setActiveTab(value)
  }

  // Update height for smooth height transition
  useEffect(() => {
    if (contentRef.current) {
      setHeight(`${contentRef.current.offsetHeight}px`)
    }
  }, [activeTab])

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-purple-950/70">
      <div className="container mx-auto px-4 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Scroll progress indicator */}
        <motion.div
          className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{
            scaleY: 1,
            opacity: [0, 1, 1, 0.7],
            transition: {
              duration: 1.5,
              times: [0, 0.2, 0.8, 1],
            },
          }}
          viewport={{ once: true, margin: "-100px" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Real <span className="text-purple-400">Results</span> from Real Businesses
          </h2>
          <p className="text-lg text-purple-100/70 max-w-3xl mx-auto">
            Explore detailed case studies of how organizations across industries have transformed their business
            outcomes through Thrive360's mental health and wellbeing platform.
          </p>
        </motion.div>

        <div className="w-full">
          {/* Custom tabs navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-800/50 p-1 rounded-full border border-purple-800/30 flex">
              {caseStudies.map((study, index) => (
                <motion.button
                  key={study.id}
                  onClick={() => handleTabChange(study.id)}
                  className={cn(
                    "rounded-full px-6 py-2 text-sm transition-all relative",
                    activeTab === study.id ? "text-white" : "text-gray-400 hover:text-gray-200",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeTab === study.id && (
                    <motion.div
                      className={cn(
                        "absolute inset-0 rounded-full z-0",
                        study.color === "purple"
                          ? "bg-purple-600"
                          : study.color === "blue"
                            ? "bg-blue-600"
                            : "bg-green-600",
                      )}
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                  <span className="relative z-10">{study.industry}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Animated tab content */}
          <div className="relative overflow-hidden transition-all duration-500 ease-in-out" style={{ height }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeTab}
                custom={direction}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                ref={contentRef}
                className="w-full"
              >
                {caseStudies
                  .filter((study) => study.id === activeTab)
                  .map((study) => (
                    <motion.div key={study.id} initial="hidden" animate="visible" variants={containerVariants}>
                      <Card className="bg-slate-800/50 border-purple-500/30 shadow-xl overflow-hidden">
                        <div className="md:flex">
                          <motion.div className="md:w-1/3 relative" variants={cardVariants}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass(study.color)}`}></div>
                            <img
                              src={study.imageSrc || "/placeholder.svg"}
                              alt={study.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex items-center space-x-3">
                              <img
                                src={study.logoSrc || "/placeholder.svg"}
                                alt="Company logo"
                                className="h-10 w-10 rounded-full bg-white p-1"
                              />
                              <div>
                                <Badge className={getBadgeClass(study.color)}>{study.industry}</Badge>
                                <p className="text-xs text-white/80 mt-1">{study.companySize}</p>
                              </div>
                            </div>
                          </motion.div>

                          <motion.div className="md:w-2/3 p-6 md:p-8" variants={cardVariants}>
                            <CardHeader className="p-0 mb-6">
                              <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
                                {study.title}
                              </CardTitle>
                              <CardDescription className="text-purple-100/70">
                                A Thrive360 Success Story
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0 space-y-6">
                              <motion.div variants={cardVariants}>
                                <h3 className="text-xl font-semibold mb-3 text-purple-400">The Challenge</h3>
                                <p className="text-purple-100/80">{study.challenge}</p>
                              </motion.div>

                              <motion.div variants={cardVariants}>
                                <h3 className="text-xl font-semibold mb-3 text-purple-400">Our Approach</h3>
                                <div className="text-purple-100/80 whitespace-pre-line">{study.approach}</div>
                              </motion.div>

                              <motion.div variants={cardVariants}>
                                <h3 className="text-xl font-semibold mb-4 text-purple-400">The Results</h3>
                                <motion.div
                                  className="grid grid-cols-2 md:grid-cols-5 gap-4"
                                  variants={containerVariants}
                                >
                                  {study.results.map((result, idx) => (
                                    <motion.div
                                      key={idx}
                                      className="bg-slate-700/50 p-4 rounded-lg border border-purple-500/20 text-center"
                                      variants={resultItemVariants}
                                      whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                          "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 8px 10px -6px rgba(124, 58, 237, 0.1)",
                                      }}
                                    >
                                      <p className={`text-2xl font-bold ${getMetricClass(study.color)} mb-1`}>
                                        <AnimatedCounter value={result.metric} duration={1.5} delay={0.1 * idx} />
                                      </p>
                                      <p className="text-xs text-purple-100/70">{result.description}</p>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </motion.div>

                              {study.testimonial && (
                                <motion.div
                                  className={`bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 rounded-lg border-l-4 ${getTestimonialClass(study.color)}`}
                                  variants={cardVariants}
                                >
                                  <p className="italic text-purple-100/90 mb-4">"{study.testimonial.quote}"</p>
                                  <div>
                                    <p className="font-semibold text-white">{study.testimonial.author}</p>
                                    <p className="text-sm text-purple-100/70">{study.testimonial.position}</p>
                                  </div>
                                </motion.div>
                              )}
                            </CardContent>

                            <CardFooter className="p-0 mt-8">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                  className={`${study.color === "purple" ? "bg-purple-600 hover:bg-purple-700" : study.color === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} text-white`}
                                >
                                  Download Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </motion.div>
                            </CardFooter>
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
            >
              View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
