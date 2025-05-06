'use client'

import { useRef, useEffect, ReactNode, useState } from 'react'
import { useAnimation } from '@/providers/animation-provider'
import ClientOnly from './client-only'

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none'

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  duration?: number
  threshold?: string
  once?: boolean
  style?: React.CSSProperties
  onAnimationComplete?: () => void
  skipAnimationWhen?: boolean
  id?: string
}

/**
 * A component that safely applies animations only on the client side
 * Designed to prevent hydration mismatches between server and client
 */
export default function AnimatedElement({
  children,
  className = '',
  animation = 'fade-in',
  delay = 0,
  duration = 0.6,
  threshold = 'top 85%',
  once = true,
  style = {},
  onAnimationComplete,
  skipAnimationWhen = false,
  id,
  ...props
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const { 
    isReady, 
    gsapInstance, 
    prefersReducedMotion,
    registerAnimation 
  } = useAnimation()

  // Ensure element is visible by default if animations are disabled
  useEffect(() => {
    if (!elementRef.current) return
    
    // Don't animate if reduced motion is preferred or explicitly skipped
    const skipAnimation = prefersReducedMotion || skipAnimationWhen || animation === 'none'
    
    if (skipAnimation) {
      // Make element immediately visible
      elementRef.current.style.opacity = '1'
      elementRef.current.style.transform = 'none'
    }
  }, [prefersReducedMotion, skipAnimationWhen, animation])
  
  // Register animation to be run when animation system is ready
  useEffect(() => {
    if (!elementRef.current) return
    
    // Skip animation setup if not needed
    if (prefersReducedMotion || skipAnimationWhen || animation === 'none' || hasAnimated) {
      return
    }
    
    // Register this animation with the animation system - lightweight registration
    // that won't block the main thread during initial page load
    const animationId = setTimeout(() => {
      registerAnimation(() => {
        // Do nothing if animation requirements aren't met
        if (!gsapInstance || !elementRef.current || hasAnimated) return
        
        try {
          // Get animation properties based on animation type
          const animProps = getAnimationProps(animation)
          
          // Create the animation with light settings initially
          const anim = gsapInstance.fromTo(
            elementRef.current,
            { ...animProps.from },
            { 
              ...animProps.to,
              duration: prefersReducedMotion ? 0.1 : duration,
              delay: prefersReducedMotion ? 0 : delay,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: elementRef.current,
                start: threshold,
                once
              },
              onComplete: () => {
                setHasAnimated(true)
                if (onAnimationComplete) onAnimationComplete()
              }
            }
          )
          
          return () => {
            anim.kill()
          }
        } catch (err) {
          // Ensure visibility even if animation fails
          if (elementRef.current) {
            elementRef.current.style.opacity = '1'
            elementRef.current.style.transform = 'none'
          }
          console.error('Animation error:', err)
        }
      })
    }, 0) // Use minimal timeout to escape current call stack
    
    return () => clearTimeout(animationId)
  }, [
    animation, delay, duration, threshold, once, 
    onAnimationComplete, registerAnimation, gsapInstance, 
    prefersReducedMotion, skipAnimationWhen, hasAnimated
  ])

  return (
    <ClientOnly>
      <div 
        ref={elementRef} 
        className={className} 
        style={{ 
          opacity: 0, // Start hidden (will be animated to visible)
          transform: 'none', // Use transform:none to avoid SSR mismatch
          ...style 
        }}
        id={id}
        {...props}
      >
        {children}
      </div>
    </ClientOnly>
  )
}

/**
 * Helper function to get animation properties based on animation type
 */
function getAnimationProps(animation: AnimationType) {
  switch (animation) {
    case 'fade-in':
      return {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 }
      }
    case 'slide-up':
      return {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 }
      }
    case 'slide-down':
      return {
        from: { opacity: 0, y: -40 },
        to: { opacity: 1, y: 0 }
      }
    case 'slide-left':
      return {
        from: { opacity: 0, x: 40 },
        to: { opacity: 1, x: 0 }
      }
    case 'slide-right':
      return {
        from: { opacity: 0, x: -40 },
        to: { opacity: 1, x: 0 }
      }
    case 'scale':
      return {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 }
      }
    case 'none':
    default:
      return {
        from: { opacity: 1 },
        to: { opacity: 1 }
      }
  }
}