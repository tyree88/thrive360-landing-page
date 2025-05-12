"use client"

import { useCallback } from "react"
import thrive from "@/styles/theme"

/**
 * Hook to access the Thrive360 design system
 *
 * This hook provides access to the design tokens and styling guidelines
 * defined in the Thrive360 design system.
 *
 * @example
 * const { colors, typography, spacing } = useTheme();
 * return <div style={{ color: colors.primary[600] }}>Themed content</div>;
 */
export function useTheme() {
  // Helper function to get a specific color
  const getColor = useCallback((colorPath: string): string => {
    const parts = colorPath.split(".")
    let result: any = thrive.colors

    for (const part of parts) {
      if (result[part] === undefined) {
        console.warn(`Color path "${colorPath}" not found in theme`)
        return ""
      }
      result = result[part]
    }

    return result
  }, [])

  // Helper function to get a specific spacing value
  const getSpacing = useCallback((size: string | number): string => {
    if (typeof size === "string" && thrive.spacing[size] !== undefined) {
      return thrive.spacing[size]
    } else if (typeof size === "number" && thrive.spacing[size] !== undefined) {
      return thrive.spacing[size]
    }

    console.warn(`Spacing "${size}" not found in theme`)
    return ""
  }, [])

  // Helper function to get a specific font size
  const getFontSize = useCallback((size: string): string => {
    if (thrive.typography.fontSize[size] !== undefined) {
      return thrive.typography.fontSize[size]
    }

    console.warn(`Font size "${size}" not found in theme`)
    return ""
  }, [])

  // Helper function to get a specific shadow
  const getShadow = useCallback((shadow: string): string => {
    if (thrive.shadows[shadow] !== undefined) {
      return thrive.shadows[shadow]
    }

    console.warn(`Shadow "${shadow}" not found in theme`)
    return ""
  }, [])

  // Helper function to get a specific gradient
  const getGradient = useCallback((gradient: string): string => {
    if (thrive.gradients[gradient] !== undefined) {
      return thrive.gradients[gradient]
    }

    console.warn(`Gradient "${gradient}" not found in theme`)
    return ""
  }, [])

  return {
    ...thrive,
    getColor,
    getSpacing,
    getFontSize,
    getShadow,
    getGradient,
  }
}

export default useTheme
