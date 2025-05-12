"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface DataTriggerProps {
  children: React.ReactNode
  index: number
  onEnter: (index: number) => void
  className?: string
}

const DataTrigger = ({ children, index, onEnter, className }: DataTriggerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      onEnter(index)
    }
  }, [isInView, index, onEnter])

  return (
    <div ref={ref} className={cn("", className)}>
      {children}
    </div>
  )
}

export default DataTrigger
