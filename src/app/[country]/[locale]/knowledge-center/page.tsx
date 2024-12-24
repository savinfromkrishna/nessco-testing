import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import Pages from "@/components/knowledge-center/Pages";
import {
  KnowledgeCenterItem,
  Props,
} from "@/components/knowledge-center/types/constant";
import { getBaseUrl } from "@/app/api/environment";
import knowledgeCenterData from "@/dictionary/knowledge-center.json";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

export const revalidate = 60;

async function fetchKnowledgeCenterData(
  locale: string
): Promise<KnowledgeCenterItem | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowledgecenter.json`);
    if (!res.ok) throw new Error("Primary API fetch failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Primary fetch failed for locale: ${locale}`, error);
    try {
      const fallbackRes = await fetch(`${apiUrl}en/knowledgecenter.json`, {
        cache: "no-store",
      });
      if (!fallbackRes.ok) throw new Error("Fallback API fetch failed");
      const data = await fallbackRes.json();
      return data;
    } catch (fallbackError) {
      console.error("Fallback fetch failed", fallbackError);
      console.warn("Using local JSON data as last resort");
      return knowledgeCenterData as KnowledgeCenterItem;
    }
  }
}

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    if (!res.ok) throw new Error("Country API fetch failed");
    const countryData: Record<string, string> = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    console.error("Country API fetch failed", error);
    try {
      const fallbackRes = await fetch(`${countryUrl}in.json`);
      if (!fallbackRes.ok) throw new Error("Country fallback fetch failed");
      const fallbackData: Record<string, string> = await fallbackRes.json();
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
  const knowledgeCenterData = await fetchKnowledgeCenterData(locale);

  if (
    !knowledgeCenterData ||
    !knowledgeCenterData.knowledgeCenter ||
    knowledgeCenterData.knowledgeCenter.length === 0 ||
    !countryName
  ) {
    return {
      title: "Knowledge Center - Nessco Industries",
      description:
        "Explore our Knowledge Center for valuable insights and information.",
      keywords: "default, keywords",
      openGraph: {
        title: "Knowledge Center - Nessco Industries",
        description:
          "Explore our Knowledge Center for valuable insights and information.",
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
        site: "@NesscoIndia",
        title: "Knowledge Center - Nessco Industries",
        description:
          "Explore our Knowledge Center for valuable insights and information.",
      },
    };
  }

  const seoData = knowledgeCenterData.knowledgeCenter[0].knowLedgeCenterSeoData;

  return {
    title: `${seoData.title} - ${countryName}`,
    description: seoData.description,
    keywords: seoData.keywords,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "website",
      siteName: "Nessco",
      url: `${baseUrl}`,
      title: `${seoData.title} - ${countryName}`,
      description: seoData.description,
      images: seoData.openGraph.images,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData.title} - ${countryName}`,
      description: seoData.description,
      images: seoData?.twitter?.image,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function KnowledgeCenter({ params: { locale } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  const knowledgeCenterData = await fetchKnowledgeCenterData(locale);
  // const t = await getTranslations({ locale });

  if (!knowledgeCenterData) {
    return <p>critical error</p>;
  }

  return (
    <main>
      <Pages knowledgeCenterData={knowledgeCenterData} />
    </main>
  );
}
