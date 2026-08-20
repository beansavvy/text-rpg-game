/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  output: 'export',
  basePath: '/text-game',
  trailingSlash: true,
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
