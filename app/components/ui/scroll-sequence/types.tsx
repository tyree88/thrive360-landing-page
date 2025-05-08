import React from 'react';

export interface ScrollSequenceSection {
  title: string;
  description?: string;
  bgColor?: string;
  content: React.ReactNode;
}

export interface ThriveScrollSequenceProps {
  title: string;
  subtitle?: string;
  sections: ScrollSequenceSection[];
  className?: string;
}

export interface ScrollSequenceRefs {
  containerRef: React.RefObject<HTMLDivElement>;
  bgRef: React.RefObject<HTMLDivElement>;
  titleRef: React.RefObject<HTMLDivElement>;
  phoneRef: React.RefObject<HTMLDivElement>;
  leftContainerRef: React.RefObject<HTMLDivElement>;
  rightContainerRef: React.RefObject<HTMLDivElement>;
  contentContainerRef: React.RefObject<HTMLDivElement>;
  sectionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}