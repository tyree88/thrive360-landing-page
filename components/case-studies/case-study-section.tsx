"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { PlayCircle } from "lucide-react"
import Image from "next/image"
import { FlowButton } from "../ui/flow-button"

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

interface Metric {
  value: string
  label: string
  icon: React.ReactNode
}

interface CaseStudy {
  id: string
  partnerLogo: string
  title: string
  parameters: string
  metrics: Metric[]
  testimonialQuote: string
  videoPlaceholderAlt: string
}

interface CaseStudySectionProps {
  study: CaseStudy
  index: number
  sectionVariants: any
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ study, index, sectionVariants }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className={`flex flex-col ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } gap-8 md:gap-12 items-center`}
    >
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-card p-6 rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <Image
              src={study.partnerLogo || "/placeholder.svg"}
              alt={`${study.title} logo`}
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <h3 className="text-2xl lg:text-3xl font-bold text-right">{study.title}</h3>
          </div>
          <Separator className="my-4" />
          <p className="text-lg font-semibold mb-2">Parameters:</p>
          <p className="text-muted-foreground mb-6">{study.parameters}</p>

          <p className="text-lg font-semibold mb-3">Key Metrics:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {study.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                className="bg-background p-4 rounded-md border text-center"
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2">{metric.icon}</div>
                <p className="text-3xl font-bold text-primary">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="shadow-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">Hear from {study.title.split(" ")[0]} Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
              <img
                src="/placeholder.svg?key=0akq7"
                alt={study.videoPlaceholderAlt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-muted-foreground italic mb-4">"{study.testimonialQuote}"</p>
            <FlowButton variant="outline" size="lg" className="w-full group">
              <PlayCircle className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
              Watch Full Testimonial
            </FlowButton>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default CaseStudySection
