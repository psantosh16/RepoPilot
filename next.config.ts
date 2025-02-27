// next.config.js
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 60,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
