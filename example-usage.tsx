"use client"
import ThriveScrollSequence, { type ScrollSequenceSection } from "./thrive-scroll-sequence"
import PersonalizedAssessmentContent from "./scroll-sequence/content/PersonalizedAssessmentContent"
import TreatmentPlanContent from "./scroll-sequence/content/TreatmentPlanContent"
import SupportContent from "./scroll-sequence/content/SupportContent"
import ExampleContent from "./scroll-sequence/content/ExampleContent"

const ExampleUsage = () => {
  // Define the sections to display in the phone
  const sections: ScrollSequenceSection[] = [
    {
      title: "Personalized Assessment",
      description: "Complete a comprehensive assessment to understand your needs",
      bgColor: "rgba(219, 234, 254, 0.8)", // Light blue
      content: <PersonalizedAssessmentContent />,
    },
    {
      title: "Custom Treatment Plan",
      description: "Receive a tailored plan designed for your specific goals",
      bgColor: "rgba(220, 252, 231, 0.8)", // Light green
      content: <TreatmentPlanContent />,
    },
    {
      title: "Ongoing Support",
      description: "Access continuous guidance and resources on your journey",
      bgColor: "rgba(243, 232, 255, 0.8)", // Light purple
      content: <SupportContent />,
    },
    {
      title: "Track Your Progress",
      description: "Monitor your improvements and celebrate milestones",
      bgColor: "rgba(254, 242, 232, 0.8)", // Light orange
      content: <ExampleContent />,
    },
  ]

  return (
    <section className="py-12">
      <ThriveScrollSequence
        title="Your Wellness Journey"
        subtitle="Experience personalized care every step of the way"
        sections={sections}
        showSideContainers={true}
        centerPhone={false}
      />
    </section>
  )
}

export default ExampleUsage
