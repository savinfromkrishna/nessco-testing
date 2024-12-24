// SustainabilitySeoData type
type SustainabilitySeoData = {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      image: {
        url: string;
        alt: string;
      }[];
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
  };
  
  // Landing page data type
  export type LandingPageData = {
    title: string;
    description: string;
    butterfly: string;
    grass: string;
    trees: string;
  };
  
  // Second page data type
  export type SecondPageData = {
    Sustainability: any;
    title1: string;
    title2: string;
    description: string;
    leftFootprint: string;
    rightFootprint: string;
    leafs: string;
    cup: string;
    bgGarden: string;
  };
  
  // Third page data type
  export type ThirdPageData = {
    titleWhite: string;
    titleBlack: string;
    description: string;
    branchLeaves: string;
    globe: string;
  };
  
  // Main Sustainability type
 export interface SustainabilityData {
 Sustainability:Array<{
    useEffect(arg0: () => void, arg1: undefined[]): unknown;
    SustainabilitySeoData: SustainabilitySeoData;
    category: string;
    Data: LandingPageData | SecondPageData | ThirdPageData;
  }>
 };
  