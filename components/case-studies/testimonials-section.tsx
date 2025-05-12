"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FlowButton } from "@/components/ui/flow-button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  quote: string
}

interface TestimonialsSectionProps {
  testimonialsData: Testimonial[]
  sectionVariants: any
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonialsData, sectionVariants }) => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  const nextTestimonial = () => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonialsData.length)
  const prevTestimonial = () =>
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)

  return (
    <motion.section
      className="py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Voices of Impact: Leaders & HR</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonialIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-2xl mx-auto shadow-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-lg md:text-xl italic text-foreground mb-6">
                    "{testimonialsData[currentTestimonialIndex].quote}"
                  </p>
                  <p className="font-semibold text-primary">{testimonialsData[currentTestimonialIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonialsData[currentTestimonialIndex].role}</p>
                </CardContent>
                <CardFooter className="bg-secondary/30 p-4 flex justify-center">
                  <FlowButton variant="link" className="text-primary hover:underline">
                    Read More / Watch Video
                  </FlowButton>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
          <FlowButton
            onClick={prevTestimonial}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:inline-flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </FlowButton>
          <FlowButton
            onClick={nextTestimonial}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:inline-flex"
          >
            <ChevronRight className="h-6 w-6" />
          </FlowButton>
        </div>
        <div className="flex justify-center mt-8 gap-4 md:hidden">
          <FlowButton onClick={prevTestimonial} variant="outline" size="icon">
            <ChevronLeft />
          </FlowButton>
          <FlowButton onClick={nextTestimonial} variant="outline" size="icon">
            <ChevronRight />
          </FlowButton>
        </div>
      </div>
    </motion.section>
  )
}

export default TestimonialsSection
