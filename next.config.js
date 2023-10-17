/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["d2p7yc6teqnar4.cloudfront.net"],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
