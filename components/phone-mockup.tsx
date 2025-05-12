import { cn } from "@/lib/utils"

interface PhoneMockupProps {
  screenSrc: string
  className?: string
}

const PhoneMockup = ({ screenSrc, className }: PhoneMockupProps) => {
  return (
    <div className={cn("relative mx-auto", className)}>
      <div className="relative w-64 h-[500px] bg-black rounded-[40px] shadow-xl overflow-hidden border-8 border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-xl z-10"></div>

        {/* Screen */}
        <div className="w-full h-full overflow-hidden rounded-[32px]">
          <img
            src={screenSrc || "/placeholder.svg"}
            alt="Phone screen content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-white rounded-full opacity-80"></div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-md"></div>
    </div>
  )
}

export default PhoneMockup
