'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

interface NeuroBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function NeuroBadge({
  className = '',
  size = 'md',
  animated = true
}: NeuroBadgeProps) {
  // Size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  // Icon sizes
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 18
  };
  
  if (animated) {
    return (
      <motion.span
        initial={{ scale: 0.9, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`inline-flex items-center ${sizeClasses[size]} rounded-full font-medium bg-gradient-to-r from-brand-purple-500 to-brand-blue-500 text-white ${className}`}
      >
        <Brain className={`mr-1.5 h-${iconSizes[size]/4} w-${iconSizes[size]/4}`} size={iconSizes[size]} />
        Neuroplastic™
      </motion.span>
    );
  }
  
  return (
    <span className={`inline-flex items-center ${sizeClasses[size]} rounded-full font-medium bg-gradient-to-r from-brand-purple-500 to-brand-blue-500 text-white ${className}`}>
      <Brain className={`mr-1.5 h-${iconSizes[size]/4} w-${iconSizes[size]/4}`} size={iconSizes[size]} />
      Neuroplastic™
    </span>
  );
}