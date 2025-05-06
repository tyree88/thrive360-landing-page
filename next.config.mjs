
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Configure image domains if using next/image with external images
  images: {
    domains: ['images.unsplash.com'],
    // Add other domains as needed
  },
  
  // Cleaned up webpack config
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = __dirname;
    return config;
  },
  
  // Add headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Add experimental configuration for allowedDevOrigins
  experimental: {
    allowedDevOrigins: [
      'https://e9ecc91a-0280-4d8d-8323-9f2baa499106-00-38mfb1g5qryxo.riker.replit.dev',
      // Allow any Replit domain for development
      /.*\.replit\.dev$/,
    ],
  },

  // Add support for MDX content if needed
  // pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

export default nextConfig;
