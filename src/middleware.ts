import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const validCountryISOs = [
  "af", "ax", "al", "dz", "as", "ad", "ao", "ai", "aq", "ag", "ar", "am", "aw", "au", "at", "az",
  "bs", "bh", "bd", "bb", "by", "be", "bz", "bj", "bm", "bt", "bo", "bq", "ba", "bw", "bv", "br",
  "io", "bn", "bg", "bf", "bi", "cv", "kh", "cm", "ca", "ky", "cf", "td", "cl", "cn", "cx", "cc",
  "co", "km", "cd", "cg", "ck", "cr", "hr", "cu", "cw", "cy", "cz", "dk", "dj", "dm", "do", "ec",
  "eg", "sv", "gq", "er", "ee", "sz", "et", "fk", "fo", "fj", "fi", "fr", "gf", "pf", "tf", "ga",
  "gm", "ge", "de", "gh", "gi", "gr", "gl", "gd", "gp", "gu", "gt", "gg", "gn", "gw", "gy", "ht",
  "hm", "va", "hn", "hk", "hu", "is", "in", "id", "ir", "iq", "ie", "im", "il", "it", "jm", "jp",
  "je", "jo", "kz", "ke", "ki", "kp", "kr", "kw", "kg", "la", "lv", "lb", "ls", "lr", "ly", "li",
  "lt", "lu", "mo", "mg", "mw", "my", "mv", "ml", "mt", "mh", "mq", "mr", "mu", "yt", "mx", "fm",
  "md", "mc", "mn", "me", "ms", "ma", "mz", "mm", "na", "nr", "np", "nl", "nc", "nz", "ni", "ne",
  "ng", "nu", "nf", "mp", "no", "om", "pk", "pw", "ps", "pa", "pg", "py", "pe", "ph", "pn", "pl",
  "pt", "pr", "qa", "re", "ro", "ru", "rw", "bl", "sh", "kn", "lc", "mf", "pm", "vc", "ws", "sm",
  "st", "sa", "sn", "rs", "sc", "sl", "sg", "sx", "sk", "si", "sb", "so", "za", "gs", "ss", "es",
  "lk", "sd", "sr", "sj", "se", "ch", "sy", "tw", "tj", "tz", "th", "tl", "tg", "tk", "to", "tt",
  "tn", "tr", "tm", "tc", "tv", "ug", "ua", "ae", "gb", "us", "um", "uy", "uz", "vu", "ve", "vn",
  "vg", "vi", "wf", "eh", "ye", "zm", "zw"
];

const validLocales = (() => {
  try {
    return JSON.parse(process.env.NEXT_PUBLIC_VALID_LOCALES || '["en","hi","fr","ar"]');
  } catch {
    console.error("Invalid NEXT_PUBLIC_VALID_LOCALES format, using default locales.");
    return ["en", "hi", "fr", "ar"];
  }
})();

const defaultCountry = "in";
const defaultLocale = "en";

function setCookie(res: NextResponse, name: string, value: string, options: { path: string }) {
  res.cookies.set(name, value, options);
}

function getBrowserLanguage(req: NextRequest): string {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;
  const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0];
  return validLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

async function fetchUserLocation(req: NextRequest): Promise<{ country: string; language: string; ipData: any }> {
  const isDevelopment = process.env.NODE_ENV === "development";
  const clientIP = isDevelopment
    ? "106.219.68.189"
    : req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || req.ip;

  if (!clientIP) {
    console.error("Unable to detect client IP address.");
    return { country: defaultCountry, language: defaultLocale, ipData: null };
  }

  const fallbackServices = [
    `https://ipinfo.io/${clientIP}/json/`,
    `https://ipapi.co/${clientIP}/json/`,
    `https://ipwhois.app/json/${clientIP}`,
    `https://json.geoiplookup.io/${clientIP}`,
    `https://get.geojs.io/v1/ip/geo/${clientIP}.json`,
  ];

  try {
    const response = await Promise.any(
      fallbackServices.map((service) =>
        fetch(service).then(async (res) => {
          if (!res.ok) throw new Error(`${service} failed`);
          const data = await res.json();
          return {
            country: service.includes("ipwhois.app")
              ? data.country_code?.toLowerCase()
              : data.country?.toLowerCase() || data.country_code?.toLowerCase(),
            language: defaultLocale,
            ipData: data,
          };
        })
      )
    );
    console.log("Successfully fetched IP data");
    return response;
  } catch (error) {
    console.error("All IP services failed:", error);
    return { country: defaultCountry, language: defaultLocale, ipData: null };
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Current path:", pathname);

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    if (pathname === '/in/en/admin/login') {
      return NextResponse.next();
    }

    const adminSession = req.cookies.get('admin_session');
    if (!adminSession || adminSession.value !== 'true') {
      return NextResponse.redirect(new URL('/in/en/admin/login', req.url));
    }

    return NextResponse.next();
  }

  const pathParts = pathname.split("/").filter(Boolean);
  const userCountryISO = pathParts[0]?.toLowerCase();
  const userLanguage = pathParts[1]?.toLowerCase();

  const isCountryValid = validCountryISOs.includes(userCountryISO);
  const isLanguageValid = validLocales.includes(userLanguage);

  const res = NextResponse.next();
  res.headers.set("x-next-url-path", req.nextUrl.pathname);
  res.headers.set("x-next-url-query", req.nextUrl.search);

  if (isCountryValid && isLanguageValid) {
    console.log("Valid country and language in URL, setting cookies...");
    setCookie(res, "country", userCountryISO, { path: "/" });
    setCookie(res, "language", userLanguage, { path: "/" });
    return res;
  }

  try {
    const userLocation = await fetchUserLocation(req);
    const { country: detectedCountry, ipData } = userLocation;
    const browserLanguage = getBrowserLanguage(req);

    const finalCountry = isCountryValid ? userCountryISO : (validCountryISOs.includes(detectedCountry) ? detectedCountry : defaultCountry);
    const finalLanguage = isLanguageValid ? userLanguage : (validLocales.includes(browserLanguage) ? browserLanguage : defaultLocale);

    console.log("Final country:", finalCountry);
    console.log("Final language:", finalLanguage);

    setCookie(res, "country", finalCountry, { path: "/" });
    setCookie(res, "language", finalLanguage, { path: "/" });

    if (ipData) {
      setCookie(res, "ipData", JSON.stringify(ipData), { path: "/" });
    }

    // Construct the new URL
    const newPathParts = [finalCountry, finalLanguage, ...pathParts.slice(2)];
    const redirectURL = `/${newPathParts.join('/')}`;
    const url = req.nextUrl.clone();
    url.pathname = redirectURL;

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Critical error in middleware:", error);
    const fallbackURL = `/${defaultCountry}/${defaultLocale}${pathname}`;
    const url = req.nextUrl.clone();
    url.pathname = fallbackURL;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|google059bd1b2c050b28b.html|api).*)",
  ],
};

