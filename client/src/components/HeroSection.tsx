import React, { useEffect, useRef } from 'react';
import { ROUTES } from '@/lib/constants';
import gsap from 'gsap';
import AnimatedButton from '@/components/ui/animated-button';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { Spotlight, GridBackground } from '@/components/ui/spotlight';
import HeroScrollSection from '@/components/ui/hero-scroll-section';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
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
      className="section flex items-center justify-center overflow-hidden relative"
      showTransitionBottom={true}
    >
      {/* Add the spotlight and grid background effects */}
      <GridBackground />
      <Spotlight 
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(267, 42%, 70%, .15) 0, hsla(267, 42%, 45%, .08) 50%, hsla(267, 42%, 35%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(219, 53%, 70%, .12) 0, hsla(219, 53%, 44%, .05) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(186, 95%, 80%, .08) 0, hsla(186, 95%, 70%, .04) 80%, transparent 100%)"
      />
      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight mx-auto max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
        >
          Neuroscience-Driven<br />Mental Wellness<br />Platform
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
          Harness the power of neuroplasticity to transform employee well-being and performance
        </p>
        
        <div 
          ref={ctaRef}
          className="flex justify-center mt-12 mb-16"
        >
          <AnimatedButton 
            href={ROUTES.DEMO} 
            variant="gradient"
            size="lg"
            icon={<i className="fas fa-arrow-right"></i>}
            className="shadow-lg"
          >
            Experience Thrive360
          </AnimatedButton>
        </div>
        
        <div 
          ref={trustRef}
          className="mt-24 flex flex-col items-center"
        >
          <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider">Trusted by leading organizations</p>
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-y-4">
            {/* Company icons with Font Awesome */}
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-amazon fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-google fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-microsoft fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-apple fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fas fa-hospital fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fas fa-university fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
      {/* Add scroll section below the hero */}
      <HeroScrollSection />
    </BackgroundWrapper>
  );
};

export default HeroSection;
