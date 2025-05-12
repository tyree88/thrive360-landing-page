import ScrollReveal from "@/components/scroll-reveal"
import NeuroplasticBadge from "@/components/neuroplastic-badge"

const NeuroplasticSolutionSection = () => {
  return (
    <section id="neuroplastic-solution" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            From Forgotten to Formed: <span className="text-primary">A Neuroplastic EAP Layer</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Thrive360 plugs seamlessly into your existing EAP—layering in smart habit-loops, personalized
            micro-learning, and discreet nudges.
          </p>
          <div className="flex justify-center mb-12">
            <NeuroplasticBadge className="text-sm px-4 py-2" />
          </div>
          <p className="text-md md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Our Neuroplastic Engagement™ engine rewires simple check-ins into sustained wellbeing routines.
          </p>
        </ScrollReveal>

        <ScrollReveal y={30}>
          <div className="bg-white p-6 rounded-xl shadow-xl border border-border">
            <div className="aspect-[16/9] bg-slate-100 rounded-lg flex items-center justify-center">
              <img
                src="/employee-thrive360-eap-hr-flow.png"
                alt="Flow diagram: Employee to Thrive360 Neuroplastic Engine to EAP/HR"
                className="w-full h-auto max-w-3xl object-contain"
              />
            </div>
            <p className="text-center mt-4 text-sm text-muted-foreground">
              Visual: Employee &rarr; Thrive360 Neuroplastic Engine &rarr; EAP Case Manager / HR Dashboard
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default NeuroplasticSolutionSection
