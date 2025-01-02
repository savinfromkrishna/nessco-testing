import MainLayout from "@/components/Home/MainLayout";
import { HomeData } from "@/components/Home/types/constant";
import { Metadata } from "next";
import { cookies } from "next/headers"; // Server-side (Next.js app directory)
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import { getBaseUrl } from "@/app/api/environment";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

// Define the allowed Twitter card types

type Props = {
  params: { locale: string; country: string };
};

// Revalidate every 60 seconds (or any time period you prefer)
export const revalidate = 60;

// Fetch home data based on the locale
async function fetchHomeData(locale: string): Promise<HomeData | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/hero.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/hero.json`, {
      cache: "no-store", // Ensures no caching for the fallback as well
    });
    const data = await fallbackRes.json();
    return data;
  }
}

type CountryNames = {
  [locale: string]: string; // Each locale key maps directly to the country name
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    const countryData: CountryNames = await res.json();
    // Return the country name for the provided locale
    return countryData[locale] || countryData["en"]; // Fallback to English if the locale isn't available
  } catch (error) {
    const fallbackRes = await fetch(`${countryUrl}in.json`);
    const fallbackData: CountryNames = await fallbackRes.json();
    // Handle fallback case, also fallback to English if locale not available
    return fallbackData[locale] || fallbackData["en"];
  }
}

// Dynamically generate metadata using the fetched SEO data
export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  // Fallback to "en" if the locale isn't supported
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const homeData = await fetchHomeData(locale);
  const countryName = await fetchCountryData(locale);

  if (!homeData && !countryName) {
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
    title: `${seoData?.title} - ${countryName} `,
    description: seoData?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "website",
      siteName: "Nessco",
      url: `${baseUrl}`,
      title: `${seoData?.title} - ${countryName} `,
    description: seoData?.description,
      images: seoData?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData?.title} - ${countryName} `,
    description: seoData?.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Home component rendering the MainLayout with fetched data
export default async function Home({ params: { locale } }: Props) {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch home data based on the locale
  const homeData = await fetchHomeData(locale);

  // Fetch translations based on the locale

  if (!homeData) {
    return <p>Critical Error</p>;
  }

  return (
    <main>
      <MainLayout homeData={homeData} />
    </main>
  );
}