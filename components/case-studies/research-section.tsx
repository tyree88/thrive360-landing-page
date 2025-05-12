"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FlowButton } from "@/components/ui/flow-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

interface ResearchItem {
  title: string
  authors: string
  summary: string
  link: string
}

interface ResearchSectionProps {
  researchData: ResearchItem[]
  sectionVariants: any
}

const ResearchSection: React.FC<ResearchSectionProps> = ({ researchData, sectionVariants }) => {
  return (
    <motion.section
      className="py-16 md:py-24 bg-primary/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Workplace Wellness Studies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchData.map((study, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription>{study.authors}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{study.summary}</p>
                </CardContent>
                <CardFooter>
                  <FlowButton variant="link" asChild className="text-primary p-0">
                    <a href={study.link} target="_blank" rel="noopener noreferrer">
                      Read More <Link className="ml-2 h-4 w-4" />
                    </a>
                  </FlowButton>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default ResearchSection
