'use client';

import React from 'react';
import { motion } from 'framer-motion';
import NeuroBadge from '@/components/ui/NeuroBadge';

interface Feature {
  icon: React.ReactNode;
  title: string;
  benefit: string;
  showBadge?: boolean;
}

interface CapabilitiesSectionProps {
  title: string;
  highlightedText?: string;
  features: Feature[];
  badgeComponent?: React.ReactNode;
}

export default function CapabilitiesSection({
  title,
  highlightedText,
  features,
  badgeComponent
}: CapabilitiesSectionProps) {
  // Process title if we have highlighted text
  const processedTitle = highlightedText 
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;
    
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-white">
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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-b from-white to-brand-gray-50 border border-brand-purple-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start">
                <div className="p-3 mr-4 rounded-full bg-brand-purple-100 group-hover:bg-brand-purple-200 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-semibold text-brand-purple-800 mr-2">
                      {feature.title}
                    </h3>
                    {feature.showBadge && <NeuroBadge size="sm" />}
                  </div>
                  <p className="text-brand-purple-700">{feature.benefit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {badgeComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 md:mt-16 text-center"
          >
            {badgeComponent}
            <p className="text-sm text-brand-purple-700 mt-2">Powered by Neuroplastic Engagement™</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}