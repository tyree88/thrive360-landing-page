"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import gsap from "gsap"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1"
import { UnifiedSection } from "@/components/ui/unified-section"

const testimonials = [
  {
    text: "Thrive360 has transformed how we approach employee wellbeing. The personalized approach and measurable outcomes have made a real difference in our organization.",
    name: "Sarah Johnson",
    role: "Chief People Officer, TechGiant Inc.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    text: "The neuroplasticity-based approach is revolutionary. We've seen significant improvements in stress levels, productivity, and overall employee satisfaction.",
    name: "Michael Chen",
    role: "Director of Wellness, Global Finance Group",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    text: "What sets Thrive360 apart is the science-backed methodology and the ability to track real progress. Our faculty members have embraced it wholeheartedly.",
    name: "Dr. Emily Rodriguez",
    role: "Dean of Faculty, Westlake University",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    text: "The ROI has been incredible. Not only are our employees happier and healthier, but we've seen tangible improvements in retention and productivity.",
    name: "James Wilson",
    role: "CEO, Retail Innovations Co.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    text: "Since implementing Thrive360, we've seen a 30% reduction in stress-related absences and a marked improvement in team collaboration.",
    name: "Lisa Thompson",
    role: "HR Director, Manufacturing Solutions",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    text: "The personalized mental health approach has been a game-changer for our remote workforce, helping them feel connected and supported.",
    name: "David Park",
    role: "VP of People, Tech Innovators",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    })

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }).fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4",
    )
  }, [])

  return (
    <UnifiedSection
      id="testimonials"
      ref={sectionRef}
      variant="light"
      bgClassName="bg-light-purple-50"
      className="min-h-screen flex flex-col justify-center"
      showTransitionTop={false}
      showTransitionBottom={false}
      heading="What Our Clients Say"
      headingRef={titleRef}
      subheadingRef={subtitleRef}
      subheading="Hear from organizations that have transformed their approach to mental health with Thrive360."
      badge="Testimonials"
      badgeClassName="bg-light-purple-100 text-thrive-purple-700"
      headingClassName="text-thrive-purple-800"
      subheadingClassName="text-thrive-purple-600"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden w-full bg-light-purple-50">
        <TestimonialsColumn testimonials={testimonials.slice(0, 2)} duration={15} className="w-full" />
        <TestimonialsColumn testimonials={testimonials.slice(2, 4)} duration={19} className="w-full" />
        <TestimonialsColumn testimonials={testimonials.slice(4, 6)} duration={17} className="w-full" />
      </div>
    </UnifiedSection>
  )
}

export default TestimonialsSection
