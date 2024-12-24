
  
 export interface ClienteleItem {
    
        Clientele:Array<{
            clienteleSeoData: ClienteleSeoData;
            content: Content;
            squares: Square[];
        }>
    
   
  }
  
  interface ClienteleSeoData {
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
  
  interface Content {
    heading: Heading;
  }
  
  interface Heading {
    title: string;
    boldHeading: string;
    peraOne: string;
    peraTwo: string;
    lefthand: string;
    righthand: string;
  }
  
  export interface Square {
    id: string;
    src: string;
    bgClass: string;
  }
  