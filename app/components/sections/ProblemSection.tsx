'use client';

import React, { useRef, useState, useEffect } from 'react';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLenis } from '@/hooks/useLenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

// Problem cards data focused on digital experience challenges
const problemCards = [
  {
    id: "engagement",
    title: "Lack of Engagement",
    description: "Traditional digital experiences fail to capture and maintain user attention in today's fast-paced world.",
    impact: "High bounce rates and low time-on-site metrics, resulting in missed conversion opportunities.",
    solution: "Interactive, personalized experiences that adapt to user behavior and preferences.",
  },
  {
    id: "conversion",
    title: "Poor Conversion Rates",
    description: "Many websites struggle with converting visitors into customers due to confusing user journeys and calls-to-action.",
    impact: "Wasted marketing spend and unrealized revenue potential from existing traffic.",
    solution: "Streamlined user journeys with clear, compelling CTAs and reduced friction points.",
  },
  {
    id: "branding",
    title: "Inconsistent Branding",
    description: "Disjointed visual elements and messaging create a fragmented brand experience across different platforms.",
    impact: "Reduced brand recognition and trust, leading to lower customer loyalty.",
    solution: "Unified design systems and messaging frameworks that maintain consistency across all touchpoints.",
  },
  {
    id: "performance",
    title: "Slow Performance",
    description: "Sluggish loading times and unoptimized assets lead to high bounce rates and frustrated users.",
    impact: "Each second of delay can reduce conversions by up to 7% and damage SEO rankings.",
    solution: "Performance optimization techniques, asset compression, and modern delivery methods."
  }
];

const ProblemSection: React.FC = () => {
  // Refs for animation targets
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const navPillsRef = useRef<HTMLDivElement>(null);
  
  // State for current active card and viewport size
  const [activeCard, setActiveCard] = useState(0);
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [gsapAvailable, setGsapAvailable] = useState(true);
  
  // Get Lenis smooth scroll instance
  const { lenis } = useLenis();

  // Check viewport size on mount and resize
  useEffect(() => {
    // Initial check
    checkViewport();
    
    // Add resize listener
    window.addEventListener('resize', checkViewport);
    
    // Check if libraries are available
    const checkLibs = () => {
      const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
      const hasLenis = !!lenis;
      
      setGsapAvailable(hasGsap && hasLenis);
    };
    
    checkLibs();
    
    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, [lenis]);

  // Determine viewport size for responsive behavior
  const checkViewport = () => {
    if (window.innerWidth >= 768) {
      setViewportSize('desktop');
    } else if (window.innerWidth >= 640) {
      setViewportSize('tablet');
    } else {
      setViewportSize('mobile');
    }
  };

  // Handle navigation pill clicks
  const handleNavClick = (index: number) => {
    if (!lenis || !sectionRef.current) return;
    
    const scrollTrigger = ScrollTrigger.getById("problemScroll");
    if (scrollTrigger) {
      // Calculate the target position based on progress
      const progress = index / (problemCards.length - 1); // 0, 1/3, 2/3, 1
      
      // Use ScrollTrigger's scroll method to jump to position
      const start = scrollTrigger.start as number;
      const end = scrollTrigger.end as number;
      scrollTrigger.scroll(start + (end - start) * progress);
    }
    
    setActiveCard(index);
  };

  // Set up the horizontal reveal animation
  useScrollAnimation(() => {
    if (!sectionRef.current || !maskRef.current || !stripRef.current || !lenis) return;
    
    // Set up ScrollTrigger to work with Lenis
    function setupScrollerProxy() {
      // Tell ScrollTrigger to use these proxy methods for the element instead of scroll/getBoundingClientRect
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value);
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0, 
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        pinType: "transform"
      });

      // Each time Lenis updates, tell ScrollTrigger to update too
      lenis.on('scroll', ScrollTrigger.update);
    }
    
    setupScrollerProxy();
    
    // Ensure dimensions are correct
    ScrollTrigger.refresh();
    
    // Calculate number of cards and snap points
    const numCards = problemCards.length;
    const snapPoints = Array.from({ length: numCards }, (_, i) => i / (numCards - 1));
    
    // Apply responsive styles based on viewport size
    if (viewportSize === 'desktop') {
      // Desktop: mask starts at 25%, expands to 100%
      gsap.set(maskRef.current, { width: "25%" });
      
      // Cards each take percentage based on number of cards
      const cardWidth = `${100 / numCards}%`;
      gsap.utils.toArray('.problem-card').forEach(card => {
        gsap.set(card, { 
          flexBasis: cardWidth, 
          minWidth: cardWidth, 
          maxWidth: cardWidth 
        });
      });
    } 
    else if (viewportSize === 'tablet') {
      // Tablet: mask starts at 50%, expands to 100%
      gsap.set(maskRef.current, { width: "50%" });
      
      // Cards each take 50% width
      gsap.utils.toArray('.problem-card').forEach(card => {
        gsap.set(card, { 
          flexBasis: "50%", 
          minWidth: "50%", 
          maxWidth: "50%" 
        });
      });
    }
    else {
      // Mobile: disable horizontal animation
      gsap.set(maskRef.current, { 
        width: "100%",
        height: "auto",
        overflow: "visible"
      });
      
      gsap.set(stripRef.current, {
        display: "block",
        width: "100%"
      });
      
      gsap.utils.toArray('.problem-card').forEach(card => {
        gsap.set(card, { 
          flexBasis: "100%", 
          minWidth: "100%", 
          maxWidth: "100%"
        });
      });
    }
    
    // Create the main pinning and animation
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "problemScroll",
        trigger: sectionRef.current,
        start: "top top", // Start at the top of the section
        end: "+=300%", // Pin for 3 more viewport heights
        pin: true,
        pinSpacing: true,
        scrub: 1, // Smooth scrubbing effect
        snap: {
          snapTo: snapPoints, // Snap to calculated points
          duration: {min: 0.2, max: 0.3}, // Snap duration
          delay: 0
        },
        onUpdate: (self) => {
          // Update active card based on progress
          const progress = self.progress;
          // Calculate which card should be active based on progress
          const newActiveCard = Math.min(
            numCards - 1, 
            Math.floor(progress * numCards * (1 + 0.001)) // Small buffer to handle edge cases
          );
          
          if (newActiveCard !== activeCard) {
            setActiveCard(newActiveCard);
          }
        }
      }
    });
    
    // Different animations based on viewport size
    if (viewportSize === 'desktop') {
      // Calculate movement distance - for 4 cards would be 75%
      const moveDistancePercent = ((numCards - 1) / numCards) * 100;
      
      // Desktop: Expand mask from 25% to 100%
      tl.to(maskRef.current, {
        width: "100%",
        ease: "none"
      }, 0);
      
      // Move the strip to reveal new cards
      tl.to(stripRef.current, {
        x: `-${moveDistancePercent}%`, // Move to reveal all cards
        ease: "none"
      }, 0);
    } 
    else if (viewportSize === 'tablet') {
      // For tablet, determine how many "pages" of cards we need
      const numPages = Math.ceil(numCards / 2);
      const moveDistancePercent = ((numPages - 1) / numPages) * 100;
      
      // Tablet: Expand mask from 50% to 100%
      tl.to(maskRef.current, {
        width: "100%",
        ease: "none"
      }, 0);
      
      // Move the strip to reveal all cards
      tl.to(stripRef.current, {
        x: `-${moveDistancePercent}%`,
        ease: "none"
      }, 0);
    }
    else {
      // Mobile: Animate cards sequentially
      const cards = gsap.utils.toArray('.problem-card');
      
      // Set initial state
      gsap.set(cards, {
        opacity: 0,
        y: 50
      });
      
      // Animate each card
      cards.forEach((card, i) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }, i * 0.3);
        
        // Fade out previous cards slightly
        if (i > 0) {
          tl.to(cards[i-1], {
            opacity: 0.7,
            scale: 0.95,
          }, i * 0.3);
        }
      });
    }
    
    // Add performance hints
    if (maskRef.current) {
      maskRef.current.style.willChange = 'width';
    }
    
    if (stripRef.current) {
      stripRef.current.style.willChange = 'transform';
    }
    
    // Clean up
    return () => {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Remove Lenis listener
      lenis.off('scroll', ScrollTrigger.update);
      
      // Clear will-change hints
      if (maskRef.current) {
        maskRef.current.style.willChange = 'auto';
      }
      
      if (stripRef.current) {
        stripRef.current.style.willChange = 'auto';
      }
    };
  }, [lenis, viewportSize, activeCard]);

  // Add keyboard navigation for accessibility
  useEffect(() => {
    const navPills = navPillsRef.current?.querySelectorAll('button');
    if (!navPills || navPills.length === 0) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (activeCard + 1) % problemCards.length;
        handleNavClick(nextIndex);
        (navPills[nextIndex] as HTMLElement).focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (activeCard - 1 + problemCards.length) % problemCards.length;
        handleNavClick(prevIndex);
        (navPills[prevIndex] as HTMLElement).focus();
      }
    };
    
    navPills.forEach(pill => {
      pill.addEventListener('keydown', handleKeyDown);
    });
    
    return () => {
      navPills.forEach(pill => {
        pill.removeEventListener('keydown', handleKeyDown);
      });
    };
  }, [activeCard]);

  // Add screen reader announcements
  useEffect(() => {
    // Create announcer element for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only'); // Screen reader only
    document.body.appendChild(announcer);
    
    // Announce the current card
    const card = problemCards[activeCard];
    announcer.textContent = `Showing problem ${activeCard + 1} of ${problemCards.length}: ${card.title} - ${card.description}`;
    
    return () => {
      document.body.removeChild(announcer);
    };
  }, [activeCard]);

  // The main component render
  return (
    <BackgroundWrapper
      id="problem"
      variant="dark"
      className="section"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      {gsapAvailable ? (
        // Main section with horizontal reveal
        <section ref={sectionRef} className="min-h-screen">
          {/* Section Header */}
          <div className="text-center py-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-white/10 text-pink-300 rounded-full mb-6">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
              Problems We Solve
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Identifying the key challenges in modern digital experiences
            </p>
          </div>
          
          {/* Mask Container */}
          <div className="relative max-w-7xl mx-auto px-4">
            <div 
              ref={maskRef} 
              className="overflow-hidden w-1/4 transition-all duration-300 mx-auto"
              aria-live="polite"
            >
              {/* Card Strip */}
              <div
                ref={stripRef}
                className="flex flex-row flex-nowrap w-[400%] will-change-transform"
              >
                {/* Problem Cards */}
                {problemCards.map((card, index) => (
                  <article 
                    key={index} 
                    className="problem-card flex-shrink-0 flex-grow-0 basis-1/4 min-w-[25%] max-w-[25%] p-6"
                    id={`problem-card-${index}`}
                    aria-hidden={activeCard !== index}
                  >
                    {/* Card Content - Dark themed with gradient title */}
                    <div className="bg-[#0a0f1e] backdrop-blur-md rounded-xl shadow-lg p-8 h-full border border-indigo-500/20">
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400">
                        {card.title}
                      </h3>
                      <p className="text-slate-300 text-lg mb-6">{card.description}</p>
                      
                      {/* Sub-cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
                          <h4 className="text-xl font-semibold mb-2 text-pink-400">Impact</h4>
                          <p className="text-slate-300 text-sm">{card.impact}</p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
                          <h4 className="text-xl font-semibold mb-2 text-indigo-300">Solution Approach</h4>
                          <p className="text-slate-300 text-sm">{card.solution}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            
            {/* Navigation Pills */}
            <div ref={navPillsRef} className="flex justify-center mt-8 gap-3">
              {problemCards.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCard === index 
                      ? "w-12 bg-gradient-to-r from-pink-500 to-indigo-500" 
                      : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                  onClick={() => handleNavClick(index)}
                  aria-label={`View problem ${index + 1} of ${problemCards.length}`}
                  aria-current={activeCard === index}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        // Fallback vertical cards
        <section className="py-16">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-white/10 text-pink-300 rounded-full mb-6">
              The Challenge
            </span>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
              Problems We Solve
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Identifying the key challenges in modern digital experiences
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            {problemCards.map((card, index) => (
              <div key={index} className="bg-[#0a0f1e] rounded-xl shadow-lg p-8 border border-indigo-500/20">
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-lg mb-6">{card.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
                    <h4 className="text-xl font-semibold mb-2 text-pink-400">Impact</h4>
                    <p className="text-slate-300 text-sm">{card.impact}</p>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
                    <h4 className="text-xl font-semibold mb-2 text-indigo-300">Solution Approach</h4>
                    <p className="text-slate-300 text-sm">{card.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Custom CSS for visual effects */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </BackgroundWrapper>
  );
};

export default ProblemSection;

export default ProblemSection;