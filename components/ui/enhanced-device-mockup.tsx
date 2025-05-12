"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface EnhancedDeviceMockupProps {
  children: React.ReactNode
  isPinned: boolean
  isMobile: boolean
  isTablet: boolean
  deviceType?: "ipad" | "iphone" | "macbook"
}

export function EnhancedDeviceMockup({
  children,
  isPinned,
  isMobile,
  isTablet,
  deviceType = "ipad",
}: EnhancedDeviceMockupProps) {
  const deviceRef = useRef<HTMLDivElement>(null)

  // Apply hardware acceleration for better performance
  useEffect(() => {
    if (deviceRef.current) {
      deviceRef.current.style.willChange = isPinned ? "transform" : "auto"
    }
  }, [isPinned])

  // Determine device dimensions based on screen size
  const getDeviceWidth = () => {
    if (isMobile) return "90%"
    if (isTablet) return "600px"
    return "1000px"
  }

  // Render different device frames based on deviceType
  const renderDeviceFrame = () => {
    switch (deviceType) {
      case "iphone":
        return (
          <div className="relative w-full h-auto bg-black rounded-[36px] border-[14px] border-black shadow-2xl shadow-indigo-900/20 overflow-hidden aspect-[9/19.5]">
            {/* iPhone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-10"></div>

            {/* iPhone Screen */}
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden p-3">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-300 rounded-full"></div>
          </div>
        )

      case "macbook":
        return (
          <div className="relative">
            {/* MacBook Screen */}
            <div className="relative w-full h-auto bg-slate-800 rounded-t-xl border-[12px] border-slate-800 shadow-2xl shadow-indigo-900/20 overflow-hidden aspect-[16/10]">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-700 rounded-full mt-1"></div>
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden p-4">
                {children}
              </div>
            </div>

            {/* MacBook Base */}
            <div className="w-[102%] h-[10px] bg-slate-700 rounded-b-lg mx-auto -mt-[1px]"></div>
          </div>
        )

      default: // iPad
        return (
          <div className="relative w-full h-auto bg-slate-900 rounded-[36px] border-[16px] border-slate-800 shadow-2xl shadow-indigo-900/20 overflow-hidden aspect-[4/3]">
            {/* iPad Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-700 rounded-b-lg mt-2"></div>

            {/* iPad Screen */}
            <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden p-4">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-700 rounded-full"></div>
          </div>
        )
    }
  }

  return (
    <div className="device-container relative flex justify-center items-center">
      <motion.div
        ref={deviceRef}
        className={cn("device-mockup relative", isPinned && "is-pinned", isMobile && "mobile", isTablet && "tablet")}
        style={{
          width: getDeviceWidth(),
          maxWidth: "100%",
          position: isPinned ? "fixed" : "relative",
          top: isPinned ? "80%" : "auto", // Changed from 50% to 80%
          left: "50%",
          transform: isPinned ? "translate(-50%, -50%)" : "translateX(-50%)", // Keep vertical centering of the device itself
          zIndex: 10,
          transition: "all 0.5s ease-out",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
      >
        {renderDeviceFrame()}
      </motion.div>

      {/* Spacer div to maintain scroll height when device is pinned */}
      {isPinned && (
        <div
          className="device-spacer"
          style={{
            width: "100%",
            height: isMobile ? "2400px" : isTablet ? "3000px" : "2000px", // Increased scroll length
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
