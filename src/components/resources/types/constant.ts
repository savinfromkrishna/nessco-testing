
  
  export interface resourceItem {
    resources:Array<{
        resourcesSeoData: ResourcesSeoData;
    pageHeader: PageHeader;
    cards: Card[];
    }>
    
  }
  
  interface ResourcesSeoData {
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
  
  interface PageHeader {
    mainTitle: string;
    highlightTitle: string;
    description: string;
    image: PageHeaderImage; // Use a specific interface for page header images
  }
  
  interface PageHeaderImage {
    src: string;
    alt: string;
    width: number; // Consider using number if width is always numeric
    height: number; // Consider using number if height is always numeric
  }
  
  interface Card {
    title: string;
    link:any;
    image: CardImage; // Use a specific interface for card images
  }
  
  interface CardImage {
    src: string;
    alt: string;
    width: number; // Consider using number if width is always numeric
    height: number; // Consider using number if height is always numeric
  }
  