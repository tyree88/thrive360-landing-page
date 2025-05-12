"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
}

interface NeuroplasticEngagementSectionProps {
  sectionVariants: any
}

const NeuroplasticEngagementSection: React.FC<NeuroplasticEngagementSectionProps> = ({ sectionVariants }) => {
  return (
    <motion.section
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">The Power of Neuroplastic Engagement</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
          Our framework adapts to user feedback in real time, creating personalized journeys towards validated outcomes.
        </p>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center p-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="w-32 h-32 text-primary opacity-10 absolute -bottom-8 -right-8 animate-pulse" />
            <Brain className="w-24 h-24 text-primary opacity-20 absolute top-4 left-4" />
            <div className="flex flex-col items-center gap-4 z-10">
              <NeuroplasticBadge />
              <p className="text-2xl font-semibold text-primary">Neuroplastic Engagement™ Technology</p>
            </div>
          </motion.div>
          <motion.div
            className="text-left space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {[
              {
                title: "Personalized Content",
                desc: "Tailored activities and resources based on individual needs and progress.",
              },
              {
                title: "AI-Driven Root-Cause Analysis",
                desc: "Intelligent algorithms identify underlying factors to provide targeted support.",
              },
              {
                title: "Continuous Optimization",
                desc: "The program evolves with the user, ensuring ongoing relevance and effectiveness.",
              },
              {
                title: "Validated Outcomes",
                desc: "Track progress from first interaction to custom program completion with measurable results.",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} custom={idx}>
                <h4 className="text-xl font-semibold text-primary mb-1">{item.title}</h4>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-12 p-6 border border-dashed border-primary/50 rounded-lg">
          <p className="text-muted-foreground">First Interaction → Custom Program → Validated Outcomes</p>
        </div>
      </div>
    </motion.section>
  )
}

export default NeuroplasticEngagementSection
