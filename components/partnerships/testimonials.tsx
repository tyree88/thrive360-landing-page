import ScrollReveal from "@/components/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Partnering with Thrive360 has allowed us to offer a truly differentiated mental health solution to our corporate clients. The integration was seamless, and our clients are seeing significantly higher engagement rates.",
    name: "Sarah Johnson",
    title: "Director of Partnerships, WellnessPlus EAP",
    avatar: "/avatar-sarah.png",
    initials: "SJ",
  },
  {
    quote:
      "As a healthcare provider, we were looking for innovative ways to support patients between appointments. Thrive360's neuroplastic engagement technology was the perfect solution, and their partnership team made integration a breeze.",
    name: "Dr. Michael Chen",
    title: "Chief Innovation Officer, Metro Health Systems",
    avatar: "/avatar-michael.png",
    initials: "MC",
  },
  {
    quote:
      "The co-marketing opportunities with Thrive360 have been invaluable for our growth. Their team is responsive, creative, and truly committed to mutual success.",
    name: "Alex Rivera",
    title: "VP of Strategic Alliances, TechHealth Solutions",
    avatar: "/avatar-alex.png",
    initials: "AR",
  },
]

const PartnerTestimonials = () => {
  return (
    <section id="partner-testimonials" className="py-20 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Partner <span className="text-primary">Success Stories</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.15} y={30}>
              <Card className="h-full bg-gradient-to-br from-primary/5 via-background to-pink-500/5 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <blockquote className="text-muted-foreground italic mb-6 flex-grow">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerTestimonials
