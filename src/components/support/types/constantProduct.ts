export interface KnowYourProductItem {
    KnowYourProduct: Array<{
      knowYourProductSeoData: KnowYourProductSeoData;
      Header: Header;
    }>;
  }
  
  type KnowYourProductSeoData = {
    title: string;
    description: string;
    keywords: string;
    openGraph: OpenGraph;
    robots: string;
    alternates: Alternates;
    twitter: Twitter;
  };
  
  type OpenGraph = {
    title: string;
    description: string;
    images: OpenGraphImage[];
  };
  
  type OpenGraphImage = {
    url: string;
    alt: string;
  };
  
  type Alternates = {
    canonical: string;
  };
  
  type Twitter = {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  };
  
  type Header = {
    title: string;
    description: string;
    img: string;
    cards: Card[];
  };
  
  type Card = {
    title: string;
    img: string;
  };
  