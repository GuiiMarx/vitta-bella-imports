import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lattafa.com" },
      { protocol: "https", hostname: "www.lattafa.com" },
      { protocol: "https", hostname: "www.lattafa-usa.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.cdn.shop" },
    ],
  },
};

export default nextConfig;
