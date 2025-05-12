'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  value: string;
  label: string;
  id: string;
}

interface StatsDemoSectionProps {
  title: string;
  highlightedText?: string;
  stats: StatItem[];
  demoImageSrc: string;
  demoImageAlt: string;
  badgeElement?: React.ReactNode;
  scrollHeight?: string;
}

export default function StatsDemoSection({
  title,
  highlightedText,
  stats,
  demoImageSrc,
  demoImageAlt,
  badgeElement,
  scrollHeight = "150vh"
}: StatsDemoSectionProps) {
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  
  // Process title if we have highlighted text
  const processedTitle = highlightedText 
    ? title.replace(highlightedText, `<span class="gradient-text">${highlightedText}</span>`)
    : title;

  // Auto-rotate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900" style={{minHeight: scrollHeight}}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          dangerouslySetInnerHTML={{ __html: processedTitle }}
        />
        <div className="sticky top-24 md:top-32 z-20"> 
          <motion.div 
            key={currentStatIndex} 
            initial={{ opacity: 0.5, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-10 border border-brand-purple-400/40 text-center"
          >
             <div className="relative aspect-video bg-brand-gray-50/70 rounded-lg shadow-inner mb-6 overflow-hidden border border-brand-purple-400/20">
                <img className="w-full h-full object-contain p-4" alt={demoImageAlt} src={demoImageSrc} />
             </div>
            <div className="text-6xl md:text-8xl font-extrabold gradient-text mb-4">
              {stats[currentStatIndex].value}
            </div>
            <p className="text-xl md:text-2xl text-brand-purple-800 mb-6">
              {stats[currentStatIndex].label}
            </p>
            {badgeElement && (
              <div className="flex justify-center">
                {badgeElement}
              </div>
            )}
             <p className="text-xs text-brand-purple-800/70 mt-2">Powered by Neuroplastic Engagement™</p>
          </motion.div>
          <p className="text-center text-sm text-brand-purple-800/80 mt-4">
            (Scroll down to see more sections or click to cycle stats)
          </p>
          
          {/* Navigation Pills */}
          <div className="flex justify-center mt-4 space-x-2">
            {stats.map((stat, index) => (
              <button
                key={index}
                onClick={() => setCurrentStatIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentStatIndex === index 
                    ? 'bg-brand-purple-600 scale-125' 
                    : 'bg-brand-purple-400/30 hover:bg-brand-purple-400/50'
                }`}
                aria-label={`View stat for ${stat.label}`}
              />
            ))}
          </div>
        </div>
        <div className="h-[100vh]"></div> {/* Placeholder for scroll */}
      </div>
    </section>
  );
}