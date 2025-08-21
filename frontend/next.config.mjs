/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this line to create the 'out' folder on build
  output: 'export',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/images/media/meals/**',
      },
    ],
  },
};

export default nextConfig;