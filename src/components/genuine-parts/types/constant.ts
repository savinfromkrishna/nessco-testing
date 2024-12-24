export interface GenuinePartsItem {
  GenuineParts: Array<{
    genuinePartsSeoData: GenuinePartsSeoData;
    Header: Header;
    Inventory: Inventory;
    Box: Box;
  }>;
}

type GenuinePartsSeoData = {
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

type Header = {
  title: string;
  description: string;
  toolBoxImg: string;
  diverseMachines: string;
  paragraph: string;
};

type Inventory = {
  phone: string;
  fullName: string;
  searchFilter: string;
  filter: string;
  machinesFilter: string;
  partsFilter: string;
  searchParts: string;
  inventory: string;
  productNotFound: string;
  addEnquiry: string;
  addedEnquiry: string;
  requestSpare: string;
  proceed: string;
  inventoryItems: string;
  submitYourEnquiry: string;
  submit: string;
  cancel: string;
  email: string;
  iButton: string;
  machineFilter: MachineFilter[];
  Filter: FilterItem[];
  parts: Part[];
};

type MachineFilter = {
  title: string;
};

type FilterItem = {
  title: string;
  img: string;
};

type Part = {
  title: string;
  categoryType: string;
  description: string;
  img: string;
  code: string;
  information: string;
};

type Box = {
  box: BoxItem[];
};

type BoxItem = {
  title: string;
  description: string;
  img: string;
};
