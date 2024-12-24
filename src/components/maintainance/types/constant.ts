export interface MaintainanceItem {
  Maintainance: Array<{
    maintainanceSeoData: MaintainanceSeoData;
    Header: Header;
  }>;
}

type MaintainanceSeoData = {
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

export type OpenGraphImage = {
  url: string;
  alt: string;
};

export type Alternates = {
  canonical: string;
};

export type Twitter = {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
};

export type Header = {
  title: string;
  maintainance: string;
  filter: string;
  cancel: string;
  apply: string;
  submit: string;
  name: string;
  email: string;
  phone: string;
  formTitle: string;
  footer: string;
  checkListTitle: string;
  formDescription: string;
  download: string;
  description: string;
  img: string;
  points: Point[];
  categories: Category[];
  cards: Card[];
};

export type Point = {
  number: string;
  title: string;
};

export type Category = {
  title: string;
};

export type Card = {
  category: string;
  title: string;
  img: string;
  button: string;
};
