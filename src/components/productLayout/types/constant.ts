export interface OpenGraph {
  title: string;
  description: string;
  images: {
    url: string;
    alt?: string;
  }[];
}

export interface Twitter {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
}

export interface ProductLayoutSeoData {
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

export interface HeaderData {
  title: string;
  description: string;
  image: string;
}

export interface Header {
  data: HeaderData[];
}

export interface ProductItem {
  h1: string;
  h2: string;
  h3?: string;
  s: string;
  sInformation: string;
  img: string;
  rangeTitle: string;
  range: string;
  punchTitle: string;
  punch: string;
  weightTitle: string;
  weight: string;
  image: string;
  imageInformation: string;
  information: string;
  link?: string;
  title?: string;
  heading?: string;
}

export interface ServoDriven {
  servoDriven: ProductItem[];
}

export interface MechanicalCam {
  mechanicalCam: ProductItem[];
}

export interface ProductData {
  title: string;
  description: string;
  openGraph: OpenGraph;
  heading: string;
  paragraph: string;
  all: (ServoDriven | MechanicalCam | null)[];
}

export interface ProductsGrid {
  inquiry: string;
  placeholder: string;
  all: {
    s: string;
  };
  servoDriven: string;
  mechanicalCam: string;
  readMore: string;
  readLess: string;
  viewMachine: string;
  data: ProductData[];
}

export interface ProductLayout {
  ProductLayout: any;
  productLayoutSeoData: ProductLayoutSeoData;
  Header: Header;
  ProductsGrid: ProductsGrid;
}

export interface ProductLayoutWrapper {
  ProductLayout: ProductLayout[];
}