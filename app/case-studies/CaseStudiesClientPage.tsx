"use client"

import CaseStudiesGrid from "@/components/case-studies/case-studies-grid"
import { ThriveNavbar } from "@/components/ui/thrive-navbar"
import { ThriveFooter } from "@/components/ui/thrive-footer"
import { ThriveCTA } from "@/components/ui/thrive-cta"
import "../case-studies/case-studies-grid.css"

export default function CaseStudiesClientPage() {
  return (
    <main className="min-h-screen">
      <ThriveNavbar />
      <CaseStudiesGrid />
      <ThriveCTA
        title="Ready to transform your organization's mental health approach?"
        description="Schedule a demo to see how Thrive360 can help your team thrive."
        buttonText="Schedule a Demo"
        buttonLink="/contact"
      />
      <ThriveFooter />
    </main>
  )
}
