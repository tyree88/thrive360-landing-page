import React from 'react';
import { ThriveScrollSequenceProps } from './types';
import { cn } from '@/lib/utils';

const StaticFallback: React.FC<ThriveScrollSequenceProps> = ({ 
  title, 
  subtitle, 
  sections, 
  className 
}) => {
  // Display the sections in a static layout for users who prefer reduced motion
  return (
    <div className={cn("py-16 px-4", className)}>
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-gray-700 dark:text-gray-300">{subtitle}</p>}
      </div>
      
      {/* Static display of all sections in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div 
              className="h-2 w-full" 
              style={{ backgroundColor: section.bgColor || 'rgba(79, 70, 229, 0.8)' }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
              {section.description && (
                <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">{section.description}</p>
              )}
              <div className="mt-4">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaticFallback;