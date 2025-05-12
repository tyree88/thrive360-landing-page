import Link from "next/link"
import { FlowButton } from "../../components/ui/flow-button"

export default function CaseStudyNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        We couldn't find the case study you're looking for. It may have been moved or doesn't exist.
      </p>
      <FlowButton asChild className="bg-thrive-purple-600 hover:bg-thrive-purple-700">
        <Link href="/case-studies">Browse All Case Studies</Link>
      </FlowButton>
    </div>
  )
}
