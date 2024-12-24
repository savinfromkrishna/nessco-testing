
export interface OurStrengthItem {
    OurStrength:Array<{
    find(arg0: (item: any) => boolean): unknown;
    ourStrengthSeoData: SeoData;
    category: string;
    Data: LandingPageData;
    OurStrengthFeature?: StrengthFeature;
  }>
}
  
  export interface SeoData {
    title: string;
    description: string;
    keywords: string;
    openGraph: OpenGraph;
    robots: string;
    alternates: Alternates;
    twitter: Twitter;
  }
  
  export interface OpenGraph {
    title: string;
    description: string;
    images: OpenGraphImage[];
  }
  
  export interface OpenGraphImage {
    url: string;
    alt: string;
  }
  
  export interface Alternates {
    canonical: string;
  }
  
  export interface Twitter {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  }
  
  export interface LandingPageData {
    video: string;
    title: string;
    getaQuote: string;
    mainImg: string;
    description: string;
    image: LandingPageImage[];
  }
  
  export interface LandingPageImage {
    img: string;
    title?: string;
  }
  
  export interface StrengthFeature {
    strengthItems: StrengthItem[];
    StrengthComponent: StrengthComponent[];
  }
  
  export interface StrengthItem {
    title: string;
  }
  
  export interface StrengthComponent {
    title1: string;
    title2: string;
    description: string;
    video: string;
    modalContent: ModalContent;
  }
  
  export interface ModalContent {
    title: string;
    description: string;
    images: ModalImage[];
  }
  
  export interface ModalImage {
    img: string;
  }
  