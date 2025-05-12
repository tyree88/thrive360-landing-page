"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface VideoProps {
  id: string
  title: string
  description: string
  thumbnail: string
  videoSrc: string
  company: string
  duration: string
  bgColor: string
  type: "image" | "text" | "graphic" | "abstract" | "chapter"
  icon?: React.ReactNode
}

interface VideoCardProps {
  video: VideoProps
  className?: string
}

export function VideoCard({ video, className }: VideoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Use placeholder images for thumbnails
  const thumbnailSrc = video.thumbnail.startsWith("/")
    ? `/placeholder.svg?height=240&width=360&query=video thumbnail for ${video.title}`
    : video.thumbnail

  return (
    <>
      <motion.div
        className={cn(
          "group relative mx-3 flex aspect-[9/16] w-[260px] cursor-pointer flex-col overflow-hidden rounded-[32px] shadow-lg md:w-[280px] lg:w-[300px]",
          className,
        )}
        style={{
          backgroundColor: video.bgColor,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -10,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Company/brand logo in top-left corner */}
        {video.type !== "chapter" && (
          <div className="absolute left-4 top-4 z-10">
            <motion.div
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <Image src="/logos/brandmark-white.png" alt="Thrive360" width={32} height={32} className="h-8 w-auto" />
            </motion.div>
          </div>
        )}

        {video.type === "image" && (
          <div className="relative h-full w-full overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Image src={thumbnailSrc || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
            </motion.div>

            {/* Overlay that darkens on hover */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: isHovered ? 0.4 : 0.2 }}
              transition={{ duration: 0.3 }}
            />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-purple-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <Play className="h-7 w-7" />
              </motion.div>
            </div>

            {/* Duration badge */}
            <motion.div
              className="absolute bottom-4 right-4 rounded-md bg-black/70 px-2 py-1 text-xs text-white"
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0.7,
                x: 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {video.duration}
            </motion.div>

            {/* Content overlay at bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white"
              initial={{ y: 0 }}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-xs font-medium"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {video.company}
              </motion.p>
              <motion.h3
                className="mt-1 text-base font-bold md:text-lg"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {video.title}
              </motion.h3>
              <motion.p
                className="mt-2 text-xs line-clamp-2 opacity-0 md:text-sm"
                animate={{
                  opacity: isHovered ? 0.9 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {video.description}
              </motion.p>
            </motion.div>
          </div>
        )}

        {video.type === "text" && (
          <div className="flex h-full w-full flex-col justify-between p-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-sm font-medium opacity-80">{video.company}</p>
              <motion.h3
                className="mt-2 text-2xl font-bold leading-tight"
                animate={{ scale: isHovered ? 1.03 : 1 }}
                transition={{ duration: 0.4 }}
              >
                {video.title}
              </motion.h3>
            </motion.div>
            <motion.p
              className="mt-auto text-base leading-relaxed opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0.9, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {video.description}
            </motion.p>
          </div>
        )}

        {video.type === "graphic" && (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-white">
            <motion.div
              className="mb-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-white/30"
              animate={{
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{
                rotate: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                scale: { duration: 0.5, ease: "easeOut" },
              }}
            >
              <motion.div
                className="h-16 w-16 rounded-full bg-white/90"
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
            <motion.p
              className="text-center text-sm font-medium opacity-80"
              animate={{ opacity: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {video.company}
            </motion.p>
            <motion.h3
              className="mt-2 text-center text-xl font-bold"
              animate={{
                scale: isHovered ? 1.05 : 1,
                y: isHovered ? -2 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {video.title}
            </motion.h3>
            <motion.p
              className="mt-2 text-center text-sm opacity-0"
              animate={{
                opacity: isHovered ? 0.9 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {video.description}
            </motion.p>
          </div>
        )}

        {video.type === "abstract" && (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            {/* Abstract background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${video.bgColor}, ${video.bgColor}dd)`,
              }}
              animate={{
                background: isHovered
                  ? [
                      `linear-gradient(to bottom right, ${video.bgColor}, ${video.bgColor}dd)`,
                      `linear-gradient(to bottom left, ${video.bgColor}, ${video.bgColor}dd)`,
                      `linear-gradient(to top right, ${video.bgColor}, ${video.bgColor}dd)`,
                      `linear-gradient(to bottom right, ${video.bgColor}, ${video.bgColor}dd)`,
                    ]
                  : `linear-gradient(to bottom right, ${video.bgColor}, ${video.bgColor}dd)`,
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Animated shapes */}
            <motion.div
              className="absolute h-40 w-40 rounded-full bg-white/10"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute h-60 w-60 rounded-full border-2 border-white/20"
              animate={{
                scale: [1, 0.8, 1],
                x: [0, -30, 0],
                y: [0, 30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-6 text-center text-white">
              <motion.h3
                className="text-2xl font-bold"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                {video.title}
              </motion.h3>
              <motion.p
                className="mt-2 text-sm opacity-80"
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                {video.description}
              </motion.p>
            </div>
          </div>
        )}

        {video.type === "chapter" && (
          <div className="flex h-full w-full flex-col justify-between p-6 text-blue-900">
            {/* Download button in top-right corner */}
            <div className="absolute right-4 top-4 z-10">
              <motion.button
                className="flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-medium text-black shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download now
              </motion.button>
            </div>

            <div>
              <motion.p
                className="text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {video.company}
              </motion.p>
              <motion.h3
                className="mt-2 text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {video.id}
              </motion.h3>
            </div>

            <motion.h4
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {video.title}
            </motion.h4>
          </div>
        )}

        {/* Highlight border effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-[32px] border-2 border-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Video Modal with animations */}
      <AnimatePresence>
        {isModalOpen && video.type === "image" && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsModalOpen(false)
                }}
              >
                <X className="h-6 w-6" />
              </motion.button>

              <div className="aspect-video w-full">
                <video src={video.videoSrc} controls autoPlay className="h-full w-full" poster={thumbnailSrc}>
                  Your browser does not support the video tag.
                </video>
              </div>

              <motion.div
                className="p-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold">{video.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{video.description}</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
