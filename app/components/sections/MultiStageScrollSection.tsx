'use client';

import ThriveScrollSequence from "../ui/thrive-scroll-sequence";
import { ScrollSequenceSection } from "../ui/scroll-sequence/types";
import { cn } from "@/lib/utils";
import SectionTransition from "../ui/scroll-sequence/SectionTransition";
import PersonalizedAssessmentContent from "../ui/scroll-sequence/content/PersonalizedAssessmentContent";
import TreatmentPlanContent from "../ui/scroll-sequence/content/TreatmentPlanContent";
import SupportContent from "../ui/scroll-sequence/content/SupportContent";

interface MultiStageScrollSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  stages?: Array<{
    id: string;
    title: string;
    description: string;
    image?: React.ReactNode;
    bgColor: string;
    textColor: string;
  }>;
  className?: string;
}

export const MultiStageScrollSection = ({
  id,
  title = "Your Mental Health Journey",
  subtitle = "Experience personalized care every step of the way",
  stages,
  className,
}: MultiStageScrollSectionProps = {}) => {
  // Define the content sections with their titles, descriptions, and background colors
  const defaultSections: ScrollSequenceSection[] = [
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
      textColor: "#7e22ce", // Dark purple
      content: <SupportContent />,
    },
  ];

  // Map custom stages to sections if provided
  const sections = stages ? stages.map(stage => ({
    id: stage.id,
    title: stage.title,
    description: stage.description,
    bgColor: stage.bgColor,
    textColor: stage.textColor,
    // For custom stages, we use a generic content wrapper if no specific content is provided
    content: stage.image || <div className="flex items-center justify-center h-full">
      <div className="bg-white/20 p-6 rounded-lg shadow-inner max-w-md">
        <h4 className="text-lg font-semibold mb-2">{stage.title}</h4>
        <p className="text-sm opacity-90">{stage.description}</p>
      </div>
    </div>
  })) : defaultSections;

  return (
    <section id={id} className={cn("relative", className)}>
      {/* Top transition gradient */}
      <SectionTransition position="top" />

      {/* Main scroll sequence component */}
      <ThriveScrollSequence
        title={title}
        subtitle={subtitle}
        sections={sections}
        showSideContainers={false}
        centerPhone={true}
      />

      {/* Bottom transition gradient */}
      <SectionTransition position="bottom" />

      {/* Additional spacing */}
      <div className="h-24" />
    </section>
  );
};

export default MultiStageScrollSection;