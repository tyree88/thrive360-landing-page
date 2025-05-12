"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, type MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { ShineBorder } from "@/components/ui/shine-border"

export interface SolutionElementProps extends React.HTMLAttributes<HTMLElement> {
  // Animation
  useMotion: boolean
  animationProps?: MotionProps

  // Patterns
  showPatterns?: boolean
  patternOpacity?: number

  // Transitions
  showTransitionTop?: boolean
  showTransitionBottom?: boolean
  prevBgColor?: string
  nextBgColor?: string

  // Video Carousel
  videos?: Array<{
    src: string
    title?: string
    description?: string
    poster?: string
  }>
  autoPlay?: boolean
  interval?: number
  showControls?: boolean

  // Children
  children: React.ReactNode
}

export const SolutionElement = React.forwardRef<HTMLElement, SolutionElementProps>(
  (
    {
      // Animation
      useMotion,
      animationProps = {},

      // Patterns
      showPatterns = false,
      patternOpacity = 0.1,

      // Transitions
      showTransitionTop = false,
      showTransitionBottom = false,
      prevBgColor,
      nextBgColor,

      // Video Carousel
      videos = [],
      autoPlay = false,
      interval = 5000,
      showControls = true,

      // Standard props
      children,
      className,
      ...props
    },
    ref,
  ) => {
    // Section element (with or without motion)
    const Element = useMotion ? motion.section : "section"

    // Video carousel state
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

    // Handle video navigation
    const goToNextVideo = () => {
      if (videos.length > 0) {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
      }
    }

    const goToPrevVideo = () => {
      if (videos.length > 0) {
        setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
      }
    }

    // Handle play/pause
    const togglePlayPause = () => {
      if (videos.length > 0) {
        const videoElement = videoRefs.current[currentVideoIndex]
        if (videoElement) {
          if (isPlaying) {
            videoElement.pause()
          } else {
            videoElement.play()
          }
          setIsPlaying(!isPlaying)
        }
      }
    }

    // Auto-advance carousel if autoPlay is enabled
    useEffect(() => {
      let timer: NodeJS.Timeout

      if (autoPlay && isPlaying && videos.length > 1) {
        timer = setTimeout(goToNextVideo, interval)
      }

      return () => {
        if (timer) clearTimeout(timer)
      }
    }, [currentVideoIndex, autoPlay, isPlaying, interval, videos.length])

    // Update video play state when changing videos
    useEffect(() => {
      if (videos.length > 0) {
        videoRefs.current.forEach((video, index) => {
          if (video) {
            if (index === currentVideoIndex && isPlaying) {
              video.play().catch(() => {
                // Handle autoplay restrictions
                setIsPlaying(false)
              })
            } else {
              video.pause()
              video.currentTime = 0
            }
          }
        })
      }
    }, [currentVideoIndex, isPlaying, videos.length])

    return (
      <ShineBorder
        borderRadius={12}
        duration={10}
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        className="relative w-full h-full min-h-full bg-transparent dark:bg-transparent p-0"
        responsiveBorder
      >
        <Element
          ref={ref}
          className={cn("w-full h-full min-h-full flex justify-center items-center overflow-hidden", className)}
          {...(useMotion
            ? {
                ...animationProps,
                initial: { y: 0 },
                animate: {
                  y: 0,
                },
                style: {
                  ...animationProps.style,
                  backgroundAttachment: "fixed",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                },
                viewport: {
                  once: false,
                  margin: "-100px",
                },
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  ...animationProps.transition,
                },
              }
            : {})}
          {...props}
        >
          {/* Background patterns with parallax effect */}
          {showPatterns && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <motion.div
                className="absolute inset-0 bg-[url('/patterns/noise.png')] bg-repeat mix-blend-overlay w-full h-full"
                style={{ opacity: patternOpacity }}
                animate={{
                  y: useMotion ? ["0%", "-5%"] : "0%",
                }}
                transition={{
                  y: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 8,
                    ease: "easeInOut",
                  },
                }}
              />
            </div>
          )}

          {/* Top transition */}
          {showTransitionTop && prevBgColor && (
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-current -translate-y-full pointer-events-none" />
          )}

          {/* Video Carousel */}
          {videos.length > 0 && (
            <div className="absolute inset-0 z-0 overflow-hidden">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700",
                    index === currentVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0",
                  )}
                >
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    poster={video.poster}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white text-xl font-bold">{video.title}</h3>
                      {video.description && <p className="text-white/80 text-sm">{video.description}</p>}
                    </div>
                  )}
                </div>
              ))}

              {showControls && videos.length > 0 && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  {videos.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevVideo}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        aria-label="Previous video"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={goToNextVideo}
                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        aria-label="Next video"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Children content with wrapper for centering */}
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">{children}</div>

          {/* Bottom transition */}
          {showTransitionBottom && nextBgColor && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-transparent to-current translate-y-full pointer-events-none" />
          )}
        </Element>
      </ShineBorder>
    )
  },
)

SolutionElement.displayName = "SolutionElement"

export default SolutionElement

// This component is a highly flexible and dynamic section element that can transform between a standard HTML section and an animated Framer Motion section based on the `useMotion` prop.

// The `Element` variable is defined as:
// \`\`\`typescript
// const Element = useMotion ? motion.section : "section"
// \`\`\`

// This creates a dynamic component type that:
// - Becomes a Framer Motion `motion.section` when animations are needed (`useMotion` is true)
// - Falls back to a standard HTML `section` element when animations aren't needed (`useMotion` is false)

// In the return statement:
// \`\`\`jsx
// <Element
//   ref={ref}
//   className={cn("w-full h-full min-h-full flex justify-center items-center overflow-hidden", className)}
//   {...(useMotion
//     ? {
//         ...animationProps,
//         initial: { y: 0 },
//         animate: {
//           y: 0,
//         },
//         style: {
//           ...animationProps.style,
//           backgroundAttachment: "fixed",
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//         },
//         viewport: {
//           once: false,
//           margin: "-100px",
//         },
//         transition: {
//           type: "spring",
//           stiffness: 300,
//           damping: 30,
//           ...animationProps.transition,
//         },
//       }
//     : {})}
//   {...props}
// >
// \`\`\`

// This pattern:
// 1. Conditionally applies Framer Motion animation properties only when `useMotion` is true
// 2. Sets up spring physics animations with specific stiffness and damping values
// 3. Configures viewport detection to trigger animations as the element enters the viewport
// 4. Maintains consistent styling regardless of whether animations are enabled
// 5. Forwards all refs and additional props to ensure full compatibility

// This implementation demonstrates advanced React patterns including component polymorphism, conditional prop spreading, and dynamic typing - creating a highly reusable and performant component that adapts to different use cases while maintaining a consistent API.
