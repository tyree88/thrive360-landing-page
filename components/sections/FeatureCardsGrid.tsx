"use client"

import { Brain, Activity, Bell, Users } from "lucide-react"
import { FeatureCard } from "@/components/ui/feature-card"

export function FeatureCardsGrid() {
  return (
    <section className="py-12 px-4 md:py-20">
      <div className="container mx-auto max-w-7xl bg-light-purple-50">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">Real Solutions for Real People</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Explore how our platform transforms mental health and wellness experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <FeatureCard
            title="Personalized Mental Health Assessment"
            description="Have assessment that adapts to your responses for personalized mental health insights."
            icon={<Brain className="h-6 w-6" />}
            percentage="74%"
            percentageLabel="of users completed the assessment"
            industry="Healthcare"
            color="green"
          />

          <FeatureCard
            title="Treatment Progress Tracking"
            description="Time-monitoring of treatment with visual progress indicators to track improvements."
            icon={<Activity className="h-6 w-6" />}
            percentage="52%"
            percentageLabel="increase in treatment adherence"
            industry="Mental Health"
            color="blue"
          />

          <FeatureCard
            title="Smart Wellness Reminders"
            description="Contextual reminders that adapt to environmental and behavioral triggers."
            icon={<Bell className="h-6 w-6" />}
            percentage="84%"
            percentageLabel="reduction in missed wellness activities"
            industry="Wellness"
            color="purple"
          />

          <FeatureCard
            title="Peer Community Support"
            description="Secure, moderated peer support communities for shared experiences and encouragement."
            icon={<Users className="h-6 w-6" />}
            percentage="78%"
            percentageLabel="of users report feeling less isolated"
            industry="Support Groups"
            color="pink"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
          <FeatureCard
            title="Achievement Recognition"
            description="Personalized achievement system that celebrates progress and milestones."
            icon={<Users className="h-6 w-6" />}
            industry="Behavioral Health"
            color="green"
          />

          <FeatureCard
            title="Adaptive Learning Content"
            description="Content that evolves based on engagement and progress through program."
            icon={<Brain className="h-6 w-6" />}
            industry="Education"
            color="blue"
          />

          <FeatureCard
            title="Stress Management Tools"
            description="Interactive tools and exercises to help manage stress and build resilience."
            icon={<Activity className="h-6 w-6" />}
            industry="Mental Health"
            color="purple"
          />

          <FeatureCard
            title="Mindfulness Meditation"
            description="Guided meditation sessions tailored to individual needs and experience levels."
            icon={<Bell className="h-6 w-6" />}
            industry="Wellness"
            color="pink"
          />
        </div>
      </div>
    </section>
  )
}
