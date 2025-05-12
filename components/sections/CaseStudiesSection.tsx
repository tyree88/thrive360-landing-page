"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { Building, GraduationCap, Briefcase, Users } from "lucide-react"
import { UnifiedSection } from "@/components/ui/unified-section"
import { ROUTES } from "@/lib/constants"
import gsap from "gsap"
import { FlowButton } from "@/components/ui/flow-button"

interface CaseStudyCardProps {
  title: string
  company: string
  industry: string
  challenge: string
  result: string
  icon: React.ReactNode
  color: string
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ title, company, industry, challenge, result, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-light-purple-100 h-full flex flex-col">
      <div className={`h-2 w-full bg-${color}-500`}></div>
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center mr-4`}>{icon}</div>
          <div>
            <h3 className="font-bold text-lg text-thrive-purple-800">{title}</h3>
            <p className="text-sm text-thrive-purple-600">
              {company} · {industry}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-thrive-purple-700 mb-1">Challenge:</p>
          <p className="text-sm text-thrive-purple-600">{challenge}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-thrive-purple-700 mb-1">Result:</p>
          <p className="text-sm text-thrive-purple-600">{result}</p>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-light-purple-100 bg-light-purple-50">
        <FlowButton text="Read full case study" asLink href="#" />
      </div>
    </div>
  )
}

const CaseStudiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    })

    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(
        cardsRef.current?.querySelectorAll(".case-study-card"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
  }, [])

  const caseStudies = [
    {
      title: "Reducing Burnout",
      company: "TechGiant Inc.",
      industry: "Technology",
      challenge: "High burnout rates among software engineers leading to turnover and decreased productivity.",
      result: "68% reduction in reported burnout and 34% increase in team productivity after 6 months.",
      icon: <Building className="h-6 w-6 text-thrive-purple-600" />,
      color: "thrive-purple",
    },
    {
      title: "Supporting Remote Teams",
      company: "Global Finance Group",
      industry: "Financial Services",
      challenge: "Maintaining mental wellbeing across globally distributed teams during pandemic transition.",
      result: "91% of employees reported feeling better supported, with 42% improvement in team cohesion metrics.",
      icon: <Users className="h-6 w-6 text-thrive-purple-600" />,
      color: "thrive-purple",
    },
    {
      title: "Improving Faculty Wellbeing",
      company: "Westlake University",
      industry: "Higher Education",
      challenge: "Rising stress levels among faculty affecting teaching quality and research output.",
      result: "76% of faculty reported improved stress management and 28% increase in research submissions.",
      icon: <GraduationCap className="h-6 w-6 text-thrive-purple-600" />,
      color: "thrive-purple",
    },
    {
      title: "Enhancing Sales Performance",
      company: "Retail Innovations Co.",
      industry: "Retail",
      challenge: "High-pressure sales environment causing anxiety and underperformance in sales teams.",
      result: "52% reduction in anxiety levels and 23% increase in sales performance within one quarter.",
      icon: <Briefcase className="h-6 w-6 text-thrive-purple-600" />,
      color: "thrive-purple",
    },
  ]

  return (
    <UnifiedSection
      id="case-studies"
      ref={sectionRef}
      variant="default"
      showTransitionTop={true}
      showTransitionBottom={true}
      heading="Real Results from Real Organizations"
      headingRef={titleRef}
      subheadingRef={subtitleRef}
      subheading="See how organizations across industries have transformed their approach to mental health."
      badge="Success Stories"
      badgeClassName="bg-light-purple-100 text-thrive-purple-700"
      headingClassName="text-thrive-purple-800"
      subheadingClassName="text-thrive-purple-600"
    >
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
        {caseStudies.map((study, index) => (
          <div key={index} className="case-study-card">
            <CaseStudyCard {...study} />
          </div>
        ))}
      </div>

      <div ref={ctaRef} className="text-center">
        <FlowButton text="View All Case Studies" asLink href={ROUTES.RESOURCES} />
      </div>
    </UnifiedSection>
  )
}

export default CaseStudiesSection
