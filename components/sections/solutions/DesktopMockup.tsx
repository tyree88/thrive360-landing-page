"use client"

import Image from "next/image"
import type { ReactNode } from "react"

type DesktopMockupProps = {
  app?: "wic" | "snap" | "sun" | "medicaid"
  children?: ReactNode
}

export default function DesktopMockup({ app, children }: DesktopMockupProps) {
  // Provide a default value for app if it's undefined
  const appName = app || "default"

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-[90%] bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-gray-700 p-2 flex items-center">
          <div className="flex space-x-2 ml-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="mx-auto bg-gray-600 rounded-full px-4 py-1 text-xs text-gray-300 flex items-center">
            <span className="truncate">app.thrive360.io/{appName}</span>
          </div>
        </div>

        {/* Screen content */}
        <div className="relative bg-white aspect-[16/9] overflow-hidden">
          {app ? (
            <Image
              src={`/screens/${app}-desktop.png`}
              alt={`${appName.toUpperCase()} desktop interface`}
              fill
              className="object-cover"
            />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  )
}
