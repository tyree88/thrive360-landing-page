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
    <section className="py-16 md:py-24 bg-brand-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple-500/10 to-brand-blue-600/10 rounded-3xl blur-lg"></div>
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-brand-purple-400/20">
                <img src={imageSrc} alt={imageAlt} className="w-full h-auto" />
                {badgeElement && (
                  <div className="absolute top-4 right-4">
                    {badgeElement}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-brand-gray-900"
              dangerouslySetInnerHTML={{ __html: processedTitle }}
            />
            
            <div className="relative mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 rounded-full mb-8"></div>
            </div>
            
            <p className="text-lg text-brand-purple-800 mb-8 leading-relaxed">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center p-3 rounded-lg bg-brand-purple-100/50 border border-brand-purple-200">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 mr-2"></div>
                <span className="text-sm font-medium text-brand-purple-700">Fast integration</span>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-brand-purple-100/50 border border-brand-purple-200">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 mr-2"></div>
                <span className="text-sm font-medium text-brand-purple-700">Seamless experience</span>
              </div>
              
              <div className="flex items-center p-3 rounded-lg bg-brand-purple-100/50 border border-brand-purple-200">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-purple-400 mr-2"></div>
                <span className="text-sm font-medium text-brand-purple-700">Proven results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}