"use client"

import Image from "next/image"

interface TabletMockupProps {
  app: string
}

export default function TabletMockup({ app }: TabletMockupProps) {
  // Map app names to image paths
  const getImagePath = () => {
    switch (app) {
      case "wic":
        return "/screens/wic-tablet.png"
      case "snap":
        return "/screens/snap-tablet.png"
      case "sun":
        return "/screens/sun-tablet.png"
      case "medicaid":
        return "/screens/medicaid-tablet.png"
      default:
        return "/screens/wic-tablet.png"
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[85%] sm:w-[80%] md:w-[85%] lg:w-[90%] max-w-[1200px] min-w-[320px] bg-black rounded-[1.5rem] border-[0.6rem] border-gray-800 shadow-2xl overflow-hidden">
        {/* Tablet camera */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full z-10"></div>

        {/* Screen content */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 aspect-[16/10] overflow-hidden shadow-inner border-b-[3px] border-gray-300 rounded-sm backdrop-filter backdrop-blur-sm p-1 w-full flex items-center justify-center relative z-0">
          <Image
            src={getImagePath() || "/placeholder.svg"}
            alt={`${app.toUpperCase()} tablet interface`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
