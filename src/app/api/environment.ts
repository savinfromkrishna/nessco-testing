import { headers } from "next/headers";
export function getBaseUrl(): string {
  const host = headers().get("host") || "localhost:8890";
  const protocol =
    headers().get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const urlPath = headers().get("x-next-url-path") || "/";
  const query = headers().get("x-next-url-query") || "";
  return `${protocol}://${host}${urlPath}${query ? `?${query}` : ""}`;
}
