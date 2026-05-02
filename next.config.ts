import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  allowedDevOrigins: ['192.168.10.114'],
};

export default nextConfig;
