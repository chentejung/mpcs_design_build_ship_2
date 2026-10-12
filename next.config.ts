import type { NextConfig } from "next";

// Static site: `next build` emits plain HTML/CSS/JS into out/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
