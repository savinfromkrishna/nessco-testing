import { headers } from "next/headers";

export function getBaseUrl(): string {
  const headerMap = headers();
  console.log("Headers:", headerMap);

  const host = headerMap.get("host") || "localhost:3000";
  const protocol =
    headerMap.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const urlPath = headerMap.get("x-next-url-path") || "/";
  const query = headerMap.get("x-next-url-query") || "";

  const formattedQuery = query ? `?${query}` : "";

  return `${protocol}://${host}${urlPath}${formattedQuery}`;
}
