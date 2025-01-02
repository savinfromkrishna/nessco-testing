import { headers } from "next/headers";

export function getUrls(): { baseUrl: string; canonicalUrl: string } {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  // Fetch locale and path from headers
  const urlPath = headers().get("x-next-url-path") || "";
  const query = headers().get("x-next-url-query") || "";

  // Extract locale dynamically from the path or default it
  const pathSegments = urlPath.split("/");
  const locale = pathSegments[1] ? `/${pathSegments[1]}` : "/in/en"; // Adjust default locale as needed

  // Construct URLs
  const baseUrl = `${protocol}://${host}`;
  const canonicalUrl = `${baseUrl}${locale}`;

  return {
    baseUrl,
    canonicalUrl: query ? `${canonicalUrl}?${query}` : canonicalUrl,
  };
}
