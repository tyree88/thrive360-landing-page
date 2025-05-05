'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  containerClassName?: string;
  startOffset?: string[];
}

const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children,
  speed = 0.2,
  direction = 'up',
  className = '',
  containerClassName = '',
  startOffset = ["start end", "end start"],
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: startOffset as any
  });
  
  // Calculate motion based on direction
  const yValue = direction === 'up' || direction === 'down'
    ? useTransform(
        scrollYProgress, 
        [0, 1], 
        ["0%", `${direction === 'up' ? -speed * 100 : speed * 100}%`]
      )
    : "0%";
      
  const xValue = direction === 'left' || direction === 'right'
    ? useTransform(
        scrollYProgress, 
        [0, 1], 
        ["0%", `${direction === 'left' ? -speed * 100 : speed * 100}%`]
      )
    : "0%";
  
  return (
    <div ref={ref} className={cn("overflow-hidden", containerClassName)}>
      <motion.div 
        style={{ y: yValue, x: xValue }} 
        className={className}
        transition={{ type: "spring", stiffness: 400, damping: 90 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollParallax;