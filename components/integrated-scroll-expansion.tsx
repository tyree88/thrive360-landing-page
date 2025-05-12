"use client"

import { type ReactNode, useEffect } from "react"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"

interface IntegratedScrollExpansionProps {
  mediaType?: "video" | "image"
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title: string
  subtitle?: string
  scrollPrompt?: string
  textBlend?: boolean
  children: ReactNode
}

export default function IntegratedScrollExpansion({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollPrompt = "Scroll to explore",
  textBlend = true,
  children,
}: IntegratedScrollExpansionProps) {
  useEffect(() => {
    // Reset scroll position when the component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={mediaSrc}
        posterSrc={posterSrc}
        bgImageSrc={bgImageSrc}
        title={title}
        date={subtitle}
        scrollToExpand={scrollPrompt}
        textBlend={textBlend}
      >
        {/* The children will be rendered once the media is expanded */}
        <div className="w-full">{children}</div>
      </ScrollExpandMedia>
    </div>
  )
}
