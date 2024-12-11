import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    return config; 
  },
};

module.exports = {
  experimental: {
    turbopack: false
  },
  presets: [
    'next/babel',          
    '@babel/preset-typescript'  
  ],
  plugins: [
    '@babel/plugin-transform-runtime'  
  ],
  reactStrictMode: false,
  
  images: {
    domains: ['cdn.dummyjson.com'],  
    
  },
  
};

export default nextConfig;
