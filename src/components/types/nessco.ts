// Common types

export interface Image {
    url: string;
    alt: string;
  }
  
  export interface TwitterMeta {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  }
  
  export interface OpenGraph {
    title: string;
    description: string;
    images: Image[];
  }
  
  export interface SeoData {
    title: string;
    description: string;
    keywords: string;
    openGraph: OpenGraph;
    robots: string;
    alternates: {
      canonical: string;
    };
    twitter: TwitterMeta;
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
  
  // Specific types for each section
  
  export interface KnowYourBusinessData {
    knowYourBussinessSeoData: SeoData;
    Header: Header;
  }
  
  export interface KnowYourMachineData {
    knowYourMachineSeoData: SeoData;
    Header: Header;
  }
  
  export interface KnowYourProductData {
    knowYourProductSeoData: SeoData;
    Header: Header;
  }
  
  // Root types
  
  export interface KnowYourBusiness {
    KnowYourBussiness: KnowYourBusinessData[];
  }
  
  export interface KnowYourMachine {
    KnowYourMachine: KnowYourMachineData[];
  }
  
  export interface KnowYourProduct {
    KnowYourProduct: KnowYourProductData[];
  }
  
  