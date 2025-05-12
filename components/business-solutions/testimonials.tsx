"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    quote:
      "Implementing Thrive360 was one of the best decisions we've made for our company culture. The platform's ability to provide personalized mental health support at scale has transformed how our teams work together.",
    author: "Emily Johnson",
    position: "Chief People Officer",
    company: "Global Tech Innovations",
    imageSrc: "/abstract-tech-logo.png",
  },
  {
    quote:
      "As a retail business with multiple locations, consistency was our biggest challenge. Thrive360 gave us a way to deliver the same high-quality wellbeing support to every employee, regardless of location.",
    author: "Michael Rodriguez",
    position: "VP of Operations",
    company: "ShopWell Retail",
    imageSrc: "/generic-retail-logo.png",
  },
  {
    quote:
      "The ROI we've seen from Thrive360 has been remarkable. Beyond the measurable improvements in retention and productivity, we've created a workplace where people genuinely want to be.",
    author: "David Chen",
    position: "CEO",
    company: "Innovative Solutions Group",
    imageSrc: "/finance-company-logo.png",
  },
  {
    quote:
      "As healthcare providers, we're experts at caring for others but often neglect our own wellbeing. Thrive360 has given our clinical staff the tools they need to prioritize their mental health, which has directly improved patient care.",
    author: "Dr. Jennifer Williams",
    position: "Chief Medical Officer",
    company: "MediCare Health System",
    imageSrc: "/healthcare-logo.png",
  },
  {
    quote:
      "The manufacturing industry has unique mental health challenges that generic solutions don't address. Thrive360's customized approach for our workforce has significantly improved safety metrics and team cohesion.",
    author: "Robert Martinez",
    position: "Director of Operations",
    company: "Manufacturing Solutions Inc.",
    imageSrc: "/manufacturing-company-logo.png",
  },
]

export default function BusinessTestimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-purple-950/70">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            What Business <span className="text-purple-400">Leaders Say</span>
          </h2>
          <p className="text-lg text-purple-100/70 max-w-3xl mx-auto">
            Hear from executives and leaders who have transformed their organizations with Thrive360.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-slate-800/50 border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="mr-4">
                      <img
                        src={testimonial.imageSrc || "/placeholder.svg"}
                        alt={testimonial.company}
                        className="h-12 w-12 rounded-full bg-white p-1"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-purple-100/70">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-purple-500/30" />
                    <p className="pt-4 text-purple-100/90 italic">{testimonial.quote}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
