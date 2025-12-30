import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.ethicshistory.com',
      },
    ],
  },
};

export default nextConfig;
