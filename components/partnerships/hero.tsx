"use client"
import { motion } from "framer-motion"
import { FlowButton } from "../ui/flow-button"

const PartnershipHero = () => {
  return (
    <section
      id="partnership-hero"
      className="py-20 md:py-24 bg-gradient-to-br from-background via-slate-50 to-primary/10"
    >
      <div className="container px-4 md:px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8">
            Partner with <span className="text-primary">Thrive360</span> to Transform Mental Wellness
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8">
            Join our ecosystem of innovative partners helping to revolutionize mental health support through
            neuroplastic engagement technology.
          </p>
          <FlowButton
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-md text-lg font-medium"
          >
            Become a Partner
          </FlowButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-10 md:mt-0"
        >
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl border border-border">
            <div className="aspect-[16/10] bg-slate-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
              <img
                alt="Partnership ecosystem visualization"
                className="w-full h-full object-cover rounded-lg"
                src="/partnership-ecosystem.png"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent"></div>
              <p className="absolute bottom-4 text-sm text-white font-medium bg-black/30 px-3 py-1 rounded-full">
                Thrive360 Partner Ecosystem
              </p>
            </div>
          </div>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnershipHero
