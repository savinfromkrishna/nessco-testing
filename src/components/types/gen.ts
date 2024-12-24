// types/seo.ts
export interface SeoData {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      images: Array<{ url: string; alt: string }>;
    };
    robots: string;
    alternates: {
      canonical: string;
    };
    twitter: {
      card: string;
      site: string;
      title: string;
      description: string;
      image: string;
    };
  }
  
  export interface KnowYourMachineSeoData extends SeoData {}
  export interface KnowYourProductSeoData extends SeoData {}
  export interface KnowYourBusinessSeoData extends SeoData {}
  
  // types/header.ts
  export interface Section {
    que: string;
    ans: string;
  }
  
  export interface Card {
    title: string;
    img: string;
    section?: Section[];
  }
  
  export interface HeaderData {
    title: string;
    description: string;
    img: string;
    cards: Card[];
  }
  
 
  export interface KnowYourData {
    seoData: KnowYourMachineSeoData | KnowYourProductSeoData | KnowYourBusinessSeoData;
    Header: HeaderData;
  }