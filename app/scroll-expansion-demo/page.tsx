"use client"

import { useEffect } from "react"
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero"

export default function ScrollExpansionDemo() {
  useEffect(() => {
    // Reset scroll position when the page loads
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/mental-health-app-interface.png"
        bgImageSrc="/abstract-purple-gradient.png"
        title="Scroll Expansion Demo"
        date="Interactive Experience"
        scrollToExpand="Scroll to expand"
        textBlend={true}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-900">About This Component</h2>
          <p className="text-lg mb-8 text-slate-700">
            This is a demonstration of the ScrollExpandMedia component. As you scroll, the media expands to fill more of
            the screen, creating an immersive experience. This component is perfect for showcasing content in a modern,
            interactive way.
          </p>

          <p className="text-lg mb-8 text-slate-700">
            The ScrollExpandMedia component provides a unique way to engage users with your content through interactive
            scrolling. It works with both images and videos, giving you flexibility in how you present your content.
          </p>

          <div className="bg-slate-100 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">How It Works</h3>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700">
              <li>The component starts with a small media container in the center of the screen</li>
              <li>As the user scrolls down, the media container expands to fill more of the screen</li>
              <li>The title text splits and moves outward as the media expands</li>
              <li>Once fully expanded, the content below fades in</li>
              <li>After the expansion animation completes, normal scrolling behavior resumes</li>
            </ol>
          </div>
        </div>
      </ScrollExpandMedia>
    </div>
  )
}
