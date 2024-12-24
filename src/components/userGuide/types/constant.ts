export interface UserGuideItem {
  UserGuide: Array<{
    userGuideSeoData: UserGuideSeoData;
    userGuideData: userGuideData;
  }>;
}

type UserGuideSeoData = {
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

type userGuideData = {
  apply: string;
  cancel: string;
  submit: string;
  phone: string;
  email: string;
  name: string;
  filter: string;
  title: string;
  description: string;
  formDescription: string;
  cards: UserGuideCard[];
  categories: UserGuideCategory[];
};

type UserGuideCard = {
  description: string;
  category: string;
  title: string;
  description2: string;
  title2: string;
  src: string;
  ctaText: string;
  index: number;
  content: string;
};

type UserGuideCategory = {
  title: string;
};
