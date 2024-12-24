import Pages from "@/components/productLayout/Pages";
import { ProductLayout } from "@/components/productLayout/types/constant";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { cookies } from "next/headers";
import { getBaseUrl } from "@/app/api/environment";
import productLayoutData from "@/dictionary/productlayout.json";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string; id: string; country: string };
};

export const revalidate = 60;

async function fetchProductLayoutData(
  locale: string
): Promise<ProductLayout | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/productlayout.json`);
    if (!res.ok) throw new Error("Primary API fetch failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Primary fetch failed for locale: ${locale}`, error);
    try {
      const fallbackRes = await fetch(`${apiUrl}en/productlayout.json`, {
        cache: "no-store",
      });
      if (!fallbackRes.ok) throw new Error("Fallback API fetch failed");
      const data = await fallbackRes.json();
      return data;
    } catch (fallbackError) {
      console.error("Fallback fetch failed", fallbackError);
      console.warn("Using local JSON data as last resort");
      return productLayoutData as unknown as ProductLayout;
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
      return "India";
    }
  }
}

const normalizeTitle = (title: string | undefined | null): string => {
  return title ? title.toLowerCase().replace(/\s+/g, " ").trim() : "";
};

const formatMachineName = (name: string | undefined | null): string => {
  if (!name) return ""; // Handle undefined or null inputs safely
  return name
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
};

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();

  const productLayoutData = await fetchProductLayoutData(locale);
  const countryName = await fetchCountryData(locale);

  if (!productLayoutData || !countryName) {
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

  let machinename = "";
  if (Array.isArray(id)) {
    machinename = id.join("-");
  } else if (typeof id === "string") {
    machinename = id;
  }
  const formattedMachineName = formatMachineName(machinename);
  const normalizedMachinename = normalizeTitle(formattedMachineName);
  const ProductsGrid = productLayoutData?.ProductLayout[0]?.ProductsGrid;
  const page2machine = ProductsGrid.data.find(
    (m) => normalizeTitle(m.title) === normalizedMachinename
  );
  const seoData = productLayoutData?.ProductLayout[0]?.productLayoutSeoData;

  return {
    title: `${page2machine?.seoTitle}  - ${countryName} `,
    description: page2machine?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "website",
      siteName: "Nessco",
      url: `${baseUrl}`,
      title: `${page2machine?.seoTitle}  - ${countryName} `,
      description: page2machine?.description,
      images: seoData?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${page2machine?.seoTitle}  - ${countryName} `,
      description: page2machine?.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductLayoutComponent({
  params: { locale },
}: {
  params: { locale: string; id: string };
}) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const productLayoutData = await fetchProductLayoutData(locale);
  // const t = await getTranslations({ locale });

  if (!productLayoutData) {
    return <p>critical error</p>;
  }

  return (
    <main>
      <Pages productLayoutData={productLayoutData} />
    </main>
  );
}
