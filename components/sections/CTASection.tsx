"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ThriveLogo } from "@/components/ui/thrive-logo"
import { FlowButton } from "@/components/ui/flow-button"
import { UnifiedSection } from "@/components/ui/unified-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !formRef.current) return

    gsap.fromTo(
      contentRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 0.5,
        },
      },
    )

    gsap.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 40%",
          scrub: 0.5,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <UnifiedSection
      id="contact"
      ref={sectionRef}
      variant="light"
      bgClassName="bg-thrive-purple-50"
      overlayClassName="bg-gradient-to-b from-thrive-purple-100 to-thrive-purple-50 opacity-80"
      className="min-h-screen flex items-center"
    >
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto bg-white rounded-2xl border border-thrive-purple-200 shadow-2xl overflow-hidden"
      >
        <div className="p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <ThriveLogo variant="color" type="brandmark" size="medium" />
              </div>
              <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-thrive-purple-900 mb-4">
                Ready to Transform Your Digital Experience?
              </h2>
              <p className="text-thrive-purple-700 mb-6">
                Join the leading organizations using our innovative solutions to engage their audience and drive
                results.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-thrive-purple-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-thrive-purple-600 rounded-full"></div>
                  </div>
                  <p className="text-thrive-purple-700">Personalized strategy consultation</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-thrive-purple-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-thrive-purple-600 rounded-full"></div>
                  </div>
                  <p className="text-thrive-purple-700">Tailored solutions for your specific needs</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-thrive-purple-100 rounded-full mt-1">
                    <div className="w-2 h-2 bg-thrive-purple-600 rounded-full"></div>
                  </div>
                  <p className="text-thrive-purple-700">Ongoing support and optimization</p>
                </div>
              </div>
            </div>

            <div>
              <form ref={formRef} className="bg-thrive-purple-50 p-6 rounded-xl border border-thrive-purple-200">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-thrive-purple-800 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-white border border-thrive-purple-300 rounded-lg text-thrive-purple-900 placeholder-thrive-purple-400 focus:outline-none focus:ring-2 focus:ring-thrive-purple-600"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-thrive-purple-800 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-white border border-thrive-purple-300 rounded-lg text-thrive-purple-900 placeholder-thrive-purple-400 focus:outline-none focus:ring-2 focus:ring-thrive-purple-600"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-thrive-purple-800 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 bg-white border border-thrive-purple-300 rounded-lg text-thrive-purple-900 placeholder-thrive-purple-400 focus:outline-none focus:ring-2 focus:ring-thrive-purple-600"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-thrive-purple-800 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 bg-white border border-thrive-purple-300 rounded-lg text-thrive-purple-900 placeholder-thrive-purple-400 focus:outline-none focus:ring-2 focus:ring-thrive-purple-600"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <div>
                    <FlowButton text="Get Started" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UnifiedSection>
  )
}

export default CTASection
