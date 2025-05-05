'use client';
import React, { useRef, useEffect } from 'react';
import { SpotlightBackground } from '../../../assets/icons';
import { IMPACT_STATS, ROUTES } from '@/lib/constants';
import { useFadeIn } from '@/hooks/use-animation';
import gsap from 'gsap';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';
import AnimatedButton from '@/components/ui/animated-button';

const ImpactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardWrapRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Setup animations
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
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
    )
    .fromTo(
      cardWrapRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.3'
    )
    .fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.5'
    )
    .to(
      '.impact-stat',
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
      '-=0.4'
    )
    .to(
      '.impact-card',
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.3 },
      '-=0.4'
    )
    .fromTo(
      ctaWrapRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    );
  }, []);

  return (
    <BackgroundWrapper
      id="impact" 
      variant="dark"
      className="section flex items-center justify-center"
      showPatterns={true}
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full mb-4">
              Real Results
            </span>
            <h2 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              Measurable Impact
            </h2>
            <p 
              ref={subheadingRef}
              className="text-xl text-white/90 max-w-3xl mx-auto"
            >
              Organizations using Thrive360 see significant improvements in wellbeing and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div ref={cardWrapRef} className="w-full">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 text-white mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-white">Case Study: Metro Health Network</h3>
                  <p className="mb-6 text-white/90">
                    A healthcare system with 3,000+ employees implemented Thrive360 to address burnout and improve retention.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                    {IMPACT_STATS.map((stat, index) => (
                      <div 
                        key={index}
                        className="impact-stat opacity-0 p-4 bg-white/5 rounded-xl border border-white/10 text-center transform translate-y-4"
                      >
                        <h4 className="text-3xl font-bold mb-2 text-white">{stat.percentage}</h4>
                        <p className="text-sm text-white/80">{stat.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full overflow-hidden flex items-center justify-center text-white">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <div>
                      <p className="font-medium text-white">"Thrive360 has transformed how we deliver mental health support to our staff."</p>
                      <p className="text-sm text-white/80">- Dr. Sarah Chen, Chief Wellness Officer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div ref={ctaWrapRef}>
                <AnimatedButton 
                  href={ROUTES.CONTACT} 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-thrive-purple-600 hover:bg-white/90"
                >
                  Read More Case Studies
                  <i className="fas fa-arrow-right ml-2"></i>
                </AnimatedButton>
              </div>
            </div>
            
            <div 
              ref={imageRef}
              className="hidden lg:block relative"
            >
              <div className="rounded-2xl shadow-2xl max-w-md mx-auto impact-image bg-white/5 aspect-[3/4] h-[500px]"></div>
              
              <div className="absolute top-1/4 -left-16 bg-white p-4 rounded-xl shadow-xl impact-card opacity-0 transform -translate-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">85% completion rate</h4>
                    <p className="text-xs text-gray-600">vs. industry avg of 23%</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-1/4 -right-16 bg-white p-4 rounded-xl shadow-xl impact-card opacity-0 transform translate-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-heart text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">42% stress reduction</h4>
                    <p className="text-xs text-gray-600">after 30 days of use</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ImpactSection;
