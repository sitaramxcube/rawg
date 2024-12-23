import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: '',
        pathname: '/**', // Match all image paths from this host
      },
    ],
  },
};

export default nextConfig;
