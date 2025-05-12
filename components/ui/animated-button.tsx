"use client"

import type React from "react"

import { FlowButton } from "./flow-button"

export function AnimatedButton({
  children,
  onClick,
  className,
  href,
  ...props
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  href?: string
  [key: string]: any
}) {
  return (
    <FlowButton onClick={onClick} className={className} asLink={href ? true : false} href={href} {...props}>
      {children}
    </FlowButton>
  )
}
