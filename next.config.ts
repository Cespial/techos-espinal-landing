import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 768, 1024, 1200, 1920],
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

let nextConfig: NextConfig = baseConfig;

if (process.env.ANALYZE === "true") {
  try {
    // Lazy-load so the dependency remains optional.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const withBundleAnalyzer = require("@next/bundle-analyzer")({
      enabled: true,
    });

    nextConfig = withBundleAnalyzer(baseConfig);
  } catch {
    nextConfig = baseConfig;
  }
}

export default nextConfig;
