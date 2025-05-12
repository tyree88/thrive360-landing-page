import type * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "bordered"
  intensity?: "light" | "medium" | "heavy"
  children?: React.ReactNode
}

export function GlassCard({
  className,
  variant = "default",
  intensity = "medium",
  children,
  ...props
}: GlassCardProps) {
  // Base styles
  const baseStyles = "backdrop-blur-xl rounded-lg"

  // Variant styles
  const variantStyles = {
    default: "border border-white/10",
    elevated: "border border-white/10 shadow-xl",
    bordered: "border-2 border-white/20",
  }

  // Intensity styles (background opacity)
  const intensityStyles = {
    light: "bg-white/5",
    medium: "bg-white/10",
    heavy: "bg-white/20",
  }

  return (
    <div className={cn(baseStyles, variantStyles[variant], intensityStyles[intensity], className)} {...props}>
      {children}
    </div>
  )
}

export const GlassCardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-4 border-b border-white/10", className)} {...props} />
)

export const GlassCardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-xl font-semibold", className)} {...props} />
)

export const GlassCardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
)

export const GlassCardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-4", className)} {...props} />
)

export const GlassCardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 py-4 border-t border-white/10", className)} {...props} />
)
