import Image from "next/image"
import type { CaseStudy } from "@/lib/case-studies-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { FlowButton } from "@/components/ui/flow-button"

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 relative h-60 md:h-auto">
          <Image src={caseStudy.imageUrl || "/placeholder.svg"} alt={caseStudy.title} fill className="object-cover" />
          {caseStudy.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-thrive-purple-600 hover:bg-thrive-purple-700">Featured</Badge>
            </div>
          )}
        </div>

        <CardContent className="md:w-3/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            {caseStudy.logoUrl && (
              <Image
                src={caseStudy.logoUrl || "/placeholder.svg"}
                alt={caseStudy.client}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-500">{caseStudy.industry}</p>
              <h3 className="font-semibold">{caseStudy.client}</h3>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold mb-3">{caseStudy.title}</h2>

          <p className="text-gray-600 mb-4">{caseStudy.summary}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {caseStudy.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {caseStudy.results.slice(0, 4).map((result) => (
              <div key={result.title} className="text-center p-2 bg-gray-50 rounded-lg">
                <p className="text-thrive-purple-600 font-bold text-xl md:text-2xl">{result.value}</p>
                <p className="text-xs md:text-sm text-gray-600">{result.title}</p>
              </div>
            ))}
          </div>

          <FlowButton text="Read Case Study" asLink href={`/case-studies/${caseStudy.id}`} />
        </CardContent>
      </div>
    </Card>
  )
}
