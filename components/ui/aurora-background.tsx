"use client"
import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"
import type React from "react"
import type { ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  intensity?: "subtle" | "medium" | "high"
  colorScheme?: "purple" | "blue" | "teal" | "custom"
  customColors?: {
    primary?: string
    secondary?: string
    tertiary?: string
  }
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  intensity = "medium",
  colorScheme = "purple",
  customColors,
  ...props
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const updateDimensions = () => {
      if (!containerRef.current) return
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }

    // Initial dimensions
    updateDimensions()

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Calculate normalized mouse position (0-1)
  const normalizedX = dimensions.width ? mousePosition.x / dimensions.width : 0.5
  const normalizedY = dimensions.height ? mousePosition.y / dimensions.height : 0.5

  // Get color scheme based on prop
  const getColorScheme = () => {
    switch (colorScheme) {
      case "blue":
        return {
          from: "from-slate-900",
          via: "via-blue-900",
          to: "to-indigo-950",
          accent1: "theme(colors.blue.500/30%)",
          accent2: "theme(colors.indigo.600/20%)",
          layer1: "from-blue-800/20 via-transparent to-indigo-900/20",
          layer2: "theme(colors.blue.600/30%)",
          layer3: "theme(colors.indigo.700/30%)",
        }
      case "teal":
        return {
          from: "from-slate-900",
          via: "via-teal-900",
          to: "to-emerald-950",
          accent1: "theme(colors.teal.500/30%)",
          accent2: "theme(colors.emerald.600/20%)",
          layer1: "from-teal-800/20 via-transparent to-emerald-900/20",
          layer2: "theme(colors.teal.600/30%)",
          layer3: "theme(colors.emerald.700/30%)",
        }
      case "custom":
        return {
          from: customColors?.primary ? `from-[${customColors.primary}]` : "from-slate-900",
          via: customColors?.secondary ? `via-[${customColors.secondary}]` : "via-purple-900",
          to: customColors?.tertiary ? `to-[${customColors.tertiary}]` : "to-indigo-950",
          accent1: customColors?.primary
            ? `${customColors.primary.replace(")", "/30%)")}`
            : "theme(colors.purple.500/30%)",
          accent2: customColors?.secondary
            ? `${customColors.secondary.replace(")", "/20%)")}`
            : "theme(colors.indigo.600/20%)",
          layer1: `from-${customColors?.primary || "purple"}-800/20 via-transparent to-${customColors?.tertiary || "indigo"}-900/20`,
          layer2: customColors?.primary
            ? `${customColors.primary.replace(")", "/30%)")}`
            : "theme(colors.purple.600/30%)",
          layer3: customColors?.tertiary
            ? `${customColors.tertiary.replace(")", "/30%)")}`
            : "theme(colors.indigo.700/30%)",
        }
      default: // purple
        return {
          from: "from-slate-900",
          via: "via-purple-900",
          to: "to-indigo-950",
          accent1: "theme(colors.purple.500/30%)",
          accent2: "theme(colors.indigo.600/20%)",
          layer1: "from-purple-800/20 via-transparent to-indigo-900/20",
          layer2: "theme(colors.purple.600/30%)",
          layer3: "theme(colors.indigo.700/30%)",
        }
    }
  }

  const colors = getColorScheme()

  // Get animation intensity
  const getIntensityClass = () => {
    switch (intensity) {
      case "subtle":
        return "opacity-50 animate-aurora-slow"
      case "high":
        return "opacity-80 animate-aurora-fast"
      default: // medium
        return "opacity-70 animate-aurora"
    }
  }

  return (
    <main>
      <div
        ref={containerRef}
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-slate-900 dark:bg-slate-950 text-white transition-bg overflow-hidden",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient layer */}
          <div
            className={cn(
              `pointer-events-none absolute inset-0 ${getIntensityClass()}
              bg-gradient-to-b ${colors.from} ${colors.via} ${colors.to}
              before:absolute before:inset-0 
              before:bg-[radial-gradient(circle_at_center,${colors.accent1},transparent_50%)]
              after:absolute after:inset-0 
              after:bg-[radial-gradient(circle_at_center,${colors.accent2},transparent_70%)]
              after:animate-pulse after:duration-[10s]`,
              showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
            )}
            style={{
              // Subtle movement based on mouse position
              transform: `translate(${(normalizedX - 0.5) * -10}px, ${(normalizedY - 0.5) * -10}px)`,
              transition: "transform 0.5s ease-out",
            }}
          ></div>

          {/* Dynamic aurora layers with different animations */}
          <div
            className={`absolute inset-0 w-[100vw] h-full bg-gradient-to-tr ${colors.layer1} animate-aurora`}
            style={{
              transform: `translate(${(normalizedX - 0.5) * -15}px, ${(normalizedY - 0.5) * -15}px)`,
              transition: "transform 0.7s ease-out",
            }}
          ></div>

          <div
            className={`absolute inset-0 w-[100vw] h-full bg-[radial-gradient(ellipse_at_top,${colors.layer2},transparent_50%)] blur-xl animate-aurora-slow`}
            style={{
              transform: `translate(${(normalizedX - 0.5) * -20}px, ${(normalizedY - 0.5) * -20}px)`,
              transition: "transform 0.9s ease-out",
            }}
          ></div>

          <div
            className={`absolute inset-0 w-[100vw] h-full bg-[radial-gradient(ellipse_at_bottom,${colors.layer3},transparent_50%)] blur-xl animate-aurora-reverse`}
            style={{
              transform: `translate(${(normalizedX - 0.5) * -25}px, ${(normalizedY - 0.5) * -25}px)`,
              transition: "transform 1.1s ease-out",
            }}
          ></div>

          {/* Additional dynamic layers */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full filter blur-[100px] animate-blob"></div>
            <div className="absolute top-3/4 -right-1/4 w-1/2 h-1/2 bg-indigo-500/20 rounded-full filter blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/3 w-1/3 h-1/3 bg-blue-500/20 rounded-full filter blur-[100px] animate-blob animation-delay-4000"></div>
          </div>

          {/* Particle effect overlay */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </main>
  )
}
