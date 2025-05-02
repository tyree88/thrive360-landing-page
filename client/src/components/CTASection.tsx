import React, { useRef, useEffect } from 'react';
import { CheckIcon } from '@/assets/icons';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { FORM_VALIDATION_MESSAGES } from '@/lib/constants';
import { useFadeIn } from '@/hooks/use-animation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import gsap from 'gsap';

const formSchema = z.object({
  fullName: z.string().min(1, { message: FORM_VALIDATION_MESSAGES.REQUIRED }),
  email: z.string().email({ message: FORM_VALIDATION_MESSAGES.EMAIL }),
  company: z.string().min(1, { message: FORM_VALIDATION_MESSAGES.REQUIRED }),
  employees: z.string().min(1, { message: FORM_VALIDATION_MESSAGES.REQUIRED }),
  message: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, {
    message: FORM_VALIDATION_MESSAGES.TERMS,
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CTASection: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      employees: '',
      message: '',
      privacy: false,
    }
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const checkpointsRef = useFadeIn('.cta-checkpoint', {
    stagger: 0.15,
    start: 'top 85%'
  });
  
  const { toast } = useToast();
  
  const onSubmit = (data: FormValues) => {
    // In a real app, this would submit to an API
    console.log('Form data:', data);
    
    toast({
      title: "Demo requested!",
      description: "Thank you for your interest. Our team will contact you shortly.",
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true
      }
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo(
      subheadingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      checkpointsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8 },
      '-=0.5'
    );
  }, []);

  return (
    <section 
      id="demo" 
      className="section bg-white flex items-center justify-center relative overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-thrive-purple-900 to-thrive-purple-600 opacity-10 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
              Get Started
            </span>
            <h2 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Ready to transform your community's health?
            </h2>
            <p 
              ref={subheadingRef}
              className="text-xl text-gray-600 mb-8"
            >
              Schedule a demo to see how Thrive360 can support your organization's mental health and wellness goals.
            </p>
            
            <div 
              ref={checkpointsRef}
              className="flex flex-wrap gap-4 mb-8"
            >
              <div className="flex items-center space-x-2 cta-checkpoint">
                <CheckIcon />
                <span className="text-gray-700">30-minute personalized demo</span>
              </div>
              
              <div className="flex items-center space-x-2 cta-checkpoint">
                <CheckIcon />
                <span className="text-gray-700">Custom implementation plan</span>
              </div>
              
              <div className="flex items-center space-x-2 cta-checkpoint">
                <CheckIcon />
                <span className="text-gray-700">ROI assessment</span>
              </div>
            </div>
            
            <form 
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text"
                    id="fullName"
                    {...register('fullName')}
                    className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-thrive-purple-500 focus:border-thrive-purple-500 outline-none transition-colors`}
                    placeholder="Your name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <input 
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-thrive-purple-500 focus:border-thrive-purple-500 outline-none transition-colors`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input 
                    type="text"
                    id="company"
                    {...register('company')}
                    className={`w-full px-4 py-2 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-thrive-purple-500 focus:border-thrive-purple-500 outline-none transition-colors`}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select 
                    id="employees"
                    {...register('employees')}
                    className={`w-full px-4 py-2 border ${errors.employees ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-thrive-purple-500 focus:border-thrive-purple-500 outline-none transition-colors appearance-none bg-white`}
                  >
                    <option value="" disabled>Select size</option>
                    <option value="1-50">1-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1001+">1001+ employees</option>
                  </select>
                  {errors.employees && (
                    <p className="mt-1 text-sm text-red-500">{errors.employees.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  How can we help?
                </label>
                <textarea 
                  id="message"
                  {...register('message')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-thrive-purple-500 focus:border-thrive-purple-500 outline-none transition-colors"
                  placeholder="Tell us about your needs..."
                />
              </div>
              
              <div className="flex items-center">
                <input 
                  id="privacy"
                  type="checkbox"
                  {...register('privacy')}
                  className={`h-4 w-4 ${errors.privacy ? 'border-red-500' : 'border-gray-300'} rounded`}
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-thrive-purple-600 hover:underline">privacy policy</a> and <a href="#" className="text-thrive-purple-600 hover:underline">terms of service</a>
                </label>
              </div>
              {errors.privacy && (
                <p className="mt-1 text-sm text-red-500">{errors.privacy.message}</p>
              )}
              
              <button 
                type="submit" 
                className="w-full px-6 py-3 bg-thrive-purple-500 text-white rounded-full font-medium hover:bg-thrive-purple-600 transition-colors shadow-md"
              >
                Schedule Your Demo
              </button>
            </form>
          </div>
          
          <div 
            ref={imageRef}
            className="hidden lg:block relative h-full"
          >
            <div className="rounded-2xl shadow-xl max-w-md mx-auto aspect-[6/7] bg-gray-200"></div>
            
            <div className="absolute -top-5 -right-5 w-20 h-20 bg-thrive-purple-100 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-thrive-purple-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
