// Define interfaces for openGraph and Twitter
interface OpenGraph {
    title: string;
    description: string;
    images: {
      url: string;
      alt: string;
    }[];
  }
  
  interface Twitter {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  }
  
  // pinkcitySeoData type
  interface PinkCitySeoData {
    title: string;
    description: string;
    keywords: string;
    openGraph: OpenGraph;
    robots: string;
    alternates: {
      canonical: string;
    };
    twitter: Twitter;
  }
  
  // landingPageContent type
  interface LandingPageContent {
    backgroundImg: string;
    cornerLayerImg: string;
    stickerImg: string;
    description: string;
    title: string;
    subtitle: string;
    jaipur: string;
  }
  
  // secondPageContent type
  interface SecondPageContent {
    mandalaImg: string;
    topImg: string;
    strokeImg: string;
    description: string;
  }
  
  // bluePageContent type
  interface BluePageContent {
    backgroundSvg: string;
    videoSrc: string;
  }
  
  // pinkPageContent type
  interface PinkPageContent {
    birdComponent: string; // 'TRUE' or 'FALSE'
    mandalaImg: string;
    strokeImg: string;
    hawamahalImg: string;
    description: string;
  }
  
  // galleryContent type
  interface GalleryContent {
    topStrokeImg: string;
    bottomStrokeImg: string;
    galleryImages: {
      gallery: string;
    }[];
  }
  
  // pinkcity type
 export interface PinkCityData {
    pinkcity:Array<{
    pinkcitySeoData: PinkCitySeoData;
    landingPageContent: LandingPageContent;
    secondPageContent: SecondPageContent;
    bluePageContent: BluePageContent;
    pinkPageContent: PinkPageContent;
    galleryContent: GalleryContent;
  }>
};
  
  // Main data type for the pinkcity array
 
  
  
  