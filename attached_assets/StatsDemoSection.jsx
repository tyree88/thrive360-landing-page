
import React from 'react';
import { motion } from 'framer-motion';
import NeuroBadge from '@/components/ui/NeuroBadge.jsx';

const StatsDemoSection = () => {
  const [currentStatIndex, setCurrentStatIndex] = React.useState(0);

  const stats = [
    { value: "45%", label: "fewer no-shows", id: "no-shows" },
    { value: "+68%", label: "average session completion", id: "completion" },
    { value: "92%", label: "self-reported skill retention", id: "retention" },
  ];
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);


  return (
    <section className="py-16 md:py-24 bg-brand-gray-50 text-brand-gray-900 min-h-[150vh]">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Scroll-Triggered <span className="gradient-text">Stats Demo</span>
        </motion.h2>
        <div className="sticky top-24 md:top-32 z-20"> 
          <motion.div 
            key={currentStatIndex} 
            initial={{ opacity: 0.5, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-6 md:p-10 border border-brand-purple-400/40 text-center"
          >
             <div className="relative aspect-video bg-brand-gray-50/70 rounded-lg shadow-inner mb-6 overflow-hidden border border-brand-purple-400/20">
                <img  className="w-full h-full object-contain p-4" alt="Tablet showing engagement stats" src="https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0" />
             </div>
            <div className="text-6xl md:text-8xl font-extrabold gradient-text mb-4">
              {stats[currentStatIndex].value}
            </div>
            <p className="text-xl md:text-2xl text-brand-purple-800 mb-6">
              {stats[currentStatIndex].label}
            </p>
            <div className="flex justify-center">
              <NeuroBadge />
            </div>
             <p className="text-xs text-brand-purple-800/70 mt-2">Footer: Powered by Neuroplastic Engagement™</p>
          </motion.div>
          <p className="text-center text-sm text-brand-purple-800/80 mt-4">
            (This is a simplified animated demo. Scroll down to see more sections.)
          </p>
        </div>
        <div className="h-[100vh]"></div> {/* Placeholder for scroll */}
      </div>
    </section>
  );
};

export default StatsDemoSection;
