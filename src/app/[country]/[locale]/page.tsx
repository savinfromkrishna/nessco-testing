import MainLayout from "@/components/Home/MainLayout";
import { HomeData } from "@/components/Home/types/constant";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import { getBaseUrl } from "@/app/api/environment";
import heroData from "@/dictionary/hero.json";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

// In-memory cache for storing the last successful response
const localeCache = new Map<string, HomeData>();

// Revalidate every 60 seconds
export const revalidate = 60;

interface Props {
  params: {
    locale: string;
  };
}

// Fetch home data with locale cache and fallback to local JSON
async function fetchHomeData(locale: string): Promise<HomeData | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/hero.json`);
    if (!res.ok) throw new Error("API fetch failed");
    const data = await res.json();
    localeCache.set(locale, data);
    return data;
  } catch (error) {
    console.error(`Primary fetch failed for locale: ${locale}`, error);

    try {
      const fallbackRes = await fetch(`${apiUrl}en/hero.json`, {
        cache: "no-store",
      });
      if (!fallbackRes.ok) throw new Error("Fallback fetch failed");
      const fallbackData = await fallbackRes.json();
      localeCache.set("en", fallbackData);
      return fallbackData;
    } catch (fallbackError) {
      console.error("Fallback fetch failed", fallbackError);

      if (localeCache.has(locale)) {
        console.warn(`Serving cached data for locale: ${locale}`);
        return localeCache.get(locale) || null;
      } else if (localeCache.has("en")) {
        console.warn("Serving cached fallback data for English locale");
        return localeCache.get("en") || null;
      }

      console.warn("Using local JSON data as last resort");
      return heroData as unknown as HomeData;
    }
  }
}

type CountryNames = {
  [locale: string]: string;
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    if (!res.ok) throw new Error("Country API fetch failed");
    const countryData: CountryNames = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    console.error("Country API fetch failed", error);

    try {
      const fallbackRes = await fetch(`${countryUrl}in.json`);
      if (!fallbackRes.ok) throw new Error("Country fallback fetch failed");
      const fallbackData: CountryNames = await fallbackRes.json();
      return fallbackData[locale] || fallbackData["en"];
    } catch (fallbackError) {
      console.error("Country fallback fetch failed", fallbackError);
      return "India"; // Default to "India" if all else fails
    }
  }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  const homeData = await fetchHomeData(locale);
  const countryName = await fetchCountryData(locale);

  if (!homeData || !countryName) {
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "default, keywords",
      openGraph: {
        title: "Default OG Title",
        description: "Default OG Description",
      },
      robots: "index, follow",
      alternates: {
        canonical: `${baseUrl}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@DefaultTwitter",
        title: "Default Twitter Title",
        description: "Default Twitter Description",
      },
    };
  }

  const seoData = homeData?.home[0]?.homeSeoData;

  return {
    title: `${seoData?.title} - ${countryName}`,
    description: seoData?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "website",
      title: `${seoData?.title} - ${countryName}`,
      siteName: "Nessco",
      url: `${baseUrl}`,
      description: seoData?.description,
      images: seoData?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData?.title} - ${countryName}`,
      description: seoData?.twitter?.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({ params: { locale } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const homeData = await fetchHomeData(locale);
  // const t = await getTranslations({ locale });

  if (!homeData) {
    return <p>console.error();</p>;
  }

  return (
    <main>
      <MainLayout homeData={homeData} />
    </main>
  );
}
