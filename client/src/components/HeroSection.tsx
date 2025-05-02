import React, { useEffect, useRef } from 'react';
import { ROUTES } from '@/lib/constants';
import gsap from 'gsap';
import AnimatedButton from '@/components/ui/animated-button';
import BackgroundWrapper from '@/components/ui/background-wrapper';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(ctaRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(trustRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8 },
      '-=0.1'
    );

  }, []);

  // Simplified scroll handler for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      const floatingCTA = document.getElementById('floatingCTA');
      if (!floatingCTA) return;
      
      if (window.scrollY > 500) {
        floatingCTA.classList.add('visible');
      } else {
        floatingCTA.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BackgroundWrapper
      id="hero"
      variant="hero"
      className="section flex items-center justify-center"
      showTransitionBottom={true}
    >

      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight mx-auto max-w-5xl"
        >
          Systems that deliver<br />outcomes for<br />government.
        </h1>
        
        <div 
          ref={ctaRef}
          className="flex justify-center mt-12 mb-16"
        >
          <AnimatedButton 
            href={ROUTES.DEMO} 
            variant="secondary"
            size="lg"
            icon={<i className="fas fa-arrow-right"></i>}
            className="shadow-lg"
          >
            Schedule a Demo
          </AnimatedButton>
        </div>
        
        <div 
          ref={trustRef}
          className="mt-24 flex justify-center items-center space-x-8 flex-wrap"
        >
          {/* Logo placeholders - in a real implementation, these would be actual client logos */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={`logo-${index}`} className="h-10 opacity-80 grayscale w-24 bg-white/20 rounded-md"></div>
          ))}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default HeroSection;
