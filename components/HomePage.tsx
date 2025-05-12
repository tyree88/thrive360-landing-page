"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Loading from "@/app/loading"

// Dynamic imports for client components
const SphereSection = dynamic(() => import("@/components/sections/SphereSection"), { ssr: false })
const HeroSection = dynamic(() => import("@/components/sections/HeroSection"))
const ProblemSection = dynamic(() => import("@/components/sections/ProblemSection"))
const SolutionSection = dynamic(() => import("@/components/sections/SolutionSection"))
const MultiDeviceSection = dynamic(() => import("@/components/sections/MultiDeviceSection"))
const CaseStudiesCardSection = dynamic(() => import("@/components/sections/CaseStudiesCardSection"))
const TrustedCompaniesSection = dynamic(() => import("@/components/sections/TrustedCompaniesSection"))
const SolutionsSection = dynamic(() => import("@/components/sections/SolutionsSection"))
const BusinessesSection = dynamic(() => import("@/components/sections/BusinessesSection"))
const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection"))
const CTASection = dynamic(() => import("@/components/sections/CTASection"))

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <SphereSection>
        <div className="bg-slate-950">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <MultiDeviceSection />
          <CaseStudiesCardSection />
          <TrustedCompaniesSection />
          <SolutionsSection />
          <BusinessesSection />
          <TimelineSection />
          <CTASection />
        </div>
      </SphereSection>
    </Suspense>
  )
}
