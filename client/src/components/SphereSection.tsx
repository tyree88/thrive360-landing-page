import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SphereSectionProps {
  children: React.ReactNode;
}

const SphereSection: React.FC<SphereSectionProps> = ({ children }) => {
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
  const sphereYEnd = typeof window !== 'undefined' ? window.innerHeight * 8 : 6000;

  const sphereY = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 1],
    [sphereYInitial, sphereYOnTrack, sphereYOnTrack, sphereYEnd]
  );

  const sphereX = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 0.30, 0.45, 0.60, 0.75, 0.9, 1],
    [0, 0, -45, 45, -45, 45, -45, 45, 0].map(vw => 
      typeof window !== 'undefined' ? window.innerWidth * (vw / 100) : 0
    )
  );

  const sphereScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.2, 1],
    [1, 1, 5, 1, 1]
  );

  const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 };
  const sphereXSpring = useSpring(sphereX, springConfig);
  const sphereYSpring = useSpring(sphereY, springConfig);
  const sphereScaleSpring = useSpring(sphereScale, springConfig);

  const trackY = useTransform(sphereYSpring, y => y + sphereRadius + trackHeight / 2);

  useEffect(() => {
    try {
      if (!containerRef.current || !sphereRef.current) return;

      // Create ScrollTrigger for sphere visibility
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (sphereRef.current) {
            sphereRef.current.style.opacity = String(1 - Math.abs(self.getVelocity()) / 2000);
          }
        }
      });

    } catch (error) {
      console.error('Error setting up ScrollTrigger:', error);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <motion.div 
        ref={bgRef}
        className="fixed inset-0 w-full h-screen -z-10 bg-gradient-to-b from-thrive-purple-darker/95 via-thrive-purple/90 to-thrive-blue-light/85"
        style={{
          backgroundBlendMode: 'overlay',
        }}
      />

      <motion.div 
        className="fixed left-0 w-full h-4 bg-gradient-to-r from-thrive-purple-light via-thrive-purple to-thrive-blue rounded-full transform -translate-y-1/2"
        style={{ 
          opacity: 0.4,
          zIndex: 1,
          y: trackY
        }} 
      />

      <motion.div 
        ref={sphereRef}
        className="fixed top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-white via-thrive-purple-light to-thrive-purple shadow-[0_0_100px_50px_rgba(255,255,255,0.7)] transform -translate-x-1/2 -translate-y-1/2 mix-blend-plus-lighter"
        style={{ 
          x: sphereXSpring,
          y: sphereYSpring,
          scale: sphereScaleSpring,
          zIndex: 5
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SphereSection;