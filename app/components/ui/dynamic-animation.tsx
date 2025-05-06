'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react'
import { useAnimation } from '@/providers/animation-provider'
import { safeWindow } from '@/lib/utils'

interface DynamicAnimationProps {
  children: ReactNode
  type: 'fade' | 'slide' | 'zoom' | 'none'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  triggerOnce?: boolean
  className?: string
  style?: React.CSSProperties
  id?: string
}

/**
 * A component that safely applies animations without causing hydration mismatches
 * by only activating animations on the client side after initial render
 */
export default function DynamicAnimation({
  children,
  type = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  triggerOnce = true,
  className = '',
  style = {},
  id,
}: DynamicAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const { isReady, gsapInstance } = useAnimation()

  // Mark as client-side rendered after mount
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Apply animation once component is mounted and animation system is ready
  useEffect(() => {
    if (!isClient || !isReady || !gsapInstance || !containerRef.current) return
    
    // Set initial state based on animation type
    let initialProps = {}
    
    switch (type) {
      case 'fade':
        initialProps = { opacity: 0, y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0 }
        break
      case 'slide':
        initialProps = { 
          x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
          y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
          opacity: 0 
        }
        break
      case 'zoom':
        initialProps = { scale: 0.9, opacity: 0 }
        break
      case 'none':
        return // Skip animation
    }
    
    // Run the animation with a small delay to ensure DOM is ready
    const animTimeout = setTimeout(() => {
      gsapInstance.fromTo(
        containerRef.current,
        initialProps,
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power2.out',
          scrollTrigger: containerRef.current ? {
            trigger: containerRef.current,
            start: 'top 85%',
            once: triggerOnce
          } : undefined
        }
      )
    }, 100)
    
    return () => clearTimeout(animTimeout)
  }, [isClient, isReady, gsapInstance, type, direction, delay, duration, triggerOnce])
  
  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ 
        opacity: isClient ? undefined : 1, // Prevent flash during hydration
        transform: isClient ? undefined : 'none', // Prevent transform during hydration
        ...style 
      }}
      id={id}
    >
      {children}
    </div>
  )
}