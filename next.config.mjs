/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
