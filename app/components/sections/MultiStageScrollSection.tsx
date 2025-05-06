"use client"

import ThriveScrollSequence from "../ui/thrive-scroll-sequence"
import { ScrollSequenceSection } from "../ui/scroll-sequence/types"
import SectionTransition from "../ui/scroll-sequence/SectionTransition"
import PersonalizedAssessmentContent from "../ui/scroll-sequence/content/PersonalizedAssessmentContent"
import TreatmentPlanContent from "../ui/scroll-sequence/content/TreatmentPlanContent"
import SupportContent from "../ui/scroll-sequence/content/SupportContent"
import ExampleContent from "../ui/scroll-sequence/content/ExampleContent"

export const MultiStageScrollSection = () => {
  // Define the content sections with their titles, descriptions, and background colors
  const sections: ScrollSequenceSection[] = [
    {
      id: "assessment",
      title: "Personalized Assessment",
      description: "Complete a comprehensive assessment to understand your needs",
      bgColor: "rgba(219, 234, 254, 0.8)", // Light blue
      textColor: "#1e40af", // Dark blue
      content: <PersonalizedAssessmentContent />,
    },
    {
      id: "treatment",
      title: "Custom Treatment Plan",
      description: "Receive a tailored plan designed for your specific goals",
      bgColor: "rgba(220, 252, 231, 0.8)", // Light green
      textColor: "#166534", // Dark green
      content: <TreatmentPlanContent />,
    },
    {
      id: "support",
      title: "24/7 Support",
      description: "Access continuous guidance and resources on your journey",
      bgColor: "rgba(243, 232, 255, 0.8)", // Light purple
      textColor: "#5b21b6", // Dark purple
      content: <SupportContent />,
    },
    {
      id: "progress",
      title: "Track Your Progress",
      description: "Monitor your improvements and celebrate milestones",
      bgColor: "rgba(254, 242, 232, 0.8)", // Light orange
      textColor: "#9a3412", // Dark orange
      content: <ExampleContent />,
    },
  ]

  return (
    <section className="relative">
      {/* Top transition gradient */}
      <SectionTransition position="top" />

      {/* Main scroll sequence component */}
      <ThriveScrollSequence
        title="Your Mental Health Journey"
        subtitle="Experience personalized care every step of the way"
        sections={sections}
        showSideContainers={false}
        centerPhone={true}
      />

      {/* Bottom transition gradient */}
      <SectionTransition position="bottom" />

      {/* Additional spacing */}
      <div className="h-24" />
    </section>
  )
}

export default MultiStageScrollSection