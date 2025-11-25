/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: false,
  },
  output: undefined,   // IMPORTANT : empêche l'export
  trailingSlash: false,
  // Disable static generation for error pages to prevent Clerk SSR issues
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

module.exports = nextConfig;

