import type { Metadata } from "next"
import BusinessHero from "@/components/business-solutions/hero"
import BusinessOverview from "@/components/business-solutions/overview"
import BusinessCaseStudies from "@/components/business-solutions/case-studies"
import BusinessTestimonials from "@/components/business-solutions/testimonials"
import BusinessROICalculator from "@/components/business-solutions/roi-calculator"
import BusinessCTA from "@/components/business-solutions/cta"

export const metadata: Metadata = {
  title: "Business Solutions | Thrive360",
  description:
    "Discover how Thrive360 can transform your business with tailored mental health and wellbeing solutions that drive measurable results.",
}

export default function BusinessSolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BusinessHero />
      <BusinessOverview />
      <BusinessCaseStudies />
      <BusinessTestimonials />
      <BusinessROICalculator />
      <BusinessCTA />
    </div>
  )
}
