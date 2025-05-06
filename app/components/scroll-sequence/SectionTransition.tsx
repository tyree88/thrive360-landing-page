import type React from "react"
interface SectionTransitionProps {
  position: "top" | "bottom"
}

const SectionTransition: React.FC<SectionTransitionProps> = ({ position }) => {
  return (
    <div
      className={`w-full h-24 pointer-events-none ${
        position === "top"
          ? "bg-gradient-to-b from-white to-transparent dark:from-gray-950"
          : "bg-gradient-to-t from-white to-transparent dark:from-gray-950"
      }`}
      aria-hidden="true"
    />
  )
}

export default SectionTransition
