import React, { useRef, useEffect } from 'react';
import { FeatureIcon } from '@/assets/icons';
import { PROBLEM_STATS, ROUTES } from '@/lib/constants';
import { useSequence } from '@/hooks/use-animation';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection: React.FC = () => {
  const problemStatsRef = useSequence('.problem-stat', {
    staggerDelay: 0.2,
    start: 'top 80%'
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
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
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    );
  }, []);

  return (
    <section 
      id="problem" 
      className="section bg-white flex items-center justify-center relative"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
            The Challenge
          </span>
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Mental Health Care is Broken
          </h2>
          <p 
            ref={subheadingRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Traditional solutions fail to meet modern needs, leaving critical gaps in care.
          </p>
        </div>
        
        <div 
          ref={problemStatsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {PROBLEM_STATS.map((stat, index) => (
            <div 
              key={index}
              className="problem-stat p-8 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
              data-delay={stat.delay}
            >
              <FeatureIcon 
                icon={stat.icon} 
                color={stat.color} 
                className="text-2xl mb-4" 
              />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.percentage}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          ref={ctaRef}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Healthcare providers and employers struggle to deliver effective mental health support at scale.
          </p>
          <a 
            href={ROUTES.SOLUTION} 
            className="inline-flex items-center px-6 py-3 bg-thrive-purple-500 text-white rounded-full text-lg font-medium hover:bg-thrive-purple-600 transition-colors shadow-md"
          >
            See the Solution
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
