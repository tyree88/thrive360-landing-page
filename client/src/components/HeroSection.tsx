import React, { useEffect, useRef } from 'react';
import { ROUTES } from '@/lib/constants';
import gsap from 'gsap';
import AnimatedButton from '@/components/ui/animated-button';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);

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
    );
    
    // If we have the wave SVG, animate it slightly
    if (waveRef.current) {
      gsap.to(waveRef.current, {
        duration: 40,
        scaleX: 1.03,
        scaleY: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: 'center bottom'
      });
    }
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
    <section id="hero" className="section flex items-center justify-center relative overflow-hidden bg-[#101219]">
      {/* Colorful gradient wave */}
      <svg 
        ref={waveRef}
        className="absolute bottom-0 w-full h-[40vh]" 
        viewBox="0 0 1440 320" 
        preserveAspectRatio="none"
        style={{ minHeight: '300px' }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B98" /> {/* Pink */}
            <stop offset="50%" stopColor="#FF6B98" /> {/* Pink */}
            <stop offset="100%" stopColor="#5D5FEF" /> {/* Purple-blue */}
          </linearGradient>
        </defs>
        <path 
          fill="url(#waveGradient)" 
          fillOpacity="1" 
          d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,165.3C672,171,768,213,864,229.3C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight mx-auto max-w-5xl"
        >
          Systems that deliver<br />outcomes for<br />government.
        </h1>
        
        <div 
          ref={ctaRef}
          className="flex justify-center mt-12 mb-16"
        >
          <AnimatedButton 
            href={ROUTES.DEMO} 
            variant="primary"
            size="lg"
            icon={<i className="fas fa-arrow-right"></i>}
            className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg"
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
    </section>
  );
};

export default HeroSection;
