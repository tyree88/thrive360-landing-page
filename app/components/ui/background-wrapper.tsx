'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BackgroundWrapperProps {
  children: ReactNode;
  id?: string;
  variant?: 'light' | 'dark' | 'gradient' | 'transparent';
  className?: string;
  showTransitionTop?: boolean;
  showTransitionBottom?: boolean;
}

/**
 * A wrapper component that provides consistent background styling
 * for sections with different visual variants.
 */
const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  id,
  variant = 'light',
  className,
  showTransitionTop = false,
  showTransitionBottom = false,
}) => {
  // Define background classes based on variant
  const bgClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-900',
    transparent: 'bg-transparent',
  };

  return (
    <div
      id={id}
      className={cn(
        'relative w-full overflow-hidden',
        bgClasses[variant],
        className
      )}
    >
      {/* Top transition gradient */}
      {showTransitionTop && (
        <div 
          className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none" 
          style={{
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, 1) 0%, 
              rgba(255, 255, 255, 0.8) 50%, 
              rgba(255, 255, 255, 0) 100%)`
          }}
        />
      )}
      
      {/* Main content */}
      {children}
      
      {/* Bottom transition gradient */}
      {showTransitionBottom && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" 
          style={{
            background: `linear-gradient(to top, 
              rgba(255, 255, 255, 1) 0%, 
              rgba(255, 255, 255, 0.8) 50%, 
              rgba(255, 255, 255, 0) 100%)`
          }}
        />
      )}
    </div>
  );
};

export default BackgroundWrapper;