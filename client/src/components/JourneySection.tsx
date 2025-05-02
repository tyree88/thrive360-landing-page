import React, { useRef, useEffect } from 'react';
import { JOURNEY_STAGES } from '@/lib/constants';
import { useSequence, useParallax } from '@/hooks/use-animation';
import gsap from 'gsap';

const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const stagesRef = useSequence('.stage-section', { 
    staggerDelay: 0.2, 
    start: 'top 80%' 
  });
  
  const parallaxRef = useParallax('.parallax-bg', { 
    speed: 20,
    start: 'top bottom',
    end: 'bottom top'
  });

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
    <section 
      id="journey" 
      className="section bg-white flex items-center justify-center relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 w-full" ref={parallaxRef}>
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
        
        <div 
          ref={stagesRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {JOURNEY_STAGES.map((stage) => (
            <div 
              key={stage.number}
              className="p-8 bg-thrive-purple-50 rounded-2xl border border-thrive-purple-100 relative stage-section opacity-0"
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
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-thrive-purple-200 rounded-full opacity-30 z-0 parallax-bg"></div>
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-thrive-purple-200 rounded-full opacity-20 z-0 parallax-bg"></div>
    </section>
  );
};

export default JourneySection;
