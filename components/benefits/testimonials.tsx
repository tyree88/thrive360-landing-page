"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Thrive360 has transformed our workplace culture. Our employees are more engaged, productive, and happier than ever before.",
    author: "Sarah Johnson",
    role: "HR Director, Tech Solutions Inc.",
    avatar: "/avatar-sarah.png",
    initials: "SJ",
  },
  {
    quote:
      "The data-driven insights from Thrive360 have helped us identify and address wellbeing issues before they become problems.",
    author: "Michael Chen",
    role: "CEO, Innovate Partners",
    avatar: "/avatar-michael.png",
    initials: "MC",
  },
  {
    quote: "Our team's productivity has increased by 30% since implementing Thrive360's wellbeing programs.",
    author: "Alex Rodriguez",
    role: "Operations Manager, Global Retail",
    avatar: "/avatar-alex.png",
    initials: "AR",
  },
]

export default function BenefitsTestimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Hear from organizations that have transformed their workplace with Thrive360.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <blockquote className="text-slate-600 italic mb-6 flex-grow">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
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
