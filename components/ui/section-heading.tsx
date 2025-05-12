import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
  className?: string
}

export function SectionHeading({ title, subtitle, alignment = "left", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "w-full",
        {
          "text-left": alignment === "left",
          "text-center": alignment === "center",
          "text-right": alignment === "right",
        },
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">{subtitle}</p>}
    </div>
  )
}
