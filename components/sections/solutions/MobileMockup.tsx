"use client"

import Image from "next/image"

interface MobileMockupProps {
  app: string
}

export default function MobileMockup({ app }: MobileMockupProps) {
  // Map app names to image paths
  const getImagePath = () => {
    switch (app) {
      case "wic":
        return "/screens/wic-mobile.png"
      case "snap":
        return "/screens/snap-mobile.png"
      case "sun":
        return "/screens/sun-mobile.png"
      case "medicaid":
        return "/screens/medicaid-mobile.png"
      default:
        return "/screens/wic-mobile.png"
    }
  }

  return (
    <div className="w-full h-full flex items-start justify-center pt-[10%]">
      <div
        className="relative w-[280px] sm:w-[320px] md:w-[375px] max-w-full bg-black rounded-[2rem] border-[0.5rem] border-gray-800 shadow-xl overflow-hidden"
        style={{ aspectRatio: "9/19.5" }}
      >
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-4 bg-black rounded-b-xl z-10"></div>

        {/* Screen content */}
        <div className="relative bg-white aspect-[9/16] overflow-hidden">
          <Image
            src={getImagePath() || "/placeholder.svg"}
            alt={`${app.toUpperCase()} mobile interface`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  )
}
