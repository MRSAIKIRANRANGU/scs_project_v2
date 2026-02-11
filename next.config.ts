import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "srichaitanyaapp.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "content.jdmagicbox.com",
      },
      {
        protocol: "https",
        hostname: "www.srichaitanyaschool.co.in",
      },
      {
        protocol: "https",
        hostname: "www.topbengaluru.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // ✅ added
      },
    ],
  },
};

export default nextConfig;
