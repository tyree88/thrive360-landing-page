import React from 'react';

export interface ScrollSequenceSection {
  id?: string;
  title: string;
  description?: string;
  bgColor: string;
  textColor?: string;
  content: React.ReactNode;
}

export interface ThriveScrollSequenceProps {
  title: string;
  subtitle?: string;
  sections: ScrollSequenceSection[];
  className?: string;
  showSideContainers?: boolean;
  centerPhone?: boolean;
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
  sectionContentRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sectionTitleRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  sectionDescRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}