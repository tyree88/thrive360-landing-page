'use client';

import { useState, useEffect } from 'react';
import ProblemSectionSkeleton from './ProblemSectionSkeleton';

interface LoadWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

/**
 * Component that shows a skeleton loading state before rendering children
 * This simulates loading data for the component and can be used for any section
 */
export function LoadWrapper({ children, delay = 2000 }: LoadWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading ? <ProblemSectionSkeleton /> : <>{children}</>;
}

/**
 * Utility for simulating lazy-loaded problem section
 */
export function LazyProblemSection({ children }: { children: React.ReactNode }) {
  return (
    <LoadWrapper>
      {children}
    </LoadWrapper>
  );
}