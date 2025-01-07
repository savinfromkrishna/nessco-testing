import { NextResponse } from "next/server";

const validCountryISOs = [
  "af",
  "ax",
  "al",
  "dz",
  "as",
  "ad",
  "ao",
  "ai",
  "aq",
  "ag",
  "ar",
  "am",
  "aw",
  "au",
  "at",
  "az",
  "bs",
  "bh",
  "bd",
  "bb",
  "by",
  "be",
  "bz",
  "bj",
  "bm",
  "bt",
  "bo",
  "bq",
  "ba",
  "bw",
  "bv",
  "br",
  "io",
  "bn",
  "bg",
  "bf",
  "bi",
  "cv",
  "kh",
  "cm",
  "ca",
  "ky",
  "cf",
  "td",
  "cl",
  "cn",
  "cx",
  "cc",
  "co",
  "km",
  "cd",
  "cg",
  "ck",
  "cr",
  "hr",
  "cu",
  "cw",
  "cy",
  "cz",
  "dk",
  "dj",
  "dm",
  "do",
  "ec",
  "eg",
  "sv",
  "gq",
  "er",
  "ee",
  "sz",
  "et",
  "fk",
  "fo",
  "fj",
  "fi",
  "fr",
  "gf",
  "pf",
  "tf",
  "ga",
  "gm",
  "ge",
  "de",
  "gh",
  "gi",
  "gr",
  "gl",
  "gd",
  "gp",
  "gu",
  "gt",
  "gg",
  "gn",
  "gw",
  "gy",
  "ht",
  "hm",
  "va",
  "hn",
  "hk",
  "hu",
  "is",
  "in",
  "id",
  "ir",
  "iq",
  "ie",
  "im",
  "il",
  "it",
  "jm",
  "jp",
  "je",
  "jo",
  "kz",
  "ke",
  "ki",
  "kp",
  "kr",
  "kw",
  "kg",
  "la",
  "lv",
  "lb",
  "ls",
  "lr",
  "ly",
  "li",
  "lt",
  "lu",
  "mo",
  "mg",
  "mw",
  "my",
  "mv",
  "ml",
  "mt",
  "mh",
  "mq",
  "mr",
  "mu",
  "yt",
  "mx",
  "fm",
  "md",
  "mc",
  "mn",
  "me",
  "ms",
  "ma",
  "mz",
  "mm",
  "na",
  "nr",
  "np",
  "nl",
  "nc",
  "nz",
  "ni",
  "ne",
  "ng",
  "nu",
  "nf",
  "mp",
  "no",
  "om",
  "pk",
  "pw",
  "ps",
  "pa",
  "pg",
  "py",
  "pe",
  "ph",
  "pn",
  "pl",
  "pt",
  "pr",
  "qa",
  "re",
  "ro",
  "ru",
  "rw",
  "bl",
  "sh",
  "kn",
  "lc",
  "mf",
  "pm",
  "vc",
  "ws",
  "sm",
  "st",
  "sa",
  "sn",
  "rs",
  "sc",
  "sl",
  "sg",
  "sx",
  "sk",
  "si",
  "sb",
  "so",
  "za",
  "gs",
  "ss",
  "es",
  "lk",
  "sd",
  "sr",
  "sj",
  "se",
  "ch",
  "sy",
  "tw",
  "tj",
  "tz",
  "th",
  "tl",
  "tg",
  "tk",
  "to",
  "tt",
  "tn",
  "tr",
  "tm",
  "tc",
  "tv",
  "ug",
  "ua",
  "ae",
  "gb",
  "us",
  "um",
  "uy",
  "uz",
  "vu",
  "ve",
  "vn",
  "vg",
  "vi",
  "wf",
  "eh",
  "ye",
  "zm",
  "zw",
];
const validLocales = (() => {
  try {
    return JSON.parse(
      process.env.NEXT_PUBLIC_VALID_LOCALES || '["en","hi","fr","ar"]'
    );
  } catch {
    console.error(
      "Invalid NEXT_PUBLIC_VALID_LOCALES format, using default locales."
    );
    return ["en", "hi", "fr", "ar"];
  }
})();
console.log("i processd locales", process.env.NEXT_PUBLIC_VALID_LOCALES);
const defaultLocale = "en";
function setCookie(name, value, options) {
  const { res, path = "/" } = options;
  res.cookies.set(name, value, { path });
}

function getBrowserLanguage(req) {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;
  const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0];
  console.log("Browser language detected:", browserLanguage);
  return validLocales.includes(browserLanguage)
    ? browserLanguage
    : defaultLocale;
}

async function fetchUserLocation(req) {
  console.log("Fetching client IP address...");
  const myip = "106.219.68.189"; // For development
  const isDevelopment = process.env.NODE_ENV === "development";
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip");
  const newClientIp = isDevelopment ? myip : clientIP;
  if (!newClientIp) {
    console.error("Unable to detect client IP address.");
    return { country: "us", language: "en", ipData: null };
  }
  console.log("Detected client IP address:", newClientIp);
  const nesscoUrl = `https://ipinfo.io/${newClientIp}/json/`;
  try {
    const nesscoResponse = await fetch(nesscoUrl);
    if (nesscoResponse.ok) {
      const data = await nesscoResponse.json();
      console.log("Using Nessco API", nesscoUrl);
      return {
        country:
          data.country?.toLowerCase() || data.country_code?.toLowerCase(),
        language: "en",
        ipData: data,
      };
    }
  } catch (error) {
    console.error("Nessco API failed:", error);
  }

  const fallbackServices = [
    `https://ipinfo.io/${newClientIp}/json/`,
    `https://ipapi.co/${newClientIp}/json/`,
    `https://ipwhois.app/json/${newClientIp}`,
    `https://json.geoiplookup.io/${newClientIp}`,
    `https://get.geojs.io/v1/ip/geo/${newClientIp}.json`,
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
            language: "en",
            ipData: data,
          };
        })
      )
    );
    console.log("Successfully fetched IP data");
    return response;
  } catch (error) {
    console.error("All IP services failed:", error);
    return { country: "in", language: "en", ipData: null };
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log("Current path:", pathname);

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
    setCookie("country", userCountryISO, { res, path: "/" });
    setCookie("language", userLanguage, { res, path: "/" });
    return res;
  }

  const userLocation = await fetchUserLocation(req);
  const { country: detectedCountry, ipData } = userLocation;
  const browserLanguage = getBrowserLanguage(req);
  console.log("Detected user country:", detectedCountry);
  console.log("Browser language:", browserLanguage);

  setCookie("country", detectedCountry, { res, path: "/" });
  setCookie("language", browserLanguage, { res, path: "/" });

  // Set IP data in a cookie for client-side access
  if (ipData) {
    setCookie("ipData", JSON.stringify(ipData), { res, path: "/" });
  }

  const redirectURL = `/${detectedCountry}/${browserLanguage}`;
  const url = req.nextUrl.clone();
  url.pathname = redirectURL;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
