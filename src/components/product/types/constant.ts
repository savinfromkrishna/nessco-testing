export interface ProductItem {
  Product: Array<{
    productSeoData: ProductSeoData;
    Header: ProductHeader;
    ProductCatalouge: ProductCatalogue;
  }>;
}

type ProductSeoData = {
  title: string;
  description: string;
  keywords: string;
  openGraph: OpenGraph;
  robots: string;
  alternates: Alternates;
  twitter: Twitter;
};

type OpenGraph = {
  title: string;
  description: string;
  images: OpenGraphImage[];
};

type OpenGraphImage = {
  url: string;
  alt: string;
};

type Alternates = {
  canonical: string;
};

type Twitter = {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
};

interface ProductHeader {
  Featured:string;
  ourProduct: string;
  description: string;
  products: HeaderItem[];
}

interface HeaderItem {
  machineName: string;
  description: string;
  machineImg: string;
  productImg: string;
}

interface Container {
  h1: string;
  h2: string;
  h3: string;
  s: string;
  link:string;
  sInformation: string;
  img: string;
  image: string;
  imageInformation: string;
  inquiry: string;
  information: string;
}

interface Card {
  img: string;
  title: string;
  description: string;
  container: Container[];
}

interface ProductCatalogue {
  viewAllMachines: string;
  viewMachine: string;
  card: Card[];
}
