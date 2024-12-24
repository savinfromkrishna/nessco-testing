
import { NextResponse } from "next/server";

const fixedCountry = "in";
const fixedLanguage = "en";

function setCookie(name, value, { res, path = "/" }) {
  res.cookies.set(name, value, { path, httpOnly: true, secure: true });
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const pathParts = pathname.split("/").filter(Boolean);

  const userCountryISO = pathParts[0]?.toLowerCase();
  const userLanguage = pathParts[1]?.toLowerCase();

  const res = NextResponse.next();

  // If URL already has fixed country and language, set cookies and proceed
  if (userCountryISO === fixedCountry && userLanguage === fixedLanguage) {
    setCookie("country", fixedCountry, { res });
    setCookie("language", fixedLanguage, { res });
    return res;
  }

  // Redirect to fixed country and language URL
  const redirectURL = `/${fixedCountry}/${fixedLanguage}`;
  const url = req.nextUrl.clone();
  url.pathname = redirectURL;

  setCookie("country", fixedCountry, { res });
  setCookie("language", fixedLanguage, { res });

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
