import type React from "react"
import UnifiedSection, { type SectionVariant } from "./unified-section"

interface BackgroundWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "hero" | "light" | "dark" | "gradient" | "teal"
  showPatterns?: boolean
  showTransitionTop?: boolean
  showTransitionBottom?: boolean
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  className,
  variant = "default",
  showPatterns = true,
  showTransitionTop = false,
  showTransitionBottom = false,
  ...props
}) => {
  // Map the old variant values to the new ones
  const variantMap: Record<string, SectionVariant> = {
    default: "default",
    hero: "gradient",
    light: "light",
    dark: "dark",
    gradient: "gradient",
    teal: "teal",
  }

  return (
    <UnifiedSection
      variant={variantMap[variant]}
      className={className}
      showPatterns={showPatterns}
      showTransitionTop={showTransitionTop}
      showTransitionBottom={showTransitionBottom}
      spacing="none"
      width="full"
      {...props}
    >
      {children}
    </UnifiedSection>
  )
}

export default BackgroundWrapper
