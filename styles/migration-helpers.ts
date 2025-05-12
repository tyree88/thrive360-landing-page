/**
 * Thrive360 Style Migration Helpers
 *
 * This file provides utility functions to help migrate from the old styling approach
 * to the new standardized design system.
 */

import { cva } from "class-variance-authority"
import thrive from "./theme"

/**
 * Maps old color classes to new standardized color classes
 *
 * @example
 * // Old class: bg-light-purple-100
 * // New class: bg-thrive-purple-100
 * const className = mapLegacyColors('bg-light-purple-100');
 */
export function mapLegacyColors(className: string): string {
  // Map light-purple to thrive-purple
  return className.replace(/light-purple-(\d+)/g, "thrive-purple-$1")
}

/**
 * Maps old gradient definitions to new standardized gradients
 *
 * @example
 * // Old: bg-gradient-to-r from-purple-500 to-indigo-500
 * // New: bg-gradient-to-r from-thrive-purple-500 to-indigo-500
 * const className = mapLegacyGradients('bg-gradient-to-r from-purple-500 to-indigo-500');
 */
export function mapLegacyGradients(className: string): string {
  // Map purple to thrive-purple in gradients
  return className
    .replace(/from-purple-(\d+)/g, "from-thrive-purple-$1")
    .replace(/to-purple-(\d+)/g, "to-thrive-purple-$1")
    .replace(/via-purple-(\d+)/g, "via-thrive-purple-$1")
}

/**
 * Combines multiple class mapping functions
 *
 * @example
 * const className = mapLegacyClasses('bg-light-purple-100 bg-gradient-to-r from-purple-500');
 */
export function mapLegacyClasses(className: string): string {
  return mapLegacyGradients(mapLegacyColors(className))
}

/**
 * Creates a standardized card component class based on the theme
 */
export const cardVariants = cva(thrive.components.card.base, {
  variants: {
    variant: {
      default: thrive.components.card.variants.default,
      elevated: thrive.components.card.variants.elevated,
      filled: thrive.components.card.variants.filled,
      gradient: thrive.components.card.variants.gradient,
    },
    padding: {
      none: thrive.components.card.padding.none,
      sm: thrive.components.card.padding.sm,
      default: thrive.components.card.padding.default,
      lg: thrive.components.card.padding.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "default",
  },
})

/**
 * Creates a standardized section component class based on the theme
 */
export const sectionVariants = cva(thrive.components.section.base, {
  variants: {
    variant: {
      default: thrive.components.section.variants.default,
      light: thrive.components.section.variants.light,
      dark: thrive.components.section.variants.dark,
      gradient: thrive.components.section.variants.gradient,
    },
    spacing: {
      sm: thrive.components.section.spacing.sm,
      default: thrive.components.section.spacing.default,
      lg: thrive.components.section.spacing.lg,
      xl: thrive.components.section.spacing.xl,
    },
  },
  defaultVariants: {
    variant: "default",
    spacing: "default",
  },
})
