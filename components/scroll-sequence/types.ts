import type React from "react"
import type { ReactNode } from "react"

export interface ScrollSequenceSection {
  title: string
  description?: string
  bgColor: string
  content: ReactNode
}

export interface ThriveScrollSequenceProps {
  title: string
  subtitle?: string
  sections: ScrollSequenceSection[]
  className?: string
  progressRef?: React.RefObject<HTMLDivElement>
  lenisInstance?: any
  sphereInteraction?: boolean
}
