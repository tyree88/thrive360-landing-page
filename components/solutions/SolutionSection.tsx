'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SolutionSectionProps {
  title: string;
  highlightedText?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badgeElement?: React.ReactNode;
}

export default function SolutionSection({
  title,
  highlightedText,
  description,
  imageSrc,
  imageAlt,
  badgeElement
}: SolutionSectionProps) {
  // Process title if we have highlighted text
  const processedTitle = highlightedText 
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
          dangerouslySetInnerHTML={{ __html: processedTitle }}
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-brand-purple-800 text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          {description}
          {badgeElement && (
            <span className="ml-2">{badgeElement}</span>
          )}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto p-6 md:p-8 bg-white backdrop-blur-md rounded-xl shadow-xl border border-brand-purple-400/30"
        >
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}