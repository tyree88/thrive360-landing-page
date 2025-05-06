'use client';

import React, { useRef, useEffect } from 'react';
import { PROBLEM_STATS, ROUTES } from '@/lib/constants';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { useScrollTriggerAnimation } from '@/hooks/use-scroll-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faChartLine, faHeart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import AnimatedButton from '@/components/ui/animated-button';

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Map icon strings to FontAwesome components
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'fa-brain': return <FontAwesomeIcon icon={faBrain} className="w-8 h-8" />;
      case 'fa-chart-line': return <FontAwesomeIcon icon={faChartLine} className="w-8 h-8" />;
      case 'fa-heart': return <FontAwesomeIcon icon={faHeart} className="w-8 h-8" />;
      case 'fa-dollar-sign': return <FontAwesomeIcon icon={faDollarSign} className="w-8 h-8" />;
      default: return <FontAwesomeIcon icon={faBrain} className="w-8 h-8" />;
    }
  };

  // For compatibility with the updated data structure
  React.useEffect(() => {
    // Handle the warning from console about container position
    if (sectionRef.current) {
      sectionRef.current.style.position = 'relative';
    }
  }, []);

  // Use the enhanced scroll animation hook
  useScrollTriggerAnimation(() => {
    if (!sectionRef.current || !statsContainerRef.current) return;

    // Create main scroll trigger for animation
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 25%",
        end: "bottom bottom",
        scrub: 0.5,
        markers: process.env.NODE_ENV === 'development' ? false : false, // Set to true for debugging
      }
    });
    
    // Animate the heading
    if (headingRef.current && subheadingRef.current) {
      mainTimeline
        .from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.5
        })
        .from(subheadingRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.4
        }, "-=0.3");
    }
    
    // Get all stat items
    const statItems = statsContainerRef.current.querySelectorAll('.stat-item');
    
    // Animate each stat item one after another
    statItems.forEach((item, index) => {
      const statValue = item.querySelector('.stat-value');
      const statText = item.querySelector('.stat-text');
      
      // Offset each stat animation
      const position = index * 0.15;
      
      // Add to the main timeline
      mainTimeline.from(item, {
        opacity: 0,
        y: 60,
        duration: 0.6
      }, `stat-${index}`);
      
      // Counter animation for the stat value
      if (statValue) {
        // Get target value from the data attribute
        const targetValue = parseInt(statValue.getAttribute('data-value') || '0', 10);
        const unit = statValue.getAttribute('data-unit') || '';
        
        mainTimeline.from(statValue, {
          innerText: 0,
          duration: 0.8,
          snap: { innerText: 1 }, // Ensures integer counting
          onUpdate: function() {
            // @ts-ignore - innerText is available on the DOM element
            (statValue as HTMLElement).innerText = Math.floor(this.targets()[0].innerText) + unit;
          }
        }, `stat-${index}+=0.1`);
      }
      
      // Animate the text separately for a staggered effect
      if (statText) {
        mainTimeline.from(statText, {
          opacity: 0,
          y: 20,
          duration: 0.4
        }, `stat-${index}+=0.2`);
      }
    });

    // Animate CTA
    if (ctaRef.current) {
      mainTimeline.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.5
      }, "-=0.2");
    }
  }, []);

  return (
    <BackgroundWrapper
      id="problem"
      variant="light"
      className="section relative min-h-screen py-20"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium bg-thrive-purple-light/10 text-thrive-purple rounded-full mb-6">
            The Wellbeing Crisis
          </span>
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Modern Challenges Need Modern Solutions
          </h2>
          <p 
            ref={subheadingRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Traditional wellness programs fail to address today's mental health needs.
          </p>
        </div>
        
        <div 
          ref={statsContainerRef}
          className="flex flex-col gap-10 md:gap-16"
        >
          {PROBLEM_STATS.map((stat) => (
            <div 
              key={stat.id}
              className="stat-item bg-white rounded-xl shadow-md p-6 md:p-10 transform transition-all"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-shrink-0">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: stat.color }}
                  >
                    {getIcon(stat.icon)}
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 
                    className="stat-value text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-gray-900"
                    data-value={stat.value}
                    data-unit={stat.unit}
                  >
                    0{stat.unit}
                  </h3>
                  <p className="stat-text text-lg md:text-xl text-gray-600">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div ref={ctaRef} className="text-center mt-20">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Thrive360 tackles these challenges head-on with a neuroplastic approach that transforms how employees engage with mental wellness.
          </p>
          <AnimatedButton 
            href={ROUTES.SOLUTION} 
            variant="primary"
            size="lg"
          >
            Discover Our Solution
          </AnimatedButton>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ProblemSection;