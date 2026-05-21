/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Vercel deployment optimizations
  compress: true,
  poweredByHeader: false,
  // Handle images from external sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drive-fleet-backend2.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
