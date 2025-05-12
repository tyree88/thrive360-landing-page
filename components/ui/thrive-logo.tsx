"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ThriveLogoProps {
  variant?: "color" | "white" | "black"
  type?: "full" | "brandmark"
  size?: "small" | "medium" | "large"
  className?: string
}

export function ThriveLogo({ variant = "color", type = "full", size = "medium", className }: ThriveLogoProps) {
  const logoSrc = `/logos/${type}-${variant}${variant === "white" ? "" : ""}.png`

  const sizeClasses = {
    small: type === "full" ? "h-8 w-auto" : "h-8 w-8",
    medium: type === "full" ? "h-12 w-auto" : "h-12 w-12",
    large: type === "full" ? "h-16 w-auto" : "h-16 w-16",
  }

  // Create the logo element without wrapping it in a Link
  const logoElement = (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="Thrive360 Logo"
      width={type === "full" ? 240 : 64}
      height={type === "full" ? 64 : 64}
      className={cn(sizeClasses[size], className)}
      priority
    />
  )

  // Return the logo with a Link to home
  return (
    <Link href="/" className="inline-block">
      {logoElement}
    </Link>
  )
}
