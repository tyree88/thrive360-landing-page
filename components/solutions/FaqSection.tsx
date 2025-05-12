'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  highlightedText?: string;
  faqs: FaqItem[];
}

export default function FaqSection({
  title,
  highlightedText,
  faqs
}: FaqSectionProps) {
  // Process title if we have highlighted text
  const processedTitle = highlightedText 
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
          dangerouslySetInnerHTML={{ __html: processedTitle }}
        />
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
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-purple-800 pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}