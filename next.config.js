/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  output: undefined,   // IMPORTANT : empêche l'export
  trailingSlash: false,
};

module.exports = nextConfig;

