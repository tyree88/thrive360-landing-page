'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { SSRDisabled } from './client-only';

export interface BackgroundWrapperProps {
  children: ReactNode;
  id?: string;
  variant?: 'light' | 'dark' | 'gradient' | 'transparent' | 'hero' | 'default';
  className?: string;
  showTransitionTop?: boolean;
  showTransitionBottom?: boolean;
  showPatterns?: boolean;
}

/**
 * A wrapper component that provides consistent background styling
 * for sections with different visual variants.
 * Designed to be hydration-safe by completely disabling decorative elements in SSR
 */
const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  id,
  variant = 'light',
  className,
  showTransitionTop = false,
  showTransitionBottom = false,
  showPatterns = false,
}) => {
  // Define background classes based on variant
  const bgClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-900',
    transparent: 'bg-transparent',
    hero: 'bg-gradient-to-b from-thrive-purple-darkest to-thrive-blue-dark text-white',
    default: 'bg-white text-gray-900',
  };

  return (
    <div
      id={id}
      className={cn(
        'relative w-full overflow-hidden',
        bgClasses[variant as keyof typeof bgClasses], // Type-safe access
        className
      )}
    >
      {/* Background patterns - completely disabled during SSR */}
      {showPatterns && (
        <SSRDisabled>
          <div className="absolute top-10 left-10 w-40 h-40 bg-thrive-purple-100/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-thrive-blue-100/20 rounded-full blur-3xl" />
        </SSRDisabled>
      )}
      
      {/* Top transition gradient - completely disabled during SSR */}
      {showTransitionTop && (
        <SSRDisabled>
          <div 
            className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none" 
            style={{
              background: `linear-gradient(to bottom, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(255, 255, 255, 0.8) 50%, 
                rgba(255, 255, 255, 0) 100%)`
            }}
          />
        </SSRDisabled>
      )}
      
      {/* Main content */}
      {children}
      
      {/* Bottom transition gradient - completely disabled during SSR */}
      {showTransitionBottom && (
        <SSRDisabled>
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" 
            style={{
              background: `linear-gradient(to top, 
                rgba(255, 255, 255, 1) 0%, 
                rgba(255, 255, 255, 0.8) 50%, 
                rgba(255, 255, 255, 0) 100%)`
            }}
          />
        </SSRDisabled>
      )}
    </div>
  );
};

export default BackgroundWrapper;