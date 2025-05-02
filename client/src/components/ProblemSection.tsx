import React, { useRef } from 'react';
import { FeatureIcon } from '@/assets/icons';
import { PROBLEM_STATS, ROUTES } from '@/lib/constants';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

const ProblemSection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="problem" 
      className="section bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
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
            {PROBLEM_STATS.map((stat, index) => (
              <div 
                key={index}
                className="problem-stat p-6 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center text-center transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-3 w-16 h-16 rounded-full flex items-center justify-center bg-opacity-20"
                  style={{
                    backgroundColor: 
                      stat.color === 'red' ? 'rgba(239, 68, 68, 0.15)' :
                      stat.color === 'amber' ? 'rgba(245, 158, 11, 0.15)' :
                      stat.color === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
                      'rgba(139, 92, 246, 0.15)' // purple default
                  }}
                >
                  <FeatureIcon 
                    icon={stat.icon} 
                    color={stat.color} 
                    className="text-2xl" 
                  />
                </div>
                <h3 className="text-4xl font-bold mb-2"
                  style={{
                    color: 
                      stat.color === 'red' ? 'rgb(220, 38, 38)' :
                      stat.color === 'amber' ? 'rgb(217, 119, 6)' :
                      stat.color === 'blue' ? 'rgb(37, 99, 235)' :
                      'rgb(109, 40, 217)' // purple default
                  }}
                >
                  {stat.percentage}
                </h3>
                <p className="text-gray-600 text-lg">{stat.description}</p>
              </div>
            ))}
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
        <a 
          href={ROUTES.SOLUTION} 
          className="inline-flex items-center px-6 py-3 bg-thrive-purple-500 text-white rounded-full text-lg font-medium hover:bg-thrive-purple-600 transition-colors shadow-md"
        >
          See the Solution
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </section>
  );
};

export default ProblemSection;
