import BenefitsHero from "@/components/benefits/hero"
import BenefitsFeatures from "@/components/benefits/features"
import BenefitsComparison from "@/components/benefits/comparison"
import BenefitsTestimonials from "@/components/benefits/testimonials"
import BenefitsCta from "@/components/benefits/cta"

export default function BenefitsPage() {
  return (
    <main className="min-h-screen">
      <BenefitsHero />
      <BenefitsFeatures />
      <BenefitsComparison />
      <BenefitsTestimonials />
      <BenefitsCta />
    </main>
  )
}
