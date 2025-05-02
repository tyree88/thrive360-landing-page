import React, { useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Base styles
  const baseStyles = "relative flex items-center justify-center overflow-hidden rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#6D3CA7]/50";
  
  // Size variations
  const sizeStyles = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  }[size];
  
  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Variant base styles
  const variantBaseStyles = {
    primary: 'bg-[#6D3CA7] text-white',
    secondary: 'bg-[#F5F2FF] text-[#6D3CA7] border border-[#988AD5]/40',
    outline: 'bg-transparent text-[#6D3CA7] border-2 border-[#6D3CA7]',
    gradient: 'text-white'
  }[variant];

  // Gradient background for gradient variant
  const gradientStyle = variant === 'gradient' ? {
    background: 'linear-gradient(to right, #6D3CA7, #3462AE)'
  } : {};

  // Final combined class names
  const buttonClasses = cn(
    baseStyles,
    sizeStyles,
    widthStyles,
    variantBaseStyles,
    className
  );

  // Animation variants for the button and icon
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    pressed: { scale: 0.98 },
  };

  const iconVariants = {
    rest: { x: 0, opacity: 1 },
    hover: { x: iconPosition === 'right' ? 5 : -5, opacity: 1 },
  };

  const shimmerVariants = {
    rest: { opacity: 0, x: '-100%' },
    hover: { 
      opacity: 0.5, 
      x: '100%',
      transition: { 
        repeat: Infinity, 
        duration: 1.5, 
        ease: 'linear',
        repeatDelay: 0.5
      } 
    },
  };

  // Handle mouse events for animations
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  // Render as link or button
  const ButtonContent = () => (
    <>
      {/* Background shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0 pointer-events-none"
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        variants={shimmerVariants}
      />

      {/* Icon and text container */}
      <div className="relative flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && (
          <motion.span
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            variants={iconVariants}
          >
            {icon}
          </motion.span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <motion.span
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            variants={iconVariants}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        style={gradientStyle}
        initial="rest"
        animate={isPressed ? "pressed" : isHovered ? "hover" : "rest"}
        variants={buttonVariants}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <ButtonContent />
      </motion.a>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      style={gradientStyle}
      initial="rest"
      animate={isPressed ? "pressed" : isHovered ? "hover" : "rest"}
      variants={buttonVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      type={props.type || 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default AnimatedButton;