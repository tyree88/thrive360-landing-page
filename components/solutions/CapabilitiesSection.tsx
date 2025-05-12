'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

interface CapabilityFeature {
  icon: React.ReactNode;
  title: string;
  benefit: string;
  showBadge?: boolean;
}

interface CapabilitiesSectionProps {
  title: React.ReactNode | string;
  highlightedText?: string;
  features: CapabilityFeature[];
  badgeComponent?: React.ReactNode;
}

export default function CapabilitiesSection({
  title,
  highlightedText,
  features,
  badgeComponent
}: CapabilitiesSectionProps) {
  // Process the title if it's a string and has highlighted text
  const processedTitle = typeof title === 'string' && highlightedText
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50/50 text-brand-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
        >
          {typeof processedTitle === 'string' 
            ? <span dangerouslySetInnerHTML={{ __html: processedTitle }} />
            : processedTitle
          }
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-border-card"
            >
              <Card className="h-full p-6 bg-white backdrop-blur-sm border-brand-purple-400/30 text-brand-gray-900">
                <div className="flex items-center mb-4">
                  <span className="p-3 bg-brand-purple-600/10 rounded-full mr-4">{feature.icon}</span>
                  <CardTitle className="text-xl text-brand-gray-900">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-brand-purple-800 mb-3">{feature.benefit}</CardDescription>
                {feature.showBadge && badgeComponent}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}