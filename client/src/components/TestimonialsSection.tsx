import React, { useRef, useEffect } from 'react';
import { StarRating } from '@/assets/icons';
import { TESTIMONIALS } from '@/lib/constants';
import { useFadeIn, useParallax } from '@/hooks/use-animation';
import gsap from 'gsap';
import BackgroundWrapper from '@/components/ui/background-wrapper';
import GradientCard from '@/components/ui/gradient-card';

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  
  useFadeIn('.testimonial-card', {
    stagger: 0.2,
    scale: 0.95,
    start: 'top 85%'
  });
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  useParallax('.parallax-bg', { 
    speed: -10,
    start: 'top bottom',
    end: 'bottom top'
  });

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
    );
  }, []);

  return (
    <BackgroundWrapper
      id="testimonials" 
      variant="light"
      className="section flex items-center justify-center relative overflow-hidden"
      showPatterns={true}
      showTransitionTop={true}
      showTransitionBottom={false}
    >
      <div ref={sectionRef} className="w-full">
        <div 
          ref={contentRef}
          className="max-w-7xl mx-auto px-6 py-20 w-full"
        >
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-thrive-purple-100 text-thrive-purple-700 rounded-full mb-4">
              Testimonials
            </span>
            <h2 
              ref={headingRef}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              What Clients Say
            </h2>
            <p 
              ref={subheadingRef}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Organizations of all sizes are seeing transformative results with Thrive360.
            </p>
          </div>
          
          <div 
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <GradientCard 
                key={index} 
                className="p-8 testimonial-card"
                borderVariant="light"
                bgVariant="white"
                hoverEffect={true}
              >
                <div className="flex items-center mb-6">
                  <StarRating rating={testimonial.rating} />
                  <span className="text-gray-600 text-sm ml-2">{testimonial.rating.toFixed(1)}</span>
                </div>
                
                <p className="text-gray-700 mb-6">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <div className="w-full h-full bg-gray-300"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>
        </div>
        
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-thrive-purple-100 rounded-full opacity-50 z-0 parallax-bg"></div>
      </div>
    </BackgroundWrapper>
  );
};

export default TestimonialsSection;
