import { headers } from "next/headers";

export function getBaseUrl(): string {
  // Get the host from headers or environment
  const host = process.env.NEXT_PUBLIC_VERCEL_URL || headers().get("host") || "localhost:3000";

  // Detect protocol (default to https for production)
  const protocol = host.includes("localhost") ? "http" : "https";

  // Get the full URL path
  const urlPath = headers().get("x-forwarded-path") || headers().get("referer") || "/";
  const query = headers().get("x-next-url-query") || "";

  // Return the full URL
  return `${protocol}://${host}${urlPath}${query ? `?${query}` : ""}`;
}
