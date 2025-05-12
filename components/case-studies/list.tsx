"use client"

import { useState } from "react"
import type { CaseStudy } from "@/lib/case-studies-data"
import CaseStudyCard from "./card"
import { FlowButton } from "@/components/ui/flow-button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CaseStudiesListProps {
  caseStudies: CaseStudy[]
}

export default function CaseStudiesList({ caseStudies }: CaseStudiesListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(caseStudies.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentStudies = caseStudies.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of list
    document.getElementById("case-studies-list")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div id="case-studies-list">
      <h2 className="text-3xl font-bold mb-8" id="featured-studies">
        Success Stories
      </h2>

      <div className="grid gap-8">
        {currentStudies.map((study) => (
          <CaseStudyCard key={study.id} caseStudy={study} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 gap-2">
          <FlowButton
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </FlowButton>

          {Array.from({ length: totalPages }).map((_, index) => (
            <FlowButton
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              className={currentPage === index + 1 ? "bg-thrive-purple-600" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </FlowButton>
          ))}

          <FlowButton
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </FlowButton>
        </div>
      )}
    </div>
  )
}
