/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "", // Leave port empty unless you need a specific port
        pathname: "/images/M/**", // Optional: You can specify a path pattern if needed
      },
    ],
  },
};

export default nextConfig;
