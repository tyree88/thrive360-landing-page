import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { FeatureIcon } from '@/assets/icons';
import { PROBLEM_STATS, ROUTES } from '@/lib/constants';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import AnimatedButton from '@/components/ui/animated-button';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !statsRef.current || !containerRef.current) return;

    // Create main scroll trigger for pinning
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "50% 50%",
      end: "+=400%",
      pin: true,
      pinSpacing: true,
    });

    // Animate each stat card
    const stats = gsap.utils.toArray('.problem-stat');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top center",
        end: "+=300%",
        scrub: 1,
        snap: {
          snapTo: 1 / (stats.length - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0,
        },
      }
    });

    // Initial state for all stats
    gsap.set(stats, { autoAlpha: 0, scale: 0.8 });

    // Animate each stat sequentially
    stats.forEach((stat, index) => {
      tl.to(stat, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
      })
      .to(stat, {
        autoAlpha: index === stats.length - 1 ? 1 : 0.3,
        scale: index === stats.length - 1 ? 1 : 0.9,
      }, ">");
    });
  }, []);

  return (
    <BackgroundWrapper
      id="problem"
      variant="light"
      className="section"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="min-h-screen">
        <div ref={containerRef} className="h-full">
        <ContainerScroll
          titleComponent={
            <>
              <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#988AD5]/10 text-[#6D3CA7] rounded-full mb-6">
                The Challenge
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Mental Health Care is Broken
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Traditional solutions fail to meet modern needs, leaving critical gaps in care.
              </p>
            </>
          }
        >
          <div ref={statsRef} className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROBLEM_STATS.map((stat, index) => (
                <div
                  key={index}
                  className="problem-stat p-6 flex flex-col items-center justify-center text-center bg-white rounded-xl shadow-lg border border-gray-100"
                >
                  <div 
                    className="mb-3 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `rgba(109,60,167,0.08)` }}
                  >
                    <FeatureIcon 
                      icon={stat.icon} 
                      color={stat.color} 
                      className="text-2xl" 
                    />
                  </div>
                  <h3 
                    className="text-4xl font-bold mb-2"
                    style={{ color: `rgba(109,60,167,0.8)` }}
                  >
                    {stat.percentage}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ContainerScroll>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default ProblemSection;