'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useAnimation } from '@/context/AnimationContext';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import BackgroundWrapper from '@/components/ui/background-wrapper';

interface Stage {
  id: string;
  title: string;
  description: string;
  image: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface MultiStageScrollSectionProps {
  title: string;
  subtitle?: string;
  stages: Stage[];
  id?: string;
  className?: string;
}

export const MultiStageScrollSection: React.FC<MultiStageScrollSectionProps> = ({
  title,
  subtitle,
  stages,
  id = 'multi-stage-scroll',
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement[]>([]);
  
  // Function to set refs safely
  const setStageRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      // Make sure the array is initialized
      if (!stagesRef.current) {
        stagesRef.current = [];
      }
      // Store the element reference at the specified index
      stagesRef.current[index] = el;
    }
  };
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const { gsap, ScrollTrigger, registerScrollTrigger } = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  // Set up scroll-triggered animations
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !containerRef.current) return;
    if (prefersReducedMotion) return;
    
    // Initialize stage refs array
    stagesRef.current = Array(stages.length).fill(null);
    
    const setupAnimation = () => {
      // Main scroll animation for the sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update progress and active stage
            setProgress(self.progress);
            
            // Calculate which stage is active based on progress
            const stageProgress = self.progress * stages.length;
            const newIndex = Math.min(
              Math.floor(stageProgress),
              stages.length - 1
            );
            
            if (newIndex !== activeStage) {
              setActiveStage(newIndex);
            }
          }
        }
      });
      
      // Fade out title on scroll
      tl.to(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, 0);
      
      // Create animations for each stage
      stages.forEach((_, index) => {
        const stage = stagesRef.current[index];
        if (!stage) return;
        
        // For first stage, fade in immediately
        if (index === 0) {
          tl.set(stage, { opacity: 1 }, 0);
        }
        
        // Determine when this stage should appear and disappear
        const startProgress = index / stages.length;
        const endProgress = (index + 1) / stages.length;
        
        // Fade in this stage
        tl.fromTo(stage, 
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power1.inOut" }, 
          startProgress
        );
        
        // Fade out this stage (except for the last one)
        if (index < stages.length - 1) {
          tl.to(stage, 
            { opacity: 0, scale: 0.9, y: -30, duration: 0.2, ease: "power1.inOut" }, 
            endProgress - 0.05
          );
        }
      });
      
      return tl;
    };
    
    // Register animation with the context
    registerScrollTrigger(setupAnimation);
    
    // Clean up
    return () => {
      const scrollTriggerInstance = ScrollTrigger.getById(containerRef.current?.id || "");
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [gsap, ScrollTrigger, registerScrollTrigger, stages, activeStage, prefersReducedMotion]);
  
  // Render static version if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <BackgroundWrapper id={id} variant="light" className={className}>
        <div className="container mx-auto py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage, index) => (
              <div 
                key={stage.id}
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ backgroundColor: stage.bgColor, color: stage.textColor }}
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{stage.title}</h3>
                  <p className="mb-6">{stage.description}</p>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    {stage.image}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BackgroundWrapper>
    );
  }
  
  return (
    <BackgroundWrapper id={id} variant="light" className={className}>
      <div 
        ref={containerRef}
        className="h-screen relative overflow-hidden"
        style={{
          backgroundColor: stages[activeStage]?.bgColor,
          color: stages[activeStage]?.textColor,
          transition: 'background-color 0.5s ease, color 0.5s ease'
        }}
      >
        <div className="container mx-auto h-full flex flex-col items-center">
          {/* Title section (animates out on scroll) */}
          <div 
            ref={titleRef}
            className="text-center pt-20 pb-10 transition-opacity"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
            {subtitle && <p className="text-xl max-w-3xl mx-auto">{subtitle}</p>}
          </div>
          
          {/* Stages container */}
          <div className="flex-grow w-full flex items-center justify-center relative">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                ref={setStageRef(index)}
                className={cn(
                  "absolute inset-0 flex items-center justify-center opacity-0",
                  "transition-opacity duration-500"
                )}
              >
                <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 px-4">
                  <div className="w-full md:w-1/2 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold">{stage.title}</h3>
                    <p className="text-lg md:text-xl">{stage.description}</p>
                  </div>
                  
                  <div className="w-full md:w-1/2 md:pl-8">
                    <div className="aspect-square w-full max-w-md mx-auto relative rounded-xl overflow-hidden shadow-2xl">
                      {stage.image}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="pb-8 w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-2">
              {stages.map((stage, index) => (
                <button
                  key={stage.id}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    index === activeStage 
                      ? "bg-current scale-150" 
                      : "bg-current/30 hover:bg-current/50"
                  )}
                  aria-label={`Go to stage ${index + 1}: ${stage.title}`}
                  onClick={() => {
                    // Calculate the position to scroll to
                    if (containerRef.current) {
                      const container = containerRef.current;
                      const scrollTrigger = ScrollTrigger.getById(container.id || "");
                      if (scrollTrigger) {
                        const progress = index / stages.length;
                        scrollTrigger.scroll(scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress);
                      }
                    }
                  }}
                />
              ))}
            </div>
            <div className="h-1 bg-current/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-current transition-all"
                style={{ width: `${(progress * 100).toFixed(2)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default MultiStageScrollSection;