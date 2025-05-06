'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundWrapperProps {
  id?: string;
  variant?: 'light' | 'dark' | 'primary' | 'secondary' | 'gradient';
  className?: string;
  children: React.ReactNode;
}

const BackgroundWrapper = ({
  id,
  variant = 'light',
  className,
  children
}: BackgroundWrapperProps) => {
  const variantStyles = {
    light: 'bg-white text-gray-900 dark:bg-gray-950 dark:text-white',
    dark: 'bg-gray-900 text-white dark:bg-black',
    primary: 'bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50',
    secondary: 'bg-purple-50 text-purple-900 dark:bg-purple-950 dark:text-purple-50',
    gradient: 'bg-gradient-to-b from-white to-blue-50 text-gray-900 dark:from-gray-950 dark:to-blue-950 dark:text-gray-100'
  };
  
  return (
    <section 
      id={id}
      className={cn(
        'relative w-full overflow-hidden',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </section>
  );
};

export default BackgroundWrapper;