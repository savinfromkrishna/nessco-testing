import { KnowYourProductItem } from "@/components/support/types/constantProduct";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { cookies } from "next/headers"; // Server-side (Next.js app directory)
import { getBaseUrl } from "@/app/api/environment";
import KnowledgeCenterGeneric from "@/components/knowledge-center/knowledgeGeneric";


const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string };
};

// Revalidate every 60 seconds (or any time period you prefer)
export const revalidate = 60;

// Fetch support data based on the locale
async function fetchknowYourProductData(
  locale: string
): Promise<KnowYourProductItem | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowyourproduct.json`);
    const data = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/knowyourproduct.json`, {
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
  console.log("countryname", country);

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
  // Fallback to "en" if the locale isn't supported
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();
  const countryName = await fetchCountryData(locale);

  const knowYourProductData = await fetchknowYourProductData(locale);

  if (!knowYourProductData && !countryName) {
    return {
      title: "Default Title",
      description: "Default Description",
      keywords: "default, keywords",
      openGraph: {
        title: "Default OG Title",
        description: "Default OG Description",
        images: [
          {
            url: "/default-image.webp",
            alt: "Default Image Alt",
          },
        ],
      },
      robots: "index, follow",
      alternates: {
        canonical: "https://www.default.com",
      },
      twitter: {
        card: "summary_large_image",
        site: "@DefaultTwitter",
        title: "Default Twitter Title",
        description: "Default Twitter Description",
      },
    };
  }

  const seoData =
    knowYourProductData?.KnowYourProduct[0]?.knowYourProductSeoData;

  return {
    title: `${seoData?.title} - ${countryName} `,
    description: seoData?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical:`${baseUrl}`,
    },
    openGraph: {
      type: "website",
      title: seoData?.openGraph?.title,
      siteName: "Nessco",
      url:`${baseUrl}`,
      description: seoData?.openGraph?.description,
      images: seoData?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: seoData?.twitter?.title,
      description: seoData?.twitter?.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// About component rendering the Header with fetched data
export default async function about({ params: { locale } }: Props) {
  // Set default locale if not in supported list
  if (!locales.includes(locale as any)) {
    locale = "en"; // Fallback to English
  }

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  // Fetch support data based on the locale
  const knowYourProductData = await fetchknowYourProductData(locale);

  // Fetch translations based on the locale
  // const t = await getTranslations({ locale });

  if (!knowYourProductData) {
    return <p>critical error</p>;
  }

  const headerData = knowYourProductData.KnowYourProduct[0].Header;

  return (
    <main>
      <KnowledgeCenterGeneric
        title={headerData.title}
        description={headerData.description}
        img={headerData.img}
        cards={headerData.cards} // Pass cards here correctly
        type="knowyourproduct"
      />
    </main>
  );
}
