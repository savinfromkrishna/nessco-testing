import { locales } from "@/i18n";
import {  unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { cache } from "react";
import localFooterData from "@/dictionary/footer.json";
import FooterNew from "./FooterNews";

// Cache object to store the last successful API response
const lastSuccessfulResponseCache: Record<string, any> = {};

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string };
};

type CountryNames = {
  [locale: string]: string;
};

export const revalidate = 60;

const fetchFooterData = cache(async (locale: string): Promise<any> => {
  try {
    // Try to fetch data for the given locale
    const res = await fetch(`${apiUrl}${locale}/footer.json`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`Locale ${locale} not found, falling back to English.`);
      const fallbackRes = await fetch(`${apiUrl}en/footer.json`, {
        next: { revalidate: 60 },
      });

      if (!fallbackRes.ok) {
        throw new Error("Fallback API failed");
      }

      const fallbackData = await fallbackRes.json();
      // Store the fallback data in the cache
      lastSuccessfulResponseCache["en"] = fallbackData.Footer[0].footerContent;
      return fallbackData.Footer[0].footerContent;
    }

    const data = await res.json();
    // Store the successful response in the cache
    lastSuccessfulResponseCache[locale] = data.Footer[0].footerContent;
    return data.Footer[0].footerContent;
  } catch (error) {
    console.error(`Error fetching footer data for locale ${locale}:`, error);

    // If both primary and fallback fail, return cached response if available
    if (lastSuccessfulResponseCache[locale]) {
      console.warn(`Returning cached response for locale ${locale}.`);
      return lastSuccessfulResponseCache[locale];
    } else if (lastSuccessfulResponseCache["en"]) {
      console.warn("Returning cached English response as a fallback.");
      return lastSuccessfulResponseCache["en"];
    }

    // If all remote options fail, use local data
    console.warn("Using local footer data as final fallback.");
    return localFooterData.Footer[0].footerContent;
  }
});

const fetchCountryData = cache(async (locale: string): Promise<string> => {
  const country = cookies().get("country")?.value || "in";

  try {
    const res = await fetch(`${countryUrl}${country}.json`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Country API fetch failed");
    const countryData: CountryNames = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    console.error("Country API fetch failed", error);
    try {
      const fallbackRes = await fetch(`${countryUrl}in.json`, {
        next: { revalidate: 60 },
      });
      if (!fallbackRes.ok) throw new Error("Country fallback fetch failed");
      const fallbackData: CountryNames = await fallbackRes.json();
      return fallbackData[locale] || fallbackData["en"];
    } catch (fallbackError) {
      console.error("Country fallback fetch failed", fallbackError);
      return "India";
    }
  }
});

export default async function FooterLayout({ params: { locale } }: Props) {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English if the locale is not supported
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch footer data based on locale, falling back to English if necessary
  const footerData = await fetchFooterData(locale);

  // Fetch translations based on the locale

  // Handle case where data fetching fails
  if (!footerData) {
    return <div>Critical Error</div>; // Translated error message
  }

  const language = cookies().get("language")?.value || "in";
  const countryName = await fetchCountryData(locale);

  return (
    <div>
      <FooterNew
        footerData={footerData}
        country={countryName}
        langauge={language}
      />
    </div>
  );
}
