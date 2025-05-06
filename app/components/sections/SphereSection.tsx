'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useAnimation } from '@/context/AnimationContext';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface SphereSectionProps {
  children: React.ReactNode;
}

const SphereSection: React.FC<SphereSectionProps> = ({ children }) => {
  // Get animation context for optimized GSAP usage
  const { ScrollTrigger, registerScrollTrigger } = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  
  // State to handle window dimensions
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sphereRadius = 64;
  const trackHeight = 16;
  const sphereYInitial = -100;
  const sphereYOnTrack = 0;
  const sphereYEnd = windowDimensions.height * 8;

  // Animation values for the sphere movement
  const sphereY = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 1],
    [sphereYInitial, sphereYOnTrack, sphereYOnTrack, sphereYEnd]
  );

  // X-position values
  const xPercentages = [0, 0, -45, 45, -45, 45, -45, 45, 0];
  const xValues = xPercentages.map(percent => (percent / 100) * windowDimensions.width);
  
  const sphereX = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 0.30, 0.45, 0.60, 0.75, 0.9, 1],
    xValues
  );

  // Scale values with reduced motion consideration
  const sphereScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2, 1],
    [1, 1, prefersReducedMotion ? 2 : 5, 1, 1]
  );

  // Spring configuration for smoother animations
  const springConfig = { 
    stiffness: prefersReducedMotion ? 100 : 80, 
    damping: prefersReducedMotion ? 50 : 30, 
    restDelta: 0.001,
    mass: 0.8
  };
  
  // Apply springs to make movements smoother
  const sphereXSpring = useSpring(sphereX, springConfig);
  const sphereYSpring = useSpring(sphereY, springConfig);
  const sphereScaleSpring = useSpring(sphereScale, springConfig);

  // Derive track position from sphere position
  const trackY = useTransform(sphereYSpring, y => y + sphereRadius + trackHeight / 2);

  // Handle window resize and update animation values
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use ScrollTrigger through the centralized animation context
  useEffect(() => {
    // Register ScrollTrigger safely
    registerScrollTrigger(() => {
      if (!containerRef.current || !sphereRef.current) return;

      // Create ScrollTrigger for sphere visibility with optimized performance
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (sphereRef.current) {
            // Use requestAnimationFrame for smoother updates
            requestAnimationFrame(() => {
              const opacity = 1 - Math.min(1, Math.abs(self.getVelocity()) / 2000);
              sphereRef.current!.style.opacity = String(opacity);
            });
          }
        }
      });
      
      return () => {
        trigger.kill();
      };
    });
  }, [registerScrollTrigger, ScrollTrigger]);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <motion.div 
        ref={bgRef}
        className="fixed inset-0 w-full h-screen -z-10 bg-gradient-to-b from-thrive-purple-darker/95 via-thrive-purple/90 to-thrive-blue-light/85"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundBlendMode: 'overlay',
          willChange: 'opacity',
        }}
      />

      <motion.div 
        className="fixed left-0 w-full h-4 bg-gradient-to-r from-thrive-purple-light via-thrive-purple to-thrive-blue rounded-full transform -translate-y-1/2"
        style={{ 
          opacity: 0.4,
          zIndex: 1,
          y: trackY,
          willChange: 'transform'
        }} 
      />

      <motion.div 
        ref={sphereRef}
        className="fixed top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-white via-thrive-purple-light to-thrive-purple shadow-[0_0_100px_50px_rgba(255,255,255,0.7)] transform -translate-x-1/2 -translate-y-1/2 mix-blend-plus-lighter"
        style={{ 
          x: sphereXSpring,
          y: sphereYSpring,
          scale: sphereScaleSpring,
          zIndex: 5,
          willChange: 'transform, opacity'
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SphereSection;