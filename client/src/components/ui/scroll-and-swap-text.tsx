import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface TextProps {
  label: string
  containerRef: React.RefObject<HTMLElement>
  offset?: [string, string]
  className?: string
}

const ScrollAndSwapText = ({
  label,
  offset = ["0 0", "0 1"],
  className,
  containerRef,
  ...props
}: TextProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: offset as any, // framer motion doesn't export the type, so we cast it
    layoutEffect: false,
  })

  const top = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const bottom = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])

  return (
    <span
      className={`flex overflow-hidden relative items-center justify-center p-0 
      ${className}`}
      ref={ref}
      {...props}
    >
      {/* Invisible text to maintain proper spacing */}
      <span className="relative text-transparent" aria-hidden="true">{label}</span>
      
      {/* Text that slides up and out */}
      <motion.span 
        className="absolute text-white" 
        style={{ top: top }}
      >
        {label}
      </motion.span>
      
      {/* Text that slides up and in */}
      <motion.span
        className="absolute text-white"
        style={{ top: bottom }}
        aria-hidden="true"
      >
        {label}
      </motion.span>
    </span>
  )
}

export {ScrollAndSwapText}
