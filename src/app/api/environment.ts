import { headers } from "next/headers";

export function getBaseUrl(): string {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  // Check for locale and path from headers or environment
  const urlPath = headers().get("x-next-url-path") || "";
  const query = headers().get("x-next-url-query") || "";

  // Manually add `/in/en` or dynamically resolve it
  const localePath = process.env.LOCALE_PATH || "/in/en";

  return `${protocol}://${host}${localePath}${urlPath}${query ? `?${query}` : ""}`;
}
