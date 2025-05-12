import PartnershipHero from "@/components/partnerships/hero"
import PartnershipTypes from "@/components/partnerships/types"
import PartnerBenefits from "@/components/partnerships/benefits"
import PartnerShowcase from "@/components/partnerships/showcase"
import BecomePartner from "@/components/partnerships/become-partner"
import PartnerTestimonials from "@/components/partnerships/testimonials"
import PartnershipFaq from "@/components/partnerships/faq"
import PartnershipCta from "@/components/partnerships/cta"

export const metadata = {
  title: "Partnerships | Thrive360",
  description:
    "Join the Thrive360 partner ecosystem and help transform mental wellness through neuroplastic engagement technology.",
}

export default function PartnershipsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PartnershipHero />
      <PartnershipTypes />
      <PartnerBenefits />
      <PartnerShowcase />
      <BecomePartner />
      <PartnerTestimonials />
      <PartnershipFaq />
      <PartnershipCta />
    </main>
  )
}
