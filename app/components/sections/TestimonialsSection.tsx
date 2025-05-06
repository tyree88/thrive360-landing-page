'use client';
import React from 'react';
import { StarRating } from '../../../assets/icons';
import { TESTIMONIALS } from '@/lib/constants';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';
import AnimatedElement from '@/components/ui/animated-element';
import ClientOnly, { SSRDisabled } from '@/components/ui/client-only';
import { useAnimation } from '@/providers/animation-provider';

/**
 * TestimonialsSection component designed to fix hydration issues
 * by using client-only animations and a safe approach to decorative elements
 */
const TestimonialsSection: React.FC = () => {
  // Get animation preferences from context
  const { isMobile, prefersReducedMotion } = useAnimation();
  
  // Calculate base delays for animations
  const baseDelay = prefersReducedMotion ? 0 : 0.2;
  const staggerDelay = prefersReducedMotion ? 0 : 0.1;
  
  return (
    <BackgroundWrapper
      id="testimonials" 
      variant="light"
      className="section flex items-center justify-center relative overflow-hidden"
      showPatterns={true}
      showTransitionTop={true}
      showTransitionBottom={false}
    >
      {/* Background decoration - completely disabled during SSR */}
      <SSRDisabled>
        <div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-thrive-purple-100 rounded-full opacity-50 z-0"
        />
      </SSRDisabled>
      
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="text-center mb-16">
            <AnimatedElement 
              animation="fade-in" 
              delay={baseDelay}
              skipAnimationWhen={prefersReducedMotion}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
                Testimonials
              </span>
            </AnimatedElement>
            
            <AnimatedElement 
              animation="fade-in" 
              delay={baseDelay + staggerDelay}
              skipAnimationWhen={prefersReducedMotion}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                What Clients Say
              </h2>
            </AnimatedElement>
            
            <AnimatedElement 
              animation="fade-in" 
              delay={baseDelay + (staggerDelay * 2)}
              skipAnimationWhen={prefersReducedMotion}
            >
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Organizations of all sizes are seeing transformative results with Thrive360.
              </p>
            </AnimatedElement>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <AnimatedElement 
                key={index} 
                animation={isMobile ? "fade-in" : "slide-up"} 
                delay={baseDelay + (index * staggerDelay)}
                skipAnimationWhen={prefersReducedMotion}
                threshold="top 90%"
                className="h-full"
              >
                <GradientCard 
                  className="p-8 h-full testimonial-card flex flex-col"
                  borderVariant="light"
                  bgVariant="white"
                  hoverEffect={!prefersReducedMotion}
                >
                  <div className="flex items-center mb-6">
                    <StarRating />
                    <span className="text-gray-600 text-sm ml-2">{testimonial.rating.toFixed(1)}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                      <div className="w-full h-full bg-gray-300"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </GradientCard>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default TestimonialsSection;
