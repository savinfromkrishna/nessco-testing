import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import { locales } from "@/i18n";
import { Metadata } from "next";
import { cookies } from "next/headers";
import AnimatedBlogPost from "@/components/StaticBlogs/AnimatedBllog";
import { getBaseUrl } from "@/app/api/environment";
import { blogPosts } from "@/components/StaticBlogs/data/data";

const countryUrl = "https://countryjson.nesscoindustries.com/";

type Props = {
  params: {
    locale: string;
    id: string;
  };
};

export const revalidate = 60;

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

function formatString(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export async function generateMetadata({
  params: { locale, id },
}: Props): Promise<Metadata> {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }
  const baseUrl = getBaseUrl();
  const countryName = await fetchCountryData(locale);

  const post = blogPosts.find((p) => formatString(p.slug) === formatString(id));

  if (!post || !countryName) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      openGraph: {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
        url: `${baseUrl}/${locale}/blog/${id}`,
        images: [],
      },
      twitter: {
        card: "summary_large_image",
      },
    };
  }

  return {
    title: `${post.title} - ${countryName}`,
    description: post.excerpt,
    keywords: post.tags.map((tag) => tag.name).join(", "),
    openGraph: {
      type: "article",
      siteName: "Nessco",
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      title: `${post.title} - ${countryName}`,
      description: post.excerpt,
      images: [
        {
          url: post.header.headingImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      site: "@NesscoIndia",
      title: `${post.title} - ${countryName}`,
      description: post.excerpt,
      images: [post.header.headingImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params: { locale, id } }: Props) {
  if (!locales.includes(locale as any)) {
    locale = "en";
  }

  unstable_setRequestLocale(locale);

  return <AnimatedBlogPost id={id} />;
}
