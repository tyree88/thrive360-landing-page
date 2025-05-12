
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { Send } from 'lucide-react';

const ContactFormSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
      variant: "default", 
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-contact-form text-brand-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg md:text-xl text-brand-purple-400">
            Have questions or ready to start transforming your teletherapy? Send us a message!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl mx-auto bg-brand-gray-900/30 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl border border-brand-purple-400/30 space-y-6"
        >
          <div>
            <Label htmlFor="name" className="mb-1.5 block text-brand-gray-50">Full Name</Label>
            <Input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="e.g. Jane Doe" 
              value={formData.name}
              onChange={handleChange}
              required 
              className="bg-brand-purple-800/40 border-brand-purple-600/50 text-brand-gray-50 placeholder:text-brand-purple-400/70 focus:ring-brand-purple-400"
            />
          </div>
          <div>
            <Label htmlFor="email" className="mb-1.5 block text-brand-gray-50">Email Address</Label>
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="you@example.com" 
              value={formData.email}
              onChange={handleChange}
              required 
              className="bg-brand-purple-800/40 border-brand-purple-600/50 text-brand-gray-50 placeholder:text-brand-purple-400/70 focus:ring-brand-purple-400"
            />
          </div>
          <div>
            <Label htmlFor="message" className="mb-1.5 block text-brand-gray-50">Your Message</Label>
            <Textarea 
              name="message" 
              id="message" 
              rows="4" 
              placeholder="How can we help you?" 
              value={formData.message}
              onChange={handleChange}
              required 
              className="bg-brand-purple-800/40 border-brand-purple-600/50 text-brand-gray-50 placeholder:text-brand-purple-400/70 focus:ring-brand-purple-400"
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-brand-gray-50 text-brand-purple-600 font-semibold hover:bg-brand-purple-400/20 hover:text-brand-gray-50 transition-colors duration-300 py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 h-5 w-5" />
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactFormSection;
