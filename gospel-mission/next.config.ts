import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'res.cloudinary.com', 'www.youtube.com'],
  },
};

export default nextConfig;
