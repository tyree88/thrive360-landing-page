'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Highlight {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Testimonial {
  companyName: string;
  companyLogo: string;
  testimonialText: string;
  metrics: {
    label: string;
    value: string;
  }[];
  videos?: {
    thumbnail: string;
    title: string;
    videoUrl?: string;
  }[];
}

interface ProofPointsSectionProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  highlights: Highlight[];
  testimonials: Testimonial[];
  badgeElement?: React.ReactNode;
}

export default function ProofPointsSection({
  title,
  subtitle,
  badgeText = "Success Stories",
  highlights,
  testimonials,
  badgeElement
}: ProofPointsSectionProps) {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  const currentTestimonial = testimonials[activeTestimonialIndex];

  return (
    <section className="py-16 md:py-24 bg-brand-gray-50/50 text-brand-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold tracking-wider uppercase rounded-full bg-brand-purple-600/10 text-brand-purple-600 border-brand-purple-600/30 mb-3">
            {badgeText}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray-900 mb-3">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-brand-purple-800 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-lg border border-brand-purple-400/20 text-center"
            >
              <div className="flex justify-center mb-2">
                {highlight.icon}
              </div>
              <p className="text-2xl font-semibold gradient-text">{highlight.value}</p>
              <p className="text-xs text-brand-purple-800">{highlight.label}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Card className="overflow-hidden shadow-xl border-brand-purple-400/30 bg-white">
            <div className="md:grid md:grid-cols-12 md:gap-0">
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <img 
                      src={currentTestimonial.companyLogo} 
                      alt={`${currentTestimonial.companyName} Logo`} 
                      className="h-10 w-auto" 
                    />
                  </div>
                  <CardHeader className="p-0 mb-3 sm:mb-4">
                    <CardTitle className="text-3xl sm:text-4xl font-bold text-brand-purple-800">
                      {currentTestimonial.companyName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-base sm:text-lg text-brand-gray-900 mb-4 sm:mb-6 italic">
                      "{currentTestimonial.testimonialText}"
                    </p>
                    <ul className="space-y-2 mb-6 sm:mb-8">
                      {currentTestimonial.metrics.map((metric, index) => (
                        <li key={index} className="flex items-center">
                          <span className="text-xl sm:text-2xl font-bold gradient-text mr-2">{metric.value}</span>
                          <span className="text-sm text-brand-purple-800">{metric.label}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
                <a href="#" className="inline-flex items-center font-semibold text-brand-purple-600 hover:text-brand-blue-600 transition-colors group">
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              {currentTestimonial.videos && currentTestimonial.videos.length > 0 && (
                <div className="md:col-span-7 bg-brand-gray-50/30 p-6 sm:p-8 grid grid-rows-2 gap-4 sm:gap-6">
                  {currentTestimonial.videos.map((video, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden shadow-md group aspect-video">
                      <img 
                        src={video.thumbnail} 
                        alt={`Video thumbnail for ${video.title}`} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
                        <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white/80 group-hover:text-white transition-colors" />
                        <p className="mt-2 text-sm sm:text-base text-white font-semibold">{video.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
          
          {testimonials.length > 1 && (
            <>
              <button 
                onClick={prevTestimonial}
                className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 p-2 bg-white rounded-full shadow-md hover:bg-brand-gray-50/80 transition-colors border border-brand-purple-400/30 text-brand-purple-600"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 p-2 bg-white rounded-full shadow-md hover:bg-brand-gray-50/80 transition-colors border border-brand-purple-400/30 text-brand-purple-600"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </motion.div>

        {badgeElement && (
          <div className="text-center mt-12 md:mt-16">
            {badgeElement}
            <p className="text-sm text-brand-purple-800 mt-2">Powered by Neuroplastic Engagement™</p>
          </div>
        )}
      </div>
    </section>
  );
}