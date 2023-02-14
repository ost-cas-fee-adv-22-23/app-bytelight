/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com', 'www.travelandleisure.com'],
  },
};

module.exports = nextConfig;
