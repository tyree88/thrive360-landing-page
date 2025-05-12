/**
 * Thrive360 Design System
 *
 * This file defines the core design tokens and styling guidelines
 * for the Thrive360 application. All components should reference
 * these values to ensure consistency.
 */

export const thrive = {
  // Color System
  colors: {
    // Primary Brand Colors
    primary: {
      50: "var(--thrive-purple-50)", // #f5f3ff
      100: "var(--thrive-purple-100)", // #ede9fe
      200: "var(--thrive-purple-200)", // #ddd6fe
      300: "var(--thrive-purple-300)", // #c4b5fd
      400: "var(--thrive-purple-400)", // #a78bfa
      500: "var(--thrive-purple-500)", // #8b5cf6
      600: "var(--thrive-purple-600)", // #7c3aed
      700: "var(--thrive-purple-700)", // #6d28d9
      800: "var(--thrive-purple-800)", // #5b21b6
      900: "var(--thrive-purple-900)", // #4c1d95
    },

    // Secondary Brand Colors (now using purple variants instead of teal)
    secondary: {
      50: "var(--thrive-purple-50)", // #f5f3ff
      100: "var(--thrive-purple-100)", // #ede9fe
      200: "var(--thrive-purple-200)", // #ddd6fe
      300: "var(--thrive-purple-300)", // #c4b5fd
      400: "var(--thrive-purple-400)", // #a78bfa
      500: "var(--thrive-indigo-500)", // #6366f1 (indigo for contrast)
      600: "var(--thrive-indigo-600)", // #4f46e5 (indigo for contrast)
      700: "var(--thrive-indigo-700)", // #4338ca (indigo for contrast)
      800: "var(--thrive-indigo-800)", // #3730a3 (indigo for contrast)
      900: "var(--thrive-indigo-900)", // #312e81 (indigo for contrast)
    },

    // Neutral Colors
    gray: {
      50: "var(--thrive-gray-50)", // #f9fafb
      100: "var(--thrive-gray-100)", // #f3f4f6
      200: "var(--thrive-gray-200)", // #e5e7eb
      300: "var(--thrive-gray-300)", // #d1d5db
      400: "var(--thrive-gray-400)", // #9ca3af
      500: "var(--thrive-gray-500)", // #6b7280
      600: "var(--thrive-gray-600)", // #4b5563
      700: "var(--thrive-gray-700)", // #374151
      800: "var(--thrive-gray-800)", // #1f2937
      900: "var(--thrive-gray-900)", // #111827
    },

    // Semantic Colors
    success: "#8b5cf6", // Now using purple instead of emerald
    warning: "#f59e0b", // Amber 500
    error: "#ef4444", // Red 500
    info: "#6366f1", // Indigo 500 (complementary to purple)

    // Background Colors
    background: {
      light: "#fcfaff",
      dark: "#1a103c",
      card: "#ffffff",
      subtle: "var(--thrive-purple-50)",
    },

    // Text Colors
    text: {
      primary: "var(--thrive-purple-900)",
      secondary: "var(--thrive-purple-700)",
      muted: "var(--thrive-purple-600)",
      light: "#ffffff",
    },

    // Border Colors
    border: {
      light: "var(--thrive-purple-100)",
      medium: "var(--thrive-purple-200)",
      dark: "var(--thrive-purple-300)",
    },
  },

  // Typography System
  typography: {
    // Font Families
    fontFamily: {
      base: 'var(--font-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
      heading:
        'var(--font-sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },

    // Font Sizes
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
    },

    // Font Weights
    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },

    // Line Heights
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },

    // Letter Spacing
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },

  // Spacing System
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem", // 2px
    1: "0.25rem", // 4px
    1.5: "0.375rem", // 6px
    2: "0.5rem", // 8px
    2.5: "0.625rem", // 10px
    3: "0.75rem", // 12px
    3.5: "0.875rem", // 14px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    9: "2.25rem", // 36px
    10: "2.5rem", // 40px
    11: "2.75rem", // 44px
    12: "3rem", // 48px
    14: "3.5rem", // 56px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
    28: "7rem", // 112px
    32: "8rem", // 128px
    36: "9rem", // 144px
    40: "10rem", // 160px
    44: "11rem", // 176px
    48: "12rem", // 192px
    52: "13rem", // 208px
    56: "14rem", // 224px
    60: "15rem", // 240px
    64: "16rem", // 256px
    72: "18rem", // 288px
    80: "20rem", // 320px
    96: "24rem", // 384px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.125rem", // 2px
    DEFAULT: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
    // Brand-specific shadows
    "primary-sm": "0 2px 8px 0 rgba(124, 58, 237, 0.2)",
    "primary-md": "0 4px 12px 0 rgba(124, 58, 237, 0.3)",
    "primary-lg": "0 8px 20px 0 rgba(124, 58, 237, 0.4)",
  },

  // Z-Index
  zIndex: {
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50",
    auto: "auto",
    // App-specific layers
    header: "100",
    modal: "200",
    tooltip: "300",
    toast: "400",
  },

  // Transitions
  transitions: {
    duration: {
      75: "75ms",
      100: "100ms",
      150: "150ms",
      200: "200ms",
      300: "300ms",
      500: "500ms",
      700: "700ms",
      1000: "1000ms",
    },
    timing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // Gradients
  gradients: {
    // Updated gradients to use only purple/indigo tones
    "primary-gradient": "linear-gradient(90deg, var(--thrive-purple-600) 0%, var(--thrive-indigo-500) 100%)",
    "primary-light": "linear-gradient(90deg, var(--thrive-purple-500) 0%, var(--thrive-purple-400) 100%)",
    "primary-dark": "linear-gradient(90deg, var(--thrive-purple-700) 0%, var(--thrive-purple-600) 100%)",
    "secondary-light": "linear-gradient(90deg, var(--thrive-indigo-500) 0%, var(--thrive-indigo-400) 100%)",
    "secondary-dark": "linear-gradient(90deg, var(--thrive-indigo-700) 0%, var(--thrive-indigo-600) 100%)",
    "purple-to-indigo": "linear-gradient(90deg, var(--thrive-purple-600) 0%, var(--thrive-indigo-500) 100%)",
    "purple-to-violet": "linear-gradient(90deg, var(--thrive-purple-600) 0%, #8b5cf6 100%)",
    "indigo-to-purple": "linear-gradient(90deg, var(--thrive-indigo-500) 0%, var(--thrive-purple-500) 100%)",
    "purple-radial": "radial-gradient(circle at center, var(--thrive-purple-500) 0%, var(--thrive-purple-700) 100%)",
  },

  // Component-specific styling
  components: {
    // Button variants
    button: {
      base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants: {
        primary: "bg-thrive-purple-600 text-white hover:bg-thrive-purple-700",
        secondary: "bg-thrive-indigo-500 text-white hover:bg-thrive-indigo-600", // Changed from teal to indigo
        outline: "border border-thrive-purple-200 bg-background hover:bg-thrive-purple-50 hover:text-thrive-purple-700",
        ghost: "hover:bg-thrive-purple-50 hover:text-thrive-purple-700",
        link: "text-thrive-purple-600 underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-thrive-purple-600 to-thrive-indigo-500 hover:from-thrive-purple-700 hover:to-thrive-indigo-600 text-white", // Changed to purple-indigo
      },
      sizes: {
        sm: "h-9 rounded-md px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },

    // Card variants
    card: {
      base: "bg-white rounded-lg overflow-hidden",
      variants: {
        default: "border border-thrive-purple-100 shadow-sm",
        elevated: "border border-thrive-purple-100 shadow-md",
        filled: "bg-thrive-purple-50 border border-thrive-purple-100",
        gradient: "bg-gradient-to-br from-thrive-purple-50 to-white border border-thrive-purple-100 shadow-sm",
      },
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },

    // Input variants
    input: {
      base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      variants: {
        default: "border-thrive-purple-200 focus-visible:ring-thrive-purple-500",
        filled: "bg-thrive-purple-50 border-thrive-purple-200 focus-visible:ring-thrive-purple-500",
        dark: "bg-slate-800 border-purple-500/30 text-white placeholder:text-gray-500 focus-visible:ring-purple-500",
      },
    },

    // Section variants
    section: {
      base: "py-12 md:py-20",
      variants: {
        default: "bg-white",
        light: "bg-thrive-purple-50",
        dark: "bg-slate-900 text-white",
        gradient: "bg-gradient-to-b from-thrive-purple-50 to-white",
      },
      spacing: {
        sm: "py-8 md:py-12",
        default: "py-12 md:py-20",
        lg: "py-16 md:py-24",
        xl: "py-20 md:py-32",
      },
    },
  },

  // Responsive breakpoints
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
}

export default thrive
