
import React from 'react';
import { motion } from 'framer-motion';
import { PackagePlus, Zap, TrendingUp } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    { icon: <PackagePlus className="h-10 w-10 text-brand-purple-600" />, title: "Drop-In & Brand", description: "2-week integration via our SDK/iFrame; full white-labeling", color: 'var(--colors-brand-purple-600)' },
    { icon: <Zap className="h-10 w-10 text-brand-blue-600" />, title: "Activate Engagement", description: "Neuroplastic micro-learning, quizzes & nudges sync with your care plans", color: 'var(--colors-brand-blue-600)' },
    { icon: <TrendingUp className="h-10 w-10 text-brand-purple-400" />, title: "Optimize & Intervene", description: "Live dashboards highlight disengaged users; automated re-engagement flows", color: 'var(--colors-brand-purple-400)' },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
        >
          How It Works: <span className="gradient-text">Three-Step Integration</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
            <svg width="100%" height="2" className="overflow-visible">
              <line x1="15%" y1="1" x2="85%" y2="1" strokeWidth="2" strokeDasharray="10,10" className="stroke-brand-purple-400/50"/>
            </svg>
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center p-6 bg-white backdrop-blur-md rounded-xl shadow-xl border border-brand-purple-400/30 z-10"
            >
              <div className="p-5 bg-brand-purple-400/10 rounded-full mb-6 inline-block border-2" style={{ borderColor: step.color }}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-brand-gray-900 mb-3">{step.title}</h3>
              <p className="text-brand-purple-800">{step.description}</p>
              {index !== 0 && <div className="md:hidden absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 border-l-2 border-dashed border-brand-purple-400/50"></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
