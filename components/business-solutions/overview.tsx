"use client"

import { motion } from "framer-motion"
import { CheckCircle, Building2, Store, Code, Briefcase, HeartPulse, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const businessTypes = [
  {
    id: "retail",
    name: "Retail & Service",
    icon: <Store className="h-5 w-5" />,
    description:
      "From small boutiques to large chains, retail and service businesses face unique challenges in employee wellbeing and retention.",
    keyPoints: [
      "Reduce turnover in high-churn environments",
      "Improve customer service through better employee wellbeing",
      "Support shift workers with flexible mental health resources",
      "Create consistent wellbeing experiences across multiple locations",
    ],
  },
  {
    id: "tech",
    name: "Technology & SaaS",
    icon: <Code className="h-5 w-5" />,
    description:
      "Tech companies operate in high-pressure environments where burnout is common and talent retention is critical.",
    keyPoints: [
      "Combat developer burnout and improve code quality",
      "Support remote and hybrid teams with virtual wellbeing tools",
      "Attract and retain top talent with differentiated benefits",
      "Improve collaboration and communication through better mental health",
    ],
  },
  {
    id: "professional",
    name: "Professional Services",
    icon: <Briefcase className="h-5 w-5" />,
    description:
      "Consulting and professional service firms rely on high-performing individuals who often face significant stress and pressure.",
    keyPoints: [
      "Support consultants through high-pressure client engagements",
      "Provide mental health resources that work with travel schedules",
      "Improve work-life balance in billable-hour environments",
      "Enhance decision-making through better cognitive wellbeing",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <HeartPulse className="h-5 w-5" />,
    description:
      "Healthcare organizations face unique challenges in supporting staff who provide care to others while neglecting their own wellbeing.",
    keyPoints: [
      "Reduce burnout among clinical staff and care providers",
      "Support healthcare workers through traumatic events",
      "Improve patient outcomes through better provider wellbeing",
      "Create sustainable caregiving environments that prevent compassion fatigue",
    ],
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-5 w-5" />,
    description:
      "Educational institutions must support both staff and students in increasingly challenging mental health environments.",
    keyPoints: [
      "Support teachers and staff through high-stress periods",
      "Provide accessible mental health resources for students",
      "Create campus-wide wellbeing initiatives that scale",
      "Improve academic outcomes through better mental health support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: <Building2 className="h-5 w-5" />,
    description:
      "Large enterprises need scalable, consistent wellbeing solutions that work across departments and locations.",
    keyPoints: [
      "Deploy consistent wellbeing programs across global locations",
      "Integrate mental health into existing HR and benefits systems",
      "Measure and improve wellbeing metrics at scale",
      "Support employees through organizational changes and transitions",
    ],
  },
]

export default function BusinessOverview() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Tailored Solutions for <span className="text-purple-400">Every Business</span>
          </h2>
          <p className="text-lg text-purple-100/70 max-w-3xl mx-auto">
            Thrive360 offers customized mental health and wellbeing solutions for businesses of all types and sizes.
            Explore how our platform addresses the unique challenges in your industry.
          </p>
        </motion.div>

        <Tabs defaultValue="retail" className="w-full">
          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <TabsList className="bg-slate-800/50 p-1 rounded-full border border-purple-800/30">
              {businessTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white",
                    "data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {type.icon}
                    <span>{type.name}</span>
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
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 inline-block shadow-md mb-6">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{type.name} Solutions</h3>
                  <p className="text-lg text-purple-100/70 mb-8">{type.description}</p>
                  <ul className="space-y-4">
                    {type.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-purple-100/90">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl opacity-70"></div>
                  <img
                    src={`/abstract-geometric-shapes.png?height=400&width=600&query=${type.name}%20business%20using%20mental%20health%20platform`}
                    alt={`${type.name} business using Thrive360`}
                    className="relative rounded-lg shadow-2xl border border-purple-500/20 w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
