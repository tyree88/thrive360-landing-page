import { useEffect, useRef, useState } from 'react';

interface LenisScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
  callback?: () => void;
  immediate?: boolean;
}

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
}

interface UseLenisResult {
  lenis: any | null;
  scrollTo: (target: string | HTMLElement | number, options?: LenisScrollOptions) => void;
}

export function useLenis(options: LenisOptions = {}): UseLenisResult {
  const [lenis, setLenis] = useState<any | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Import Lenis dynamically to avoid SSR issues
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        ...options,
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        requestRef.current = requestAnimationFrame(raf);
      }

      requestRef.current = requestAnimationFrame(raf);
      setLenis(lenisInstance);
    });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [options]);

  const scrollTo = (target: string | HTMLElement | number, options: LenisScrollOptions = {}) => {
    if (!lenis) return;

    lenis.scrollTo(target, {
      offset: -100,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options,
    });
  };

  return { lenis, scrollTo };
}

export default useLenis;
