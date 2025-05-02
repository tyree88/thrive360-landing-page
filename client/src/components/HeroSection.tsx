import React, { useEffect, useRef, useState } from 'react';
import { ROUTES } from '@/lib/constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import AnimatedButton from '@/components/ui/animated-button';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import { Spotlight, GridBackground } from '@/components/ui/spotlight';
import { ScrollAndSwapText } from '@/components/ui/scroll-and-swap-text';
import ParallaxShapes from '@/components/ui/parallax-shapes';
import SectionPinningAnimation from '@/components/ui/section-pinning-animation';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Define shapes for parallax background
const HERO_SHAPES = [
  {
    shape: 'blob',
    size: 15, 
    position: { top: '10%', left: '5%' },
    color: '#6D3CA7',
    depth: 0.3,
    opacity: 0.05
  },
  {
    shape: 'circle',
    size: 8,
    position: { top: '30%', right: '10%' },
    color: '#3462AE',
    depth: 0.2,
    opacity: 0.05
  },
  {
    shape: 'square',
    size: 12,
    position: { bottom: '15%', left: '15%' },
    color: '#988AD5',
    depth: 0.1,
    opacity: 0.04
  },
] as const;

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(ctaRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(trustRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8 },
      '-=0.1'
    );

  }, []);
  
  // Handle smooth scrolling for the text-swapping sections
  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;
    
    // Setup scroll trigger for the scroll sections
    const sections = sectionRef.current.querySelectorAll('.snap-section');
    const container = containerRef.current;
    
    // Setup GSAP ScrollTrigger for each section
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: 'top top',
        end: 'bottom top',
        snap: 1,
        scrub: 1,
      });
    });
    
    // Setup custom snap scrolling
    const smoothScroll = (e: WheelEvent) => {
      if (!containerRef.current) return;
      e.preventDefault();
      
      const scrollAmount = e.deltaY;
      const currentScroll = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Calculate the nearest snap point
      const snapPoints = Math.floor(sections.length);
      const currentSection = Math.round(currentScroll / containerHeight);
      let targetSection = currentSection;
      
      // Determine direction and target section
      if (scrollAmount > 0 && currentSection < snapPoints - 1) {
        targetSection = currentSection + 1;
      } else if (scrollAmount < 0 && currentSection > 0) {
        targetSection = currentSection - 1;
      }
      
      // Use GSAP to animate the scroll with easing
      gsap.to(container, {
        scrollTop: targetSection * containerHeight,
        duration: 0.8,
        ease: 'power2.out'
      });
    };
    
    // Add event listener for smooth scroll behavior
    container.addEventListener('wheel', smoothScroll, { passive: false });
    
    return () => {
      // Cleanup ScrollTrigger instances and event listeners
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      container.removeEventListener('wheel', smoothScroll);
    };
  }, []);

  // Simplified scroll handler for floating CTA
  useEffect(() => {
    const handleScroll = () => {
      const floatingCTA = document.getElementById('floatingCTA');
      if (!floatingCTA) return;
      
      if (window.scrollY > 500) {
        floatingCTA.classList.add('visible');
      } else {
        floatingCTA.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle scrolling from main hero to scroll text section
  const scrollToTextSection = () => {
    if (!heroSectionRef.current) return;
    
    // Use GSAP to animate scroll to the scroll section
    gsap.to(window, {
      scrollTo: {
        y: heroSectionRef.current,
        offsetY: 0
      },
      duration: 1.2,
      ease: 'power2.inOut'
    });
    
    // Set the active section to the first section
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setActiveSection(0);
    }
  };

  return (
    <BackgroundWrapper
      id="hero"
      variant="hero"
      className="section flex items-center justify-center overflow-hidden relative"
      showTransitionBottom={true}
    >
      {/* Add the spotlight and grid background effects */}
      <GridBackground />
      <Spotlight 
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(267, 42%, 70%, .15) 0, hsla(267, 42%, 45%, .08) 50%, hsla(267, 42%, 35%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(219, 53%, 70%, .12) 0, hsla(219, 53%, 44%, .05) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(186, 95%, 80%, .08) 0, hsla(186, 95%, 70%, .04) 80%, transparent 100%)"
      />
      
      {/* Add parallax shapes for depth */}
      <ParallaxShapes shapes={HERO_SHAPES} />
      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight mx-auto max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
        >
          Neuroscience-Driven<br />Mental Wellness<br />Platform
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
          Harness the power of neuroplasticity to transform employee well-being and performance
        </p>
        
        <div 
          ref={ctaRef}
          className="flex justify-center mt-12 mb-16"
        >
          <AnimatedButton 
            href={ROUTES.DEMO} 
            variant="gradient"
            size="lg"
            icon={<i className="fas fa-arrow-right"></i>}
            className="shadow-lg"
          >
            Experience Thrive360
          </AnimatedButton>
        </div>
        
        <div 
          ref={trustRef}
          className="mt-24 flex flex-col items-center relative"
        >
          {/* Scroll down indicator */}
          <div 
            className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity animate-bounce"
            onClick={scrollToTextSection}
          >
            <div className="flex flex-col items-center">
              <span className="text-gray-400 text-sm mb-2">Scroll to learn more</span>
              <div className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <i className="fas fa-angle-down text-gray-400"></i>
              </div>
            </div>
          </div>
          <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider">Trusted by leading organizations</p>
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-y-4">
            {/* Company icons with Font Awesome */}
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-amazon fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-google fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-microsoft fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fab fa-apple fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fas fa-hospital fa-2x"></i>
            </div>
            <div className="h-10 w-24 opacity-80 flex items-center justify-center text-white">
              <i className="fas fa-university fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll and swap text section */}
      <div 
        className="w-full h-screen bg-gradient-to-b from-thrive-purple-darker to-thrive-purple-dark overflow-hidden mt-16"
        ref={heroSectionRef}
      >
        <div 
          ref={containerRef}
          className="w-full h-screen overflow-auto snap-y snap-mandatory relative hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          <div 
            ref={sectionRef}
            className="w-full flex flex-col"
          >
            {/* First section */}
            <div className="h-screen w-full flex items-center justify-center snap-start snap-section">
              <div className="text-center max-w-3xl mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  <ScrollAndSwapText
                    label="Your wellbeing solutions aren't cutting it."
                    offset={["0 0.1", "0 0.3"]}
                    className="font-bold"
                    containerRef={containerRef}
                  />
                </h2>
                <p className="text-xl text-gray-300">
                  Scroll to discover why most solutions fail and how Thrive360 is different.
                </p>
              </div>
            </div>
            
            {/* Second section - Stat 1 */}
            <div className="h-screen w-full flex items-center justify-center snap-start snap-section bg-gradient-to-br from-thrive-purple-dark to-thrive-purple">
              <div className="text-center max-w-3xl mx-auto px-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-heart-broken text-3xl text-white"></i>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  <ScrollAndSwapText
                    label="76% of employees experience burnout"
                    offset={["0 0.1", "0 0.3"]}
                    className="font-bold"
                    containerRef={containerRef}
                  />
                </h2>
                <p className="text-xl text-gray-300">
                  Traditional wellness programs aren't designed to address the root cause of mental health challenges.
                </p>
              </div>
            </div>
            
            {/* Third section - Stat 2 */}
            <div className="h-screen w-full flex items-center justify-center snap-start snap-section bg-gradient-to-br from-thrive-purple to-thrive-blue">
              <div className="text-center max-w-3xl mx-auto px-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-chart-line text-3xl text-white"></i>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  <ScrollAndSwapText
                    label="91% of programs lack measurable outcomes"
                    offset={["0 0.1", "0 0.3"]}
                    className="font-bold"
                    containerRef={containerRef}
                  />
                </h2>
                <p className="text-xl text-gray-300">
                  Most solutions can't demonstrate real, measurable improvements in mental health and performance.
                </p>
              </div>
            </div>
            
            {/* Fourth section - Stat 3 */}
            <div className="h-screen w-full flex items-center justify-center snap-start snap-section bg-gradient-to-br from-thrive-blue to-thrive-teal">
              <div className="text-center max-w-3xl mx-auto px-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                    <i className="fas fa-brain text-3xl text-white"></i>
                  </div>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  <ScrollAndSwapText
                    label="Thrive360 delivers 83% engagement"
                    offset={["0 0.1", "0 0.3"]}
                    className="font-bold"
                    containerRef={containerRef}
                  />
                </h2>
                <p className="text-xl text-gray-300">
                  Our neuroplastic approach creates lasting change through personalized, science-backed interventions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default HeroSection;
