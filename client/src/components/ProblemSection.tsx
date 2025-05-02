import React, { useRef } from 'react';
import { FeatureIcon } from '@/assets/icons';
import { PROBLEM_STATS, ROUTES } from '@/lib/constants';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import AnimatedButton from '@/components/ui/animated-button';

const ProblemSection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="problem" 
      className="section relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #F5F2FF, #FFF, #F5F2FF)"
      }}
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
              
              return (
                <div 
                  key={index}
                  className="problem-stat p-6 bg-white rounded-2xl shadow-lg border border-[#988AD5]/20 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(to bottom, #ffffff, #f8f5ff)",
                  }}
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
                </div>
              );
            })}
          </div>
        </div>
      </ContainerScroll>
      
      <div 
        ref={ctaRef}
        className="text-center max-w-4xl mx-auto px-6 pb-20"
      >
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Healthcare providers and employers struggle to deliver effective mental health support at scale.
        </p>
        <AnimatedButton 
          href={ROUTES.SOLUTION} 
          variant="gradient"
          size="lg"
          icon={<i className="fas fa-arrow-right"></i>}
          className="shadow-md"
        >
          See the Solution
        </AnimatedButton>
      </div>
    </section>
  );
};

export default ProblemSection;
