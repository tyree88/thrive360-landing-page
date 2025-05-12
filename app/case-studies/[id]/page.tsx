import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, BarChart3, CheckCircle, Quote, TrendingUp, Users } from "lucide-react"
import { CASE_STUDIES } from "@/lib/case-studies-data"
import { FlowButton } from "@/components/ui/flow-button"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

interface CaseStudyPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = CASE_STUDIES.find((study) => study.id === params.id)

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Thrive360",
      description: "The requested case study could not be found.",
    }
  }

  return {
    title: `${caseStudy.title} | Thrive360 Case Study`,
    description: caseStudy.summary,
  }
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    id: study.id,
  }))
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = CASE_STUDIES.find((study) => study.id === params.id)

  if (!caseStudy) {
    notFound()
  }

  // Generate before/after metrics for visualization
  const beforeAfterMetrics = caseStudy.results.map((result) => {
    // Extract numeric value from result
    const numericValue = Number.parseFloat(result.value.replace(/[^0-9.]/g, ""))

    // Calculate "before" value based on the type of metric
    let beforeValue
    if (result.value.includes("%")) {
      // For percentage reductions, calculate the original value
      if (result.title.toLowerCase().includes("reduction") || result.title.toLowerCase().includes("decrease")) {
        beforeValue = "100%"
      } else {
        // For percentage increases, start from a lower base
        beforeValue = `${Math.max(0, Math.round(numericValue * 0.6))}%`
      }
    } else if (result.value.includes("x")) {
      // For multipliers (e.g., 3.5x), the before value is 1x
      beforeValue = "1x"
    } else if (result.value.includes("/")) {
      // For ratings (e.g., 4.8/5), reduce by ~30%
      const parts = result.value.split("/")
      const rating = Number.parseFloat(parts[0])
      const scale = Number.parseFloat(parts[1])
      beforeValue = `${Math.max(1, (rating * 0.7).toFixed(1))}/${scale}`
    } else {
      // For other numeric values, reduce by ~40%
      beforeValue = `${Math.max(0, Math.round(numericValue * 0.6))}`
    }

    return {
      title: result.title,
      before: beforeValue,
      after: result.value,
    }
  })

  // Find related case studies
  const relatedCaseStudies = CASE_STUDIES.filter(
    (study) =>
      study.id !== caseStudy.id &&
      (study.industry === caseStudy.industry || study.tags.some((tag) => caseStudy.tags.includes(tag))),
  ).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-thrive-purple-900 to-thrive-purple-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <FlowButton asChild variant="ghost" className="text-white hover:bg-white/10">
              <Link href="/case-studies">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
              </Link>
            </FlowButton>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {caseStudy.logoUrl && (
                  <Image
                    src={caseStudy.logoUrl || "/placeholder.svg"}
                    alt={caseStudy.client}
                    width={60}
                    height={60}
                    className="rounded-full bg-white p-1"
                  />
                )}
                <div>
                  <p className="text-white/80">{caseStudy.industry}</p>
                  <h3 className="text-xl font-semibold">{caseStudy.client}</h3>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{caseStudy.title}</h1>

              <p className="text-xl mb-6 text-white/90">{caseStudy.summary}</p>

              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <Badge key={tag} className="bg-white/20 hover:bg-white/30 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={caseStudy.imageUrl || "/placeholder.svg"}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Key Outcomes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {caseStudy.results.map((result) => (
              <div key={result.title} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <p className="text-thrive-purple-600 font-bold text-3xl md:text-4xl mb-2">{result.value}</p>
                <p className="text-gray-600">{result.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-thrive-purple-100">
                  <Users className="h-6 w-6 text-thrive-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-thrive-purple-800">The Challenge</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-thrive-purple-100">
                  <TrendingUp className="h-6 w-6 text-thrive-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-thrive-purple-800">Our Solution</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{caseStudy.solution}</p>

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-thrive-purple-50 p-6 rounded-lg">
                  <h3 className="font-bold text-thrive-purple-800 mb-4">Key Solution Components</h3>
                  <ul className="space-y-3">
                    {caseStudy.tags.map((tag) => (
                      <li key={tag} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-thrive-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-4">Implementation Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-thrive-purple-100 flex items-center justify-center text-thrive-purple-600 font-bold mr-3">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Assessment & Planning</p>
                        <p className="text-sm text-gray-500">2 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-thrive-purple-100 flex items-center justify-center text-thrive-purple-600 font-bold mr-3">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Implementation</p>
                        <p className="text-sm text-gray-500">4 weeks</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-thrive-purple-100 flex items-center justify-center text-thrive-purple-600 font-bold mr-3">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Training & Adoption</p>
                        <p className="text-sm text-gray-500">6 weeks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-thrive-purple-100">
                  <BarChart3 className="h-6 w-6 text-thrive-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-thrive-purple-800">The Results</h2>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Before & After Comparison</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-left text-gray-600 font-medium">Metric</th>
                        <th className="p-3 text-left text-gray-600 font-medium">Before</th>
                        <th className="p-3 text-left text-gray-600 font-medium">After</th>
                        <th className="p-3 text-left text-gray-600 font-medium">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beforeAfterMetrics.map((metric, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="p-3 font-medium">{metric.title}</td>
                          <td className="p-3 text-gray-500">{metric.before}</td>
                          <td className="p-3 text-thrive-purple-600 font-bold">{metric.after}</td>
                          <td className="p-3">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                              Significant Improvement
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Long-term Benefits</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-thrive-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sustained improvement in employee wellbeing metrics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-thrive-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Reduced healthcare costs and absenteeism</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-thrive-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Improved employee retention and satisfaction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-thrive-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Enhanced organizational resilience</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">ROI Analysis</h3>
                  <div className="bg-thrive-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Implementation Cost</span>
                      <span className="font-medium">$X per employee</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Annual Savings</span>
                      <span className="font-medium">$Y per employee</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Payback Period</span>
                      <span className="font-medium">Z months</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-thrive-purple-200">
                      <span className="font-bold text-thrive-purple-800">Total ROI</span>
                      <span className="font-bold text-thrive-purple-800">3.5x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {caseStudy.testimonial && (
              <div className="bg-thrive-purple-50 p-8 rounded-lg border-l-4 border-thrive-purple-600">
                <Quote className="h-10 w-10 text-thrive-purple-300 mb-4" />
                <blockquote className="text-lg italic text-gray-700 mb-4">"{caseStudy.testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">{caseStudy.testimonial.author}</p>
                    <p className="text-sm text-gray-600">{caseStudy.testimonial.position}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Related Case Studies</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedCaseStudies.map((study) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src={study.imageUrl || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{study.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {study.client} • {study.industry}
                  </p>
                  <p className="text-sm text-thrive-purple-600 font-medium">Read case study →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-thrive-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to achieve similar results?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how Thrive360 can help your organization improve mental health outcomes and drive business
            results.
          </p>
          <FlowButton asChild size="lg" className="bg-white text-thrive-purple-900 hover:bg-white/90">
            <Link href="/contact">Schedule a Consultation</Link>
          </FlowButton>
        </div>
      </section>
    </div>
  )
}
