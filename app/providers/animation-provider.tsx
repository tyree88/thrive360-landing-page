'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Define the animation context type
type AnimationContextType = {
  isReady: boolean
  gsapInstance: typeof gsap | null
  isMobile: boolean
  prefersReducedMotion: boolean
  registerAnimation: (callback: () => void) => void
  refreshAnimations: () => void
}

// Create a context with a default value
const AnimationContext = createContext<AnimationContextType>({
  isReady: false,
  gsapInstance: null,
  isMobile: false,
  prefersReducedMotion: false,
  registerAnimation: () => {},
  refreshAnimations: () => {}
})

// Custom hook to use the animation context
export const useAnimation = () => useContext(AnimationContext)

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [animationCallbacks, setAnimationCallbacks] = useState<Array<() => void>>([])
  
  // Register a new animation callback to be run when the system is ready
  const registerAnimation = (callback: () => void) => {
    setAnimationCallbacks(prev => [...prev, callback])
    
    // If system is already ready, run the callback immediately
    if (isReady && typeof window !== 'undefined') {
      callback()
    }
  }
  
  // Refresh all animations by triggering ScrollTrigger refresh
  const refreshAnimations = () => {
    if (!isReady || typeof window === 'undefined') return
    ScrollTrigger.refresh()
  }
  
  // Check for mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkMobile()
      window.addEventListener('resize', checkMobile)
      
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      
      const handleMotionPreference = () => {
        setPrefersReducedMotion(mediaQuery.matches)
      }
      
      handleMotionPreference()
      mediaQuery.addEventListener('change', handleMotionPreference)
      
      return () => mediaQuery.removeEventListener('change', handleMotionPreference)
    }
  }, [])
  
  // Initialize GSAP and all plugins
  useEffect(() => {
    // Only register plugins on the client side
    if (typeof window !== 'undefined') {
      try {
        // Register GSAP plugins - do this synchronously to avoid timeouts
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
        
        // Set ready immediately but execute animations after a small delay
        setIsReady(true)
        console.log('Animation system initialized')
        
        // Use requestAnimationFrame to defer heavy animation work
        // This helps with initial page render performance
        requestAnimationFrame(() => {
          // Run registered animation callbacks
          if (animationCallbacks.length > 0) {
            animationCallbacks.forEach(callback => {
              try {
                callback()
              } catch (err) {
                console.error('Animation callback error:', err)
              }
            })
          }
          
          // Refresh ScrollTrigger after a small delay
          setTimeout(() => {
            try {
              ScrollTrigger.refresh()
            } catch (err) {
              console.error('ScrollTrigger refresh error:', err)
            }
          }, 50)
        })
      } catch (err) {
        console.error('Animation provider initialization error:', err)
        // Still mark as ready to prevent blocking the UI
        setIsReady(true)
      }
    }
  }, [animationCallbacks])
  
  const value = {
    isReady,
    gsapInstance: typeof window !== 'undefined' ? gsap : null,
    isMobile,
    prefersReducedMotion,
    registerAnimation,
    refreshAnimations
  }
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}