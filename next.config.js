/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com','cdn.pixabay.com'],
  },
}

module.exports = nextConfig
