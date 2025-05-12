import { ThriveNavbar } from "@/components/ui/thrive-navbar"
import { ThriveFooter } from "@/components/ui/thrive-footer"
import { FeatureCardsGrid } from "@/components/sections/FeatureCardsGrid"

export default function FeatureCardsDemo() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ThriveNavbar />
      <div className="pt-20">
        <FeatureCardsGrid />
      </div>
      <ThriveFooter />
    </main>
  )
}
