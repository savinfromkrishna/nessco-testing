import createNextIntlPlugin from "next-intl/plugin";

// Create the Next.js Intl plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "in.pinterest.com",
      },
      {
        protocol: "https",
        hostname: "restcountries.com",
      },
      {
        protocol: "https",
        hostname: "assets.nesscoindustries.com",
      },
      {
        protocol: "https",
        hostname: "www.nesscoindia.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  swcMinify: true, // Enables faster builds and smaller bundles
  reactStrictMode: false,

  // Add redirects for non-www to www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'nesscoglobal.com', // Replace with your non-www domain
          },
        ],
        destination: 'https://www.global.com/*', // Replace with your www domain
        permanent: true, // HTTP 301 Permanent Redirect
      },
    ];
  },
};

export default withNextIntl(nextConfig);
