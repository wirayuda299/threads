/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'img.clerk.com',
      pathname: '/*',
      port: ''
    }]
  }
}

module.exports = nextConfig
