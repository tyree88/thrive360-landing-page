import React, { useEffect, useState } from 'react';
import { ROUTES } from '@/lib/constants';

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
    <div id="floatingCTA" className={`floating-cta fixed bottom-6 right-6 z-50 ${isVisible ? 'visible' : ''}`}>
      <a 
        href={ROUTES.DEMO} 
        className="flex items-center space-x-2 px-6 py-3 bg-thrive-purple-500 text-white rounded-full shadow-lg hover:bg-thrive-purple-600 transition-all"
      >
        <span className="font-medium">Get a Demo</span>
        <i className="fas fa-arrow-right"></i>
      </a>
    </div>
  );
};

export default FloatingCTA;
