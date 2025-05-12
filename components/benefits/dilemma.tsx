"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, UserX, AlertTriangle, Users } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollAnimationGroup } from "../scroll-animation"

const dilemmas = [
  {
    icon: <TrendingDown className="w-10 h-10 text-thrive-purple-light" />,
    title: "Quiet Quitting & Burnout",
    description: '"60% of employees feel disengaged at work."',
  },
  {
    icon: <UserX className="w-10 h-10 text-thrive-teal-light" />,
    title: "Rising Health Claims",
    description: '"Mental health-related absenteeism costs you $3,600 per employee annually."',
  },
  {
    icon: <AlertTriangle className="w-10 h-10 text-yellow-400" />,
    title: "Culture & Retention Gaps",
    description: '"Turnover up 50% in high-stress roles."',
  },
  {
    icon: <Users className="w-10 h-10 text-red-400" />,
    title: "One-Size-Fits-All Fails",
    description: '"Generic EAPs get <10% utilization."',
  },
]

const BenefitsDilemma = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-thrive-purple-light to-thrive-teal-light"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          The Modern Employer's Dilemma
        </motion.h2>

        <ScrollAnimationGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerChildren={0.15}>
          {dilemmas.map((dilemma, index) => (
            <Card
              key={index}
              className="glassmorphic border-thrive-teal/30 hover:shadow-xl hover:border-thrive-teal transition-all duration-300 h-full"
            >
              <CardHeader className="items-center">
                {dilemma.icon}
                <CardTitle className="mt-4 text-xl text-center text-gray-100">{dilemma.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">{dilemma.description}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollAnimationGroup>
      </div>
    </section>
  )
}

export default BenefitsDilemma
