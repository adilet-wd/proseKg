/** @type {import('next').NextConfig} */
import { createProxyMiddleware } from 'http-proxy-middleware';
const nextConfig = {
  env: {
    API_ROUTE: 'http://217.151.230.35:999/api/v1',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '217.151.230.35',
        port: '999',
        pathname: '/media/media/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://217.151.230.35:999/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
