"use client"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import { UnifiedSection } from "@/components/ui/unified-section"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const timelineEvents = [
  {
    id: 1,
    year: "2018",
    title: "Company Founded",
    description: "Our journey began with a vision to transform digital experiences.",
  },
  {
    id: 2,
    year: "2019",
    title: "First Major Client",
    description: "Partnered with a Fortune 500 company to reimagine their digital presence.",
  },
  {
    id: 3,
    year: "2020",
    title: "Platform Launch",
    description: "Released our proprietary platform, setting new standards in the industry.",
  },
  {
    id: 4,
    year: "2021",
    title: "International Expansion",
    description: "Opened offices in Europe and Asia to serve our growing global client base.",
  },
  {
    id: 5,
    year: "2022",
    title: "Award Recognition",
    description: "Received multiple industry awards for innovation and excellence.",
  },
  {
    id: 6,
    year: "2023",
    title: "Strategic Partnerships",
    description: "Formed key alliances to enhance our technological capabilities.",
  },
  {
    id: 7,
    year: "2024",
    title: "Present Day",
    description: "Continuing to innovate and lead the industry with cutting-edge solutions.",
  },
]

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 0.9], [0, 100])

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return

    // Reset refs array
    eventsRef.current = eventsRef.current.slice(0, timelineEvents.length)
    while (eventsRef.current.length < timelineEvents.length) {
      eventsRef.current.push(null)
    }

    // Create the scroll trigger animation
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
        onUpdate: (self) => {
          // Calculate which event should be active based on scroll progress
          const progress = self.progress
          const eventIndex = Math.min(Math.floor(progress * timelineEvents.length), timelineEvents.length - 1)

          // Update active state for events
          eventsRef.current.forEach((ref, index) => {
            if (ref) {
              if (index <= eventIndex) {
                ref.classList.add("active")
              } else {
                ref.classList.remove("active")
              }
            }
          })
        },
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <UnifiedSection
      id="timeline"
      ref={sectionRef}
      variant="light"
      bgClassName="bg-light-purple-50"
      overlayClassName="bg-gradient-to-b from-light-purple-100 to-light-purple-50 opacity-80"
      spacing="lg"
      heading="Timeline of Growth"
      subheading="Tracing our evolution from inception to industry leadership"
      badge="Our Journey"
      badgeClassName="bg-white text-thrive-purple-700"
      headingClassName="text-thrive-purple-900"
      subheadingClassName="text-thrive-purple-700"
    >
      <div ref={timelineRef} className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-light-purple-200">
          <motion.div className="w-full bg-thrive-purple-600" style={{ height: `${lineProgress}%` }}></motion.div>
        </div>

        {/* Timeline Events */}
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              ref={(el) => (eventsRef.current[index] = el)}
              className={`timeline-event mb-24 flex items-center transition-all duration-500 opacity-50 hover:opacity-100`}
            >
              <div className={`w-1/2 pr-12 text-right ${index % 2 === 0 ? "block" : "hidden md:block"}`}>
                {index % 2 === 0 && (
                  <div>
                    <span className="text-thrive-purple-600 font-bold text-xl">{event.year}</span>
                    <h3 className="text-2xl font-bold text-thrive-purple-900 mb-2">{event.title}</h3>
                    <p className="text-thrive-purple-700">{event.description}</p>
                  </div>
                )}
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6">
                <div className="w-6 h-6 bg-white border-2 border-thrive-purple-600 rounded-full transition-all duration-300"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-thrive-purple-600 rounded-full timeline-dot"></div>
              </div>

              <div className={`w-1/2 pl-12 ${index % 2 === 1 ? "block" : "hidden md:block"}`}>
                {index % 2 === 1 && (
                  <div>
                    <span className="text-thrive-purple-600 font-bold text-xl">{event.year}</span>
                    <h3 className="text-2xl font-bold text-thrive-purple-900 mb-2">{event.title}</h3>
                    <p className="text-thrive-purple-700">{event.description}</p>
                  </div>
                )}
                {/* Mobile view (only shown on small screens) */}
                {index % 2 === 0 && (
                  <div className="md:hidden">
                    <span className="text-thrive-purple-600 font-bold text-xl">{event.year}</span>
                    <h3 className="text-2xl font-bold text-thrive-purple-900 mb-2">{event.title}</h3>
                    <p className="text-thrive-purple-700">{event.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-event.active .timeline-dot {
          background-color: white;
          box-shadow: 0 0 15px rgba(109, 40, 217, 0.5);
        }
        
        .timeline-event.active {
          opacity: 1;
        }
      `}</style>
    </UnifiedSection>
  )
}

export default TimelineSection
