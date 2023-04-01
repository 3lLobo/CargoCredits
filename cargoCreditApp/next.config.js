/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['localhost', 'lh3.googleusercontent.com', 'wallpapercave.com'],
  },
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig
