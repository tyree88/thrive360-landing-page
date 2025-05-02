import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const bentoGridVariants = cva(
  "grid gap-4",
  {
    variants: {
      variant: {
        default: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        threeCells: "grid-cols-1 md:grid-cols-3",
        fourCells: "grid-cols-2 md:grid-cols-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Create a context for scroll animation
type ScrollContextType = {
  scrollYProgress: any;
};

const ScrollContext = React.createContext<ScrollContextType | null>(null);

const useScrollContext = () => {
  const context = React.useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ContainerScroll");
  }
  return context;
};

// Container that tracks scroll and provides context
export interface ContainerScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ContainerScroll = ({
  children,
  className,
  ...props
}: ContainerScrollProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <ScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={containerRef}
        className={cn("relative min-h-[300vh]", className)}
        {...props}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

// Bento Grid for card layout
export interface BentoGridProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof bentoGridVariants> {}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>
(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  );
});
BentoGrid.displayName = "BentoGrid";

// Individual cell with animation
export interface BentoCellProps extends React.HTMLAttributes<HTMLDivElement> {}

const BentoCell = React.forwardRef<HTMLDivElement, BentoCellProps>
(({ className, children, ...props }, ref) => {
  const { scrollYProgress } = useScrollContext();
  
  // Safe approach that avoids type errors
  const [translateY, setTranslateY] = React.useState("30%");
  const [scaleValue, setScaleValue] = React.useState(0.8);
  
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value: number) => {
      const newTranslateY = `${30 - (value * 30)}%`;
      const newScale = 0.8 + (value * 0.2);
      setTranslateY(newTranslateY);
      setScaleValue(newScale);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden rounded-xl", className)}
      style={{ 
        translateY: translateY,
        scale: scaleValue,
        opacity: scaleValue
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
BentoCell.displayName = "BentoCell";

// Center container that scales out on scroll
export interface ContainerScaleProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContainerScale = React.forwardRef<HTMLDivElement, ContainerScaleProps>
(({ className, children, ...props }, ref) => {
  const { scrollYProgress } = useScrollContext();
  
  // Safe approach that avoids type errors
  const [opacity, setOpacity] = React.useState(1);
  const [scaleValue, setScaleValue] = React.useState(1);
  
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value: number) => {
      if (value <= 0.5) {
        setOpacity(1 - (value * 2)); // Goes from 1 to 0 as value goes from 0 to 0.5
        setScaleValue(1 - (value * 0.4)); // Goes from 1 to 0.8
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
        className
      )}
      style={{
        opacity,
        scale: scaleValue
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
ContainerScale.displayName = "ContainerScale";

export { ContainerScroll, BentoGrid, BentoCell, ContainerScale };
