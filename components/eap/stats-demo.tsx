"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PhoneMockup from "@/components/phone-mockup"
import DataTrigger from "@/components/data-trigger"
import ScrollReveal from "@/components/scroll-reveal"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const STATS_DATA_POINTS = [
  {
    key: "mau",
    image: "/employee-engagement-dashboard.png",
    stat: "+72%",
    description: "Monthly Active Users Increase",
    title: "Boosted Monthly Engagement",
    copy: "Our Neuroplastic Engagement™ techniques significantly increase the number of employees actively using your EAP resources month over month.",
  },
  {
    key: "missedAppointments",
    image: "/calendar-reminders.png",
    stat: "30%",
    description: "Decrease in Missed Appointments",
    title: "Reduced Appointment No-Shows",
    copy: "Smart, timely reminders and easy rescheduling options, powered by neuroplastic principles, help cut down on missed EAP appointments.",
  },
  {
    key: "stigmaReduction",
    image: "/anonymous-mental-health-interface.png",
    stat: "85%",
    description: "Self-Reported Reduction in Stigma",
    title: "Lowered Stigma Barrier",
    copy: "Anonymous access and personalized, discreet support encourage more employees to seek help, leading to a significant reduction in perceived stigma.",
  },
]

const StatsDemoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section id="stats-demo" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Impactful <span className="text-primary">Results</span>, Scroll to See
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 md:mb-16">
            Witness how Neuroplastic Engagement™ transforms EAP effectiveness.
          </p>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-6 relative md:flex md:gap-8 min-h-[80vh] md:min-h-[120vh]">
        <div className="md:w-1/2 md:sticky md:top-[20vh] h-[380px] md:h-[calc(60vh)] flex flex-col items-center justify-center py-8 md:py-0">
          <PhoneMockup screenSrc={STATS_DATA_POINTS[currentIndex]?.image} />
          <div className="mt-4 text-center">
            <NeuroplasticBadge />
            <p className="text-sm text-muted-foreground mt-1">Powered by Neuroplastic Engagement™</p>
          </div>
        </div>

        <div className="md:w-1/2 mt-16 md:mt-0 space-y-64 sm:space-y-72 md:space-y-80 lg:space-y-96">
          {STATS_DATA_POINTS.map((dp, i) => (
            <DataTrigger
              key={dp.key}
              index={i}
              onEnter={setCurrentIndex}
              className="py-16 md:py-24 min-h-[300px] md:min-h-[350px] flex items-center"
            >
              <motion.div
                className="max-w-md mx-auto md:mx-0"
                initial={{ opacity: 0.3, y: 30 }}
                animate={currentIndex === i ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h3 className="text-4xl lg:text-5xl font-bold mb-3 text-primary">{dp.stat}</h3>
                <p className="text-md lg:text-lg font-semibold text-foreground mb-3">{dp.description}</p>
                <h4 className="text-xl lg:text-2xl font-semibold mb-2">{dp.title}</h4>
                <p className="text-md text-muted-foreground leading-relaxed">{dp.copy}</p>
              </motion.div>
            </DataTrigger>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsDemoSection
