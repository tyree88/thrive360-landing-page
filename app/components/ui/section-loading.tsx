'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionLoadingProps {
  className?: string;
  height?: string;
  showShimmer?: boolean;
}

/**
 * A component that serves as a placeholder while section content is loading
 * This prevents layout shifts and provides a visual indicator that content is loading
 */
export default function SectionLoading({ 
  className = '', 
  height = 'min-h-[70vh]',
  showShimmer = true 
}: SectionLoadingProps) {
  return (
    <div 
      className={`w-full ${height} bg-gradient-to-b from-thrive-purple-darker/30 to-thrive-blue-light/20 rounded-md overflow-hidden ${className}`}
      style={{ 
        position: 'relative',
      }}
    >
      {showShimmer && (
        <motion.div 
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: 'linear',
            repeatDelay: 0.5
          }}
          style={{ 
            willChange: 'transform'
          }}
        />
      )}
    </div>
  );
}
