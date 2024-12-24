export interface KnowYourMachineSeoData {
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
  
  export interface KnowYourMachineItem {
    knowYourMachineSeoData: KnowYourMachineSeoData;
    Header: Header;
  }
  
  export interface KnowYourMachineData {
    KnowYourMachine: KnowYourMachineItem[];
  }
  