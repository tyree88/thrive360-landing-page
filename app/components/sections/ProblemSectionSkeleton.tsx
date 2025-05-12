'use client';

import { Skeleton, ProblemCardSkeleton, TextSkeleton } from "@/components/ui/skeleton";
import BackgroundWrapper from "@/components/ui/background-wrapper";

/**
 * Skeleton loader specifically designed for the ProblemSection
 * Mimics the exact structure and appearance of the actual problem section
 */
export default function ProblemSectionSkeleton() {
  return (
    <BackgroundWrapper
      id="problem-skeleton"
      variant="dark"
      className="section"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <section className="min-h-screen">
        {/* Section Header Skeleton */}
        <div className="text-center py-16">
          <Skeleton
            className="mx-auto mb-6"
            width="8rem"
            height="1.5rem"
          />
          <Skeleton
            className="mx-auto mb-4"
            width="22rem"
            height="3.5rem"
          />
          <Skeleton
            className="mx-auto"
            width="32rem"
            height="1.5rem"
            animate={true}
          />
        </div>
        
        {/* Mask Container */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="overflow-hidden w-full transition-all duration-300 mx-auto">
            {/* Card Strip - Horizontal Cards */}
            <div className="flex flex-row flex-nowrap lg:gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={index} 
                  className="problem-card flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/4 min-w-full md:min-w-[50%] lg:min-w-[25%] p-4"
                >
                  <div className="bg-[#0a0f1e] backdrop-blur-md rounded-xl shadow-lg p-8 h-full border border-indigo-500/20">
                    {/* Title Skeleton - Gradient Effect */}
                    <div className="relative mb-4">
                      <Skeleton
                        className="mb-4"
                        height="2.5rem" 
                        width="70%"
                      />
                      {/* Gradient overlay for title */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-indigo-500/30 rounded-md opacity-50"></div>
                    </div>
                    
                    {/* Description Skeleton */}
                    <TextSkeleton
                      className="mb-6"
                      lines={2}
                    />
                    
                    {/* Sub-cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
                        <Skeleton
                          className="mb-2"
                          height="1.5rem"
                          width="60%"
                        />
                        <TextSkeleton
                          lines={2}
                          lineHeight="0.75rem"
                          lastLineWidth="90%"
                        />
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
                        <Skeleton
                          className="mb-2"
                          height="1.5rem"
                          width="70%"
                        />
                        <TextSkeleton
                          lines={2}
                          lineHeight="0.75rem"
                          lastLineWidth="80%"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Pills Skeleton */}
          <div className="flex justify-center mt-8 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="rounded-full"
                width={i === 0 ? "3rem" : "1rem"}
                height="0.5rem"
              />
            ))}
          </div>
        </div>
        
        {/* Light Pulse Animation Effect */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20 mix-blend-overlay">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] animate-pulse-slow">
            <div className="absolute inset-0 bg-gradient-radial from-indigo-500/20 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>
    </BackgroundWrapper>
  );
}