import ScrollReveal from "@/components/scroll-reveal"
import { Plug, UserCog, Palette } from "lucide-react"

const integrationFeatures = [
  { icon: Plug, title: "Plug-and-Play", description: "SCORM/LTI & REST API for seamless integration." },
  {
    icon: UserCog,
    title: "Dedicated Account Manager",
    description: "Personalized support for smooth onboarding and beyond.",
  },
  {
    icon: Palette,
    title: "Custom Content & Branding",
    description: "Tailor the platform to your organization's look and feel.",
  },
]

const infographicSteps = [
  { number: "1", title: "Sign Up", description: "Quick and easy registration." },
  { number: "2", title: "Embed", description: "Integrate with your existing systems." },
  { number: "3", title: "Launch + Report", description: "Go live and track engagement." },
]

const IntegrationSection = () => {
  return (
    <section id="integration" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Effortless Integration & <span className="text-primary">Onboarding</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Get started with Thrive360 quickly and easily.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {integrationFeatures.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.15} y={30}>
              <div className="bg-background p-6 rounded-xl shadow-lg text-center h-full transform hover:scale-105 transition-transform duration-300">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal y={0}>
          <h3 className="text-2xl font-semibold text-center mb-8">Simple 3-Step Process</h3>
          <div className="relative grid md:grid-cols-3 gap-8 items-start">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2 -z-10"></div>
            {infographicSteps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.2} y={20} className="text-center relative z-10">
                <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-md">
                  {step.number}
                </div>
                <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default IntegrationSection
