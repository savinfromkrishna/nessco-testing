import { KnowYourMachineItem } from "@/components/support/types/constantMachine";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { getBaseUrl } from "@/app/api/environment";
import KnowledgeCenterGeneric from "@/components/knowledge-center/knowledgeGeneric";
import knowYourMachineData from "@/dictionary/know-your-machine.json";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string };
};

export const revalidate = 60;

async function fetchknowYourMachineData(
  locale: string
): Promise<KnowYourMachineItem | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowyourmachine.json`);
    if (!res.ok) throw new Error("Primary API fetch failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Primary fetch failed for locale: ${locale}`, error);
    try {
      const fallbackRes = await fetch(`${apiUrl}en/knowyourmachine.json`, {
        cache: "no-store",
      });
      if (!fallbackRes.ok) throw new Error("Fallback API fetch failed");
      const data = await fallbackRes.json();
      return data;
    } catch (fallbackError) {
      console.error("Fallback fetch failed", fallbackError);
      console.warn("Using local JSON data as last resort");
      return knowYourMachineData as unknown as KnowYourMachineItem;
    }
  }
}

type CountryNames = {
  [locale: string]: string;
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  console.log("countryname", country);

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

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();

  const countryName = await fetchCountryData(locale);
  const knowYourMachineData = await fetchknowYourMachineData(locale);

  if (!knowYourMachineData || !countryName) {
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

  const seoData =
    knowYourMachineData?.KnowYourMachine[0]?.knowYourMachineSeoData;

  return {
    title: `${seoData?.title} - ${countryName}`,
    description: seoData?.description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "website",
      siteName: "Nessco",
      url: `${baseUrl}`,
      title: `${seoData?.title} - ${countryName}`,
      description: seoData?.description,
      images: seoData?.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData?.title} - ${countryName}`,
      description: seoData?.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function KnowYourMachine({ params: { locale } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const knowYourMachineData = await fetchknowYourMachineData(locale);
  // const t = await getTranslations({ locale });

  if (!knowYourMachineData) {
    return <p>critical error</p>;
  }

  const headerData = knowYourMachineData.KnowYourMachine[0].Header;

  return (
    <main>
      <KnowledgeCenterGeneric
        title={headerData.title}
        description={headerData.description}
        img={headerData.img}
        cards={headerData.cards}
        type="knowyourmachine"
      />
    </main>
  );
}
