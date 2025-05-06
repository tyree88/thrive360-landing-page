import React from 'react';
import { ScrollSequenceSection } from './types';

interface PhoneMockupProps {
  sections: ScrollSequenceSection[];
  phoneRef: React.RefObject<HTMLDivElement>;
  contentContainerRef: React.RefObject<HTMLDivElement>;
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({
  sections,
  phoneRef,
  contentContainerRef,
  sectionRefs,
}) => {
  return (
    <div 
      ref={phoneRef}
      className="relative flex-shrink-0 w-[280px] md:w-[320px] h-[580px] md:h-[640px] mx-auto z-10"
    >
      {/* Phone frame */}
      <div 
        className="absolute inset-0 bg-gray-900 rounded-[36px] shadow-xl overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
        }}
      >
        {/* Phone frame details */}
        <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center">
          <div className="w-20 h-4 bg-black rounded-b-xl"></div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute top-24 right-0 w-[3px] h-10 bg-gray-700 rounded-l-sm"></div>
        <div className="absolute top-16 left-0 w-[3px] h-8 bg-gray-700 rounded-r-sm"></div>
        <div className="absolute top-28 left-0 w-[3px] h-12 bg-gray-700 rounded-r-sm"></div>
        
        {/* Screen container */}
        <div 
          ref={contentContainerRef}
          className="absolute inset-[8px] rounded-[28px] bg-white dark:bg-gray-800 overflow-hidden"
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-100 dark:bg-gray-700 z-10 flex items-center px-4 justify-between">
            <div className="text-xs font-medium text-gray-800 dark:text-gray-200">10:30</div>
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-200 opacity-70"></div>
              <div className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-200 opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-gray-800 dark:bg-gray-200 opacity-90"></div>
            </div>
          </div>
          
          {/* App content area */}
          <div className="absolute inset-0 pt-6 overflow-hidden">
            {/* App header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">T</div>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white">Thrive360</span>
                </div>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <div className="w-4 h-0.5 bg-gray-500 dark:bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Screen reflection overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-20 opacity-15" 
              style={{ 
                background: 'linear-gradient(145deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)',
                borderRadius: "inherit" 
              }}
              aria-hidden="true"
            ></div>
            
            {sections.map((section, index) => (
              <div 
                key={index}
                ref={(el) => {
                  if (sectionRefs && sectionRefs.current) {
                    sectionRefs.current[index] = el;
                  }
                }}
                className="absolute inset-0 flex flex-col items-center p-8 opacity-0"
              >
                <h3 className="text-2xl font-semibold mb-3 text-center">{section.title}</h3>
                {section.description && (
                  <p className="text-sm mb-4 text-center text-gray-600">{section.description}</p>
                )}
                <div className="flex-grow w-full flex items-center justify-center">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;