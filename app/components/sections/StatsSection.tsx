'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faUserTimes, faHeartbeat, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { WELLNESS_STATS } from '@/lib/constants';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import AnimatedButton from '@/components/ui/animated-button';

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <BackgroundWrapper
      id="stats"
      variant="dark"
      className="section relative py-24 px-6 overflow-hidden"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="w-full">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full mb-4">
              By The Numbers
            </span>
            <h2 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              The State of Workplace Wellbeing
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The data highlights why traditional approaches to employee wellness fall short
            </p>
          </div>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16"
          >
            {WELLNESS_STATS.map((stat) => (
              <div 
                key={stat.id}
                className="stat-item bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 transform transition-all hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex flex-col gap-6 h-full">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-thrive-purple-500 to-thrive-blue-500 text-white">
                      <FontAwesomeIcon icon={
                        stat.icon === 'brain' ? faBrain : 
                        stat.icon === 'user-times' ? faUserTimes : 
                        stat.icon === 'heartbeat' ? faHeartbeat : 
                        faDollarSign
                      } size="lg" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 
                      className="stat-value text-4xl md:text-5xl font-bold mb-4 text-white"
                    >
                      {stat.value}{stat.unit}
                    </h3>
                    <p className="stat-text text-lg md:text-xl text-white/80">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Traditional wellness programs fail to address these challenges, 
              resulting in low engagement and minimal impact on employee wellbeing.
            </p>
            <AnimatedButton 
              href="#solution" 
              variant="gradient"
              size="lg"
            >
              Discover Our Solution
            </AnimatedButton>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
}