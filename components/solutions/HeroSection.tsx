'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  highlightedWords?: string[];
  description: string;
  ctaText?: string;
  ctaLink?: string;
  imageSrc: string;
  imageAlt: string;
  showBadge?: boolean;
}

export default function HeroSection({
  title,
  highlightedWords = [],
  description,
  ctaText = 'See the Demo',
  ctaLink = '#',
  imageSrc,
  imageAlt,
  showBadge = true
}: HeroSectionProps) {
  // Process title to highlight specific words
  const highlightedTitle = highlightedWords.length > 0
    ? title.split(' ').map((word, i) => (
        highlightedWords.includes(word) 
          ? <span key={i} className="gradient-text">{word} </span>
          : <span key={i}>{word} </span>
      ))
    : title;

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gradient-light-purple">
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-tight text-brand-gray-900"
            >
              {highlightedTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-brand-purple-800 max-w-xl mx-auto md:mx-0 mb-10"
            >
              {description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <Button asChild size="lg" className="bg-gradient-primary text-brand-gray-50 font-semibold px-10 py-6 text-lg hover:opacity-90 transition-opacity duration-300 shadow-glow-brand">
                <a href={ctaLink}>
                  {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 md:mt-0 max-w-xl mx-auto md:max-w-none"
          >
            <div className="relative aspect-[4/3] sm:aspect-video bg-brand-gray-50/50 backdrop-blur-sm rounded-xl shadow-2xl p-2 border border-brand-purple-400/30 overflow-hidden">
              <img 
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover rounded-lg"
              />
              {showBadge && (
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                  {/* NeuroBadge placeholder - you can create this component if needed */}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-purple-600 text-white">
                    Neural™
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}