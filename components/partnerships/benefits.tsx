import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Zap, Globe, Shield } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Expanded Market Reach",
    outcome: "Access Thrive360's growing customer base and enter new markets",
  },
  {
    icon: Users,
    title: "Enhanced User Experience",
    outcome: "Provide seamless mental wellness journeys to your users",
  },
  {
    icon: DollarSign,
    title: "New Revenue Streams",
    outcome: "Create additional value through joint solutions and referrals",
  },
  {
    icon: Zap,
    title: "Innovative Technology",
    outcome: "Leverage our neuroplastic engagement platform without building from scratch",
  },
  {
    icon: Globe,
    title: "Co-Marketing Opportunities",
    outcome: "Joint campaigns, events, and content to amplify your brand",
  },
  {
    icon: Shield,
    title: "Competitive Advantage",
    outcome: "Differentiate your offerings with cutting-edge mental wellness technology",
  },
]

const PartnerBenefits = () => {
  return (
    <section id="partner-benefits" className="py-20 bg-slate-50">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Benefits of <span className="text-primary">Partnering</span> with Thrive360
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Discover the advantages of joining the Thrive360 partner ecosystem.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 0.15} y={30}>
              <Card className="h-full flex flex-col text-center hover:border-primary transition-colors duration-300 border border-gray-200">
                <CardHeader className="items-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3 mx-auto">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{benefit.outcome}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerBenefits
