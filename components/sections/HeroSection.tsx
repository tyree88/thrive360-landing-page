"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0c0e16 0%, #1e1b4b 50%, #312e81 100%)",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
      }}
    >
      {/* Curved gradient line */}
      <div className="absolute w-full h-full">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 400C0 400 200 100 720 100C1240 100 1440 400 1440 400C1440 400 1240 700 720 700C200 700 0 400 0 400Z"
            stroke="url(#gradient)"
            strokeWidth="40"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e94a9c" />
              <stop offset="100%" stopColor="#5e5ef7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Additional aurora layers for full viewport coverage */}
      <div className="absolute inset-0 w-screen h-full bg-gradient-to-tr from-purple-900/30 via-transparent to-indigo-900/30 animate-aurora"></div>
      <div className="absolute inset-0 w-screen h-full bg-[radial-gradient(ellipse_at_top,theme(colors.purple.600/30%),transparent_50%)] blur-xl"></div>
      <div className="absolute inset-0 w-screen h-full bg-[radial-gradient(ellipse_at_bottom,theme(colors.indigo.700/30%),transparent_50%)] blur-xl"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
        >
          Systems that deliver <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94a9c] to-[#5e5ef7]">
            outcomes for
          </span>{" "}
          <br className="hidden md:block" />
          organizations.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 md:mt-12 mb-16 md:mb-20"
        >
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 text-slate-900 font-medium rounded-full px-8 py-6 text-lg"
            asChild
          >
            <Link href="#demo">Schedule a Demo</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 w-full"
        >
          <p className="text-slate-400 mb-6 text-sm uppercase tracking-wider">Trusted by leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <Image
              src="/healthcare-logo.png"
              alt="Healthcare Partner"
              width={100}
              height={40}
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/finance-company-logo.png"
              alt="Finance Partner"
              width={100}
              height={40}
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/modern-retail-tech.png"
              alt="Retail Partner"
              width={100}
              height={40}
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/manufacturing-company-logo.png"
              alt="Manufacturing Partner"
              width={100}
              height={40}
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/digital-sphere-logo.png"
              alt="Tech Partner"
              width={100}
              height={40}
              className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
