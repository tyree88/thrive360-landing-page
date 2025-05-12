"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface DeviceMockupProps {
  children: React.ReactNode
  isPinned: boolean
  isMobile: boolean
  isTablet: boolean
}

const DeviceMockup = ({ children, isPinned, isMobile, isTablet }: DeviceMockupProps) => {
  const deviceRef = useRef<HTMLDivElement>(null)

  // Apply hardware acceleration for better performance
  useEffect(() => {
    if (deviceRef.current) {
      deviceRef.current.style.willChange = isPinned ? "transform" : "auto"
    }
  }, [isPinned])

  // Determine device dimensions based on screen size
  const getDeviceWidth = () => {
    if (isMobile) return "100%"
    if (isTablet) return "600px"
    return "1000px"
  }

  // Determine sticky position based on screen size
  const getStickyTop = () => {
    if (isMobile) return "20px"
    if (isTablet) return "80px"
    return "100px"
  }

  return (
    <div className="device-container relative flex justify-center items-center">
      <motion.div
        ref={deviceRef}
        className={`device-mockup relative ${isPinned ? "is-pinned" : ""} ${isMobile ? "mobile" : ""} ${isTablet ? "tablet" : ""}`}
        style={{
          width: getDeviceWidth(),
          maxWidth: "100%",
          position: isPinned ? "fixed" : "relative",
          top: isPinned ? getStickyTop() : "auto",
          left: "50%",
          transform: isPinned ? "translateX(-50%)" : "none",
          zIndex: 10,
          transition: "all 0.3s ease-out",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
      >
        {/* iPad Frame */}
        <div className="relative w-full h-auto bg-slate-900 rounded-[36px] border-[16px] border-slate-800 shadow-2xl shadow-indigo-900/20 overflow-hidden aspect-[4/3]">
          {/* iPad Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-700 rounded-b-lg mt-2"></div>

          {/* iPad Screen */}
          <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden p-4">
            {/* iPad Content */}
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </motion.div>

      {/* Spacer div to maintain scroll height when device is pinned */}
      {isPinned && (
        <div
          className="device-spacer"
          style={{
            width: "100%",
            height: isMobile ? "1200px" : isTablet ? "1600px" : "800px",
          }}
        />
      )}
    </div>
  )
}

export default DeviceMockup
