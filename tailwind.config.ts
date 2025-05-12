import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Thrive360 unified purple color palette
        "thrive-purple": {
          DEFAULT: "hsl(265, 65%, 55%)",
          50: "hsl(265, 100%, 98%)",
          100: "hsl(265, 90%, 95%)",
          200: "hsl(265, 85%, 90%)",
          300: "hsl(265, 80%, 85%)",
          400: "hsl(265, 75%, 75%)",
          500: "hsl(265, 70%, 65%)",
          600: "hsl(265, 65%, 55%)",
          700: "hsl(265, 60%, 45%)",
          800: "hsl(265, 55%, 35%)",
          900: "hsl(265, 50%, 25%)",
          950: "hsl(265, 45%, 15%)",
        },
        // For backward compatibility
        "light-purple": {
          50: "hsl(265, 100%, 98%)", // Same as thrive-purple-50
          100: "hsl(265, 90%, 95%)", // Same as thrive-purple-100
          200: "hsl(265, 85%, 90%)", // Same as thrive-purple-200
          300: "hsl(265, 80%, 85%)", // Same as thrive-purple-300
          400: "hsl(265, 75%, 75%)", // Same as thrive-purple-400
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shine: "shine var(--duration) infinite linear",
        "gentle-pulse": "gentle-pulse 4s infinite ease-in-out",
        aurora: "aurora 15s ease infinite",
        "aurora-slow": "aurora 25s ease infinite",
        "aurora-fast": "aurora 10s ease infinite",
        "aurora-reverse": "aurora-reverse 20s ease infinite",
        blob: "blob 7s infinite",
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shine: {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
        "gentle-pulse": {
          "0%": {
            "box-shadow": "0 0 120px 70px rgba(var(--thrive-purple-500), 0.3)",
          },
          "50%": {
            "box-shadow": "0 0 140px 80px rgba(var(--thrive-purple-500), 0.4)",
          },
          "100%": {
            "box-shadow": "0 0 120px 70px rgba(var(--thrive-purple-500), 0.3)",
          },
        },
        aurora: {
          "0%": { transform: "translate(0%, 0%) rotate(0deg)" },
          "25%": { transform: "translate(2%, 2%) rotate(1deg)" },
          "50%": { transform: "translate(0%, 5%) rotate(0deg)" },
          "75%": { transform: "translate(-2%, 2%) rotate(-1deg)" },
          "100%": { transform: "translate(0%, 0%) rotate(0deg)" },
        },
        "aurora-reverse": {
          "0%": { transform: "translate(0%, 0%) rotate(0deg)" },
          "25%": { transform: "translate(-2%, -2%) rotate(-1deg)" },
          "50%": { transform: "translate(0%, -5%) rotate(0deg)" },
          "75%": { transform: "translate(2%, -2%) rotate(1deg)" },
          "100%": { transform: "translate(0%, 0%) rotate(0deg)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      // Add standardized box shadows
      boxShadow: {
        "primary-sm": "0 2px 8px 0 rgba(149, 97, 226, 0.2)",
        "primary-md": "0 4px 12px 0 rgba(149, 97, 226, 0.3)",
        "primary-lg": "0 8px 20px 0 rgba(149, 97, 226, 0.4)",
      },
      // Add standardized gradients
      backgroundImage: {
        "primary-gradient": "linear-gradient(90deg, hsl(265, 65%, 55%) 0%, hsl(265, 70%, 65%) 100%)",
        "primary-light-gradient": "linear-gradient(90deg, hsl(265, 70%, 65%) 0%, hsl(265, 75%, 75%) 100%)",
        "primary-dark-gradient": "linear-gradient(90deg, hsl(265, 60%, 45%) 0%, hsl(265, 65%, 55%) 100%)",
        "purple-to-light": "linear-gradient(90deg, hsl(265, 65%, 55%) 0%, hsl(265, 75%, 75%) 100%)",
        "purple-to-dark": "linear-gradient(90deg, hsl(265, 65%, 55%) 0%, hsl(265, 55%, 35%) 100%)",
      },
      utilities: {
        ".animation-delay-2000": {
          "animation-delay": "2s",
        },
        ".animation-delay-4000": {
          "animation-delay": "4s",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
