import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, FileText, Users, CheckCircle } from "lucide-react"
import { FlowButton } from "../ui/flow-button"

const steps = [
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: "1. Initial Consultation",
    description:
      "Schedule a call with our partnerships team to discuss your organization and potential collaboration opportunities.",
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "2. Partnership Proposal",
    description: "We'll create a customized partnership plan based on your needs, goals, and target audience.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "3. Technical Integration",
    description: "Our team will work with yours to ensure seamless integration between our platforms and services.",
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-primary" />,
    title: "4. Launch & Growth",
    description: "We'll support the partnership launch with co-marketing activities and ongoing optimization.",
  },
]

const BecomePartner = () => {
  return (
    <section id="become-partner" className="py-20 bg-slate-50">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How to <span className="text-primary">Become a Partner</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Our partnership process is designed to be straightforward and collaborative, ensuring mutual success.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-12">
          {/* Connecting lines (decorative) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/20 -translate-y-1/2 transform -z-10">
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-2/4 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {steps.map((step, index) => (
            <ScrollReveal key={step.title} delay={index * 0.15} y={40}>
              <Card className="h-full text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">{step.icon}</div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal y={30} className="text-center">
          <FlowButton
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-md text-lg font-medium"
          >
            Start Partnership Conversation
          </FlowButton>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default BecomePartner
