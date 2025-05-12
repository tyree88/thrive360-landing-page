import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Building } from "lucide-react"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const ProofSection = () => {
  return (
    <section id="proof" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Proven <span className="text-primary">Success Stories</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-1 gap-8 items-center">
          <ScrollReveal y={30}>
            <Card className="bg-gradient-to-br from-primary/5 via-background to-pink-500/10 shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-primary mb-2 sm:mb-0">Case Study: Global Tech Firm</h3>
                  <NeuroplasticBadge />
                </div>
                <div className="flex items-center gap-3 text-3xl md:text-4xl font-bold text-foreground mb-4">
                  <Award className="w-10 h-10 text-primary" />
                  <span>+64% EAP Uptake in 90 Days</span>
                </div>
                <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-md">
                  "Neuro-nudges made it easy for people to build check-in rituals. Thrive360's approach with
                  Neuroplastic Engagement™ was a game-changer for our EAP's visibility and value."
                </blockquote>
                <p className="mt-3 font-semibold text-right">
                  - VP of People Operations, Global Tech Firm (Anonymized)
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        <ScrollReveal y={50} delay={0.2} className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-muted-foreground mb-6">
            Trusted by Top Fortune 500s & Leading Healthcare Providers
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Building className="w-7 h-7" /> <span className="font-medium text-lg">GlobalCorp</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-7 h-7" /> <span className="font-medium text-lg">Innovatech</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Building className="w-7 h-7" /> <span className="font-medium text-lg">HealthWell Group</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-7 h-7" /> <span className="font-medium text-lg">Future Solutions</span>
            </div>
            <img
              src="/generic-corporate-logo.png"
              alt="Fortune 500 company logo placeholder 1"
              className="h-10 grayscale opacity-75 hover:opacity-100 transition-opacity"
            />
            <img
              src="/placeholder.svg?key=8um8f"
              alt="Leading healthcare provider logo placeholder 2"
              className="h-10 grayscale opacity-75 hover:opacity-100 transition-opacity"
            />
            <img
              src="/abstract-tech-logo.png"
              alt="Tech company logo placeholder 3"
              className="h-9 grayscale opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ProofSection
