import * as React from "react"
import UnifiedSection, { type UnifiedSectionProps } from "./unified-section"
import { cn } from "@/lib/utils"

export interface SectionProps extends Omit<UnifiedSectionProps, "variant"> {
  variant?: "default" | "light" | "dark" | "gradient"
  spacing?: "sm" | "default" | "lg" | "xl"
  container?: boolean
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", spacing = "default", container = true, children, ...props }, ref) => {
    // Map the old spacing values to the new ones
    const spacingMap = {
      sm: "sm",
      default: "md",
      lg: "lg",
      xl: "xl",
    }

    return (
      <UnifiedSection
        ref={ref}
        variant={variant as any}
        spacing={spacingMap[spacing] as any}
        width={container ? "xl" : "full"}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </UnifiedSection>
    )
  },
)
Section.displayName = "Section"

export { Section }
