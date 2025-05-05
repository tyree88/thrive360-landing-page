import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}) => {
  // Determine background gradient based on variant
  const bgClasses = {
    default: 'bg-transparent',
    hero: 'text-white',
    light: 'bg-transparent',
    dark: 'text-white',
  }[variant];

  return (
    <div 
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        bgClasses,
        className
      )}
      {...props}
    >
      {/* Subtle pattern overlays for texture and depth */}
      {showPatterns && (
        <>
          <div className="absolute inset-0 opacity-0 z-0" />
          <div className="absolute inset-0 opacity-0 z-0" />
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