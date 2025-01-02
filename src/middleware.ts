import { NextRequest, NextResponse } from "next/server";

// List of valid ISO country codes (ISO 3166-1 alpha-2)
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

const validLocales = [
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "az",
  "eu",
  "be",
  "bn",
  "bs",
  "bg",
  "my",
  "ca",
  "ny",
  "zh",
  "co",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "fi",
  "fr",
  "fy",
  "gd",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "ha",
  "he",
  "hi",
  "hu",
  "is",
  "ig",
  "id",
  "ga",
  "it",
  "ja",
  "jv",
  "kn",
  "kk",
  "km",
  "rw",
  "ky",
  "ko",
  "ku",
  "la",
  "lb",
  "lo",
  "lt",
  "lv",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "mi",
  "mr",
  "mn",
  "ne",
  "no",
  "nb",
  "or",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "ro",
  "ru",
  "sm",
  "sr",
  "sn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "st",
  "es",
  "su",
  "sw",
  "sv",
  "ta",
  "te",
  "tg",
  "th",
  "tk",
  "tl",
  "tr",
  "tt",
  "ug",
  "uk",
  "ur",
  "uz",
  "vi",
  "cy",
  "xh",
  "yi",
  "yo",
  "zu",
];
const defaultCountry = "in";  // Default country is India
const defaultLocale = "en";   // Default locale is English

// Interface for IP geolocation data
interface IPGeolocationData {
  country_code?: string;
  country?: string;
  [key: string]: any;
}

// Function to set a cookie
function setCookie(res: NextResponse, name: string, value: string, path: string = "/") {
  res.cookies.set(name, value, { 
    path, 
    httpOnly: true, 
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });
}

// Function to get the browser language
function getBrowserLanguage(req: NextRequest): string {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;
  const browserLanguages = acceptLanguageHeader.split(",").map(lang => lang.split(";")[0].trim().toLowerCase());
  for (const lang of browserLanguages) {
    if (validLocales.includes(lang)) {
      return lang;
    }
    const shortLang = lang.split("-")[0];
    if (validLocales.includes(shortLang)) {
      return shortLang;
    }
  }
  return defaultLocale;
}

// Function to fetch user location based on IP
async function fetchUserLocation(req: NextRequest): Promise<{ country: string, language: string, ipData: IPGeolocationData | null }> {
  console.log("Fetching client IP address...");
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0] || req.ip || "";

  if (!clientIP) {
    console.error("Unable to detect client IP address.");
    return { country: defaultCountry, language: defaultLocale, ipData: null };
  }

  const ipServices = [
    `https://ipapi.co/${clientIP}/json/`,
    `https://ipwhois.app/json/${clientIP}`,
    `https://get.geojs.io/v1/ip/geo/${clientIP}.json`,
  ];

  for (const service of ipServices) {
    try {
      const response = await fetch(service, { 
        next: { revalidate: 86400 }, // Cache for 24 hours
        headers: { 'User-Agent': 'Internationalization-Middleware/1.0' }
      });
      if (response.ok) {
        const data: IPGeolocationData = await response.json();
        console.log("Using IP service:", service);
        const detectedCountry = (data.country_code || data.country || "").toLowerCase();
        return {
          country: validCountryISOs.includes(detectedCountry) ? detectedCountry : defaultCountry,
          language: defaultLocale,
          ipData: data,
        };
      }
    } catch (error) {
      console.warn(`Service ${service} failed:`, error);
    }
  }

  console.error("All IP services failed, using default location.");
  return { country: defaultCountry, language: defaultLocale, ipData: null };
}

// Middleware function
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  console.log("Current path:", pathname);

  const pathParts = pathname.split("/").filter(Boolean);
  const userCountryISO = pathParts[0]?.toLowerCase();
  const userLanguage = pathParts[1]?.toLowerCase();

  const isCountryValid = validCountryISOs.includes(userCountryISO);
  const isLanguageValid = validLocales.includes(userLanguage);

  const res = NextResponse.next();
  res.headers.set("x-next-url-path", pathname);
  res.headers.set("x-next-url-query", search);

  // Case 1: Both country and language are valid in the URL
  if (isCountryValid && isLanguageValid) {
    console.log("Valid country and language in URL, setting cookies...");
    setCookie(res, "country", userCountryISO);
    setCookie(res, "language", userLanguage);
    return res;
  }

  // Case 2: Country is valid but language is missing or invalid
  if (isCountryValid && !isLanguageValid) {
    const browserLanguage = getBrowserLanguage(req);
    const newPath = `/${userCountryISO}/${browserLanguage}${pathname.slice(userCountryISO.length + 1)}${search}`;
    console.log("Redirecting to add valid language:", newPath);
    return NextResponse.redirect(new URL(newPath, req.url));
  }

  // Case 3: Country is missing or invalid, need to detect location
  const userLocation = await fetchUserLocation(req);
  const { country: detectedCountry, ipData } = userLocation;
  const browserLanguage = getBrowserLanguage(req);
  console.log("Detected user country:", detectedCountry);
  console.log("Browser language:", browserLanguage);

  const finalCountry = detectedCountry || defaultCountry;
  const finalLanguage = isLanguageValid ? userLanguage : browserLanguage;

  setCookie(res, "country", finalCountry);
  setCookie(res, "language", finalLanguage);

  if (ipData) {
    setCookie(res, "ipData", JSON.stringify(ipData));
  }

  // Case 4: Redirect to the correct country and language
  const redirectURL = `/${finalCountry}/${finalLanguage}${isCountryValid ? pathname.slice(userCountryISO.length + 1) : pathname}${search}`;
  const url = req.nextUrl.clone();
  url.pathname = redirectURL;

  console.log("Redirecting to:", redirectURL);
  return NextResponse.redirect(url);
}

// Configuration for the middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

