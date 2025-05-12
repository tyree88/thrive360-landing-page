import * as React from "react"
import { cn } from "@/lib/utils"
import thrive from "@/styles/theme"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "filled" | "dark"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: thrive.components.input.variants.default,
      filled: thrive.components.input.variants.filled,
      dark: thrive.components.input.variants.dark,
    }

    return (
      <input
        type={type}
        className={cn(thrive.components.input.base, variantClasses[variant], className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
