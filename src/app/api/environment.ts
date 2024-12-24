import { headers } from "next/headers";

export function getBaseUrl(): string {
  const host = headers().get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const urlPath = headers().get("x-next-url-path") || "/";
  const query = headers().get("x-next-url-query") || "";

  return `${protocol}://${host}${urlPath}${query ? `?${query}` : ""}`;
}
