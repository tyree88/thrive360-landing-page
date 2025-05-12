'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Problem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProblemSectionProps {
  title: string;
  highlightedTitle?: string;
  description: string;
  problems: Problem[];
}

export default function ProblemSection({
  title,
  highlightedTitle,
  description,
  problems
}: ProblemSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Process title if we have highlighted text
  const processedTitle = highlightedTitle 
    ? `${title} <span class="gradient-text">${highlightedTitle}</span>` 
    : title;
    
  return (
    <section className="py-16 md:py-24 bg-brand-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            dangerouslySetInnerHTML={{ __html: processedTitle }}
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-brand-gray-100"
          >
            {description}
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`bg-gradient-to-br rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all 
                ${index === activeIndex 
                  ? 'from-brand-purple-800 to-brand-purple-900 border-brand-purple-500 scale-105 shadow-xl'
                  : 'from-brand-gray-800 to-brand-gray-900 border-brand-gray-700'
                } border p-6`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="p-3 mb-4 inline-flex items-center justify-center rounded-full bg-brand-purple-900/50">
                {problem.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">
                {problem.title}
              </h3>
              <p className="text-brand-gray-200">{problem.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="flex justify-center mt-8 space-x-2">
            {problems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-brand-purple-500 scale-125' 
                    : 'bg-brand-purple-800/30 hover:bg-brand-purple-800/50'
                }`}
                aria-label={`View problem ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}