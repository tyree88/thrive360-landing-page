'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
}

interface HowItWorksSectionProps {
  title: string;
  highlightedText?: string;
  steps: Step[];
  className?: string;
}

export default function HowItWorksSection({
  title,
  highlightedText,
  steps,
  className = ""
}: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  
  // Process title if we have highlighted text
  const processedTitle = highlightedText 
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;

  return (
    <section className={`py-16 md:py-24 bg-brand-gray-100 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-brand-gray-900"
            dangerouslySetInnerHTML={{ __html: processedTitle }}
          />
          <div className="h-1 w-20 bg-gradient-to-r from-brand-purple-500 to-brand-blue-600 rounded-full mx-auto"></div>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-brand-purple-200 rounded"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-16 last:mb-0 ${index % 2 === 0 ? 'md:text-right md:pr-16 pl-8 md:pl-0' : 'md:text-left md:pl-16 pl-8 md:ml-auto'}`}
              onClick={() => setActiveStep(index)}
            >
              {/* Timeline dot */}
              <div 
                className={`absolute left-0 md:left-1/2 top-1 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-2 z-10 cursor-pointer
                  ${activeStep === index ? 'border-brand-purple-500 scale-125' : 'border-brand-purple-300'}`}
                style={{ backgroundColor: step.color || 'var(--colors-brand-purple-500)' }}
                onClick={() => setActiveStep(index)}
              />
              
              {/* Connected content box */}
              <div 
                className={`relative rounded-xl p-6 transition-all shadow-md w-full md:w-1/2
                  ${activeStep === index 
                    ? 'bg-white border-l-4 shadow-lg scale-105' 
                    : 'bg-brand-gray-50 border-l-2'}`}
                style={{ 
                  borderLeftColor: step.color || 'var(--colors-brand-purple-500)',
                  ...(index % 2 === 0 ? { marginLeft: 'auto' } : {}) 
                }}
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="p-2 rounded-lg" style={{ color: step.color || 'var(--colors-brand-purple-500)' }}>
                    {step.icon}
                  </div>
                  <div className={`${index % 2 === 0 ? 'text-left' : 'text-left'}`}>
                    <h3 className="text-xl font-semibold mb-2 text-brand-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-base text-brand-purple-800">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Step markers */}
        <div className="flex justify-center mt-8 space-x-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index 
                  ? 'bg-brand-purple-500 scale-125' 
                  : 'bg-brand-purple-300 hover:bg-brand-purple-400'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}