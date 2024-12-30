import { NextResponse } from "next/server";

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

const validLocales = [
  "af", "sq", "am", "ar", "hy", "az", "eu", "be", "bn", "bs", "bg", "my", "ca", "ny", "zh", "co",
  "hr", "cs", "da", "nl", "en", "eo", "et", "fi", "fr", "fy", "gd", "gl", "ka", "de", "el", "gu",
  "ht", "ha", "he", "hi", "hu", "is", "ig", "id", "ga", "it", "ja", "jv", "kn", "kk", "km", "rw",
  "ky", "ko", "ku", "la", "lb", "lo", "lt", "lv", "mk", "mg", "ms", "ml", "mt", "mi", "mr", "mn",
  "ne", "no", "nb", "or", "ps", "fa", "pl", "pt", "pa", "ro", "ru", "sm", "sr", "sn", "sd", "si",
  "sk", "sl", "so", "st", "es", "su", "sw", "sv", "ta", "te", "tg", "th", "tk", "tl", "tr", "tt",
  "ug", "uk", "ur", "uz", "vi", "cy", "xh", "yi", "yo", "zu"
];
const defaultCountry = "in";
const defaultLocale = "en";

function setCookie(res: NextResponse, name: string, value: string, path = "/") {
  res.cookies.set(name, value, { path });
}

function getBrowserLanguage(req: Request): string {
  const acceptLanguageHeader = req.headers.get("accept-language");
  if (!acceptLanguageHeader) return defaultLocale;
  const browserLanguage = acceptLanguageHeader.split(",")[0]?.split("-")[0].toLowerCase();
  return validLocales.includes(browserLanguage) ? browserLanguage : defaultLocale;
}

async function fetchUserLocation(clientIP: string): Promise<{ country: string; ipData: any }> {
  const services = [
    `https://ipinfo.io/${clientIP}/json/`,
    `https://ipapi.co/${clientIP}/json/`,
    `https://ipwhois.app/json/${clientIP}`,
    `https://json.geoiplookup.io/${clientIP}`,
    `https://get.geojs.io/v1/ip/geo/${clientIP}.json`,
  ];

  for (const service of services) {
    try {
      const response = await fetch(service);
      if (response.ok) {
        const data = await response.json();
        const country = (data.country || data.country_code || defaultCountry).toLowerCase();
        return { country, ipData: data };
      }
    } catch (error) {
      console.warn(`Service ${service} failed:`, error);
    }
  }

  console.error("All IP services failed, using default location.");
  return { country: defaultCountry, ipData: null };
}

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;
  console.log("Current path:", pathname);

  const pathParts = pathname.split("/").filter(Boolean);
  const userCountryISO = pathParts[0]?.toLowerCase();
  const userLanguage = pathParts[1]?.toLowerCase();

  const isCountryValid = validCountryISOs.includes(userCountryISO);
  const isLanguageValid = validLocales.includes(userLanguage);

  const res = NextResponse.next();

  if (isCountryValid && isLanguageValid) {
    console.log("Valid country and language in URL, setting cookies...");
    setCookie(res, "country", userCountryISO);
    setCookie(res, "language", userLanguage);
    return res;
  }

  const browserLanguage = getBrowserLanguage(req);
  console.log("Browser language:", browserLanguage);

  let country: string;
  let ipData: any;

  if (!isCountryValid) {
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "";
    if (clientIP) {
      console.log("Fetching user location...");
      ({ country, ipData } = await fetchUserLocation(clientIP));
    } else {
      console.error("Unable to detect client IP address.");
      country = defaultCountry;
    }
  } else {
    country = userCountryISO;
  }

  const language = isLanguageValid ? userLanguage : browserLanguage;

  setCookie(res, "country", country);
  setCookie(res, "language", language);

  if (ipData) {
    setCookie(res, "ipData", JSON.stringify(ipData));
  }

  if (!isCountryValid || !isLanguageValid) {
    const redirectURL = `/${country}/${language}${pathname}`;
    url.pathname = redirectURL;
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};

