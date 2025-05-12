import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, Repeat, ShieldOff, UserX } from "lucide-react"

const painPoints = [
  {
    icon: <TrendingDown className="w-8 h-8 text-primary" />,
    title: "Low Utilization",
    description: "Under 10% of staff ever log in, leaving most of your workforce unsupported.",
  },
  {
    icon: <Repeat className="w-8 h-8 text-primary" />,
    title: "One-Off Sessions",
    description: "No reinforcement or follow-up means no lasting change or behavioral impact.",
  },
  {
    icon: <ShieldOff className="w-8 h-8 text-primary" />,
    title: "Siloed Data",
    description: "HR sees only aggregate numbers, missing crucial personal insights for intervention.",
  },
  {
    icon: <UserX className="w-8 h-8 text-primary" />,
    title: "Stigma & Friction",
    description: "Complex forms, phone calls, and awkward workflows deter proactive engagement.",
  },
]

const EapChallengeSection = () => {
  return (
    <section id="eap-challenge" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The <span className="text-primary">Traditional EAP Problem</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Most EAPs sit unused—employees forget, stall, or feel too embarrassed to engage. This leads to common,
            costly pain points.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <ScrollReveal key={point.title} delay={index * 0.1} y={30}>
              <Card className="h-full hover:shadow-primary/10 transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                  {point.icon}
                  <CardTitle className="text-xl">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EapChallengeSection
