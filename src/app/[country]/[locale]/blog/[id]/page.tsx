import { Metadata } from "next";
import { cookies } from "next/headers";
import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import BlogGeneric from "@/components/StaticBlogs/Blog/BlogGeneric";
import { blogPosts } from "@/components/StaticBlogs/data/data2";
import { getBaseUrl } from "@/app/api/environment";

const locales = ["en", "fr", "nl", "de", "es", "hi", "ta"] as const;
const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: { locale: string; country: string; id: string };
};

export const revalidate = 60;

type CountryNames = {
  [locale: string]: string;
};

async function fetchCountryData(locale: string): Promise<string> {
  const country = cookies().get("country")?.value || "in";
  console.log("countryname", country);

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

function formatString(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function getDescription(content: any): string {
  if (typeof content === "string") {
    return content.slice(0, 160);
  }
  if (typeof content === "object" && content !== null) {
    if (typeof content.content === "string") {
      return content.content.slice(0, 160);
    }
    if (
      Array.isArray(content) &&
      content.length > 0 &&
      typeof content[0] === "string"
    ) {
      return content[0].slice(0, 160);
    }
  }
  return "";
}

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  const baseUrl = getBaseUrl();

  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  const countryName = await fetchCountryData(locale);
  const post = blogPosts.find(
    (p) => formatString(p?.slug) === formatString(id)
  );

  if (!countryName || !post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      openGraph: {
        type: "website",
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
        images: [
          {
            url: "/default-image.webp",
            alt: "Default Image Alt",
          },
        ],
      },
      robots: "noindex, nofollow",
      alternates: {
        canonical: `${baseUrl}`,
      },
      twitter: {
        card: "summary_large_image",
        site: "@NesscoIndia",
        title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      },
    };
  }

  const description = post.excerpt || getDescription(post.content[0]);
  return {
    title: `${post.title} - ${countryName}`,
    description,
    viewport: "width=device-width, initial-scale=1",
    alternates: {
      canonical: `${baseUrl}`,
    },
    openGraph: {
      type: "article",
      siteName: "Nessco",
      url: `${baseUrl}`,
      title: `${post.title} - ${countryName}`,
    description,
      images: [
        {
          url: post.header?.headingImage || "",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author?.name || ""],
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${post.title} - ${countryName}`,
    description,
      images: [post.header?.headingImage || ""],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPost({ params: { locale, id } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  // const t = await getTranslations({ locale });

  const post = blogPosts.find(
    (p) => formatString(p?.slug) === formatString(id)
  );

  if (!post) {
    return <p>critical error</p>;
  }

  return (
    <main>
      <BlogGeneric id={id} />
    </main>
  );
}
