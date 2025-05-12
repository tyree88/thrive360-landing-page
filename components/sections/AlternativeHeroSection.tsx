"use client"

import { useRef } from "react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AlternativeHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full min-h-screen" ref={sectionRef}>
      <AuroraBackground className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] w-full px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Systems that deliver <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">
              outcomes for
            </span>{" "}
            <br className="hidden md:block" />
            organizations.
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-[800px] mx-auto mb-10">
            Empowering organizations with innovative solutions for better mental health outcomes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg" asChild>
              <Link href="#demo">Schedule a Demo</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg text-white border-white hover:bg-white/10"
              asChild
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16"
      >
        <p className="text-slate-300 mb-8 text-sm uppercase tracking-wider font-medium">
          Trusted by leading organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full">
          <Image
            src="/healthcare-logo.png"
            alt="Healthcare Partner"
            width={100}
            height={40}
            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/finance-company-logo.png"
            alt="Finance Partner"
            width={100}
            height={40}
            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/modern-retail-tech.png"
            alt="Retail Partner"
            width={100}
            height={40}
            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/manufacturing-company-logo.png"
            alt="Manufacturing Partner"
            width={100}
            height={40}
            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
          <Image
            src="/digital-sphere-logo.png"
            alt="Tech Partner"
            width={100}
            height={40}
            className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      </motion.div>
    </div>
  )
}
