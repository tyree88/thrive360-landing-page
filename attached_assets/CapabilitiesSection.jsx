
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardDescription, CardTitle } from '@/components/ui/card.jsx';
import NeuroBadge from '@/components/ui/NeuroBadge.jsx';
import { Zap, ClipboardCheck, MessageSquare, Library, LayoutDashboard, Plug } from 'lucide-react';

const CapabilitiesSection = () => {
  const features = [
    { icon: <Zap className="h-6 w-6 text-brand-purple-600" />, title: "Neuroplastic Engagement™", benefit: "Daily habit-loops, check-ins & rewards to cement new skills", badge: true },
    { icon: <ClipboardCheck className="h-6 w-6 text-brand-purple-600" />, title: "Homework Integration", benefit: "Assign micro-sessions that auto-unlock after each tele-visit" },
    { icon: <MessageSquare className="h-6 w-6 text-brand-purple-600" />, title: "Adaptive Reminders", benefit: "Contextual SMS/email/calendar nudges drive at-home practice" },
    { icon: <Library className="h-6 w-6 text-brand-purple-600" />, title: "Tailored Content Library", benefit: "500+ clinically validated modules—CBT, DBT, mindfulness, more" },
    { icon: <LayoutDashboard className="h-6 w-6 text-brand-purple-600" />, title: "Clinician Dashboard", benefit: "Real-time engagement metrics, drop-off alerts & risk flags" },
    { icon: <Plug className="h-6 w-6 text-brand-purple-600" />, title: "Seamless Embed", benefit: "SDK or iFrame embed—no extra login or sandbox needed" },
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50/50 text-brand-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16"
        >
          Core <span className="gradient-text">Capabilities</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glow-border-card"
            >
              <Card className="h-full p-6 bg-white backdrop-blur-sm border-brand-purple-400/30 text-brand-gray-900">
                <div className="flex items-center mb-4">
                  <span className="p-3 bg-brand-purple-600/10 rounded-full mr-4">{feature.icon}</span>
                  <CardTitle className="text-xl text-brand-gray-900">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-brand-purple-800 mb-3">{feature.benefit}</CardDescription>
                {feature.badge && <NeuroBadge />}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
