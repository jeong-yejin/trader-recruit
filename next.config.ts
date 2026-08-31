import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory otherwise wins root inference.
  turbopack: { root: __dirname },

  // The landing page lives at /en and /ko. Bare "/" keeps the old default (English).
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
