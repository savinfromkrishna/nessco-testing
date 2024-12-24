export interface FaqItem {
  faq: Array<{
    faqSeoData: FaqSeoData;
    searchbox: Searchbox;
  }>;
}

interface FaqSeoData {
  title: string;
  description: string;
  keywords: string;
  openGraph: OpenGraph;
  robots: string;
  alternates: Alternates;
  twitter: Twitter;
}

interface OpenGraph {
  title: string;
  description: string;
  images: OpenGraphImage[];
}

interface OpenGraphImage {
  url: string;
  alt: string;
}

interface Alternates {
  canonical: string;
}

interface Twitter {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
}

export interface Searchbox {
  filter: string;
  byCategory: string;
  placeholder: string;
  Questions: string;
  title: string;
  categories: Category[];
}

export interface Category {
  name: string;
  faqs: Faq[];
}

interface Faq {
  que: string;
  ans: string;
}