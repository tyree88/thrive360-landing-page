import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ParallaxShapeProps {
  shape: 'circle' | 'blob' | 'square' | 'triangle';
  size: number; // Size in rem
  position: { top?: string; bottom?: string; left?: string; right?: string; }; 
  color: string;
  depth: number; // 0-1 value where 1 moves the most and 0 stays still
  opacity?: number;
  className?: string;
}

const renderShape = (shape: ParallaxShapeProps['shape'], color: string, className: string = '') => {
  switch (shape) {
    case 'circle':
      return <div className={`w-full h-full rounded-full ${className}`} style={{ backgroundColor: color }}></div>;
    case 'square':
      return <div className={`w-full h-full rounded-lg ${className}`} style={{ backgroundColor: color }}></div>;
    case 'triangle':
      return (
        <div className={`w-full h-full ${className}`} style={{ position: 'relative' }}>
          <div 
            style={{
              width: '0',
              height: '0',
              borderLeft: '50% solid transparent',
              borderRight: '50% solid transparent',
              borderBottom: `100% solid ${color}`,
              position: 'absolute',
              left: '0',
              top: '0'
            }}
          ></div>
        </div>
      );
    case 'blob':
    default:
      return (
        <div 
          className={`w-full h-full ${className}`}
          style={{
            backgroundColor: color,
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%'
          }}
        ></div>
      );
  }
};

const ParallaxShape: React.FC<ParallaxShapeProps> = ({
  shape,
  size,
  position,
  color,
  depth,
  opacity = 0.1,
  className = ''
}) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  // Calculate how much the shape should move based on depth
  // Higher depth means more movement
  const yMove = useTransform(scrollYProgress, [0, 1], [0, 200 * depth]);
  const xMove = useTransform(scrollYProgress, [0, 1], [0, 50 * depth]);
  
  const positionStyles = {
    position: 'absolute' as const,
    width: `${size}rem`,
    height: `${size}rem`,
    ...position
  };
  
  return (
    <motion.div
      ref={shapeRef}
      className={`parallax-shape z-0 ${className}`}
      style={{
        ...positionStyles,
        y: yMove,
        x: xMove,
        opacity
      }}
    >
      {renderShape(shape, color)}
    </motion.div>
  );
};

interface ParallaxShapesProps {
  shapes: ParallaxShapeProps[];
  className?: string;
}

const ParallaxShapes: React.FC<ParallaxShapesProps> = ({ 
  shapes,
  className = ''
}) => {
  return (
    <div className={`parallax-shapes-container absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, index) => (
        <ParallaxShape key={index} {...shape} />
      ))}
    </div>
  );
};

export default ParallaxShapes;
