// next.config.mjs
/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
        port: "",
        pathname: "/photo/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      // Add more remote patterns as needed
    ],
  },
};

export default nextConfig;
