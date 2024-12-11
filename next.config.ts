import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['cdn.dummyjson.com'],  
  },
};

export default nextConfig;
