const path = require("path");

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
  // Ensure PWA assets are properly served
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "Cache-Control", value: "no-store, must-revalidate" }
        ],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-store" }
        ],
      },
    ];
  },
  // Webpack configuration to ensure public folder is properly resolved
  webpack(config) {
    config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    return config;
  },
};

module.exports = nextConfig;

