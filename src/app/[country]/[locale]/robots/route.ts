import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: { country: string; lang: string } }
) {

  const content = `
    User-agent: *
    Disallow: /  `;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
