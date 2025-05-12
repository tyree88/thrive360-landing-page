"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { Layers, Zap, BarChart, Users, Sparkles, Shield, Smartphone, Globe } from "lucide-react"
import { EnhancedFeatureCard } from "../ui/enhanced-feature-card"
import { EnhancedDeviceMockup } from "../ui/enhanced-device-mockup"
import { UnifiedSection } from "../ui/unified-section"

// Feature card data
const featureCards = [
  {
    id: 1,
    title: "Personalized Mental Health Assessment",
    description: "Have assessment that adapts to your responses for personalized insights.",
    icon: <Layers className="h-5 w-5" />,
    color: "green",
    industry: "Healthcare",
    percentage: "78%",
    percentageLabel: "of users completed the assessment",
  },
  {
    id: 2,
    title: "Treatment Progress Tracking",
    description: "Time-monitoring of treatment progress with visual progress indicators.",
    icon: <BarChart className="h-5 w-5" />,
    color: "blue",
    industry: "Mental Health",
    percentage: "52%",
    percentageLabel: "increase in treatment adherence",
  },
  {
    id: 3,
    title: "Smart Wellness Reminders",
    description: "Behavioral reminders that adapt to environmental and emotional triggers.",
    icon: <Sparkles className="h-5 w-5" />,
    color: "purple",
    industry: "Wellness",
    percentage: "64%",
    percentageLabel: "reduction in missed sessions",
  },
  {
    id: 4,
    title: "Peer Community Support",
    description: "Secure, moderated peer support communities for shared experiences and encouragement.",
    icon: <Users className="h-5 w-5" />,
    color: "pink",
    industry: "Support Groups",
    percentage: "78%",
    percentageLabel: "of users report feeling less isolated",
  },
  {
    id: 5,
    title: "AI-Powered Insights",
    description: "Advanced analytics that identify patterns and suggest personalized interventions.",
    icon: <Zap className="h-5 w-5" />,
    color: "indigo",
    industry: "Technology",
    percentage: "43%",
    percentageLabel: "improvement in early intervention",
  },
  {
    id: 6,
    title: "Crisis Response System",
    description: "Immediate support resources and escalation protocols for urgent situations.",
    icon: <Shield className="h-5 w-5" />,
    color: "amber",
    industry: "Emergency Services",
    percentage: "91%",
    percentageLabel: "faster response to critical needs",
  },
  {
    id: 7,
    title: "Multi-Platform Access",
    description: "Seamless experience across mobile, tablet, and desktop devices.",
    icon: <Smartphone className="h-5 w-5" />,
    color: "green",
    industry: "Digital Health",
    percentage: "65%",
    percentageLabel: "increase in daily engagement",
  },
  {
    id: 8,
    title: "Integrated Care Network",
    description: "Connect with providers, specialists, and support services in one platform.",
    icon: <Globe className="h-5 w-5" />,
    color: "blue",
    industry: "Healthcare",
    percentage: "87%",
    percentageLabel: "of users report improved care coordination",
  },
]

export function EnhancedSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [isPinned, setIsPinned] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [deviceType, setDeviceType] = useState<"ipad" | "iphone" | "macbook">("ipad")
  const [scrollProgress, setScrollProgress] = useState(0)
  const inView = useInView(sectionRef, { amount: 0.1 })

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1200)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle scroll-based pinning with extended scroll length
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the section is in view
        if (entry.isIntersecting) {
          const handleScroll = () => {
            if (!sectionRef.current || !headerRef.current || !footerRef.current) return

            const sectionRect = sectionRef.current.getBoundingClientRect()
            const headerHeight = headerRef.current.offsetHeight
            const footerTop = footerRef.current.getBoundingClientRect().top
            const viewportHeight = window.innerHeight

            // Calculate scroll progress (0 to 1)
            const totalScrollDistance = sectionRect.height - viewportHeight
            const scrolled = -sectionRect.top
            const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance))
            setScrollProgress(progress)

            // Pin/unpin based on scroll position with extended range
            // Start pinning after the header is scrolled out of view
            if (sectionRect.top <= 0 && footerTop >= viewportHeight) {
              setIsPinned(true)
            } else {
              setIsPinned(false)
            }
          }

          window.addEventListener("scroll", handleScroll)
          return () => window.removeEventListener("scroll", handleScroll)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <UnifiedSection
      ref={sectionRef}
      id="solution"
      className="py-32"
      style={{
        minHeight: "200vh", // Increased section height for longer scroll
      }}
      customBackground={
        "linear-gradient(180deg, #0f172a 0%, #1a1f35 10%, #1e2243 20%, #2a2356 30%, #2e2a5e 40%, #3a3173 50%, #efe9ff 90%)"
      }
      badge="Our Solution"
      badgeClassName="bg-indigo-950 text-indigo-300"
      heading="Innovative Approach"
      headingClassName="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400"
      subheading="Transforming mental health and wellness experiences through our comprehensive platform"
      subheadingClassName="text-slate-300"
      headerRef={headerRef}
    >
      {/* Device selection (optional) */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setDeviceType("ipad")}
          className={`px-3 py-1 rounded-full text-sm ${
            deviceType === "ipad" ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-800"
          }`}
          aria-pressed={deviceType === "ipad"}
        >
          Tablet
        </button>
        <button
          onClick={() => setDeviceType("iphone")}
          className={`px-3 py-1 rounded-full text-sm ${
            deviceType === "iphone" ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-800"
          }`}
          aria-pressed={deviceType === "iphone"}
        >
          Phone
        </button>
        <button
          onClick={() => setDeviceType("macbook")}
          className={`px-3 py-1 rounded-full text-sm ${
            deviceType === "macbook" ? "bg-indigo-600 text-white" : "bg-indigo-200 text-indigo-800"
          }`}
          aria-pressed={deviceType === "macbook"}
        >
          Desktop
        </button>
      </div>

      {/* Device Mockup with Feature Cards */}
      <EnhancedDeviceMockup isPinned={isPinned} isMobile={isMobile} isTablet={isTablet} deviceType={deviceType}>
        <div className="feature-cards-grid">
          {featureCards.map((card, index) => (
            <EnhancedFeatureCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              color={card.color}
              percentage={card.percentage}
              percentageLabel={card.percentageLabel}
              industry={card.industry}
              index={index}
            />
          ))}
        </div>
      </EnhancedDeviceMockup>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-8 right-8 z-20 hidden md:block">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollProgress * 100}
              transform="rotate(-90 18 18)"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
            >
              {Math.round(scrollProgress * 100)}%
            </text>
          </svg>
        </div>
      </div>

      {/* Footer reference for unpinning */}
      <div
        ref={footerRef}
        className="mt-[1500px]" // Added extra space to extend scroll length
      >
        {/* Transition to next section */}
        <div className="h-32 bg-gradient-to-t from-[#efe9ff] to-transparent"></div>
      </div>
    </UnifiedSection>
  )
}
