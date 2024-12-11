import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    return config; 
  },
};

module.exports = {
  reactStrictMode: false,
  
  images: {
    domains: ['cdn.dummyjson.com'],  
    
  },
  
};

export default nextConfig;
