"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { FlowButton } from "../ui/flow-button"

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
  },
]

export default function BusinessCaseStudies() {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id)

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-purple-950/70">
      <div className="container mx-auto px-4">
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

        <Tabs defaultValue={caseStudies[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-slate-800/50 p-1 rounded-full border border-purple-800/30">
              {caseStudies.map((study) => (
                <TabsTrigger
                  key={study.id}
                  value={study.id}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-all data-[state=active]:bg-purple-600 data-[state=active]:text-white",
                    "data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-gray-200",
                  )}
                >
                  {study.industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {caseStudies.map((study) => (
            <TabsContent key={study.id} value={study.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-slate-800/50 border-purple-500/30 shadow-xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"></div>
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
                          <Badge className="bg-purple-600">{study.industry}</Badge>
                          <p className="text-xs text-white/80 mt-1">{study.companySize}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 p-6 md:p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">{study.title}</CardTitle>
                        <CardDescription className="text-purple-100/70">A Thrive360 Success Story</CardDescription>
                      </CardHeader>

                      <CardContent className="p-0 space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-purple-400">The Challenge</h3>
                          <p className="text-purple-100/80">{study.challenge}</p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-3 text-purple-400">Our Approach</h3>
                          <div className="text-purple-100/80 whitespace-pre-line">{study.approach}</div>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-purple-400">The Results</h3>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {study.results.map((result, idx) => (
                              <div
                                key={idx}
                                className="bg-slate-700/50 p-4 rounded-lg border border-purple-500/20 text-center"
                              >
                                <p className="text-2xl font-bold text-green-400 mb-1">{result.metric}</p>
                                <p className="text-xs text-purple-100/70">{result.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {study.testimonial && (
                          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 rounded-lg border-l-4 border-purple-500">
                            <p className="italic text-purple-100/90 mb-4">"{study.testimonial.quote}"</p>
                            <div>
                              <p className="font-semibold text-white">{study.testimonial.author}</p>
                              <p className="text-sm text-purple-100/70">{study.testimonial.position}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="p-0 mt-8">
                        <FlowButton className="bg-purple-600 hover:bg-purple-700 text-white">
                          Download Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                        </FlowButton>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <FlowButton
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
          >
            View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
          </FlowButton>
        </div>
      </div>
    </section>
  )
}
