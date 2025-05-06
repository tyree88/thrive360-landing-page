import './globals.css';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Suspense } from 'react';
import AnimationScripts from './animation-scripts';
// import { DefaultSeo } from 'next-seo';
// import SEO from '../next-seo.config';

// Load the Inter font with specific subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Thrive360 Bolt - Mental Health & Wellbeing Platform',
  description: 'A comprehensive mental health and wellbeing platform featuring rich scroll-based animations.',
  keywords: ['mental health', 'wellbeing', 'health platform', 'self-care', 'mindfulness'],
  authors: [{ name: 'Thrive360 Team' }],
  robots: 'index, follow',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Add preconnect for CDNs */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Inline critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{ __html: `
          .critical-hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom, #2d1a45, #2a2a72);
          }
        `}} />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 antialiased" suppressHydrationWarning>
        <Providers>
          <Suspense fallback={<div className="critical-hero" />}>
            {children}
          </Suspense>
        </Providers>
        
        {/* Load animation scripts after initial render */}
        <AnimationScripts />
      </body>
    </html>
  );
}
