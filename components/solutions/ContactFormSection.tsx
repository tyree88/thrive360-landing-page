'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';

interface ContactFormSectionProps {
  title: string;
  description: string;
  className?: string;
}

export default function ContactFormSection({
  title,
  description,
  className = ""
}: ContactFormSectionProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    companyName: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    
    // Simulate form submission
    try {
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success!
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(true);
      setSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className={`py-16 md:py-24 bg-brand-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Form */}
            <div className="p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-brand-gray-900">
                  {title}
                </h2>
                <p className="text-brand-purple-700 mb-8">
                  {description}
                </p>
                
                {submitted ? (
                  <div className="rounded-lg bg-brand-purple-50 p-6 border border-brand-purple-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-purple-500 flex items-center justify-center mr-4">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-purple-800">Thank you!</h3>
                    </div>
                    <p className="text-brand-purple-700 mb-4">Your message has been received. We'll get back to you as soon as possible.</p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({
                          name: '',
                          email: '',
                          companyName: '',
                          message: ''
                        });
                      }}
                      className="text-brand-purple-600 font-medium hover:text-brand-purple-800"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start">
                        <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p>There was an error submitting your form. Please try again.</p>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-brand-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-purple-500 focus:border-brand-purple-500 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-brand-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-purple-500 focus:border-brand-purple-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="companyName" className="block text-sm font-medium text-brand-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        value={formState.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-purple-500 focus:border-brand-purple-500 transition-colors"
                        placeholder="Acme Inc."
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-brand-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-brand-gray-300 focus:ring-2 focus:ring-brand-purple-500 focus:border-brand-purple-500 transition-colors"
                        placeholder="I'm interested in learning more about..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 text-white font-semibold shadow-lg transition-all group 
                        ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                      {!submitting && (
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
            
            {/* Right side - Image and details */}
            <div className="relative bg-gradient-to-br from-brand-purple-500 to-brand-purple-700 text-white p-6 md:p-10 flex flex-col justify-between">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692')] bg-cover bg-center mix-blend-overlay"></div>
              </div>
              
              <div className="relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-xl md:text-2xl font-bold mb-6"
                >
                  Why choose Thrive360
                </motion.h3>
                
                <motion.ul
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  className="space-y-4 mb-8"
                >
                  {[
                    'Neuroplastic Engagement™ to drive lasting behavior change',
                    'Enterprise-ready security & seamless integration',
                    'Science-backed approach with proven outcomes',
                    'Accessible to all employee demographics',
                    'Measurable ROI with detailed analytics'
                  ].map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex items-start"
                    >
                      <Check className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative z-10 border-t border-white/20 pt-4 mt-auto"
              >
                <div className="flex items-center space-x-4">
                  <p className="text-sm opacity-90">
                    Or call us directly:
                    <a href="tel:+18005551234" className="block text-lg font-semibold hover:opacity-80 transition-opacity">
                      +1 (800) 555-1234
                    </a>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}