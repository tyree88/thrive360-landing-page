import { ReactNode } from 'react';

export interface ScrollSequenceSection {
  id: string;
  title: string;
  description?: string;
  bgColor: string;
  textColor: string;
  content: ReactNode;
}

export interface ThriveScrollSequenceProps {
  title: string;
  subtitle?: string;
  sections: ScrollSequenceSection[];
  className?: string;
  showSideContainers?: boolean;
  centerPhone?: boolean;
}