import { cn } from "@/lib/utils"

interface NeuroplasticBadgeProps {
  className?: string
}

const NeuroplasticBadge = ({ className }: NeuroplasticBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs",
        className,
      )}
    >
      <span className="mr-1">✦</span> Neuroplastic Engagement™
    </div>
  )
}

export default NeuroplasticBadge
