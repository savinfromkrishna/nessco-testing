
  
  export interface ContactItem {
    contact:Array<{
    contactSeoData: ContactSeoData;
    mainContent: MainContent[];
    caption: string;
    Contactcaption: string;
    getintouch: string;
    message: string;
    contactInfo: ContactInfo[];
    imagesOnSide: ImageOnSide[];
    heading: Heading[];
    branchesData: BranchData[];
  }>
}
  
  export interface ContactSeoData {
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
  
  interface MainContent {
    textBeforeImage: string;
    textHighlighted?: string;
    image: Image;
  }
  
  interface Image {
    src: string;
    height: string;
    width: string;
    alt: string;
  }
  
  interface ContactInfo {
    title: string;
    description: string;
    image: string;
  }
  
  interface ImageOnSide {
    src: string;
    height: string;
    width: string;
    alt: string;
    className: string;
  }
  
  interface Heading {
    title: string;
    highlight: string;
    reachtitle: string;
    reachhighlight: string;
    reachmap: string;
  }
  
  interface BranchData {
    id: string;
    country: string;
    office: string;
    address: string;
    flag: string;
    location: string;
    image: string;
  }