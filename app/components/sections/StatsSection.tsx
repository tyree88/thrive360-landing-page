'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faUserTimes, faHeartbeat, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { WELLNESS_STATS } from '@/lib/constants';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import AnimatedButton from '@/components/ui/animated-button';
import { useAnimation } from '@/context/AnimationContext';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import styles from './stats-section.module.css';

/**
 * StatsSection with card-by-card scroll animation
 * Each stat appears one at a time as the user scrolls
 * Creates a 3D deck-of-cards effect with progressive reveal
 */
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const progressIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Track animation state to avoid duplicate setup
  const [animationSetup, setAnimationSetup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollTimeline, setScrollTimeline] = useState<any>(null);
  
  // Access animation context and reduced motion preferences
  const { registerScrollTrigger, ScrollTrigger, gsap } = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  // TypeScript type for the ScrollTrigger onUpdate parameter
  interface ScrollTriggerInstance {
    progress: number;
    [key: string]: any;
  }

  // Setup the card-by-card scroll animation
  useEffect(() => {
    if (!sectionRef.current || !cardsContainerRef.current || animationSetup || typeof window === 'undefined') {
      return;
    }

    // Register the scroll animation with the animation context
    registerScrollTrigger(() => {
      const cards = cardRefs.current.filter(Boolean);
      const totalCards = WELLNESS_STATS.length;
      
      // Skip the advanced animation if user prefers reduced motion
      if (prefersReducedMotion) {
        // Simple fade-in animation for reduced motion preference
        cards.forEach((card, index) => {
          if (!card) return;
          
          gsap.fromTo(card, 
            { autoAlpha: 0, y: 20 }, 
            { 
              autoAlpha: 1, 
              y: 0, 
              duration: 0.3,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        });
        
        return;
      }
      
      // Create the pinned section for the card animations
      const pinDuration = totalCards;
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 10%',
          end: `+=${pinDuration * 100}%`,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self: ScrollTriggerInstance) => {
            // Update the active index based on scroll progress
            const newIndex = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1
            );
            
            if (newIndex !== activeIndex) {
              setActiveIndex(newIndex);
            }
            
            // Update progress indicator
            if (progressIndicatorRef.current) {
              gsap.to(progressIndicatorRef.current, {
                width: `${(self.progress * 100)}%`,
                duration: 0.1,
                ease: 'power1.out'
              });
            }
          }
        }
      });

      // Reset all cards to their initial state
      gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        autoAlpha: 0,
        scale: 0.8,
        rotationX: 10,
        transformOrigin: 'center center -50px',
        transformPerspective: 1000,
        ease: 'power2.out'
      });

      // Show the first card immediately
      gsap.set(cards[0], { autoAlpha: 1, scale: 1, rotationX: 0 });

      // Create animations for each card transition
      cards.forEach((card, index) => {
        if (!card || index === totalCards - 1) return;
        
        const nextCard = cards[index + 1];
        if (!nextCard) return;
        
        const cardTimeline = gsap.timeline();
        
        // Current card exits
        cardTimeline.to(card, {
          autoAlpha: 0,
          scale: 0.8,
          rotationX: -10,
          y: -50,
          duration: 0.5,
          ease: 'power2.in'
        }, 0);
        
        // Next card enters
        cardTimeline.fromTo(nextCard,
          { 
            autoAlpha: 0, 
            scale: 0.8, 
            rotationX: 10,
            y: 50 
          }, 
          { 
            autoAlpha: 1, 
            scale: 1, 
            rotationX: 0,
            y: 0,
            duration: 0.5,
            ease: 'power2.out' 
          }, 
          0.2 // Slight overlap for smoother transition
        );

        // Add the card animation to the master timeline
        masterTimeline.add(cardTimeline, index / totalCards);
      });
      
      // Animate statistical counters for each card
      cards.forEach((card, index) => {
        if (!card) return;
        
        const statValueEl = card.querySelector('.stat-value');
        if (!statValueEl) return;
        
        const stat = WELLNESS_STATS[index];
        const endValue = stat.value;
        const startValue = 0;
        
        // Create a proxy object to animate
        const proxy = { value: startValue };
        
        // Set up animation position in timeline
        const position = index / totalCards;
        
        // Create counter animation
        masterTimeline.to(proxy, { 
          value: endValue, 
          duration: 0.3, 
          ease: 'power2.out',
          onUpdate: function() {
            // Only update if this is the active card
            if (index === activeIndex) {
              const currentValue = Math.round(proxy.value);
              statValueEl.textContent = `${currentValue}${stat.unit}`;
            }
          },
          onStart: function() {
            // Reset to start value when animation begins
            if (index === activeIndex) {
              statValueEl.textContent = `${startValue}${stat.unit}`;
            }
          }
        }, position);
      });

      // Save the timeline reference for later use
      setScrollTimeline(masterTimeline);

      // Mark animation as setup
      setAnimationSetup(true);
    });
  }, [registerScrollTrigger, ScrollTrigger, gsap, prefersReducedMotion, activeIndex, animationSetup]);

  return (
    <BackgroundWrapper
      id="stats"
      variant="dark"
      className="section relative py-24 px-6 overflow-hidden"
      showTransitionTop={true}
      showTransitionBottom={true}
    >
      <div ref={sectionRef} className="w-full relative">
        {/* Fixed progress indicator */}
        <div className={styles.progressTrack}>
          <div 
            ref={progressIndicatorRef} 
            className={styles.progressBar}
          />
        </div>
        
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
          
          {/* 3D Card Container */}
          <div 
            ref={cardsContainerRef} 
            className={`relative h-[400px] md:h-[480px] mb-16 ${styles.perspective}`}
          >
            {WELLNESS_STATS.map((stat, index) => (
              <div 
                key={stat.id}
                ref={(el: HTMLDivElement | null) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className={`
                  ${styles.card} absolute top-0 left-0 w-full h-full
                  bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20
                  ${prefersReducedMotion ? 'transition-opacity transition-transform duration-300' : ''}
                  ${activeIndex === index ? 'z-10' : 'z-0'}
                `}
                style={{ 
                  opacity: activeIndex === index ? 1 : 0
                }}
              >
                <div className={`${styles.cardContent} flex flex-col md:flex-row gap-8 h-full items-center`}>
                  <div className="flex-shrink-0">
                    <div 
                      className={`${styles.cardIcon} w-24 h-24 flex items-center justify-center rounded-full
                      bg-gradient-to-br from-thrive-purple-500 to-thrive-blue-500 text-white shadow-lg`}
                    >
                      <FontAwesomeIcon icon={
                        stat.icon === 'brain' ? faBrain : 
                        stat.icon === 'user-times' ? faUserTimes : 
                        stat.icon === 'heartbeat' ? faHeartbeat : 
                        faDollarSign
                      } size="2x" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 
                      className={`${styles.cardValue} stat-value text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white`}
                      aria-live="polite"
                    >
                      {stat.value}{stat.unit}
                    </h3>
                    <p 
                      className={`${styles.cardText} stat-text text-xl md:text-2xl text-white/80`}
                      aria-live="polite"
                    >
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Card indicators */}
            <div className={styles.indicatorDots}>
              {WELLNESS_STATS.map((_, index) => (
                <div 
                  key={`indicator-${index}`}
                  className={`${styles.dot} ${activeIndex === index ? styles.dotActive : ''}`}
                  aria-label={`Statistic ${index + 1} of ${WELLNESS_STATS.length}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    // Update active index
                    setActiveIndex(index);
                    
                    // If we have a timeline reference, control it directly
                    if (scrollTimeline) {
                      // Calculate the progress needed for this card
                      const cardProgress = index / (WELLNESS_STATS.length - 1);
                      // Animate to the position with a smooth transition
                      gsap.to(scrollTimeline, {
                        progress: cardProgress,
                        duration: 0.5,
                        ease: 'power2.out'
                      });
                      
                      // Update progress bar
                      gsap.to(progressIndicatorRef.current, {
                        width: `${cardProgress * 100}%`,
                        duration: 0.5,
                        ease: 'power2.out'
                      });
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // Update active index
                      setActiveIndex(index);
                      
                      // If we have a timeline reference, control it directly
                      if (scrollTimeline) {
                        // Calculate the progress needed for this card
                        const cardProgress = index / (WELLNESS_STATS.length - 1);
                        // Animate to the position with a smooth transition
                        gsap.to(scrollTimeline, {
                          progress: cardProgress,
                          duration: 0.5,
                          ease: 'power2.out'
                        });
                        
                        // Update progress bar
                        gsap.to(progressIndicatorRef.current, {
                          width: `${cardProgress * 100}%`,
                          duration: 0.5,
                          ease: 'power2.out'
                        });
                      }
                    }
                  }}
                />
              ))}
            </div>
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