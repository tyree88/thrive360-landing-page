import React from 'react';
import { cn } from '@/lib/utils';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  bgVariant?: 'white' | 'light' | 'primary' | 'secondary' | 'accent';
  borderVariant?: 'none' | 'light' | 'primary' | 'secondary' | 'accent';
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className,
  bgVariant = 'white',
  borderVariant = 'light',
  hoverEffect = true,
  onClick,
}) => {
  // Background classes based on variant
  const bgClasses = {
    white: 'bg-white',
    light: 'card-gradient-thrive',
    primary: 'bg-thrive-purple/10',
    secondary: 'bg-thrive-blue/10',
    accent: 'bg-thrive-teal/10',
  }[bgVariant];

  // Border classes based on variant
  const borderClasses = {
    none: 'border-transparent',
    light: 'border-thrive-purple-light/30',
    primary: 'border-thrive-purple/30',
    secondary: 'border-thrive-blue/30',
    accent: 'border-thrive-teal/30',
  }[borderVariant];

  // Hover effect classes
  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-opacity-50'
    : '';

  return (
    <div
      className={cn(
        'p-6 rounded-xl border shadow-sm',
        bgClasses,
        borderClasses,
        hoverClasses,
        className,
        onClick ? 'cursor-pointer' : ''
      )}
      onClick={onClick}
    >
      {/* Screen reflection effect for glossy cards */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 rounded-xl pointer-events-none" />
      
      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientCard;