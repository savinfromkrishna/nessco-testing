import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { KnowYourBusiness } from "@/components/types";
import { getBaseUrl } from "@/app/api/environment";
import FeatureProject from "@/components/StaticBlogs/FeatureProject/FeatureProject";
const countryUrl = "https://countryjson.nesscoindustries.com/";
const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export const revalidate = 60;

async function fetchKnowYourBusinessData(
  locale: string
): Promise<KnowYourBusiness | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/knowyourbussiness.json`);
    const data: KnowYourBusiness = await res.json();
    return data;
  } catch (error) {
    const fallbackRes = await fetch(`${apiUrl}en/knowyourbussiness.json`, {
      cache: "no-store",
    });
    const data: KnowYourBusiness = await fallbackRes.json();
    return data;
  }
}

type CountryNames = {
  [locale: string]: string;
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";

  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    const countryData: CountryNames = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    const fallbackRes = await fetch(`${countryUrl}in.json`);
    const fallbackData: CountryNames = await fallbackRes.json();
    return fallbackData[locale] || fallbackData["en"];
  }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();

  const knowYourBusinessData = await fetchKnowYourBusinessData(locale);
  const countryName = await fetchCountryData(locale);

  if (!knowYourBusinessData || !countryName) {
    return {
      title: "Default Title",
      description: "Default Description",
      openGraph: {
        title: "Default OG Title",
        description: "Default OG Description",
        url: "https://example.com",
        images: [],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  }

  const seoData =
    knowYourBusinessData.KnowYourBussiness[0].knowYourBussinessSeoData;

  return {
    title: `${seoData?.title} - ${countryName}`,
    description: seoData?.description,
    keywords: seoData.keywords,
    openGraph: {
      type: "website",
      siteName: "Nessco",
      url: `${baseUrl}`,
      title: `${seoData?.title} - ${countryName}`,
      description: seoData?.description,
      images: seoData.openGraph.images,
    },
    alternates: {
      canonical: `${baseUrl}`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData?.title} - ${countryName}`,
      description: seoData?.description,
      images: [seoData.twitter.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function FeaturedProjects({
  params: { locale, id },
}: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  return <FeatureProject id={id} />;
}
