import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Handshake, Building, Stethoscope, GraduationCap, Code } from "lucide-react"

const partnershipTypes = [
  {
    icon: <Building className="w-8 h-8 text-primary" />,
    title: "EAP Providers",
    description:
      "Enhance your employee assistance programs with our neuroplastic engagement technology to drive higher utilization and better outcomes.",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
    title: "Healthcare Systems",
    description:
      "Integrate Thrive360 into your mental health services to provide continuous support between appointments and reduce no-shows.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
    title: "Educational Institutions",
    description:
      "Support student mental health with accessible, stigma-free resources that build healthy habits through neuroplastic engagement.",
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: "Technology Partners",
    description:
      "Integrate your solutions with our platform to create comprehensive mental wellness ecosystems for your customers.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-primary" />,
    title: "Channel Partners",
    description:
      "Expand your portfolio with Thrive360's innovative mental wellness solution and create new revenue streams.",
  },
]

const PartnershipTypes = () => {
  return (
    <section id="partnership-types" className="py-20 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-foreground">Partnership</span> <span className="text-primary">Opportunities</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Discover how different organizations can partner with Thrive360 to enhance mental wellness offerings.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {partnershipTypes.map((type, index) => (
            <ScrollReveal key={type.title} delay={index * 0.1} y={30}>
              <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow duration-300 group hover:border-primary/30 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block w-full max-w-[90%] h-12 flex items-center justify-start pl-4">
                    {type.icon}
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnershipTypes
