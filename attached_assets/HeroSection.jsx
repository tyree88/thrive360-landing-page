
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { ArrowRight } from 'lucide-react';
import NeuroBadge from '@/components/ui/NeuroBadge.jsx';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden bg-gradient-light-purple">
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-tight text-brand-gray-900"
            >
              <span className="gradient-text">Supercharge</span> Your Teletherapy with <span className="gradient-text">Habit-Forming Care</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-brand-purple-800 max-w-xl mx-auto md:mx-0 mb-10"
            >
              Embed Thrive360’s Neuroplastic Engagement™ into your teletherapy platform to boost adherence, cut no-shows, and deepen outcomes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <Button size="lg" className="bg-gradient-primary text-brand-gray-50 font-semibold px-10 py-6 text-lg hover:opacity-90 transition-opacity duration-300 shadow-glow-brand">
                See the Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 md:mt-0 max-w-xl mx-auto md:max-w-none"
          >
            <div className="relative aspect-[4/3] sm:aspect-video bg-brand-gray-50/50 backdrop-blur-sm rounded-xl shadow-2xl p-2 border border-brand-purple-400/30 overflow-hidden">
              <img  alt="Teletherapy session with Neuroplastic Engagement badge on a tablet screen" className="w-full h-full object-cover rounded-lg" src="https://images.unsplash.com/photo-1549925245-f20a1bac6454" />
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                <NeuroBadge />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
