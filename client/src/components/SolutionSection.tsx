import React, { useRef, useEffect } from 'react';
import { FeatureIcon } from '@/assets/icons';
import { SOLUTION_FEATURES, ROUTES } from '@/lib/constants';
import { useFadeIn, useSequence } from '@/hooks/use-animation';
import gsap from 'gsap';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';
import AnimatedButton from '@/components/ui/animated-button';

const SolutionSection: React.FC = () => {
  // Using useSequence for the feature list items
  const featureItemsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (featureItemsRef.current) {
      const items = featureItemsRef.current.querySelectorAll('.feature-item');
      // Initialize with opacity 1 until GSAP is fully configured
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = '1';
      });
    }
  }, []);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
    )
    .fromTo(
      phoneRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.3'
    )
    .fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    );
  }, []);

  return (
    <BackgroundWrapper
      id="solution"
      variant="light"
      className="section flex items-center justify-center"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
            Our Solution
          </span>
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Personalized Mental Health at Scale
          </h2>
          <p 
            ref={subheadingRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Thrive360 combines AI, neuroscience, and storytelling to deliver customized care that people actually use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1" ref={featureItemsRef}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Wellbeing support employees actually use
            </h3>
            <p className="text-gray-600 mb-8">
              Scalable personalization plus a neuroplastic engagement engine to break stigma, speed results, and keep your team engaged, 24/7.
            </p>
            
            <div className="space-y-6">
              {SOLUTION_FEATURES.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 feature-item">
                  <FeatureIcon icon={feature.icon} color={feature.color} />
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div ref={ctaRef} className="mt-10">
              <a 
                href={ROUTES.DEMO} 
                className="inline-flex items-center px-6 py-3 bg-thrive-purple-500 text-white rounded-full font-medium hover:bg-thrive-purple-600 transition-colors shadow-md"
              >
                Book a Demo
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative" ref={phoneRef}>
            <div className="mobile-device">
              <div className="mobile-notch"></div>
              <div className="mobile-screen bg-white">
                <div className="p-4 bg-thrive-purple-500 text-white">
                  <h4 className="font-bold">Thrive360</h4>
                  <p className="text-sm">Your personalized wellness journey</p>
                </div>
                
                <div className="p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Today's Focus</h5>
                  <div className="bg-thrive-purple-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-thrive-purple-700">Managing Workplace Stress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-thrive-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  
                  <h5 className="font-semibold text-gray-900 mb-2">Recommended Activities</h5>
                  <div className="space-y-3">
                    <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">5-Min Mindfulness</p>
                        <p className="text-xs text-gray-500">Audio Guide</p>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <i className="fas fa-play text-xs text-thrive-purple-500"></i>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Thought Reframing</p>
                        <p className="text-xs text-gray-500">Interactive Exercise</p>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <i className="fas fa-arrow-right text-xs text-thrive-purple-500"></i>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Quick Check-in</p>
                        <p className="text-xs text-gray-500">1-Minute Assessment</p>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <i className="fas fa-clipboard-list text-xs text-thrive-purple-500"></i>
                      </div>
                    </div>
                  </div>
                  
                  <h5 className="font-semibold text-gray-900 mt-4 mb-2">Weekly Progress</h5>
                  <div className="bg-white border border-gray-200 p-3 rounded-lg">
                    <div className="flex justify-between mb-2">
                      {/* Simplified bar chart */}
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                        const heights = [60, 40, 75, 50, 65, 80, 90];
                        return (
                          <div key={day} className="w-8 bg-thrive-purple-100 rounded-t-sm relative">
                            <div 
                              className="absolute bottom-0 w-full bg-thrive-purple-500 rounded-t-sm" 
                              style={{ height: `${heights[index]}%` }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <span key={day}>{day.charAt(0)}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-thrive-purple-300 to-thrive-purple-500 rounded-full opacity-10 z-0"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-thrive-purple-300 to-thrive-purple-500 rounded-full opacity-10 z-0"></div>
          </div>
        </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default SolutionSection;
