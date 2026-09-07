import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // app/global-not-found.tsx needs this. It is the only 404 shape that works
  // here: the root layout sits in a dynamic segment ([lang]), so an unmatched
  // URL has no layout to render a not-found.tsx inside.
  experimental: { globalNotFound: true },

  // A stray package-lock.json in the home directory otherwise wins root inference.
  turbopack: { root: __dirname },

  // The landing page lives at /en and /ko. Bare "/" keeps the old default (English).
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
