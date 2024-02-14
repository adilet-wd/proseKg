/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ROUTE: 'http://26.78.236.231:8000/api/v1',
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
};

export default nextConfig;
