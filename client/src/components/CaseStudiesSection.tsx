import React, { useEffect, useRef, useState } from 'react';
import { CASE_STUDIES } from '@/lib/constants';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const CaseStudiesSection: React.FC = () => {
  const [activeCase, setActiveCase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  
  // Animation for section heading
  useEffect(() => {
    if (headingRef.current && subheadingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: headingRef.current, start: 'top 80%' } }
      );
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: subheadingRef.current, start: 'top 80%' } }
      );
    }
  }, []);

  // Set up the timeline for case study cards
  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.case-study-card');
    
    cards.forEach((card, index) => {
      // Start with all inactive except the first one
      if (index !== 0) {
        gsap.set(card, { opacity: 0.5, scale: 0.95 });
      }
    });

    // Create a scroll trigger for each case study
    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveCase(index),
        onEnterBack: () => setActiveCase(index),
      });
    });
  }, []);

  // Effect to animate the active case
  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.case-study-card');
    
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: index === activeCase ? 1 : 0.5,
        scale: index === activeCase ? 1 : 0.95,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }, [activeCase]);

  return (
    <BackgroundWrapper
      id="case-studies"
      variant="default"
      className="py-20"
      showPatterns={true}
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div className="max-w-7xl mx-auto px-6" ref={sectionRef}>
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
            Case Studies
          </span>
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Real Results for Real Organizations
          </h2>
          <p 
            ref={subheadingRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            See how companies are transforming employee well-being with Thrive360's neuroplastic approach.
          </p>
        </div>
        
        <div ref={cardsRef} className="space-y-16 md:space-y-24">
          {CASE_STUDIES.map((study, index) => (
            <div 
              key={study.id} 
              className={`case-study-card relative transition-all duration-500 ${index === activeCase ? 'z-10' : 'z-0'}`}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                {/* Left side: Company info and stats */}
                <div className="w-full md:w-2/5">
                  <GradientCard 
                    className="p-8 h-full" 
                    bgVariant={index % 2 === 0 ? 'primary' : 'secondary'}
                    hoverEffect={false}
                  >
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${study.bgColor} flex items-center justify-center text-white mr-4`}>
                        <i className={`fas fa-${study.iconName}`}></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{study.title}</h3>
                        <p className="text-white opacity-80">{study.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-white opacity-90 mb-8">{study.description}</p>
                    
                    <h4 className="text-white text-lg font-semibold mb-4">Key Results</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {study.results.map((result, i) => (
                        <div key={i} className="bg-white/10 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-white mb-1">{result.metric}</div>
                          <div className="text-white opacity-80 text-sm">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </GradientCard>
                </div>
                
                {/* Right side: Testimonial quote with animation */}
                <div className="w-full md:w-3/5 flex items-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === activeCase ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl shadow-xl p-8 border border-gray-100 relative"
                  >
                    <div className="text-5xl text-thrive-purple-300 absolute -top-6 left-8">“</div>
                    <blockquote className="text-xl text-gray-700 mb-6 mt-4 relative z-10">
                      {study.quote.text}
                    </blockquote>
                    <div className="flex items-center">
                      <div className="mr-4 w-12 h-12 rounded-full bg-thrive-purple-100 flex items-center justify-center text-thrive-purple-500 font-bold">
                        {study.quote.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{study.quote.author}</div>
                        <div className="text-sm text-gray-500">{study.quote.role}</div>
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute bottom-4 right-4 opacity-10">
                      <svg width="120" height="120" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#6D3CA7" d="M40.8,-68.7C54.3,-62.5,67.7,-54.4,75.7,-42.2C83.7,-30,86.4,-13.7,86.1,2.5C85.8,18.7,82.6,34.8,73.5,47.2C64.5,59.6,49.6,68.3,34.3,73.1C19,77.9,3.3,78.9,-13.2,77.7C-29.7,76.5,-47,72.9,-59.5,63.3C-72,53.7,-79.7,38.1,-85.3,21.4C-90.9,4.7,-94.3,-13,-89.8,-29.4C-85.2,-45.8,-72.8,-60.8,-57.3,-67.1C-41.9,-73.3,-23.3,-70.9,-6.7,-70.3C9.9,-69.6,27.3,-74.9,40.8,-68.7Z" transform="translate(100 100)" />
                      </svg>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-thrive-purple-100 to-white rounded-full -mr-16 -mt-16 opacity-30"></div>
                  </motion.div>
                </div>
              </div>
              
              {/* Interactive dots for navigation on mobile */}
              <div className="flex justify-center mt-8 md:hidden">
                {CASE_STUDIES.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveCase(i)}
                    className={`w-3 h-3 mx-1 rounded-full ${i === activeCase ? 'bg-thrive-purple-500' : 'bg-gray-300'}`}
                    aria-label={`View case study ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default CaseStudiesSection;
