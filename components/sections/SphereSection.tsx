"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { FloatingSphereProvider } from "@/context/FloatingSphereContext"
import FloatingSphere from "@/components/ui/FloatingSphere"
import { useLenis } from "@/hooks/useLenis"

export default function SphereSection({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <FloatingSphereProvider>
      <div ref={containerRef} className="relative">
        {mounted && <FloatingSphere />}
        {children}
      </div>
    </FloatingSphereProvider>
  )
}
