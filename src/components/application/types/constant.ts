export interface  ApplicationItem  {
  Application:Array<{
  applicationSeoData: ApplicationSeoData;
  Header: HeaderData;
  SelectProduct: SelectProductData;
  Technology: TechnologyData;
  CustomizedProjects: CustomizedProjectsData;
}>
};

type ApplicationSeoData = {
  title: string;
  description: string;
  keywords: string;
  openGraph: OpenGraphData;
  robots: string;
  alternates: { canonical: string };
  twitter: TwitterData;
};

type OpenGraphData = {
  title: string;
  description: string;
  images: ImageData[];
};

type ImageData = {
  url: string;
  alt: string;
};

type TwitterData = {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
};

type HeaderData = {
  applicaion: string;
  title: string;
  paragraph: string;
};

type SelectProductData = {
  placeholder: string;
  paperCup: string;
  viewMore: string;
  viewAll: string;
  category: string;
  products: ProductData[];
};

type ProductData = {
  img: string;
  title: string;
  description: string;
  image: string;
  link?:string;
};

type TechnologyData = {
  craftsmanshipTechnology: string;
  paragraph: string;
  container: CraftsmanshipContainerData[];
};

type CraftsmanshipContainerData = {
  [key: string]: CraftsmanshipItem[];
};

type CraftsmanshipItem = {
  title: string;
  description: string;
  craftsmanshipImg: string;
};

type CustomizedProjectsData = {
  seoDescription:string;
  craftsmanshipTechnology: any;
  paragraph: string;
  title: string;
  container: CustomizedProjectContainerData[];
};

type CustomizedProjectContainerData = {
  [key: string]: CustomizedProjectItem[];
};

type CustomizedProjectItem = {
  title1: string;
  title2: string;
  description: string;
  img: string;
};
