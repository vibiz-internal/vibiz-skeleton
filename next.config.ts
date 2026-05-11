import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the project root so Turbopack doesn't walk up the dir tree
    // looking for lockfiles and pick the parent vibiz-agents one.
    root: process.cwd(),
  },
};

export default nextConfig;
