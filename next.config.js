/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgix.cosmicjs.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cosmicjs.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable experimental features for better SEO
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig