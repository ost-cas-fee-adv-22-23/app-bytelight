/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com', 'www.travelandleisure.com', 'www.st3.depositphotos.com', 'wallpaperaccess.com'],
  },
};

module.exports = withPWA(nextConfig);
