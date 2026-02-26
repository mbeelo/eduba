/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use empty Turbopack config to silence the warning
  turbopack: {},

  // Configure images for better performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eduba.app',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Security headers for production
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
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;