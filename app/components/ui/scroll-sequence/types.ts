import { ReactNode } from "react";

export interface ScrollSequenceSection {
  title: string;
  description?: string;
  bgColor: string;
  content: ReactNode;
}

export interface ThriveScrollSequenceProps {
  title: string;
  subtitle?: string;
  sections: ScrollSequenceSection[];
  className?: string;
}