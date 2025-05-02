import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import JourneySection from '@/components/JourneySection';
import ImpactSection from '@/components/ImpactSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import useLenis from '@/hooks/useLenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const { lenis } = useLenis();
  
  useEffect(() => {
    // Initialize and sync Lenis with ScrollTrigger
    if (lenis && !prefersReducedMotion()) {
      // Update ScrollTrigger when Lenis scrolls
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });
      
      // Make ScrollTrigger use Lenis's scroll position
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
            height: window.innerHeight,
          };
        },
      });
      
      // On page reload, reset scroll position
      ScrollTrigger.refresh();
    }
    
    return () => {
      // Clean up scroll listeners when component unmounts
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [lenis]);
  
  // Register a global handler for all anchor links to use Lenis for smooth scrolling
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.pathname === window.location.pathname) {
        e.preventDefault();
        
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement && lenis) {
          lenis.scrollTo(targetElement, {
            offset: -100,
            duration: 1.2,
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [lenis]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <JourneySection />
      <ImpactSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Home;
