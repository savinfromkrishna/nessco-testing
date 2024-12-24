import { getBaseUrl } from "@/app/api/environment";
import Pages from "@/components/applicationLayout/Pages";
import { ApplicationLayoutItem } from "@/components/applicationLayout/types/constant";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";

const countryUrl = "https://countryjson.nesscoindustries.com/";
const apiUrl = "https://jsondatafromhostingertosheet.nesscoindustries.com/";
const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;

type Props = {
  params: { locale: string; id: string };
};

export const revalidate = 60;

async function fetchApplicationLayoutData(
  locale: string
): Promise<{ botData: ApplicationLayoutItem | null; faqData: any | null }> {
  try {
    const [botRes, faqRes] = await Promise.all([
      fetch(`${apiUrl}${locale}/applicationlayout.json`),
      fetch(`${apiUrl}${locale}/faq.json`),
    ]);

    if (!botRes.ok || !faqRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const botData = await botRes.json();
    const faqData = await faqRes.json();

    return { botData, faqData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { botData: null, faqData: null };
  }
}

type CountryNames = {
  [locale: string]: string;
};

function normalizeInput(inputStr: string): string {
  const cleaned = inputStr.replace(/-/g, " ").trim().toLowerCase();
  const words = cleaned.split(" ");
  const normalized = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return normalized.includes("Paper") && normalized.includes("Cup")
    ? "Paper Cup"
    : normalized;
}

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";

  try {
    const res = await fetch(`${countryUrl}${country}.json`);
    if (!res.ok) throw new Error("Country API fetch failed");
    const countryData: CountryNames = await res.json();
    return countryData[locale] || countryData["en"] || "Unknown Country";
  } catch (error) {
    console.error("Country API fetch failed", error);
    return "India"; // Fallback country name
  }
}

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  const safeLocale = locales.includes(locale as any) ? locale : "en";
  const baseUrl = getBaseUrl();

  const { botData } = await fetchApplicationLayoutData(safeLocale);
  const countryName = await fetchCountryData(safeLocale);

  if (!botData) {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }

  const seoData =
    botData.ApplicationLayout[0]?.ScrollableComponent?.products?.find(
      (item) => item.title === normalizeInput(id)
    );

  if (!seoData) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }



  return {
    title: `${seoData.title} - ${countryName}`,
    description: seoData.description?.slice(0, 160),
    openGraph: {
      type: "website",
      siteName: "Nessco",
      url:baseUrl,
      title: `${seoData.title} - ${countryName}`,
      description: seoData.description?.slice(0, 160),
      images: [
        {
          url: seoData.image,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${seoData.title} - ${countryName}`,
      description: seoData.description?.slice(0, 160),
      images: [seoData.image],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}`,
    },
  };
}

export default async function ProductPage({ params: { locale, id } }: Props) {
  const safeLocale = locales.includes(locale as any) ? locale : "en";
  unstable_setRequestLocale(safeLocale);

  const { botData, faqData } = await fetchApplicationLayoutData(safeLocale);

  if (!botData) {
    return <p>Error: Unable to load application data</p>;
  }

  return (
    <main>
      <Pages applicationLayoutData={botData} faqData={faqData} id={id} />
    </main>
  );
}
