/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig