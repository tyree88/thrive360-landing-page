import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Users } from "lucide-react"

const PartnerShowcase = () => {
  return (
    <section id="partner-showcase" className="py-20 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Our <span className="text-primary">Partner Ecosystem</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal y={30}>
          <Card className="bg-gradient-to-br from-primary/5 via-background to-pink-500/10 shadow-xl overflow-hidden mb-12">
            <CardContent className="p-8 md:p-10">
              <h3 className="text-2xl font-semibold text-primary mb-6">Featured Partnership: HealthTech Innovations</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-muted-foreground mb-4">
                    Through our strategic partnership with HealthTech Innovations, we've integrated Thrive360's
                    neuroplastic engagement technology with their telehealth platform, creating a seamless mental
                    wellness journey for patients.
                  </p>
                  <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-md">
                    "Partnering with Thrive360 has allowed us to offer a truly differentiated mental health solution
                    that keeps patients engaged between appointments and significantly reduces no-show rates."
                  </blockquote>
                  <p className="mt-3 font-semibold text-right">- CTO, HealthTech Innovations</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    alt="HealthTech Innovations partnership visualization"
                    className="w-full h-auto rounded-md"
                    src="/healthtech-partnership.png"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal y={50} delay={0.2} className="text-center">
          <h3 className="text-xl font-semibold text-muted-foreground mb-6">Trusted Partners Across Industries</h3>
          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-8">
            <div className="flex items-center gap-2 text-slate-500">
              <Building className="w-7 h-7" /> <span className="font-medium text-lg">MindWell EAP</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-7 h-7" /> <span className="font-medium text-lg">TechHealth Solutions</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Building className="w-7 h-7" /> <span className="font-medium text-lg">Wellness Connect</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-7 h-7" /> <span className="font-medium text-lg">Metro University</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Building className="w-7 h-7" /> <span className="font-medium text-lg">Global Health Systems</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-7 h-7" /> <span className="font-medium text-lg">Innovate HR</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default PartnerShowcase
