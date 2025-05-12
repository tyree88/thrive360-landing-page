
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx';

const FaqSection = () => {
  const faqs = [
    { q: "How does homework integration work without extra logins?", a: "Our seamless SDK or iFrame embed options integrate directly into your existing platform, utilizing existing user authentication. This means no extra logins are required for users to access assigned homework or micro-sessions, creating a fluid experience." },
    { q: "Can therapists customize reminder cadence?", a: "Yes, therapists have granular control over reminder settings. Cadence, timing, and even content of reminders (SMS, email, in-app) can be tailored to individual patient needs and care plans through the clinician dashboard." },
    { q: "Is all user data HIPAA/GDPR compliant?", a: "Absolutely. We prioritize data security and privacy. Our platform is built with HIPAA and GDPR compliance at its core, employing industry-best practices for data encryption, storage, and access control." },
    { q: "How quickly can we go live?", a: "Standard integration typically takes about 2 weeks, depending on your existing platform and customization needs. Our dedicated support team works closely with you to ensure a smooth and efficient rollout." },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
        >
          Frequently Asked <span className="gradient-text">Questions</span>
        </motion.h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index}`} className="bg-white backdrop-blur-sm border border-brand-purple-400/30 rounded-lg px-6">
                <AccordionTrigger className="text-lg text-left hover:no-underline text-brand-gray-900">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-purple-800 pt-2 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FaqSection;
