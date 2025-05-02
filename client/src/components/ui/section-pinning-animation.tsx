import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface SectionPinningAnimationProps {
  children: React.ReactNode;
  backgroundClassName?: string;
  contentClassName?: string;
  pinDuration?: number; // Duration of the pinned section as a percentage of scroll (e.g., 100 = 100% of viewport height)
  topSpacing?: number; // Space from the top of the viewport when pinned (in pixels)
  startTrigger?: string; // CSS selector for starting the pin
  endTrigger?: string; // CSS selector for ending the pin
}

/**
 * Component that pins a section in place while the user scrolls,
 * creating a focused area for storytelling with staggered reveals.
 */
const SectionPinningAnimation: React.FC<SectionPinningAnimationProps> = ({
  children,
  backgroundClassName = '',
  contentClassName = '',
  pinDuration = 100,
  topSpacing = 0,
  startTrigger,
  endTrigger
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  useEffect(() => {
    if (!sectionRef.current || hasInitialized) return;
    
    // Create the ScrollTrigger for pinning the section
    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: startTrigger || 'top top+='+topSpacing,
      end: endTrigger || `+=${pinDuration}%`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: true,
    });
    
    setHasInitialized(true);
    
    return () => {
      // Clean up the ScrollTrigger
      pinTrigger.kill();
    };
  }, [hasInitialized, pinDuration, topSpacing, startTrigger, endTrigger]);
  
  return (
    <div 
      ref={sectionRef}
      className={`section-pinning-animation relative ${backgroundClassName}`}
    >
      <div 
        ref={contentRef}
        className={`section-pinning-content ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionPinningAnimation;
