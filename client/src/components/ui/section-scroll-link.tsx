import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { scrollToSection } from '@/lib/utils';

interface SectionScrollLinkProps {
  sourceId: string;
  targetId: string;
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  showArrow?: boolean;
}

const SectionScrollLink: React.FC<SectionScrollLinkProps> = ({
  sourceId,
  targetId,
  children,
  className = '',
  direction = 'down',
  showArrow = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollMotionValue = useMotionValue(scrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      let progress = (windowHeight - top) / (windowHeight + height);
      progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1
      
      setScrollProgress(progress);
      scrollMotionValue.set(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollMotionValue]);

  // Animation values based on scroll progress
  const opacity = useTransform(
    scrollMotionValue,
    [0, 0.7, 0.9],
    [0, 0.8, 1]
  );

  // Direction-based animations
  const getTransformValues = () => {
    switch (direction) {
      case 'up':
        return {
          initialY: 20,
          targetY: -5,
          arrowClass: 'fas fa-arrow-up'
        };
      case 'down':
        return {
          initialY: -20,
          targetY: 5,
          arrowClass: 'fas fa-arrow-down'
        };
      case 'left':
        return {
          initialX: 20,
          targetX: -5,
          arrowClass: 'fas fa-arrow-left'
        };
      case 'right':
        return {
          initialX: -20,
          targetX: 5,
          arrowClass: 'fas fa-arrow-right'
        };
      default:
        return {
          initialY: -20,
          targetY: 5,
          arrowClass: 'fas fa-arrow-down'
        };
    }
  };

  const { initialY = 0, targetY = 0, initialX = 0, targetX = 0, arrowClass } = getTransformValues();

  const y = useTransform(
    scrollMotionValue,
    [0.7, 0.9, 1],
    [initialY, targetY, targetY]
  );

  const x = useTransform(
    scrollMotionValue,
    [0.7, 0.9, 1],
    [initialX, targetX, targetX]
  );

  const scale = useTransform(
    scrollMotionValue,
    [0.7, 0.9, 1],
    [0.95, 1.05, 1]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <div ref={containerRef} className={`section-scroll-link relative ${className}`}>
      <motion.div
        style={{ opacity, y, x, scale }}
        className="transition-all duration-300 hover:scale-105"
      >
        <button 
          onClick={handleClick}
          className="flex flex-col items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full shadow-lg border border-white/30 text-thrive-purple-700 font-medium hover:bg-white/30 transition-colors"
          aria-label={`Scroll to ${targetId} section`}
        >
          {children}
          {showArrow && (
            <span className="text-sm opacity-70">
              <i className={arrowClass}></i>
            </span>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default SectionScrollLink;
