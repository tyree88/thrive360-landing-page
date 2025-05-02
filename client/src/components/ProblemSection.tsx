import React, { useRef, useEffect } from 'react';
import { FeatureIcon } from '@/assets/icons';
import { PROBLEM_STATS, ROUTES } from '@/lib/constants';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import AnimatedButton from '@/components/ui/animated-button';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';
import GridScrollTransition from '@/components/ui/grid-scroll-transition';
import SectionScrollLink from '@/components/ui/section-scroll-link';
import gsap from 'gsap';

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: transitionRef.current,
        start: 'top 80%',
        end: 'center 50%',
        scrub: 1
      }
    });

    tl.fromTo(
      '.transition-item',
      { y: 0, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 }
    );
  }, []);

  return (
    <BackgroundWrapper
      id="problem"
      variant="light"
      className="section"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#988AD5]/10 text-[#6D3CA7] rounded-full mb-6">
              The Challenge
            </span>
            <h2 
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Mental Health Care is Broken
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Traditional solutions fail to meet modern needs, leaving critical gaps in care.
            </p>
          </div>
        }
      >
        <div className="h-full w-full p-6 md:p-8 flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
            {PROBLEM_STATS.map((stat, index) => {
              // Map colors to Thrive brand colors
              const bgColor = 
                stat.color === 'red' ? 'rgba(109, 60, 167, 0.08)' : // Use thrive-purple with low opacity
                stat.color === 'amber' ? 'rgba(52, 98, 174, 0.08)' : // Use thrive-blue with low opacity
                stat.color === 'blue' ? 'rgba(109, 236, 249, 0.08)' : // Use thrive-teal with low opacity
                'rgba(152, 138, 213, 0.08)'; // Use thrive-purple-light with low opacity
              
              const textColor = 
                stat.color === 'red' ? '#6D3CA7' : // thrive-purple
                stat.color === 'amber' ? '#3462AE' : // thrive-blue
                stat.color === 'blue' ? '#4F3C91' : // thrive-purple-dark
                '#988AD5'; // thrive-purple-light
              
              const borderVariant = 
                stat.color === 'red' ? 'primary' :
                stat.color === 'amber' ? 'secondary' :
                stat.color === 'blue' ? 'accent' :
                'light';
              
              return (
                <GradientCard
                  key={index}
                  bgVariant="light"
                  borderVariant={borderVariant as any}
                  className="p-6 flex flex-col items-center justify-center text-center"
                >
                  <div 
                    className="mb-3 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: bgColor }}
                  >
                    <FeatureIcon 
                      icon={stat.icon} 
                      color={stat.color} 
                      className="text-2xl" 
                    />
                  </div>
                  <h3 
                    className="text-4xl font-bold mb-2"
                    style={{ color: textColor }}
                  >
                    {stat.percentage}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.description}</p>
                </GradientCard>
              );
            })}
          </div>
        </div>
      </ContainerScroll>
      
      <div 
        ref={ctaRef}
        className="text-center max-w-4xl mx-auto px-6 pb-10"
      >
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Healthcare providers and employers struggle to deliver effective mental health support at scale.
        </p>
      </div>
      
      {/* Transition to Solution Section */}
      <div 
        ref={transitionRef}
        className="w-full py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
              The Future of Mental Health
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Discover how Thrive360 is changing the game
            </h3>
          </div>
          
          <GridScrollTransition columnsSmall={2} columnsLarge={4} gridClassName="gap-6 md:gap-8 mb-12">
            <div className="transition-item h-64 rounded-xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(to bottom right, #8776D5, #6D3CA7)' }}>
              <div className="p-4 h-full flex flex-col justify-end text-white">
                <h4 className="font-bold text-lg mb-1">AI-Driven</h4>
                <p className="text-sm opacity-90">Personalized mental health at scale</p>
              </div>
            </div>
            
            <div className="transition-item h-64 rounded-xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(to bottom right, #3462AE, #1E3A8A)' }}>
              <div className="p-4 h-full flex flex-col justify-end text-white">
                <h4 className="font-bold text-lg mb-1">Neuroplastic</h4>
                <p className="text-sm opacity-90">Evidence-based techniques</p>
              </div>
            </div>
            
            <div className="transition-item h-64 rounded-xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(to bottom right, #6DECF9, #3462AE)' }}>
              <div className="p-4 h-full flex flex-col justify-end text-white">
                <h4 className="font-bold text-lg mb-1">Engaging</h4>
                <p className="text-sm opacity-90">80% completion rates</p>
              </div>
            </div>
            
            <div className="transition-item h-64 rounded-xl overflow-hidden shadow-lg" style={{ background: 'linear-gradient(to bottom right, #F5F2FF, #988AD5)' }}>
              <div className="p-4 h-full flex flex-col justify-end text-gray-900">
                <h4 className="font-bold text-lg mb-1">Measurable</h4>
                <p className="text-sm opacity-90">Real impact tracking</p>
              </div>
            </div>
          </GridScrollTransition>
          
          <div className="text-center mt-8">
            <SectionScrollLink
              sourceId="problem"
              targetId="solution"
              direction="down"
              className="inline-block"
            >
              See the solution
            </SectionScrollLink>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ProblemSection;
