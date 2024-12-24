export interface ApplicationLayoutItem {
  ApplicationLayout: Array<{
    applicationLayoutSeoData: ApplicationLayoutSeoData;
    Header: Header;
    ScrollableComponent: ScrollableComponent;
    ProductGallery: ProductGallery;
    RelatedMachines: RelatedMachines;
    FAQ: FAQ;
  }>;
}

type ApplicationLayoutSeoData = {
  title: string;
  description: string;
  keywords: string;
  openGraph: OpenGraph;
  robots: string;
  alternates: Alternates;
  twitter: Twitter;
}

type OpenGraph = {
  title: string;
  description: string;
  images: OpenGraphImage[];
}

type OpenGraphImage = {
  url: string;
  alt: string;
}

type Alternates = {
  canonical: string;
}

type Twitter = {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
}

type Header = {
  icons: HeaderIcon[];
}

type HeaderIcon = {
  image: string;
  title: string;
  img: string;
}

type ScrollableComponent = {
  products: Product[];
}

type Product = {
  title: string;
  description: string;
  image: string;
}

type ProductGallery = {
  title: string;
  description: string;
  images: ProductGalleryImage[];
}

type ProductGalleryImage = {
  title: string;
  image: Image[];
}

type Image = {
  img: string;
}

type RelatedMachines = {
  title: string;
  description: string;
  inquiry: string;
  viewMachine: string;
  imageDescription: ImageDescription[];
}

type ImageDescription = {
  title: string;
  imageWithDescription: ImageWithDescription[];
}

type ImageWithDescription = {
  h1: string;
  h2: string;
  h3: string;
  s: string;
  sInformation: string;
  img: string;
  image: string;
  imageInformation: string;
  information: string;
}

type FAQ = {
  title: string;
  subTitle: string;
  questions: Question[];
  formTitle: string;
  formPara: string;
  firstName: string;
  tyler: string;
  lastName: string;
  durden: string;
  emailAddress: string;
  emailPlaceholder: string;
  password: string;
  twitterPassword: string;
  sendMessage: string;
}

type Question = {
  que: string;
  ans: string;
}
