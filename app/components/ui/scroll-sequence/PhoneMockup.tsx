'use client';

import React from 'react';
import { ScrollSequenceSection } from './types';

interface PhoneMockupProps {
  sections: ScrollSequenceSection[];
  phoneRef: React.RefObject<HTMLDivElement>;
  contentContainerRef: React.RefObject<HTMLDivElement>;
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sectionContentRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sectionTitleRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sectionDescRefs?: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

/**
 * PhoneMockup - A responsive phone mockup component used in scroll sequences
 * 
 * This component displays a phone frame with content that changes as the user scrolls.
 * It uses refs to allow external animation control from the parent component.
 */
const PhoneMockup = ({
  sections,
  phoneRef,
  contentContainerRef,
  sectionRefs,
  sectionContentRefs,
  sectionTitleRefs,
  sectionDescRefs
}: PhoneMockupProps) => {
  return (
    <div 
      ref={phoneRef}
      className="relative w-[300px] md:w-[320px] h-[600px] md:h-[640px] bg-zinc-800 rounded-[36px] overflow-hidden shadow-2xl"
      aria-hidden="true" // Hidden from screen readers as it's decorative
    >
      {/* Phone notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-50" />
      
      {/* Button outlines */}
      <div className="absolute top-1/4 right-0 w-1.5 h-12 bg-zinc-700 rounded-l-md" /> {/* Power button */}
      <div className="absolute top-1/3 left-0 w-1.5 h-8 bg-zinc-700 rounded-r-md" /> {/* Volume up */}
      <div className="absolute top-[45%] left-0 w-1.5 h-8 bg-zinc-700 rounded-r-md" /> {/* Volume down */}
      
      {/* Inner screen with border */}
      <div className="absolute top-1 right-1 bottom-1 left-1 bg-black rounded-[32px] overflow-hidden">
        {/* Content container */}
        <div 
          ref={contentContainerRef}
          className="relative w-full h-full overflow-hidden"
        >
          {/* Each section of content */}
          {sections.map((section, index) => (
            <div
              key={section.id}
              ref={el => {
                if (sectionRefs && sectionRefs.current) {
                  sectionRefs.current[index] = el;
                }
              }}
              className="absolute inset-0 flex flex-col opacity-0"
              style={{ backgroundColor: section.bgColor }}
            >
              {/* Section title */}
              <div 
                ref={el => {
                  if (sectionTitleRefs && sectionTitleRefs.current) {
                    sectionTitleRefs.current[index] = el;
                  }
                }}
                className="px-4 pt-12 pb-3"
              >
                <h3 
                  className="text-lg font-bold" 
                  style={{ color: section.textColor }}
                >
                  {section.title}
                </h3>
                {section.description && (
                  <p 
                    ref={el => {
                      if (sectionDescRefs && sectionDescRefs.current) {
                        sectionDescRefs.current[index] = el;
                      }
                    }}
                    className="text-xs mt-1" 
                    style={{ color: section.textColor }}
                  >
                    {section.description}
                  </p>
                )}
              </div>
              
              {/* Content area */}
              <div 
                ref={el => {
                  if (sectionContentRefs && sectionContentRefs.current) {
                    sectionContentRefs.current[index] = el;
                  }
                }}
                className="flex-1 overflow-hidden px-3 pb-6"
              >
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;