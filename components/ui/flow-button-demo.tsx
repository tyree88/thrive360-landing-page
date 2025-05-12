"use client"

import type React from "react"

import { FlowButton } from "@/components/ui/flow-button"
import { useState } from "react"

const FlowButtonDemo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLinkLoading, setIsLinkLoading] = useState(false)

  const handleButtonClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLinkLoading(true)
    setTimeout(() => setIsLinkLoading(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-8 bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">FlowButton Examples</h2>

      <div className="flex flex-col gap-4 items-center">
        <h3 className="text-lg font-medium">Button Examples</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <FlowButton
            text="Click to Load"
            onClick={handleButtonClick}
            isLoading={isLoading}
            loadingText="Processing..."
          />
          <FlowButton text="Regular Button" onClick={() => alert("Button clicked!")} />
          <FlowButton text="Always Loading" isLoading={true} />
          <FlowButton text="Disabled Button" disabled />
        </div>
      </div>

      <div className="flex flex-col gap-4 items-center mt-8">
        <h3 className="text-lg font-medium">Link Examples</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          <FlowButton
            text="Loading Link"
            asLink
            href="/about"
            onClick={handleLinkClick}
            isLoading={isLinkLoading}
            loadingText="Navigating..."
          />
          <FlowButton text="Internal Link" asLink href="/about" />
          <FlowButton
            text="External Link"
            asLink
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </div>
  )
}

export default FlowButtonDemo
