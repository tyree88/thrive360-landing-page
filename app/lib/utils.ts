import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * This utility is used for conditional class application
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A utility to safely handle client-side code with a fallback value for SSR
 */
export function safeClient<T, F>(clientFn: () => T, fallback: F): T | F {
  if (typeof window === 'undefined') return fallback;
  return clientFn();
}

/**
 * A utility to safely handle window access without hydration errors
 */
export function safeWindow<T>(fn: (w: Window) => T, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return fn(window);
}

/**
 * Format a number with commas as thousands separators
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Truncate a string to a specified length and add ellipsis
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Get a random item from an array
 */
export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if the code is running on the client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if the code is running on the server side
 */
export const isServer = !isClient;

/**
 * Smooth scroll to a section by id
 */
export function scrollToSection(id: string, offset: number = 0): void {
  if (!isClient) return;
  
  const element = document.getElementById(id);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}