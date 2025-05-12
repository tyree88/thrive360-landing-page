'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  title: string;
  highlightedText?: string;
  faqs: FAQ[];
  className?: string;
}

export default function FaqSection({
  title,
  highlightedText,
  faqs,
  className = ""
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // Process title if we have highlighted text
  const processedTitle = highlightedText 
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;
    
  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-brand-gray-900"
            dangerouslySetInnerHTML={{ __html: processedTitle }}
          />
          <div className="h-1 w-20 bg-gradient-to-r from-brand-purple-500 to-brand-blue-600 rounded-full mx-auto"></div>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <div 
                className={`border rounded-lg overflow-hidden transition-colors ${
                  openIndex === index 
                    ? 'border-brand-purple-400 bg-brand-purple-50' 
                    : 'border-brand-gray-200 hover:border-brand-purple-300'
                }`}
              >
                <button
                  className="flex justify-between items-center w-full p-4 md:p-6 text-left"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className={`text-lg md:text-xl font-semibold ${
                    openIndex === index ? 'text-brand-purple-800' : 'text-brand-gray-900'
                  }`}>
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 ml-2 transform transition-transform ${
                      openIndex === index ? 'rotate-180 text-brand-purple-600' : 'text-brand-gray-500'
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0 text-brand-purple-700">
                        <div className="pt-2 border-t border-brand-purple-200 mb-3"></div>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-brand-purple-700">Still have questions? <a href="#contact" className="font-semibold text-brand-purple-600 hover:underline">Get in touch</a></p>
        </motion.div>
      </div>
    </section>
  );
}