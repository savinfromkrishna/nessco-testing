// Define types for Open Graph images and Twitter metadata
interface OpenGraphImage {
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
interface Event {
  category: string;
  title: string;
  date: string;
  src: string;
}
export interface Announcement {
  data: Event[];
}
// Define types for home SEO data
export interface HomeSeoData {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    image: any;
    siteName: string;
    url: string;
    type: string;
    title: string;
    description: string;
    images: OpenGraphImage[];
  };
  robots: string;
  alternates: {
    canonical: string;
  };
  twitter: TwitterMeta;
}

// Define types for navigation items
export interface NavItem {
  text: string;
  ref: string;
}

// Define types for home section
export interface HomeMachineSection {
  title: string;
  subheading: string;
}
// Define types for hero section
export interface HeroSection {
  [x: string]: any;
  video: {
    sources: {
      subheadline: string;
      headline: string;
      src: string;
      type: string;
    }[];
    poster: string;
  };
  image: { src: string }[];
  textOverlay: {
    headline: string;
    subheadline: string;
  };
  buttonText: string;
}

export type ProductSection = {
  category: "ProductSection";
  
  data: {
    products: Product[];
  };
};

type Product = {
  category: string; // e.g., "cup"
  firstname: string; // e.g., "Servo Driven"
  secondname: string; // e.g., "Paper Cup Machine"
  description: string; // detailed description of the product
  image: string; // URL of the product image
  title: string; // e.g., "Servo Driven Machine"
  speed: string; // e.g., "100"
  unit: string; // e.g., "PCS/MIN"
  icon: string; // URL of the icon image
  items: Item[]; // list of item descriptions
};

type Item = {
  className: string; // CSS class for styling
  text: string; // descriptive text
};
// aboutsection types
type Stats = {
  machinesSold: string;
  readyStockMachines: string;
};

export type Card = {
  title: string;
  image: string;
  link: string;
};

type HomeAboutSectionData = {
  title: string;
  heading: string;
  description: string;
  stats: Stats;
  leftstats: string;
  rightstats: string;
  readmore: string;
  cards: Card[];
};

type HomeAboutSectionResponse = {
  category: string;
  data: HomeAboutSectionData;
};

// Define types for brands section
export interface Brand {
  src: string;
  alt: string;
}

export interface BrandsSection {
  category: "string";
  data: {
    trusted: Brand[];
    partners: Brand[];
  };
  heading1: string;
  heading2: string;
  description: {
    heading: string;
    text: string;
  };
}

// Define types for know more section
export interface KnowMoreItem {
  title: string;
  description: string;
  src: string;
  link: string;
  color: string;
  expertiseExperience: string;
  expertiseAbout: string;
  icon: string;
}

export interface KnowMoreSection {
  category: "knowmoresection";
  data: {
    knowmore: KnowMoreItem[];
  };
}

// Define types for news feature section
export interface NewsFeatureItem {
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface NewsFeatureSection {
  category: "string";
  data: {
    newsData: NewsFeatureItem[];
    heading: string;
    subheading: string;
  };
}

// Define types for testimonial items
type Testinomial = {
  src: string;
  username: string;
  profile: string;
  country: string;
  quote: string;
  flag: string;
};

type TestinomialVideo = {
  src: string;
  youtubeLink: string;
};

type TestinomialData = {
  testinomial: Testinomial[];
  Testinomialvideos: TestinomialVideo[];
  heading: string;
  subheading: string;
  secondsubheading: string;
  thirdsubheading: string;
  description: string;
};

type TestinomialResponse = {
  category: string;
  data: TestinomialData;
};
export interface StepperFilterItem {
  name: string;
}

export interface StepperFilter {
  stepperFilter: StepperFilterItem[];
}
export interface IOTData {
  category: string;
  data: {
    title: string;
    machineImg: string;
    desktopImg: string;
    globeVideo: string;
    subTitle: string;
    cards: Cards[];
  };
}

export interface Cards {
  title: string;
  description: string;
  video: string;
}

// Main HomeData type that encompasses all categories
export interface HomeData {
  home: Array<{
    category: string;
    stepperFilter: StepperFilterItem[]; // Corrected type for stepperFilter
    navItems: any;
    description: any;
    heading2: string;
    heading1: string;
    homeSeoData?: HomeSeoData;
    homeMachineSection?: HomeMachineSection;
    aboutSeCTION?: HomeAboutSectionResponse;
    data: HeroSection;
    Announcement:Announcement;
    productData: ProductSection;
    brandSection: BrandsSection;
    knowmoreSection: KnowMoreSection;
    NewsFeatureSection: NewsFeatureSection;
    testinomialSection: TestinomialResponse;
    iotdata:IOTData;
  }>;
}
