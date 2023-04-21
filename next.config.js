/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com', 'www.travelandleisure.com', 'www.st3.depositphotos.com', 'wallpaperaccess.com'],
  },
};

module.exports = nextConfig;
