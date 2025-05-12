"use client"

import { motion } from "framer-motion"
import { ArrowRight, BarChart3, Users, TrendingUp } from "lucide-react"
import { FlowButton } from "../ui/flow-button"
import { useMobile } from "@/hooks/use-mobile"

export default function BusinessHero() {
  const isMobile = useMobile()

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-900 to-purple-950">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block mb-6 px-4 py-1.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Thrive360 for Business
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-300">
              Transform Your Business with Mental Wellbeing
            </h1>
            <p className="text-lg md:text-xl text-purple-100/80 mb-8 max-w-xl">
              Discover how Thrive360's comprehensive mental health platform can drive measurable business results
              through improved employee wellbeing, productivity, and retention.
            </p>
            <div className="flex flex-wrap gap-4">
              <FlowButton className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-lg rounded-lg">
                Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </FlowButton>
              <FlowButton
                variant="outline"
                className="border-purple-500 text-purple-300 hover:bg-purple-500/20 px-6 py-6 text-lg rounded-lg"
              >
                View Case Studies
              </FlowButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative ${isMobile ? "mt-10" : ""}`}
          >
            <div className="absolute -inset-px bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-20"></div>
            <div className="relative bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 md:p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/60 rounded-lg p-5 border border-purple-500/20">
                  <BarChart3 className="h-8 w-8 text-purple-400 mb-3" />
                  <h3 className="text-xl font-semibold text-white mb-2">Productivity</h3>
                  <p className="text-purple-100/70 text-sm">
                    <span className="text-green-400 font-bold">+32%</span> average productivity improvement
                  </p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-5 border border-purple-500/20">
                  <Users className="h-8 w-8 text-purple-400 mb-3" />
                  <h3 className="text-xl font-semibold text-white mb-2">Retention</h3>
                  <p className="text-purple-100/70 text-sm">
                    <span className="text-green-400 font-bold">-28%</span> employee turnover reduction
                  </p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-5 border border-purple-500/20">
                  <TrendingUp className="h-8 w-8 text-purple-400 mb-3" />
                  <h3 className="text-xl font-semibold text-white mb-2">ROI</h3>
                  <p className="text-purple-100/70 text-sm">
                    <span className="text-green-400 font-bold">5.4x</span> average return on investment
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-5 border border-purple-500/30">
                  <h3 className="text-lg font-semibold text-white mb-2">Trusted By</h3>
                  <p className="text-purple-100/70 text-sm">500+ businesses across industries</p>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
