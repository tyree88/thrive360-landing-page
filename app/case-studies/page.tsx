import type { Metadata } from "next"
import CaseStudiesGrid from "@/components/case-studies/case-studies-grid"
import FeaturedCaseStudy from "@/components/case-studies/featured-case-study"
import { FlowButton } from "@/components/ui/flow-button"
import Link from "next/link"
import { ArrowRight, BarChart3, FileText, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Studies | Thrive360",
  description: "Explore how Thrive360 has helped organizations improve employee mental health and wellbeing.",
}

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-thrive-purple-900 to-thrive-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Discover how organizations across industries are using Thrive360 to transform employee wellbeing and achieve
            measurable business outcomes.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Challenges</h3>
              <p className="text-white/80">See how organizations like yours overcame mental health challenges</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Solutions</h3>
              <p className="text-white/80">Explore our personalized approach to mental health support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Measurable Results</h3>
              <p className="text-white/80">See the quantifiable impact on wellbeing and business metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <FeaturedCaseStudy />

      {/* All Case Studies */}
      <CaseStudiesGrid />

      {/* CTA Section */}
      <section className="bg-thrive-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-thrive-purple-800">Ready to write your success story?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how Thrive360 can help your organization improve mental health outcomes and drive business
            results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <FlowButton asChild size="lg">
              <Link href="/contact">Schedule a Consultation</Link>
            </FlowButton>
            <FlowButton asChild variant="outline" size="lg">
              <Link href="/demo">
                Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </FlowButton>
          </div>
        </div>
      </section>
    </main>
  )
}
