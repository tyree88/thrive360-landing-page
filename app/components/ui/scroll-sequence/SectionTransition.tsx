'use client';

import React from 'react';

interface SectionTransitionProps {
  position: "top" | "bottom"
}

const SectionTransition = ({ position }: SectionTransitionProps) => {
  return (
    <div 
      className="w-full h-24 overflow-hidden z-10 pointer-events-none" 
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [position]: 0,
        transform: position === "bottom" ? "rotate(180deg)" : "rotate(0deg)"
      }}
    >
      <div 
        className="w-full h-full" 
        style={{
          background: `linear-gradient(to bottom, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.8) 50%, 
            rgba(255, 255, 255, 1) 100%)`
        }}
      />
    </div>
  );
};

export default SectionTransition;