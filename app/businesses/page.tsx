import type { Metadata } from "next"
import BusinessesOverview from "@/components/businesses/overview"

export const metadata: Metadata = {
  title: "Thrive360 | Business Solutions Overview",
  description:
    "Discover how Thrive360 helps businesses of all sizes improve employee wellbeing, productivity, and retention.",
}

export default function BusinessesPage() {
  return (
    <main className="min-h-screen">
      <BusinessesOverview />
    </main>
  )
}
