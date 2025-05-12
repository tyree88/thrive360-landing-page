import type React from "react"

interface SectionTransitionProps {
  direction: "top" | "bottom"
  className?: string
  from?: string
  to?: string
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  direction,
  className,
  from = "bg-white",
  to = "bg-light-purple-50",
}) => {
  // This component is now deprecated in favor of the transition props in UnifiedSection
  // We'll keep it for backward compatibility but it won't render anything
  console.warn(
    "SectionTransition is deprecated. Use UnifiedSection with showTransitionTop/showTransitionBottom props instead.",
  )
  return null
}
