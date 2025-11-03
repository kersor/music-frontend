import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'localhost',
      'encrypted-tbn0.gstatic.com',
      'is1-ssl.mzstatic.com'
    ]
  }
};

export default nextConfig;
