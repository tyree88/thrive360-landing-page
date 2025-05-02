import React, { useEffect, useRef } from 'react';
import { SpotlightBackground, WavyUnderline } from '@/assets/icons';
import { ROUTES } from '@/lib/constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScrollTriggerAnimation, useParallax } from '@/hooks/use-animation';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const parallaxRef = useParallax('.parallax-bg', { speed: 30 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(subtitleRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
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
    )
    .fromTo(arrowRef.current,
      { opacity: 0, y: -10 },
      { opacity: 0.7, y: 0, duration: 0.5, repeat: -1, yoyo: true },
      '-=0.3'
    );
  }, []);

  useScrollTriggerAnimation(() => {
    // Handle floating CTA visibility on scroll
    const floatingCTA = document.getElementById('floatingCTA');
    
    ScrollTrigger.create({
      start: 'top+=500',
      onEnter: () => {
        if (floatingCTA) {
          floatingCTA.classList.add('visible');
        }
      },
      onLeaveBack: () => {
        if (floatingCTA) {
          floatingCTA.classList.remove('visible');
        }
      }
    });
  }, []);

  return (
    <section id="hero" className="section flex items-center justify-center relative overflow-hidden">
      <SpotlightBackground />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight mx-auto max-w-4xl"
        >
          Bridge the Gaps in <span className="relative">
            Mental Health Care
            <WavyUnderline />
          </span>
        </h1>
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
        >
          An AI- and neuroscience-driven wellness platform that empowers individuals and teams with personalized mental health solutions.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a 
            href={ROUTES.DEMO} 
            className="w-full sm:w-auto px-8 py-3 bg-white text-thrive-purple-600 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
          >
            Schedule a Demo
          </a>
          <a 
            href={ROUTES.SOLUTION} 
            className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
          >
            Explore Solutions
          </a>
        </div>
        
        <div 
          ref={trustRef}
          className="mt-12 flex justify-center items-center space-x-10 flex-wrap"
        >
          <p className="text-white/80 mb-4 w-full">Trusted by leading organizations</p>
          <div className="h-10 opacity-70 grayscale contrast-200 w-24 bg-white/20 rounded-md"></div>
          <div className="h-10 opacity-70 grayscale contrast-200 w-24 bg-white/20 rounded-md"></div>
          <div className="h-10 opacity-70 grayscale contrast-200 w-24 bg-white/20 rounded-md"></div>
          <div className="h-10 opacity-70 grayscale contrast-200 w-24 bg-white/20 rounded-md"></div>
        </div>
      </div>
      
      <div 
        ref={arrowRef}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce"
      >
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default HeroSection;
