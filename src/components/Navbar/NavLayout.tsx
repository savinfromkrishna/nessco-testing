import { locales } from "@/i18n";
import NavbarDemo from "./Navbar";
import { NavbarData } from "./types/constant";
import { unstable_setRequestLocale } from "next-intl/server";
import { cache } from "react";
import localNavbarData from "@/dictionary/navbar.json";

// Cache object to store the last successful API response
const lastSuccessfulResponseCache: Record<string, NavbarData | null> = {};

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";

type Props = {
  params: { locale: string };
};

export const revalidate = 1;

const fetchNavData = cache(
  async (locale: string): Promise<NavbarData | null> => {
    try {
      // Try to fetch data for the given locale
      const res = await fetch(`${apiUrl}${locale}/navbar.json`, {
        next: { revalidate: 0 }, // Cache for 60 seconds
      });

      if (!res.ok) {
        console.warn(`Locale ${locale} not found, falling back to English.`);
        const fallbackRes = await fetch(`${apiUrl}en/navbar.json`, {
          next: { revalidate: 0 }, // Cache for 60 seconds
        });

        if (!fallbackRes.ok) {
          throw new Error("Fallback API failed");
        }

        const fallbackData = await fallbackRes.json();
        // Store the fallback data in the cache
        lastSuccessfulResponseCache["en"] = fallbackData;
        return fallbackData;
      }

      const data = await res.json();
      // Store the successful response in the cache
      lastSuccessfulResponseCache[locale] = data;
      return data;
    } catch (error) {
      console.error(`Error fetching navbar data for locale ${locale}:`, error);

      // If both primary and fallback fail, return cached response if available
      if (lastSuccessfulResponseCache[locale]) {
        console.warn(`Returning cached response for locale ${locale}.`);
        return lastSuccessfulResponseCache[locale];
      } else if (lastSuccessfulResponseCache["en"]) {
        console.warn("Returning cached English response as a fallback.");
        return lastSuccessfulResponseCache["en"];
      }

      // If all remote options fail, use local data
      console.warn("Using local navbar data as final fallback.");
      return localNavbarData as NavbarData;
    }
  }
);

export default async function NavLayout({ params: { locale } }: Props) {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English if the locale is not supported
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch navbar data based on locale, falling back to English if necessary
  const navData = await fetchNavData(locale);

  if (!navData) {
    // This case should never occur now, as we always have local data as a final fallback
    return <div>Failed to load navigation data</div>;
  }

  return (
    <>
      <NavbarDemo navData={navData} />
    </>
  );
}