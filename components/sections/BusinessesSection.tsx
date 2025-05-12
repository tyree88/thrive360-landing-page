"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Building2, Store, Briefcase, ShieldCheck, Zap } from "lucide-react"
import { FlowButton } from "@/components/ui/flow-button"

// Business types with their specific details
const businessTypes = [
  {
    id: "retail",
    name: "Retail & Service",
    icon: <Store className="h-5 w-5" />,
    challenges: [
      "High employee turnover leading to inconsistent customer experiences",
      "Difficulty maintaining service quality across multiple locations",
      "Limited resources for comprehensive employee wellness programs",
      "Increasing pressure to improve employee retention metrics",
    ],
    solutions: [
      "Personalized onboarding and skill development pathways",
      "Consistent training delivery across all locations",
      "Affordable, scalable wellness solutions for all staff levels",
      "Data-driven insights to identify retention risk factors early",
    ],
    benefits: [
      { metric: "32%", description: "reduction in employee turnover" },
      { metric: "47%", description: "improvement in customer satisfaction scores" },
      { metric: "28%", description: "decrease in training costs" },
    ],
    useCase:
      "Regional retail chain implemented Thrive360 across 23 locations, resulting in standardized customer service protocols and a measurable improvement in employee satisfaction. Staff reported feeling more supported and better equipped to handle workplace challenges.",
    logoSrc: "/generic-retail-logo.png",
    imageSrc: "/modern-retail-tech.png",
  },
  {
    id: "tech",
    name: "Technology & SaaS",
    icon: <Zap className="h-5 w-5" />,
    challenges: [
      "High-pressure environment leading to burnout and attrition",
      "Remote work challenges affecting team cohesion and culture",
      "Difficulty measuring and improving employee wellbeing",
      "Competitive talent market requiring superior benefits",
    ],
    solutions: [
      "Proactive burnout prevention through personalized wellbeing plans",
      "Virtual team-building and connection tools for distributed teams",
      "Analytics dashboard for tracking wellbeing metrics across teams",
      "Differentiated benefits package with measurable outcomes",
    ],
    benefits: [
      { metric: "41%", description: "reduction in reported burnout cases" },
      { metric: "36%", description: "improvement in team collaboration scores" },
      { metric: "52%", description: "increase in benefits satisfaction" },
    ],
    useCase:
      "A fast-growing SaaS company integrated Thrive360 into their employee experience platform, providing personalized wellbeing journeys for each team member. The result was improved retention during a period of rapid scaling and higher engagement scores across distributed teams.",
    logoSrc: "/abstract-tech-logo.png",
    imageSrc: "/interconnected-purple-spheres.png",
  },
  {
    id: "consulting",
    name: "Consulting & Professional Services",
    icon: <Briefcase className="h-5 w-5" />,
    challenges: [
      "Client-facing pressure creating high stress environments",
      "Frequent travel and irregular schedules disrupting wellbeing routines",
      "Difficulty balancing billable hours with personal development",
      "High achiever culture sometimes neglecting mental health",
    ],
    solutions: [
      "Adaptive stress management tools that fit into busy schedules",
      "Mobile-first approach for professionals on the move",
      "Micro-learning modules that respect billable hour constraints",
      "High-performer specific content addressing perfectionism and boundaries",
    ],
    benefits: [
      { metric: "38%", description: "reduction in stress-related absences" },
      { metric: "45%", description: "improvement in work-life balance scores" },
      { metric: "29%", description: "increase in reported job satisfaction" },
    ],
    useCase:
      "A global consulting firm deployed Thrive360 to address consultant burnout, implementing personalized resilience programs that consultants could access during travel and between client engagements. The platform's analytics helped leadership identify teams at risk and intervene proactively.",
    logoSrc: "/finance-company-logo.png",
    imageSrc: "/abstract-geometric-DR.png",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industrial",
    icon: <Building2 className="h-5 w-5" />,
    challenges: [
      "Physical demands creating unique wellbeing challenges",
      "Shift work disrupting healthy routines and sleep patterns",
      "Safety concerns requiring heightened mental alertness",
      "Multi-generational workforce with diverse wellbeing needs",
    ],
    solutions: [
      "Physical-mental wellbeing integration specific to industrial roles",
      "Shift-adapted programs that work with non-traditional schedules",
      "Fatigue management and alertness optimization tools",
      "Accessible content designed for varying tech comfort levels",
    ],
    benefits: [
      { metric: "26%", description: "reduction in workplace incidents" },
      { metric: "31%", description: "decrease in absenteeism" },
      { metric: "43%", description: "improvement in sleep quality metrics" },
    ],
    useCase:
      "A manufacturing company with 24/7 operations implemented Thrive360 to address shift-related fatigue and stress. The platform's ability to deliver personalized content based on shift patterns helped employees establish healthier routines, resulting in fewer safety incidents and improved productivity.",
    logoSrc: "/manufacturing-company-logo.png",
    imageSrc: "/modern-manufacturing-facility.png",
  },
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    icon: <ShieldCheck className="h-5 w-5" />,
    challenges: [
      "Compassion fatigue and emotional burnout among care providers",
      "High-stakes environment creating chronic stress",
      "Staffing shortages increasing workload and pressure",
      "Complex regulatory environment adding administrative burden",
    ],
    solutions: [
      "Specialized resilience training for healthcare professionals",
      "Trauma-informed approaches to provider wellbeing",
      "Efficient micro-breaks designed for clinical settings",
      "Compliance-friendly documentation of wellbeing initiatives",
    ],
    benefits: [
      { metric: "35%", description: "reduction in provider burnout scores" },
      { metric: "42%", description: "improvement in staff retention" },
      { metric: "28%", description: "decrease in reported medical errors" },
    ],
    useCase:
      "A hospital network facing critical staffing challenges implemented Thrive360 as part of their provider wellbeing initiative. The platform's healthcare-specific content and ability to deliver brief, effective interventions during shifts helped improve resilience among nursing staff and reduced turnover in key departments.",
    logoSrc: "/healthcare-logo.png",
    imageSrc: "/stylized-letters-sj.png",
  },
]

export default function BusinessesSection() {
  const [activeTab, setActiveTab] = useState(businessTypes[0].id)

  const getActiveBusinessType = () => {
    return businessTypes.find((type) => type.id === activeTab) || businessTypes[0]
  }

  const activeBusinessType = getActiveBusinessType()

  return (
    <section id="businesses" className="relative py-20 overflow-hidden bg-light-purple-50">
      <div className="absolute inset-0 bg-gradient-to-b from-light-purple-100/50 to-light-purple-50/50 pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-thrive-purple-900"
          >
            Transforming Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-thrive-purple-700 max-w-3xl mx-auto"
          >
            See how organizations across industries leverage Thrive360 to enhance performance, improve retention, and
            create measurable business impact.
          </motion.p>
        </div>

        <Tabs defaultValue={businessTypes[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8 md:mb-12">
            <TabsList className="bg-white p-1 rounded-full border border-light-purple-200">
              {businessTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-all data-[state=active]:bg-thrive-purple-600 data-[state=active]:text-white",
                    "data-[state=inactive]:text-thrive-purple-700 data-[state=inactive]:hover:text-thrive-purple-900",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {type.icon}
                    <span className="hidden sm:inline">{type.name}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {businessTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className="order-2 md:order-1">
                  <div className="flex items-center mb-6">
                    <img src={type.logoSrc || "/placeholder.svg"} alt={`${type.name} logo`} className="h-12 mr-4" />
                    <h3 className="text-2xl font-bold text-thrive-purple-900">{type.name} Excellence</h3>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-thrive-purple-700">Key Challenges</h4>
                    <ul className="space-y-2">
                      {type.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-thrive-purple-400 mr-2 mt-1">•</span>
                          <span className="text-thrive-purple-800">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-thrive-purple-700">Thrive360 Solutions</h4>
                    <ul className="space-y-2">
                      {type.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-thrive-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-thrive-purple-800">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-light-purple-200 text-center">
                        <p className="text-2xl font-bold text-thrive-purple-600">{benefit.metric}</p>
                        <p className="text-sm text-thrive-purple-700">{benefit.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-light-purple-200 mb-8">
                    <h4 className="text-lg font-semibold mb-2 text-thrive-purple-900">Real-World Impact</h4>
                    <p className="text-thrive-purple-800 italic">{type.useCase}</p>
                  </div>

                  <FlowButton text={`Explore ${type.name} Solutions`} asLink href={`/solutions/${type.id}`} />
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-thrive-purple-600/20 to-light-purple-400/20 rounded-xl blur-xl opacity-70"></div>
                    <img
                      src={type.imageSrc || "/placeholder.svg"}
                      alt={`${type.name} visualization`}
                      className="relative rounded-lg shadow-2xl border border-light-purple-200 max-h-[400px] object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-thrive-purple-600 to-light-purple-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                      Thrive360 Integration
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 md:mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl border border-light-purple-200 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 text-thrive-purple-900">Ready to Transform Your Business?</h3>
            <p className="text-thrive-purple-800 mb-6">
              Join the growing number of organizations using Thrive360 to create measurable business impact through
              enhanced employee wellbeing and performance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <FlowButton text="Request Demo" asLink href="/contact" />
              <FlowButton text="View Case Studies" asLink href="/case-studies" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
