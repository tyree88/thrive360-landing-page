'use client';
import React, { useRef, useEffect } from 'react';
import { JOURNEY_STAGES } from '@/lib/constants';
import { useSequence, useParallax } from '@/hooks/use-animation';
import gsap from 'gsap';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';

const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  
  // Apply animations via class selectors instead of refs
  useEffect(() => {
    // Initialize stage items with opacity 0
    const stageItems = document.querySelectorAll('.stage-section');
    stageItems.forEach((item) => {
      (item as HTMLElement).style.opacity = '0';
    });
    
    // Setup sequence animation
    const sequence = gsap.timeline({
      scrollTrigger: {
        trigger: '.journey-stages',
        start: 'top 80%',
        once: true
      }
    });
    
    sequence.to('.stage-section', {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    // Setup parallax effect
    gsap.to('.parallax-bg', {
      y: -30,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(
      subheadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
  }, []);

  return (
    <BackgroundWrapper
      id="journey" 
      variant="default"
      className="section flex items-center justify-center"
      showPatterns={true}
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full parallax-bg">          
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
              The Journey
            </span>
            <h2 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              How Thrive360 Works
            </h2>
            <p 
              ref={subheadingRef}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              A seamless three-stage process designed to deliver personalized support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 journey-stages">
            {JOURNEY_STAGES.map((stage) => (
              <GradientCard 
                key={stage.number}
                className="p-8 relative stage-section h-full transform translate-y-4"
                bgVariant="light"
                borderVariant="primary"
                hoverEffect={true}
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-thrive-purple-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                  {stage.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{stage.title}</h3>
                <p className="text-gray-600 mb-6">
                  {stage.description}
                </p>
                <div className="w-full h-48 bg-gray-200 rounded-lg shadow-md mb-4 overflow-hidden">
                  <div className="w-full h-full bg-thrive-purple-200/20"></div>
                </div>
                <div className="flex items-center text-sm text-thrive-purple-600">
                  <span className="font-semibold">{stage.tagline}</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </GradientCard>
            ))}
          </div>
          
          {/* Add background elements */}
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-thrive-purple-200 rounded-full opacity-30 z-0 parallax-bg"></div>
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-thrive-purple-200 rounded-full opacity-20 z-0 parallax-bg"></div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default JourneySection;
