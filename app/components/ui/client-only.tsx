'use client'

import { useEffect, useState, ReactNode } from 'react'

// Flag to completely disable animations in SSR
export const SSR_ANIMATIONS_DISABLED = true;

/**
 * ClientOnly component that ensures its children are only rendered on the client
 * Use this to wrap components that rely on browser APIs or cause hydration issues
 */
export default function ClientOnly({ 
  children, 
  fallback = null,
  withTransition = false
}: { 
  children: ReactNode,
  fallback?: ReactNode,
  withTransition?: boolean
}) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasTransitioned, setHasTransitioned] = useState(false)

  // Handle mounting state
  useEffect(() => {
    setIsMounted(true)
    
    // If transition is enabled, add a small delay before showing
    if (withTransition) {
      const transitionTimeout = setTimeout(() => {
        setHasTransitioned(true)
      }, 50)
      
      return () => clearTimeout(transitionTimeout)
    }
  }, [withTransition])
  
  // Don't render anything server-side or before mounting
  if (!isMounted) {
    return fallback
  }
  
  // Apply transition if requested
  if (withTransition && !hasTransitioned) {
    return <span style={{ opacity: 0 }}>{children}</span>
  }
  
  // Normal client-side render
  return <>{children}</>
}

/**
 * Helper component to completely avoid rendering certain elements during SSR
 * Use this for purely decorative elements that might cause hydration issues
 */
export function SSRDisabled({ children }: { children: ReactNode }) {
  return <ClientOnly fallback={null} withTransition={false}>{children}</ClientOnly>
}