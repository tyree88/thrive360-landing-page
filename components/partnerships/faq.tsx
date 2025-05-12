import ScrollReveal from "@/components/scroll-reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What types of organizations can partner with Thrive360?",
    answer:
      "We partner with a wide range of organizations including EAP providers, healthcare systems, educational institutions, technology companies, and channel partners. If you're interested in enhancing mental wellness offerings, we'd love to explore collaboration opportunities.",
  },
  {
    question: "How long does the partnership integration process take?",
    answer:
      "The integration timeline varies depending on the complexity of the partnership, but typically ranges from 2-8 weeks. Our partnership team works closely with your technical staff to ensure a smooth integration process.",
  },
  {
    question: "Are there any exclusivity requirements for partnerships?",
    answer:
      "Most of our partnerships are non-exclusive, allowing both parties flexibility. However, we do offer exclusive arrangements in certain markets or industries when it makes strategic sense for both organizations.",
  },
  {
    question: "What technical resources are required for integration?",
    answer:
      "We offer multiple integration options including API, iFrame, SSO, and SCORM/LTI for learning management systems. Our team provides comprehensive documentation and support throughout the integration process.",
  },
  {
    question: "How does revenue sharing work for referral partnerships?",
    answer:
      "We offer competitive revenue sharing models for partners who refer clients to Thrive360. The specific terms depend on the partnership type, volume, and level of involvement in the sales process.",
  },
]

const PartnershipFaq = () => {
  return (
    <section id="partnership-faq" className="py-20 bg-slate-50">
      <div className="container px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Partnership <span className="text-primary">FAQs</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} y={20}>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className="bg-background border border-border rounded-lg shadow-sm mb-4 px-2"
              >
                <AccordionTrigger className="text-left hover:no-underline px-4 py-4 text-md md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-0">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default PartnershipFaq
