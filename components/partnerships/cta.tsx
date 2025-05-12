import { FlowButton } from "@/components/ui/flow-button"
import ScrollReveal from "@/components/scroll-reveal"

const PartnershipCta = () => {
  return (
    <section id="partnership-cta" className="py-20 bg-background">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="bg-gradient-to-br from-primary/10 via-background to-pink-500/10 p-8 md:p-12 rounded-xl shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-primary">Transform Mental Wellness</span> Together?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our partner ecosystem and help revolutionize how people engage with mental wellness resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <FlowButton text="Become a Partner" />
              <FlowButton text="Schedule a Consultation" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default PartnershipCta
