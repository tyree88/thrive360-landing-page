import type React from "react"

interface SideContainersProps {
  leftRef: React.RefObject<HTMLDivElement>
  rightRef: React.RefObject<HTMLDivElement>
}

const SideContainers: React.FC<SideContainersProps> = ({ leftRef, rightRef }) => {
  return (
    <>
      {/* Left side container */}
      <div
        ref={leftRef}
        className="hidden lg:block w-64 h-80 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md"
        aria-hidden="true"
      >
        <div className="w-full h-full flex flex-col gap-3">
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-2"></div>
          <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-3 w-4/6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-2"></div>
        </div>
      </div>

      {/* Right side container */}
      <div
        ref={rightRef}
        className="hidden lg:block w-64 h-80 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 shadow-md"
        aria-hidden="true"
      >
        <div className="w-full h-full flex flex-col gap-3">
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-2"></div>
          <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded-lg mt-2"></div>
        </div>
      </div>
    </>
  )
}

export default SideContainers
