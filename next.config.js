/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure the development server
  experimental: {
    // Enable any experimental features if needed
  },
  // Configure SCSS
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Configure the server
  async rewrites() {
    return []
  },
}

module.exports = nextConfig
