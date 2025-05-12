'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * Shimmer effect component that can be applied to skeleton loaders
 * Provides a more engaging and dynamic loading experience
 */
export const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 -translate-x-full"
        animate={{
          x: ["0%", "200%"],
        }}
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          background: `linear-gradient(90deg, 
                      transparent, 
                      rgba(255, 255, 255, 0.08), 
                      transparent)`,
          zIndex: 1,
        }}
      />
    </div>
  );
};

/**
 * ShimmerCard - Card component with shimmer loading effect
 */
export const ShimmerCard = ({
  className,
  children,
  isLoading = true,
}: {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-slate-800/60 bg-slate-900/80 overflow-hidden",
        className
      )}
    >
      {isLoading && <Shimmer className="absolute inset-0" />}
      <div className={cn("relative z-10", isLoading && "opacity-50")}>
        {children}
      </div>
    </div>
  );
};

/**
 * ShimmerButton - Button component with shimmer loading effect
 */
export const ShimmerButton = ({
  className,
  children,
  isLoading = true,
}: {
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <button
      disabled={isLoading}
      className={cn(
        "relative rounded-md px-4 py-2 bg-slate-800 text-white overflow-hidden",
        isLoading ? "cursor-not-allowed" : "hover:bg-slate-700",
        className
      )}
    >
      {isLoading && <Shimmer className="absolute inset-0" />}
      <span className={cn("relative z-10", isLoading && "opacity-70")}>
        {children}
      </span>
    </button>
  );
};

/**
 * ShimmerText - Text component with shimmer loading effect
 */
export const ShimmerText = ({
  className,
  width = "100%",
  height = "1rem",
  isLoading = true,
}: {
  className?: string;
  width?: string;
  height?: string;
  isLoading?: boolean;
}) => {
  if (!isLoading) return null;
  
  return (
    <div
      className={cn("relative rounded-md bg-slate-800/60 overflow-hidden", className)}
      style={{ width, height }}
    >
      <Shimmer />
    </div>
  );
};

/**
 * ShimmerImage - Image placeholder with shimmer loading effect
 */
export const ShimmerImage = ({
  className,
  aspectRatio = "16/9",
  isLoading = true,
}: {
  className?: string;
  aspectRatio?: string;
  isLoading?: boolean;
}) => {
  if (!isLoading) return null;
  
  return (
    <div
      className={cn(
        "relative rounded-md bg-slate-800/60 overflow-hidden",
        className
      )}
      style={{ aspectRatio }}
    >
      <Shimmer />
    </div>
  );
};

/**
 * ShimmerAvatar - Circle avatar with shimmer loading effect
 */
export const ShimmerAvatar = ({
  className,
  size = "3rem",
  isLoading = true,
}: {
  className?: string;
  size?: string;
  isLoading?: boolean;
}) => {
  if (!isLoading) return null;
  
  return (
    <div
      className={cn(
        "relative rounded-full bg-slate-800/60 overflow-hidden",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Shimmer />
    </div>
  );
};