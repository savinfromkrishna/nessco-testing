
  export interface AboutItem {
   About:Array<{
    aboutSeoData: SeoData;
    Page1Data: Page1Data;
    missionvissionContent: MissionVisionContent;
    companyContent: CompanyContent;
    Heading: Heading;
    cards: Card[];
    galleryfour: GalleryFour;
    Sustainabilityheading: SustainabilityHeading;
    slides: Slide[];
    Featureheading: FeatureHeading;
    machines: Machine[];
    grid: GridItem[];
    awards:awards[];
    Awardheading:Awardheading;
   }>
  }
  
  interface SeoData {
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
    images: Image[];
  }
  
  interface Image {
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
  
  interface Page1Data {
    video: string;
    title: string;
    getaQuote: string;
    mainImg: string;
    leftBorderImg: string;
    rightBorderImg: string;
    description: string;
    image:image[];
  }

  interface image{
    img:string;
    title:string;
  }
  
  interface MissionVisionContent {
    title: string;
    button: string;
    slides: MissionVisionSlide[];
  }
  
  interface MissionVisionSlide {
    title: string;
    imageSrc: string;
    description: string;
    points?: Point[];
    values?: Value[];
  }
  
  interface Point {
    caption: string;
  }
  
  interface Value {
    imageSrc: string;
    text: string;
  }
  
  interface CompanyContent {
    title: string;
    description: string;
    imageWithDescription: ImageWithDescription[];
  }
  
  interface ImageWithDescription {
    img: string;
  }
  
  interface Heading {
    title: string;
  }
  
  interface Card {
    description: string;
    title: string;
    src: string;
    video: string;
  }
  
  interface GalleryFour {
    heading: string;
    galleryImages: GalleryImage[];
  }
  
  interface GalleryImage {
    src: string;
    paragraph: string;
  }
  
  interface SustainabilityHeading {
    title: string;
    Approach: string;
  }
  
  interface Slide {
    id: string;
    img: string;
    title: string;
    description: string;
  }
  
  interface FeatureHeading {
    title: string;
    featuredpage: string;
    featuredpagehighlight: string;
    button: string;
    banner1: string;
    banner2: string;
    viewmachine: string;
  }
  
 export interface Machine {
    id: number;
    title: string;
    description: string;
    mainImage: string;
    mobileimg: string;
    link:string;
  }
  
  export interface GridItem {
    id: number;
    title: string;
    description: string;
    mainImage:string;
    mobileimg:string;
  }
  
  interface Awardheading{
    title:string;
    description:string
  }
  interface awards{
    id:string;
    title:string;
    description:string;
    image:string;
  }