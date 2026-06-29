import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Allow Supabase Storage public buckets to be served via next/image.
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }],
  },
}

export default nextConfig
