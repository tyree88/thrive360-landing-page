'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface SolutionsLayoutProps {
  hero: ReactNode;
  problem?: ReactNode;
  solution?: ReactNode;
  capabilities?: ReactNode;
  howItWorks?: ReactNode;
  proofPoints?: ReactNode;
  statsDemo?: ReactNode;
  faq?: ReactNode;
  contact?: ReactNode;
  isLoading?: boolean;
}

/**
 * SolutionsLayout - A reusable template for all solution pages
 * This component provides a consistent layout structure for different solution pages
 * while allowing for customization of each section
 */
export default function SolutionsLayout({
  hero,
  problem,
  solution,
  capabilities,
  howItWorks,
  proofPoints,
  statsDemo,
  faq,
  contact,
  isLoading = false
}: SolutionsLayoutProps) {
  if (isLoading) {
    return <SolutionsLayoutSkeleton />;
  }

  return (
    <div className="solutions-page">
      {/* Hero Section */}
      <section className="solution-section hero-section">{hero}</section>

      {/* Problem Section (optional) */}
      {problem && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section problem-section"
        >
          {problem}
        </motion.section>
      )}

      {/* Solution Section (optional) */}
      {solution && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section solution-section"
        >
          {solution}
        </motion.section>
      )}

      {/* Capabilities Section (optional) */}
      {capabilities && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section capabilities-section"
        >
          {capabilities}
        </motion.section>
      )}

      {/* How It Works Section (optional) */}
      {howItWorks && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section how-it-works-section"
        >
          {howItWorks}
        </motion.section>
      )}

      {/* Stats Demo Section (optional) */}
      {statsDemo && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section stats-demo-section"
        >
          {statsDemo}
        </motion.section>
      )}

      {/* Proof Points Section (optional) */}
      {proofPoints && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section proof-points-section"
        >
          {proofPoints}
        </motion.section>
      )}

      {/* FAQ Section (optional) */}
      {faq && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section faq-section"
        >
          {faq}
        </motion.section>
      )}

      {/* Contact Section (optional) */}
      {contact && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="solution-section contact-section"
        >
          {contact}
        </motion.section>
      )}
    </div>
  );
}

/**
 * Skeleton loader for the solutions layout
 */
function SolutionsLayoutSkeleton() {
  return (
    <div className="solutions-page-skeleton">
      {/* Hero Section Skeleton */}
      <div className="min-h-[80vh] py-20 relative bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Skeleton className="h-12 w-3/4 mb-6" />
              <Skeleton className="h-12 w-1/2 mb-6" />
              <Skeleton className="h-6 w-full mb-3" />
              <Skeleton className="h-6 w-4/5 mb-8" />
              <Skeleton className="h-12 w-48 rounded-full" />
            </div>
            <div>
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section Skeleton */}
      <div className="py-16 bg-brand-gray-900">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Solution Section Skeleton */}
      <div className="py-16 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-12" />
          <Skeleton className="h-80 w-full mx-auto rounded-xl max-w-4xl" />
        </div>
      </div>

      {/* Additional section skeletons */}
      <div className="py-16 bg-brand-gray-50/50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/3 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}