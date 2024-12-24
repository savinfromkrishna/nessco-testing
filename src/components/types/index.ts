// Common types
export interface SeoData {
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
  
  export interface Section {
    que: string;
    ans: string;
  }
  
  export interface Card {
    title: string;
    img: string;
    section?: Section[];
  }
  
  export interface Header {
    title: string;
    description: string;
    img: string;
    cards: Card[];
  }
  
  // Know Your Machine types
  export interface KnowYourMachineData {
    knowYourMachineSeoData: SeoData;
    Header: Header;
  }
  
  export interface KnowYourMachine {
    KnowYourMachine: KnowYourMachineData[];
  }
  
  // Know Your Product types
  export interface KnowYourProductData {
    knowYourProductSeoData: SeoData;
    Header: Header;
  }
  
  export interface KnowYourProduct {
    KnowYourProduct: KnowYourProductData[];
  }
  
  // Know Your Business types
  export interface KnowYourBusinessData {
    knowYourBussinessSeoData: SeoData;
    Header: Header;
  }
  
  export interface KnowYourBusiness {
    KnowYourBussiness: KnowYourBusinessData[];
  }
  
  // Generic type for all Know Your data
  export type GenericKnowYourData = KnowYourMachine | KnowYourProduct | KnowYourBusiness;
  