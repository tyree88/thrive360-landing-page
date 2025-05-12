'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SolutionsLayoutProps {
  hero: ReactNode;
  problem: ReactNode;
  solution: ReactNode;
  capabilities: ReactNode;
  howItWorks: ReactNode;
  statsDemo?: ReactNode;
  proofPoints?: ReactNode;
  faq?: ReactNode;
  pricing?: ReactNode;
  contact?: ReactNode;
  bottomCta?: ReactNode;
}

export default function SolutionsLayout({
  hero,
  problem,
  solution,
  capabilities,
  howItWorks,
  statsDemo,
  proofPoints,
  faq,
  pricing,
  contact,
  bottomCta
}: SolutionsLayoutProps) {
  return (
    <div className="page-background min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative z-10">
        {hero}
      </section>
      
      {/* Problem Section */}
      <motion.section 
        id="problem"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {problem}
      </motion.section>
      
      {/* Solution Section */}
      <motion.section 
        id="solution"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {solution}
      </motion.section>
      
      {/* Capabilities Section */}
      <motion.section 
        id="capabilities"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {capabilities}
      </motion.section>
      
      {/* How It Works Section */}
      <motion.section 
        id="how-it-works"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {howItWorks}
      </motion.section>
      
      {/* Stats Demo Section (Optional) */}
      {statsDemo && (
        <motion.section 
          id="stats-demo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {statsDemo}
        </motion.section>
      )}
      
      {/* Proof Points Section (Optional) */}
      {proofPoints && (
        <motion.section 
          id="proof-points"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {proofPoints}
        </motion.section>
      )}
      
      {/* FAQ Section (Optional) */}
      {faq && (
        <motion.section 
          id="faq"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {faq}
        </motion.section>
      )}
      
      {/* Pricing Section (Optional) */}
      {pricing && (
        <motion.section 
          id="pricing"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {pricing}
        </motion.section>
      )}
      
      {/* Contact Section (Optional) */}
      {contact && (
        <motion.section 
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {contact}
        </motion.section>
      )}
      
      {/* Bottom CTA Section (Optional) */}
      {bottomCta && (
        <motion.section 
          id="bottom-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {bottomCta}
        </motion.section>
      )}
    </div>
  );
}