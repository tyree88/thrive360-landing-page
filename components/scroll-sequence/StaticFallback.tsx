import type React from "react"
import type { ThriveScrollSequenceProps } from "./types"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const StaticFallback: React.FC<ThriveScrollSequenceProps> = ({ title, subtitle, sections, className }) => {
  return (
    <div className={cn("py-12", className)}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">{subtitle}</p>}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-2 w-full" style={{ backgroundColor: section.bgColor }}></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                {section.description && (
                  <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">{section.description}</p>
                )}
                <div className="mt-4">{section.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StaticFallback
