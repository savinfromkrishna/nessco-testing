type SeoData = {
    title: string;
    description: string;
    keywords: string;
    openGraph: {
      title: string;
      description: string;
      images: {
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
  
  type PageData = {
    video: string;
    title: string;
    getaQuote: string;
    mainImg: string;
    leftBorderImg: string;
    rightBorderImg: string;
    description: string;
    images: {
      img: string;
      title?: string;
    }[];
  };
  
  type SustainableContent = {
    heading: string;
    highlight: string;
    description: string;
    buttonText: string;
    image: string;
  };

  type Peragraphs={
    peragraph:string;
  }
  
  type OurStoryContent = {
    title: string;
    highlight: string;
    paragraphs: {
      paragraph: string;
    };
    highlightedText: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
  
  type Founder = {
    name: string;
    title: string;
    description: string;
    imageSrc: string;
    linkedInUrl: string;
  };
  
  type ImageData= {
    src: string;
    alt: string;
    style: string;
  };
  
  type DataItem = {
    title: string;
    description: string;
    image: string;
    video:string;
  };
  
  type TeamPage = {
    video: string;
    heading: string;
    highlight: string;
    quote: string;
    description: string;
  };
  type Viewgallery ={
    viewgallery:string;
  }
  
  export interface  OurCompanyItem  {
    Ourcompany:Array<{
    companySeoData: SeoData;
    Page1Data: PageData;
    sustainableContent: SustainableContent;
    ourStoryContent: OurStoryContent;
    paragraphs:Peragraphs;
    ourfounderheading: {
      title: string;
      highlight: string;
      caption: string;
    };
    
    founders: Founder[];
    viewgallery: Viewgallery;
    images: ImageData[];
    Data: DataItem[];
    teampage: TeamPage;
}>
  };
  
 
  