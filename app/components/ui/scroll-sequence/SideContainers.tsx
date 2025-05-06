'use client';

import React from 'react';

interface SideContainersProps {
  leftRef: React.RefObject<HTMLDivElement>
  rightRef: React.RefObject<HTMLDivElement>
}

/**
 * SideContainers - Decorative containers for the left and right sides of the scroll sequence
 * 
 * These elements are used to provide visual interest and depth to the animation.
 * They are animated in synchronization with the main scroll sequence.
 */
const SideContainers = ({
  leftRef,
  rightRef
}: SideContainersProps) => {
  return (
    <>
      {/* Left side container */}
      <div 
        ref={leftRef}
        className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-64 h-96 z-0"
      >
        <div className="relative h-full">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-16 h-16 bg-blue-100 rounded-lg opacity-70 transform rotate-12" />
          <div className="absolute top-16 left-8 w-20 h-20 bg-green-100 rounded-full opacity-60" />
          <div className="absolute bottom-24 left-4 w-24 h-12 bg-purple-100 rounded-lg opacity-75 transform -rotate-6" />
          <div className="absolute bottom-8 left-12 w-14 h-14 bg-yellow-100 rounded-lg opacity-65 transform rotate-45" />
        </div>
      </div>
      
      {/* Right side container */}
      <div 
        ref={rightRef}
        className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-64 h-96 z-0"
      >
        <div className="relative h-full">
          {/* Decorative elements - mirrored from left side */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-lg opacity-70 transform -rotate-12" />
          <div className="absolute top-16 right-8 w-20 h-20 bg-green-100 rounded-full opacity-60" />
          <div className="absolute bottom-24 right-4 w-24 h-12 bg-purple-100 rounded-lg opacity-75 transform rotate-6" />
          <div className="absolute bottom-8 right-12 w-14 h-14 bg-yellow-100 rounded-lg opacity-65 transform -rotate-45" />
        </div>
      </div>
    </>
  );
};

export default SideContainers;