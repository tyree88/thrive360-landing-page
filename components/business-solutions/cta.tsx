"use client"

import { motion } from "framer-motion"
import { Calendar, MessageSquare, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FlowButton } from "@/components/ui/flow-button"

export default function BusinessCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-950 to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to <span className="text-purple-400">Transform</span> Your Business?
          </h2>
          <p className="text-lg text-purple-100/70 max-w-3xl mx-auto">
            Take the next step toward creating a more resilient, productive, and engaged workforce with Thrive360.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full bg-slate-800/50 border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 mb-4 inline-block shadow-md">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Schedule a Demo</h3>
                <p className="text-purple-100/70 mb-6 flex-grow">
                  See Thrive360 in action with a personalized demonstration tailored to your industry and business
                  needs.
                </p>
                <div className="w-full flex justify-center">
                  <FlowButton text="Book Your Demo" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="p-3 rounded-full bg-gradient-to-br from-pink-600 to-purple-700 mb-4 inline-block shadow-md">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Speak with an Expert</h3>
                <p className="text-purple-100/70 mb-6 flex-grow">
                  Connect with our business solutions team to discuss your specific challenges and how Thrive360 can
                  help.
                </p>
                <div className="w-full flex justify-center">
                  <FlowButton text="Request Consultation" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full bg-slate-800/50 border-purple-500/30 shadow-lg hover:shadow-purple-500/10 transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center h-full">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 mb-4 inline-block shadow-md">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Download Resources</h3>
                <p className="text-purple-100/70 mb-6 flex-grow">
                  Access our business solution guides, case studies, and ROI calculators to learn more about Thrive360.
                </p>
                <div className="w-full flex justify-center">
                  <FlowButton text="Get Resources" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-purple-100/70 mb-4">
            Join 500+ businesses already transforming their organizations with Thrive360
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img
              src="/abstract-tech-logo.png"
              alt="Tech company logo"
              className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
            <img
              src="/healthcare-logo.png"
              alt="Healthcare company logo"
              className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
            <img
              src="/finance-company-logo.png"
              alt="Finance company logo"
              className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
            <img
              src="/generic-retail-logo.png"
              alt="Retail company logo"
              className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
            <img
              src="/manufacturing-company-logo.png"
              alt="Manufacturing company logo"
              className="h-8 md:h-10 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
