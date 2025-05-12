'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import NeuroBadge from '@/components/ui/NeuroBadge';

interface HeroSectionProps {
  title: string;
  highlightedWords?: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  showBadge?: boolean;
  imagePosition?: 'right' | 'left';
}

export default function HeroSection({
  title,
  highlightedWords = [],
  description,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt,
  showBadge = false,
  imagePosition = 'right'
}: HeroSectionProps) {
  // Highlight words in the title
  const processedTitle = highlightedWords.reduce((acc, word) => {
    return acc.replace(word, `<span class="gradient-text">${word}</span>`);
  }, title);
  
  return (
    <section className="py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
          <motion.div 
            initial={{ opacity: 0, x: imagePosition === 'right' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <div className="max-w-xl">
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4"
                >
                  <NeuroBadge />
                </motion.div>
              )}
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-brand-gray-900"
                dangerouslySetInnerHTML={{ __html: processedTitle }}
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 text-brand-purple-800"
              >
                {description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <a 
                  href={ctaLink} 
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow group"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: imagePosition === 'right' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-purple-500/20 to-brand-blue-600/20 rounded-3xl blur-xl animate-aurora"></div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl border border-brand-purple-400/30">
                <img 
                  src={imageSrc} 
                  alt={imageAlt} 
                  className="w-full h-full object-cover"
                />
                {showBadge && (
                  <div className="absolute bottom-4 right-4">
                    <NeuroBadge size="lg" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}