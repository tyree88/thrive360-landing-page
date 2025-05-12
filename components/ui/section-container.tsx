import type React from "react"
import { cn } from "@/lib/utils"
import UnifiedSection from "./unified-section"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  background?: string
  fullBleed?: boolean
  preserveCarousel?: boolean
  preserveScrollTrigger?: boolean
  containerClassName?: string
  transitionType?: "to-light" | "to-medium" | "to-dark" | "none"
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className,
  background,
  fullBleed = false,
  preserveCarousel = false,
  preserveScrollTrigger = false,
  containerClassName,
  transitionType,
}) => {
  // If we need to preserve ScrollTrigger functionality, we need to be careful with the structure
  if (preserveScrollTrigger) {
    return <section className={cn("w-full relative", background, className)}>{children}</section>
  }

  // If we need to preserve carousel functionality, we need a different structure
  if (preserveCarousel) {
    return (
      <UnifiedSection
        className={cn(className, "w-full")}
        customBackground={background}
        spacing="md"
        width={fullBleed ? "full" : "xl"}
        containerClassName={cn("w-full", containerClassName)}
        showTransitionTop={transitionType !== "none" && transitionType === "to-light"}
        showTransitionBottom={transitionType !== "none" && transitionType !== "to-light"}
      >
        {children}
      </UnifiedSection>
    )
  }

  // For full-bleed sections, we apply the background to the section
  // and center the content with a container
  if (fullBleed) {
    return (
      <UnifiedSection
        className={cn(className, "w-full")}
        customBackground={background || "bg-light-purple-50"}
        spacing="md"
        width="full"
        containerClassName={cn("w-full", containerClassName)}
        showTransitionTop={transitionType !== "none" && transitionType === "to-light"}
        showTransitionBottom={transitionType !== "none" && transitionType !== "to-light"}
      >
        {children}
      </UnifiedSection>
    )
  }

  // For regular sections, we use the standard container
  return (
    <UnifiedSection
      className={cn(className, "w-full")}
      spacing="md"
      width="xl"
      containerClassName={cn("w-full", containerClassName)}
    >
      {children}
    </UnifiedSection>
  )
}
