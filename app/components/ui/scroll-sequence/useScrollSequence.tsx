import { useRef, useState, useEffect } from 'react';
import { useAnimation } from '@/context/AnimationContext';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ScrollSequenceSection } from './types';

// Define the return type interface
interface UseScrollSequenceResult {
  containerRef: React.RefObject<HTMLDivElement>;
  bgRef: React.RefObject<HTMLDivElement>;
  titleRef: React.RefObject<HTMLDivElement>;
  phoneRef: React.RefObject<HTMLDivElement>;
  leftContainerRef: React.RefObject<HTMLDivElement>;
  rightContainerRef: React.RefObject<HTMLDivElement>;
  contentContainerRef: React.RefObject<HTMLDivElement>;
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  activeIndex: number;
  progress: number;
  prefersReducedMotion: boolean;
}

export const useScrollSequence = (sections: ScrollSequenceSection[]): UseScrollSequenceResult => {
  // Refs for all the elements we need to animate
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State for animation
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Get animation context and reduced motion preference
  const { gsap, ScrollTrigger, registerScrollTrigger } = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return {
      containerRef,
      bgRef,
      titleRef,
      phoneRef,
      leftContainerRef,
      rightContainerRef,
      contentContainerRef,
      sectionRefs,
      activeIndex: 0,
      progress: 0,
      prefersReducedMotion
    };
  }
  
  // Set up scroll-triggered animations
  useEffect(() => {
    if (!gsap || !ScrollTrigger || !containerRef.current) return;
    
    // Initialize section refs array
    sectionRefs.current = Array(sections.length).fill(null);
    
    const setupAnimation = () => {
      // Main scroll animation for the sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Update progress and active section
            setProgress(self.progress);
            
            // Calculate which section is active based on progress
            const sectionProgress = self.progress * sections.length;
            const newIndex = Math.min(
              Math.floor(sectionProgress),
              sections.length - 1
            );
            
            if (newIndex !== activeIndex) {
              setActiveIndex(newIndex);
              
              // Update background color
              if (bgRef.current && sections[newIndex]?.bgColor) {
                gsap.to(bgRef.current, {
                  backgroundColor: sections[newIndex].bgColor,
                  duration: 0.5,
                  ease: "power1.inOut"
                });
              }
            }
          }
        }
      });
      
      // Fade out title on scroll
      tl.to(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      }, 0);
      
      // Create animations for each section
      sections.forEach((_, index) => {
        const section = sectionRefs.current[index];
        if (!section) return;
        
        // For first section, fade in immediately
        if (index === 0) {
          tl.set(section, { opacity: 1 }, 0);
        }
        
        // Determine when this section should appear and disappear
        const startProgress = index / sections.length;
        const endProgress = (index + 1) / sections.length;
        
        // Fade in this section
        tl.fromTo(section, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power1.inOut" }, 
          startProgress
        );
        
        // Fade out this section (except for the last one)
        if (index < sections.length - 1) {
          tl.to(section, 
            { opacity: 0, y: -20, duration: 0.1, ease: "power1.inOut" }, 
            endProgress - 0.05
          );
        }
      });
      
      return tl;
    };
    
    // Register animation with the context
    registerScrollTrigger(setupAnimation);
    
    // Clean up
    return () => {
      const scrollTriggerInstance = ScrollTrigger.getById(containerRef.current?.id || "");
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, [gsap, ScrollTrigger, sections, activeIndex, registerScrollTrigger]);
  
  return {
    containerRef,
    bgRef,
    titleRef,
    phoneRef,
    leftContainerRef,
    rightContainerRef,
    contentContainerRef,
    sectionRefs,
    activeIndex,
    progress,
    prefersReducedMotion
  };
};