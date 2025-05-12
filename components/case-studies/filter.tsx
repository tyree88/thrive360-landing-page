"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { FlowButton } from "../ui/flow-button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { INDUSTRIES, TAGS } from "@/lib/case-studies-data"

export default function CaseStudiesFilter() {
  const [openIndustries, setOpenIndustries] = useState(true)
  const [openTags, setOpenTags] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filter Case Studies</h3>
        <div className="space-y-4">
          <Collapsible open={openIndustries} onOpenChange={setOpenIndustries}>
            <CollapsibleTrigger asChild>
              <FlowButton variant="ghost" className="flex w-full justify-between p-0 h-auto">
                <span className="font-medium">Industries</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${openIndustries ? "transform rotate-180" : ""}`}
                />
              </FlowButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {INDUSTRIES.map((industry) => (
                <div key={industry} className="flex items-center gap-2 py-1">
                  <div className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center">
                    {/* <Check className="h-3 w-3" /> */}
                  </div>
                  <span className="text-sm">{industry}</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={openTags} onOpenChange={setOpenTags}>
            <CollapsibleTrigger asChild>
              <FlowButton variant="ghost" className="flex w-full justify-between p-0 h-auto">
                <span className="font-medium">Tags</span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openTags ? "transform rotate-180" : ""}`} />
              </FlowButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {TAGS.map((tag) => (
                <div key={tag} className="flex items-center gap-2 py-1">
                  <div className="h-4 w-4 rounded border border-gray-300 flex items-center justify-center">
                    {/* <Check className="h-3 w-3" /> */}
                  </div>
                  <span className="text-sm">{tag}</span>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <select className="w-full rounded-md border border-gray-300 p-2">
          <option value="recent">Most Recent</option>
          <option value="featured">Featured</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      <FlowButton className="w-full bg-thrive-purple-600 hover:bg-thrive-purple-700">Apply Filters</FlowButton>
    </div>
  )
}
