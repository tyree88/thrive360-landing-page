import './globals.css';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
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
      <body className="min-h-screen bg-gradient-to-b from-white to-gray-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
