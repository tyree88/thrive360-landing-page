"use client"
import { useRef } from "react"
import { ScrollVelocity } from "@/components/ui/scroll-velocity"
import { VideoCard } from "@/components/ui/video-card"
import { motion, useInView } from "framer-motion"

// Sample success story content with varied types to match the Hims & Hers style
const successStories = [
  // First row
  {
    id: "1",
    title: "Sarah's Journey",
    description:
      "How Thrive360 helped Sarah overcome anxiety and build resilience through personalized mental health support.",
    thumbnail: "/success-stories/sarah-thumbnail.png",
    videoSrc: "https://example.com/videos/sarah-story.mp4",
    company: "Healthcare Inc.",
    duration: "2:45",
    bgColor: "#8b5cf6", // purple
    type: "image" as const,
  },
  {
    id: "2",
    title: "Signals from the brain",
    description: "Understanding how mental wellness affects cognitive function and productivity.",
    thumbnail: "",
    videoSrc: "",
    company: "Fig. 1",
    duration: "",
    bgColor: "#8b5cf6", // purple
    type: "graphic" as const,
  },
  {
    id: "3",
    title: "Mental Wellness Spectrum",
    description: "Visualizing the continuous nature of mental health and wellness.",
    thumbnail: "",
    videoSrc: "",
    company: "",
    duration: "",
    bgColor: "#60a5fa", // blue
    type: "abstract" as const,
  },
  {
    id: "4",
    title: "Dr. Michael's Insights",
    description: "Expert advice on maintaining mental wellness in high-stress environments.",
    thumbnail: "/success-stories/doctor-thumbnail.png",
    videoSrc: "https://example.com/videos/doctor-insights.mp4",
    company: "Medical Director",
    duration: "3:15",
    bgColor: "#a78bfa", // purple
    type: "image" as const,
  },
  {
    id: "12",
    title: "Building a habit",
    description: "Creating lasting mental wellness routines that stick with employees long-term.",
    thumbnail: "",
    videoSrc: "",
    company: "Chapter",
    duration: "",
    bgColor: "#fde68a", // yellow
    type: "chapter" as const,
  },

  // Second row
  {
    id: "5",
    title: "Wellness Patterns",
    description: "Identifying patterns in employee wellness data to create better support systems.",
    thumbnail: "",
    videoSrc: "",
    company: "",
    duration: "",
    bgColor: "#f472b6", // pink
    type: "abstract" as const,
  },
  {
    id: "6",
    title: "Team Building at ArcBest",
    description: "ArcBest improved team cohesion and reduced turnover by 35% with our comprehensive wellness program.",
    thumbnail: "/success-stories/team-thumbnail.png",
    videoSrc: "https://example.com/videos/arcbest-story.mp4",
    company: "ArcBest",
    duration: "3:12",
    bgColor: "#f97316", // orange
    type: "image" as const,
  },
  {
    id: "7",
    title: "Wellness Metrics",
    description:
      "Key performance indicators that show the impact of mental wellness programs on organizational health.",
    thumbnail: "",
    videoSrc: "",
    company: "Research",
    duration: "",
    bgColor: "#f97316", // orange
    type: "text" as const,
  },
  {
    id: "8",
    title: "Healthcare Worker Support",
    description: "Supporting healthcare workers through stress and burnout during critical staffing shortages.",
    thumbnail: "/success-stories/healthcare-thumbnail.png",
    videoSrc: "https://example.com/videos/healthcare-story.mp4",
    company: "Medical Center",
    duration: "3:45",
    bgColor: "#ec4899", // pink
    type: "image" as const,
  },
  {
    id: "9",
    title: "Cognitive Resilience",
    description: "Building mental strength through evidence-based techniques and regular practice.",
    thumbnail: "",
    videoSrc: "",
    company: "Neuroscience",
    duration: "",
    bgColor: "#4ade80", // green
    type: "text" as const,
  },
]

// Split content into two rows
const firstRowContent = successStories.slice(0, 5)
const secondRowContent = successStories.slice(5)

export function SuccessStoriesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24"
      style={{
        background: "white",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      {/* Heading content with animations */}
      <div className="container mx-auto mb-16 px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="mb-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Success Stories
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how organizations are thriving with our mental wellness platform
          </motion.p>
        </motion.div>
      </div>

      <div className="flex w-full flex-col space-y-8">
        {/* First row - scrolls right to left with staggered animation */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : -20,
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ScrollVelocity velocity={-1.5} className="py-4" pauseOnHover={true}>
            {[...firstRowContent, ...firstRowContent].map((content, index) => (
              <VideoCard key={`${content.id}-${index}`} video={content} />
            ))}
          </ScrollVelocity>
        </motion.div>

        {/* Second row - scrolls left to right with staggered animation */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : 20,
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ScrollVelocity velocity={1.5} className="py-4" pauseOnHover={true}>
            {[...secondRowContent, ...secondRowContent].map((content, index) => (
              <VideoCard key={`${content.id}-${index}`} video={content} />
            ))}
          </ScrollVelocity>
        </motion.div>
      </div>
    </section>
  )
}
