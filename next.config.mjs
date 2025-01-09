import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";


// Configure the bundle analyzer
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enable only when ANALYZE is set to "true"
});


// Create the Next.js Intl plugin
const withNextIntl = createNextIntlPlugin();


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "www.youtube.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "in.pinterest.com" },
      { protocol: "https", hostname: "restcountries.com" },
      { protocol: "https", hostname: "assets.nesscoindustries.com" },
      { protocol: "https", hostname: "www.nesscoindia.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "example.com" },
      {protocol: "https", hostname:"cloudflare-ipfs.com"},
      { protocol: "https", hostname: "flagcdn.com" },
      { protocol: "https", hostname: "www.*" }, // Allows all 'www.' subdomains under 'https://'
    ],
  },
  swcMinify: true,
  logging: {
    fetches: {
      fullUrl: true, // Enable full URL logging for fetch requests
    },
  },
};


// Custom fetch logging based on `nextConfig.logging`
if (nextConfig.logging?.fetches?.fullUrl) {
  const originalFetch = fetch;


  global.fetch = async (...args) => {
    const [url, options] = args;
    console.log("Fetch URL:", url);
    if (options) {
      console.log("Fetch Options:", options);
    }


    try {
      const response = await originalFetch(...args);
      console.log("Response Status:", response.status);
      return response;
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  };
}


// Export the configuration with both plugins applied
export default bundleAnalyzer(withNextIntl(nextConfig));
