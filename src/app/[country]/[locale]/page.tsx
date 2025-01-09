import { Metadata } from "next";
import { cookies } from "next/headers";
import MainLayout from "@/components/Home/MainLayout";
import { HomeData } from "@/components/Home/types/constant";
import { locales } from "@/i18n";
import { getBaseUrl } from "@/app/api/environment";

const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string };
};

type CountryNames = {
  [locale: string]: string;
};

async function fetchHomeData(locale: string): Promise<HomeData | null> {
  try {
    const res = await fetch(`${apiUrl}${locale}/hero.json`, {
     next: {
        tags: ["home-data"],
      },
    });
    if (!res.ok) throw new Error("Failed to fetch home data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching home data:", error);
    const fallbackRes = await fetch(`${apiUrl}en/hero.json`, {
     next: {
        tags: ["home-data"],
      },
    });
    if (!fallbackRes.ok) throw new Error("Failed to fetch fallback home data");
    return await fallbackRes.json();
  }
}

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  try {
    const res = await fetch(`${countryUrl}${country}.json`, {
      next: { tags: ["country-data"], revalidate: 3600 },
    });
    if (!res.ok) throw new Error("Failed to fetch country data");
    const countryData: CountryNames = await res.json();
    return countryData[locale] || countryData["en"];
  } catch (error) {
    console.error("Error fetching country data:", error);
    const fallbackRes = await fetch(`${countryUrl}in.json`, {
      next: { tags: ["country-data"], revalidate: 3600 },
    });
    if (!fallbackRes.ok)
      throw new Error("Failed to fetch fallback country data");
    const fallbackData: CountryNames = await fallbackRes.json();
    return fallbackData[locale] || fallbackData["en"];
  }
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();
  const safeLocale = locales.includes(locale as any) ? locale : "en";
  const homeData = await fetchHomeData(safeLocale);
  const countryName = await fetchCountryData(safeLocale);

  if (!homeData || !countryName) {
    return {
      title: "Nessco - Default Title",
      description: "Default Description",
      openGraph: {
        title: "Nessco - Default OG Title",
        description: "Default OG Description",
      },
      robots: "noindex, nofollow",
      alternates: {
        canonical: `${baseUrl}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@NesscoIndia",
        title: "Nessco - Default Twitter Title",
        description: "Default Twitter Description",
      },
    };
  }

  const seoData = homeData.home[0]?.homeSeoData;

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
      index: false,
      follow: false,
    },
  };
}

export default async function Home({ params: { locale } }: Props) {
  const safeLocale = locales.includes(locale as any) ? locale : "en";

  try {
    const homeData = await fetchHomeData(safeLocale);

    if (!homeData) {
      throw new Error("Failed to fetch home data");
    }

    return (
      <main>
        <MainLayout homeData={homeData} />
      </main>
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return (
      <main>
        <h1>An error occurred</h1>
        <p>
          We&apos;re sorry, but we couldn&apos;t load the page content. Please
          try again later.
        </p>
      </main>
    );
  }
}
