import React, { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/constants';
import AnimatedButton from '@/components/ui/animated-button';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const showThreshold = 500; // Show after scrolling 500px
      
      setIsVisible(scrollPosition > showThreshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div id="floatingCTA" className={`floating-cta fixed bottom-6 right-6 z-50 transform transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
      <AnimatedButton 
        href={ROUTES.DEMO} 
        variant="gradient"
        size="md"
        icon={<i className="fas fa-arrow-right"></i>}
        className="shadow-lg"
      >
        Get a Demo
      </AnimatedButton>
    </div>
  );
};

export default FloatingCTA;
