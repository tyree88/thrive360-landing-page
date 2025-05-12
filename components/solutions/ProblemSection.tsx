'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ProblemPoint {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ProblemSectionProps {
  title: string;
  highlightedTitle?: string;
  description: string;
  problems: ProblemPoint[];
}

export default function ProblemSection({
  title,
  highlightedTitle,
  description,
  problems
}: ProblemSectionProps) {
  const fullTitle = highlightedTitle 
    ? (
        <>
          {title} <span className="gradient-text bg-gradient-to-r from-brand-purple-400 to-brand-blue-600">{highlightedTitle}</span>
        </>
      )
    : title;

  return (
    <section className="py-16 md:py-24 bg-brand-gray-900 text-brand-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-brand-gray-50"
        >
          {fullTitle}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-brand-gray-50 text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          {description}
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((point, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glow-border-card problem-card-gradient"
            >
              <Card className="h-full p-6 flex flex-col items-center text-center text-brand-gray-50 border-transparent">
                <div className="p-4 bg-white/10 rounded-full mb-6">
                  {point.icon}
                </div>
                <CardTitle className="text-xl mb-3 text-brand-gray-50">{point.title}</CardTitle>
                <CardDescription className="text-brand-gray-50/80">{point.description}</CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}