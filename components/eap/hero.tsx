"use client"
import { motion } from "framer-motion"
import { FlowButton } from "../ui/flow-button"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const HeroSection = () => {
  return (
    <section id="hero" className="section-padding bg-gradient-to-br from-background via-slate-50 to-primary/10 pt-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Revolutionize Your EAP with <span className="text-primary">Habit-Forming Support</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8">
            Embed Thrive360's Neuroplastic Engagement™ into your EAP to drive real, lasting employee wellbeing.
          </p>
          <FlowButton
            size="lg"
            className="bg-gradient-to-r from-primary to-light-purple-400 hover:from-primary/90 hover:to-light-purple-500 text-white shadow-lg hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            See It in Action
          </FlowButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-10 md:mt-0"
        >
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-border">
            <div className="aspect-[16/10] bg-slate-200 rounded-lg flex flex-col items-center justify-center relative">
              <img
                src="/eap-dashboard.png"
                alt="EAP Dashboard Mockup with Neuroplastic Engagement Badge"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <NeuroplasticBadge />
              </div>
              <p className="absolute bottom-4 text-sm text-slate-600 font-medium">EAP Dashboard Preview</p>
            </div>
          </div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
