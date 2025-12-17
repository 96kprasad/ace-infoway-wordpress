/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-wordpress-domain.com', 'images.unsplash.com', 'wordpress.org', 's.w.org'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig