import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hero' | 'light' | 'dark';
  showPatterns?: boolean;
  showTransitionTop?: boolean;
  showTransitionBottom?: boolean;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({
  children,
  className,
  variant = 'default',
  showPatterns = true,
  showTransitionTop = false,
  showTransitionBottom = false,
}) => {
  // Determine background gradient based on variant
  const bgClasses = {
    default: 'bg-gradient-thrive',
    hero: 'hero-gradient-thrive text-white',
    light: 'bg-gradient-to-b from-white via-thrive-white/50 to-thrive-white',
    dark: 'bg-gradient-to-b from-thrive-purple-darker via-thrive-purple-dark to-thrive-purple text-white',
  }[variant];

  return (
    <div 
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        bgClasses,
        className
      )}
    >
      {/* Subtle pattern overlays for texture and depth */}
      {showPatterns && (
        <>
          <div className="absolute inset-0 opacity-10 z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(109,60,167,0.2)_0%,transparent_50%)]" />
          <div className="absolute inset-0 opacity-10 z-0 bg-[radial-gradient(circle_at_70%_80%,rgba(152,138,213,0.2)_0%,transparent_60%)]" />
        </>
      )}
      
      {/* Top transition gradient */}
      {showTransitionTop && <div className="section-transition-top" />}
      
      {/* Content container */}
      <div className="relative z-10">{children}</div>
      
      {/* Bottom transition gradient */}
      {showTransitionBottom && <div className="section-transition-bottom" />}
    </div>
  );
};

export default BackgroundWrapper;