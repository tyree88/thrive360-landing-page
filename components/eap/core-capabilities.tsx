import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Layers, ShieldCheck, BookOpen, BellRing, BarChart2 } from "lucide-react"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const capabilities = [
  {
    icon: <Zap className="w-7 h-7 text-primary" />,
    title: "Neuroplastic Engagement™",
    description: "Habit-forming quizzes, nudges & rewards to lock in progress.",
    badge: true,
  },
  {
    icon: <Layers className="w-7 h-7 text-primary" />,
    title: "Quick Onboard & Integration",
    description: "Turnkey embed via iFrame or API—no new login required.",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-primary" />,
    title: "Anonymity Guardrails",
    description: "Pseudonymous profiles + opt-in data sharing.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    title: "Micro-Learning Library",
    description: "500+ evidence-based sessions—stress, sleep, burnout, more.",
  },
  {
    icon: <BellRing className="w-7 h-7 text-primary" />,
    title: "Smart Reminders",
    description: "Context-aware prompts: Slack, email, calendar invites.",
  },
  {
    icon: <BarChart2 className="w-7 h-7 text-primary" />,
    title: "Live Reporting & Alerts",
    description: "Real-time flags for critical risk & engagement dips.",
  },
]

const CoreCapabilitiesSection = () => {
  return (
    <section id="core-capabilities" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Core <span className="text-primary">Capabilities</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((cap, index) => (
            <ScrollReveal key={cap.title} delay={index * 0.1} y={30}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group hover:border-primary/30">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    {cap.icon}
                    {cap.badge && <NeuroplasticBadge className="text-xs" />}
                  </div>
                  <CardTitle className="text-xl pt-3">{cap.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{cap.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreCapabilitiesSection
