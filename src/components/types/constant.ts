export interface KnowYourProductSeoData {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      images: Array<{
        url: string;
        alt: string;
      }>;
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
  
  export interface CardSection {
    que: string;
    ans: string;
  }
  
  export interface Card {
    title: string;
    img: string;
    section: CardSection[];
  }
  
  export interface KnowYourProductHeader {
    title: string;
    description: string;
    img: string;
    cards: Card[];
  }
  
  export interface KnowYourProductData {
    knowYourProductSeoData: KnowYourProductSeoData;
    Header: KnowYourProductHeader;
  }
  
  export interface KnowYourProductItem {
    KnowYourProduct: KnowYourProductData[];
  }
  
  