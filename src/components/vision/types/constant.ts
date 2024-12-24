export interface VisionItem {
  Vision: Array<{
    visionSeoData: VisionSeoData;
    Header: Header;
    Cards: Cards;
  }>;
}

type VisionSeoData = {
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

type HeaderImage = {
  img: string;
  title?: string;
}

type Header = {
  video: string;
  title: string;
  getaQuote: string;
  mainImg: string;
  leftBorderImg: string;
  rightBorderImg: string;
  description: string;
  image: HeaderImage[];
}

type DescriptionListItem = {
  point: string;
  listImg: string;
}

type Card = {
  longTitle: string;
  image: string;
  title: string;
  description: string;
  largeDescription: string;
  descriptionList: DescriptionListItem[];
}

type Cards = {
  cards: Card[];
}
