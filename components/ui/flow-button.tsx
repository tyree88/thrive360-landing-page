"use client"
import { ArrowRight, Loader2 } from "lucide-react"
import type React from "react"

import Link from "next/link"
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react"

type BaseProps = {
  text?: string
  className?: string
  variant?: "default" | "primary" | "secondary"
  isLoading?: boolean
  loadingText?: string
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    asLink?: false
  }

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    asLink: true
    href: string
  }

type FlowButtonProps = ButtonProps | LinkProps

export function FlowButton({
  text = "Modern Button",
  className = "",
  variant = "default",
  isLoading = false,
  loadingText,
  ...props
}: FlowButtonProps) {
  // Common classes for both button and link
  const baseClasses =
    "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95] disabled:opacity-70 disabled:cursor-not-allowed"

  // Common content for both button and link
  const content = isLoading ? (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{loadingText || text}</span>
    </div>
  ) : (
    <>
      {/* Left arrow (arr-2) */}
      <ArrowRight className="absolute w-4 h-4 left-[-25%] stroke-[#111111] fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight className="absolute w-4 h-4 right-4 stroke-[#111111] fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
    </>
  )

  // Render as link if asLink is true
  if ("asLink" in props && props.asLink) {
    const { asLink, href, ...linkProps } = props

    // Disable link functionality when loading
    const linkProps2 = {
      ...linkProps,
      ...(isLoading
        ? {
            onClick: (e: React.MouseEvent) => e.preventDefault(),
            "aria-disabled": true,
            tabIndex: -1,
          }
        : {}),
    }

    return (
      <Link
        href={isLoading ? "#" : href}
        className={`${baseClasses} ${isLoading ? "pointer-events-none opacity-70" : ""} ${className}`}
        {...linkProps2}
      >
        {content}
      </Link>
    )
  }

  // Otherwise render as button
  const { asLink, ...buttonProps } = props as ButtonProps
  return (
    <button className={`${baseClasses} ${className}`} disabled={isLoading || buttonProps.disabled} {...buttonProps}>
      {content}
    </button>
  )
}
