import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cog, PlayCircle, Activity } from "lucide-react"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const steps = [
  {
    icon: <Cog className="w-10 h-10 text-primary" />,
    title: "1. Embed & Configure",
    description:
      "2-week rollout with your brand & compliance needs. Seamless integration with your existing EAP infrastructure.",
  },
  {
    icon: <PlayCircle className="w-10 h-10 text-primary" />,
    title: "2. Activate Engagement",
    description:
      "Neuroplastic quizzes, micro-sessions & discreet alerts create daily habit loops for sustained wellbeing.",
    badge: true,
  },
  {
    icon: <Activity className="w-10 h-10 text-primary" />,
    title: "3. Measure & Intervene",
    description:
      "Live dashboards flag high-risk folks, pinpoint drop-offs, and help optimize content for maximum impact.",
  },
]

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How It Works: <span className="text-primary">Three Simple Steps</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines (decorative) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 transform -z-10">
            <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.15} y={40}>
              <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">{step.icon}</div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  {step.badge && <NeuroplasticBadge />}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
