import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sygzaktjynjnqstbgenx.supabase.co",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;