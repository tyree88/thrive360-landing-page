"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    question: "How fast do we see engagement lift?",
    answer:
      "Many clients report noticeable improvements in engagement metrics within the first 90 days. Our pilot programs are designed to demonstrate initial impact quickly, with ongoing optimization for sustained growth.",
  },
  {
    question: "Can we tie this program to our OKRs?",
    answer:
      "Absolutely. Thrive360 is designed to align with your key business objectives (OKRs). We work with you to define relevant metrics and track progress towards your specific goals, ensuring the program delivers measurable business value.",
  },
  {
    question: "Is employee data secure & private?",
    answer:
      "Data security and privacy are paramount. We employ industry-standard encryption, comply with relevant data protection regulations (like GDPR, CCPA), and ensure all employee data is anonymized and aggregated for reporting purposes. Individual data is never shared without explicit consent.",
  },
  {
    question: "How does this work with global teams/time zones?",
    answer:
      "Our platform is built for global accessibility. Micro-interventions can be scheduled according to local time zones, and content can be localized if needed. The mobile app and portal are accessible 24/7, catering to diverse work schedules and locations.",
  },
]

const BenefitsFaq = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-bl from-slate-900 to-thrive-purple-dark">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-thrive-teal-light to-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-slate-800/50 backdrop-blur-sm border border-thrive-teal/30 rounded-lg px-4 hover:border-thrive-teal transition-colors"
                >
                  <AccordionTrigger className="text-lg text-left font-semibold text-gray-100 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

export default BenefitsFaq
