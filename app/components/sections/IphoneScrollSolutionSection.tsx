'use client';

import React from 'react';
import ThriveScrollSequence from '@/components/ui/thrive-scroll-sequence';
import { ScrollSequenceSection } from '@/components/ui/scroll-sequence/types';
import { 
  PersonalizedAssessmentContent,
  TreatmentPlanContent,
  SupportContent,
  ProgressTrackerContent
} from '@/components/ui/scroll-sequence/content';
import BackgroundWrapper from '@/components/ui/background-wrapper';

const IphoneScrollSolutionSection: React.FC = () => {
  // Define the sections to display in the phone
  const sections: ScrollSequenceSection[] = [
    {
      id: "assessment",
      title: "Personalized Assessment",
      description: "AI-driven neuroplasticity assessment for personalized results",
      bgColor: "rgba(245, 242, 255, 0.8)", // Light purple background
      textColor: "#6d28d9", // Dark purple
      content: <PersonalizedAssessmentContent />
    },
    {
      id: "treatment",
      title: "Tailored Treatment Plan",
      description: "Precise interventions based on your unique neurological profile",
      bgColor: "rgba(235, 245, 250, 0.8)", // Light blue background
      textColor: "#0c4a6e", // Dark blue
      content: <TreatmentPlanContent />
    },
    {
      id: "support",
      title: "Ongoing Support",
      description: "24/7 AI-assisted coaching and human specialist access",
      bgColor: "rgba(237, 247, 237, 0.8)", // Light green background
      textColor: "#14532d", // Dark green
      content: <SupportContent />
    },
    {
      id: "progress",
      title: "Progress Tracking",
      description: "Real-time neuroplastic change monitoring and adaptation",
      bgColor: "rgba(250, 243, 232, 0.8)", // Light amber background
      textColor: "#78350f", // Dark amber
      content: <ProgressTrackerContent />
    },
  ];

  return (
    <BackgroundWrapper
      id="iphone-solution"
      variant="light"
      className="section"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div className="min-h-screen">
        <ThriveScrollSequence
          title="How Thrive360 Works"
          subtitle="Our proven process transforms employee mental health through neuroplastic engagement"
          sections={sections}
          showSideContainers={true}
          centerPhone={false}
        />
      </div>
    </BackgroundWrapper>
  );
};

export default IphoneScrollSolutionSection;