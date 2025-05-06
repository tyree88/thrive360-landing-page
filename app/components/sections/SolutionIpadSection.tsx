'use client';

import React, { useRef } from 'react';
import { SOLUTION_FEATURES, ROUTES } from '@/lib/constants';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { useScrollTriggerAnimation } from '@/hooks/use-scroll-animation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faRobot, faChartLine, faLightbulb, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import AnimatedButton from '@/components/ui/animated-button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SolutionIpadSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);
  const ipadRef = useRef<HTMLDivElement>(null);
  
  // Get the icon for a feature
  const getIconForFeature = (iconName: string) => {
    switch(iconName) {
      case 'fa-brain': return faBrain;
      case 'fa-robot': return faRobot;
      case 'fa-chart-line': return faChartLine;
      case 'fa-lightbulb': return faLightbulb;
      case 'fa-user-friends': return faUserFriends;
      default: return faLightbulb;
    }
  };

  // GSAP ScrollTrigger setup
  useScrollTriggerAnimation(() => {
    if (typeof window === 'undefined') return;
    if (!sectionRef.current || !headingRef.current || !subheadingRef.current) return;
    
    // Kill any existing scroll triggers for this component to prevent duplicates
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current || 
          trigger.vars.trigger === featuresContainerRef.current) {
        trigger.kill();
      }
    });
    
    // Heading and subheading animations
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    gsap.fromTo(subheadingRef.current,
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: subheadingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // iPad animation
    if (ipadRef.current) {
      gsap.fromTo(ipadRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: ipadRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
    
    // Features animations
    if (featuresContainerRef.current) {
      const features = gsap.utils.toArray('.solution-feature');
      
      features.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(feature as HTMLElement,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, delay: index * 0.2,
              scrollTrigger: {
                trigger: feature as HTMLElement,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }
    
    // Conclusion animation
    if (conclusionRef.current) {
      gsap.fromTo(conclusionRef.current,
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: conclusionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  return (
    <BackgroundWrapper
      id="solution-ipad"
      variant="default"
      className="section py-20"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-blue-100 text-thrive-blue-700 rounded-full mb-4">
            Our Platform
          </span>
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            The Thrive360 Experience
          </h2>
          <p 
            ref={subheadingRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our interactive platform uses neuroscience and AI to create personalized mental health journeys that engage and transform.
          </p>
        </div>
        
        {/* iPad mockup */}
        <div 
          ref={ipadRef}
          className="max-w-4xl mx-auto bg-gray-100 rounded-[40px] shadow-xl p-6 mb-16 transform transition-all duration-500 hover:shadow-2xl border-[12px] border-gray-800"
        >
          <div className="relative w-full aspect-[4/3] bg-black rounded-[20px] overflow-hidden">
            {/* Home button at bottom */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-10"></div>
            
            {/* Camera at top */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full z-10"></div>
            
            {/* iPad screen */}
            <div className="absolute inset-0.5 rounded-[18px] bg-gradient-to-r from-thrive-purple-100 to-thrive-blue-800 flex items-center justify-center overflow-hidden p-1.5 shadow-inner">
              
              {/* App mockup content */}
              <div className="bg-white h-full w-full rounded-md p-4 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-thrive-purple-500"></div>
                    <div className="h-2 w-24 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                    <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                    <div className="h-20 bg-thrive-purple-100 rounded-md"></div>
                    <div className="h-20 bg-thrive-blue-100 rounded-md"></div>
                    <div className="h-10 w-full bg-gray-200 rounded-md mt-4"></div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="h-4 w-2/3 ml-auto bg-gray-200 rounded-md"></div>
                    <div className="flex-grow bg-gradient-to-br from-thrive-purple-100 to-thrive-blue-100 rounded-md flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white/70 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-thrive-purple-500"></div>
                      </div>
                    </div>
                    <div className="h-10 w-full bg-thrive-purple-500 rounded-md mt-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={featuresContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto"
        >
          {SOLUTION_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="solution-feature bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 ease-out hover:scale-105"
            >
              <div 
                className="flex items-center justify-center h-20 w-20 rounded-full mx-auto mb-6"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <FontAwesomeIcon 
                  icon={getIconForFeature(feature.icon)} 
                  className="text-3xl"
                  style={{ color: feature.color }} 
                />
              </div>
              <h3 className="text-2xl font-bold text-center mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          ref={conclusionRef}
          className="text-center max-w-3xl mx-auto mt-16"
        >
          <p className="text-xl text-gray-700 mb-8">
            Experience the platform that's transforming workplace mental health with engagement rates 3x higher than traditional programs.
          </p>
          <AnimatedButton 
            href={ROUTES.DEMO} 
            variant="primary"
            size="lg"
          >
            Request Demo
          </AnimatedButton>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default SolutionIpadSection;