"use client"

import { createContext, useState, type ReactNode } from "react"

interface FloatingSphereContextType {
  hasFloatingSphere: boolean
  setHasFloatingSphere: (value: boolean) => void
}

export const FloatingSphereContext = createContext<FloatingSphereContextType>({
  hasFloatingSphere: false,
  setHasFloatingSphere: () => {},
})

export const FloatingSphereProvider = ({ children }: { children: ReactNode }) => {
  const [hasFloatingSphere, setHasFloatingSphere] = useState(false)

  return (
    <FloatingSphereContext.Provider value={{ hasFloatingSphere, setHasFloatingSphere }}>
      {children}
    </FloatingSphereContext.Provider>
  )
}
