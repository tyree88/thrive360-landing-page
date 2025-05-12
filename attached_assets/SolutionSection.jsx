
import React from 'react';
import { motion } from 'framer-motion';
import NeuroBadge from '@/components/ui/NeuroBadge.jsx';

const SolutionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Turn Therapy into <span className="gradient-text">Transformation</span>: <NeuroBadge /> for Telehealth
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-brand-purple-800 text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          Thrive360 slides seamlessly into your existing teletherapy flow—layering in personalized micro-exercises, in-app nudges, and clinician dashboards. Our <NeuroBadge /> engine turns single sessions into sustained behavior change.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto p-6 md:p-8 bg-white backdrop-blur-md rounded-xl shadow-xl border border-brand-purple-400/30"
        >
          <img  alt="Flow diagram of Thrive360 Neuroplastic Engine" className="w-full h-auto rounded-lg" src="https://images.unsplash.com/photo-1661358791020-b4eb3fbe9e0c" />
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
