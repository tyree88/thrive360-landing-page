import type { Metadata } from "next"
import HeroSection from "@/components/eap/hero"
import EapChallengeSection from "@/components/eap/eap-challenge"
import NeuroplasticSolutionSection from "@/components/eap/neuroplastic-solution"
import CoreCapabilitiesSection from "@/components/eap/core-capabilities"
import HowItWorksSection from "@/components/eap/how-it-works"
import StatsDemoSection from "@/components/eap/stats-demo"
import IntegrationSection from "@/components/eap/integration"
import ProofSection from "@/components/eap/proof"
import FinalCtaSection from "@/components/eap/final-cta"

export const metadata: Metadata = {
  title: "Thrive360 | EAP Solutions",
  description:
    "Transform your EAP with Thrive360's Neuroplastic Engagement™ to drive real, lasting employee wellbeing.",
}

export default function EAPSolutionsPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <EapChallengeSection />
      <NeuroplasticSolutionSection />
      <CoreCapabilitiesSection />
      <HowItWorksSection />
      <StatsDemoSection />
      <IntegrationSection />
      <ProofSection />
      <FinalCtaSection />
    </main>
  )
}
