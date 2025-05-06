'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { AnimationProvider } from "@/context/AnimationContext";
import { usePerformanceMonitor } from "@/lib/performance-monitor";
import { useWebVitalsMonitor } from "@/lib/web-vitals-monitor";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  const pathname = usePathname();
  
  // Initialize performance monitoring in development mode
  const isProd = process.env.NODE_ENV === 'production';
  
  // Monitor FPS and animation performance
  usePerformanceMonitor({
    debugMode: !isProd,
    throttleMs: 2000, // Report every 2 seconds
  });
  
  // Monitor Core Web Vitals
  useWebVitalsMonitor({
    debug: !isProd,
    reportTo: 'console',
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AnimationProvider>
          {children}
          <Toaster />
        </AnimationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
