'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  animate?: boolean;
}

/**
 * Base skeleton component with optional animation
 */
export function Skeleton({
  className,
  width = "100%",
  height = "1.25rem",
  animate = true,
}: SkeletonProps) {
  if (animate) {
    return (
      <motion.div
        className={cn(
          "rounded-md bg-gradient-to-r from-slate-800/60 via-slate-700/60 to-slate-800/60 bg-[length:400%_100%]",
          className
        )}
        style={{ width, height }}
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "130% 0%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear"
        }}
      />
    );
  }

  return (
    <div
      className={cn("rounded-md bg-slate-800/60", className)}
      style={{ width, height }}
    />
  );
}

/**
 * Text skeleton with multiple lines
 */
export function TextSkeleton({
  className,
  lines = 3,
  lastLineWidth = "70%",
  lineHeight = "1rem",
  animate = true,
}: {
  className?: string;
  lines?: number;
  lastLineWidth?: string;
  lineHeight?: string;
  animate?: boolean;
}) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : "100%"}
          height={lineHeight}
          animate={animate}
        />
      ))}
    </div>
  );
}

/**
 * Card skeleton with optional header, body and footer
 */
export function CardSkeleton({
  className,
  header = true,
  body = true,
  footer = false,
  animate = true,
}: {
  className?: string;
  header?: boolean;
  body?: boolean;
  footer?: boolean;
  animate?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800/40 bg-slate-900/30 p-6 backdrop-blur-sm",
        className
      )}
    >
      {header && (
        <div className="mb-4">
          <Skeleton
            className="mb-2" 
            height="2rem"
            width="70%"
            animate={animate}
          />
          <Skeleton
            width="50%"
            animate={animate}
          />
        </div>
      )}
      
      {body && (
        <div className="space-y-4">
          <TextSkeleton animate={animate} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Skeleton
              height="5rem"
              animate={animate}
            />
            <Skeleton
              height="5rem"
              animate={animate}
            />
          </div>
        </div>
      )}
      
      {footer && (
        <div className="mt-6 pt-4 border-t border-slate-800/60">
          <div className="flex justify-between">
            <Skeleton
              width="30%"
              animate={animate}
            />
            <Skeleton
              width="20%"
              animate={animate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Navigation skeleton
 */
export function NavSkeleton({
  className,
  items = 4,
  animate = true,
}: {
  className?: string;
  items?: number;
  animate?: boolean;
}) {
  return (
    <div className={cn("flex items-center space-x-6", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === 0 ? "3rem" : `${Math.random() * 2 + 3}rem`}
          animate={animate}
        />
      ))}
    </div>
  );
}

/**
 * Circular avatar or icon skeleton
 */
export function CircleSkeleton({
  className,
  size = "3rem",
  animate = true,
}: {
  className?: string;
  size?: string;
  animate?: boolean;
}) {
  return (
    <Skeleton
      className={cn("rounded-full", className)}
      width={size}
      height={size}
      animate={animate}
    />
  );
}

/**
 * Hero section skeleton
 */
export function HeroSkeleton({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <div className={cn("space-y-8 py-12 max-w-3xl mx-auto text-center", className)}>
      <Skeleton
        className="mx-auto"
        width="8rem"
        height="2rem"
        animate={animate}
      />
      <Skeleton
        className="mx-auto"
        width="80%"
        height="3.5rem"
        animate={animate}
      />
      <TextSkeleton
        className="mx-auto max-w-xl"
        lines={2}
        animate={animate}
      />
      <div className="flex justify-center gap-4 pt-4">
        <Skeleton
          width="8rem"
          height="2.5rem"
          animate={animate}
        />
        <Skeleton
          width="8rem"
          height="2.5rem"
          animate={animate}
        />
      </div>
    </div>
  );
}

/**
 * Problem card skeleton tailored for our horizontal cards
 */
export function ProblemCardSkeleton({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <div className={cn("flex-shrink-0 flex-grow-0 p-6", className)}>
      <div className="bg-[#0a0f1e] backdrop-blur-md rounded-xl shadow-lg p-8 h-full border border-indigo-500/20">
        {/* Title skeleton */}
        <Skeleton
          className="mb-4"
          height="2.5rem" 
          width="80%"
          animate={animate}
        />
        
        {/* Description skeleton */}
        <TextSkeleton
          className="mb-6"
          lines={2}
          animate={animate}
        />
        
        {/* Sub-cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
            <Skeleton
              className="mb-2"
              height="1.5rem"
              width="60%"
              animate={animate}
            />
            <TextSkeleton
              lines={2}
              lineHeight="0.75rem"
              lastLineWidth="90%"
              animate={animate}
            />
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-500/20">
            <Skeleton
              className="mb-2"
              height="1.5rem"
              width="70%"
              animate={animate}
            />
            <TextSkeleton
              lines={2}
              lineHeight="0.75rem"
              lastLineWidth="80%"
              animate={animate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Problem section skeleton with multiple cards
 */
export function ProblemSectionSkeleton({
  className,
  cardCount = 4,
  animate = true,
}: {
  className?: string;
  cardCount?: number;
  animate?: boolean;
}) {
  return (
    <div className={cn("min-h-screen py-16", className)}>
      {/* Section Header Skeleton */}
      <div className="text-center pb-16">
        <Skeleton
          className="mx-auto mb-6"
          width="8rem"
          height="2rem"
          animate={animate}
        />
        <Skeleton
          className="mx-auto mb-4"
          width="18rem"
          height="3rem"
          animate={animate}
        />
        <Skeleton
          className="mx-auto"
          width="25rem"
          height="1.5rem"
          animate={animate}
        />
      </div>
      
      {/* Cards Container */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="overflow-hidden w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: cardCount }).map((_, i) => (
              <ProblemCardSkeleton key={i} animate={animate} />
            ))}
          </div>
        </div>
        
        {/* Navigation Pills Skeleton */}
        <div className="flex justify-center mt-8 gap-3">
          {Array.from({ length: cardCount }).map((_, i) => (
            <Skeleton
              key={i}
              className="rounded-full"
              width={i === 0 ? "3rem" : "1rem"}
              height="0.5rem"
              animate={animate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}