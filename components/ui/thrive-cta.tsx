import { FlowButton } from "@/components/ui/flow-button"
import { ThriveLogo } from "./thrive-logo"

interface ThriveCTAProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  variant?: "light" | "dark"
}

export function ThriveCTA({ title, description, buttonText, buttonLink, variant = "light" }: ThriveCTAProps) {
  return (
    <section className={`py-16 md:py-24 ${variant === "light" ? "bg-slate-100" : "bg-slate-900 text-white"}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <ThriveLogo variant={variant === "light" ? "color" : "white"} type="brandmark" size="medium" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
            variant === "light" ? "text-slate-600" : "text-slate-300"
          }`}
        >
          {description}
        </p>
        <a href={buttonLink}>
          <FlowButton text={buttonText} />
        </a>
      </div>
    </section>
  )
}
