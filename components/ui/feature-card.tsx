import type React from "react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color?: "indigo" | "pink" | "purple" | "blue" | "green" | "amber"
  percentage?: string
  percentageLabel?: string
  industry?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color = "indigo",
  percentage,
  percentageLabel,
  industry,
}) => {
  const colorVariants = {
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-700",
    },
    pink: {
      bg: "bg-pink-100",
      text: "text-pink-700",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-700",
    },
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className={cn("p-3 rounded-full mr-4", colorVariants[color]?.bg)}>{icon}</div>
        <div>
          <h3 className="font-bold text-lg text-thrive-purple-800">{title}</h3>
          {industry && <p className="text-sm text-thrive-purple-600">{industry}</p>}
        </div>
      </div>
      <p className="text-thrive-purple-700 mb-4">{description}</p>
      {percentage && (
        <div className="mt-auto">
          <p className="text-thrive-purple-600">
            <span className="font-bold text-xl text-thrive-purple-800">{percentage}</span> {percentageLabel}
          </p>
        </div>
      )}
    </div>
  )
}

export { FeatureCard }
