"use client"

import type React from "react"

import { useState } from "react"
import { Users, TrendingUp, Brain, Heart } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies-data"
import { FlowButton } from "@/components/ui/flow-button"

interface CaseStudyFlipCardProps {
  caseStudy: CaseStudy
}

// Map industry to icon
const industryIcons: Record<string, React.ReactNode> = {
  Technology: <Brain className="w-16 h-16 text-white" />,
  Healthcare: <Heart className="w-16 h-16 text-white" />,
  Finance: <TrendingUp className="w-16 h-16 text-white" />,
  Retail: <Users className="w-16 h-16 text-white" />,
  Manufacturing: <TrendingUp className="w-16 h-16 text-white" />,
  Education: <Brain className="w-16 h-16 text-white" />,
}

export default function CaseStudyFlipCard({ caseStudy }: CaseStudyFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Get the icon based on industry or default to Users
  const icon = industryIcons[caseStudy.industry] || <Users className="w-16 h-16 text-white" />

  // Get the primary result (first one)
  const primaryResult = caseStudy.results[0]

  return (
    <div
      className="flip-card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsFlipped(!isFlipped)
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
      aria-label={`${caseStudy.title} - Press Enter to flip card`}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front face */}
        <div className="flip-card-front">
          <div className="icon-blob">{icon}</div>
          <h3 className="card-title">{caseStudy.title}</h3>
          <p className="card-industry">{caseStudy.industry}</p>
        </div>

        {/* Back face */}
        <div className="flip-card-back">
          <div className="back-content">
            <h3 className="back-title">{caseStudy.client}</h3>
            <div className="result-highlight">
              <span className="result-value">{primaryResult.value}</span>
              <span className="result-title">{primaryResult.title}</span>
            </div>
            <p className="back-summary">{caseStudy.summary}</p>
            <FlowButton text="Read Case Study" asLink href={`/case-studies/${caseStudy.id}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
