'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ScrollSequenceSection } from './types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';

interface StaticFallbackProps {
  title: string;
  subtitle?: string;
  sections: ScrollSequenceSection[];
  className?: string;
}

/**
 * StaticFallback - A non-animated version of the scroll sequence
 * 
 * This component is shown to users who prefer reduced motion.
 * It displays all the content in a static, vertically stacked layout.
 */
const StaticFallback = ({
  title,
  subtitle,
  sections,
  className
}: StaticFallbackProps) => {
  return (
    <section className={cn('w-full py-16 bg-background', className)}>
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <Card key={section.id} className="overflow-hidden border">
              <CardHeader 
                className="pb-2" 
                style={{ 
                  backgroundColor: section.bgColor,
                  color: section.textColor 
                }}
              >
                <CardTitle>{section.title}</CardTitle>
                {section.description && (
                  <CardDescription style={{ color: section.textColor, opacity: 0.8 }}>
                    {section.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-4">
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaticFallback;