export interface MediaRoomItem {
  MediaRoom: Array<{
    mediaRoomSeoData: MediaRoomSeoData;
    Header: Header;
    TrendingNews: TrendingNews;
    LatestNews: LatestNews;
    MostRead: MostRead;
  }>;
}

type MediaRoomSeoData = {
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
  apply: string;
  cancel: string;
  filter: string;
  byCategory: string;
  placeholder: string;
  filters: Filter[];
  categories: Category[];
}

type Filter = {
  title: string;
}

type Category = {
  title: string;
}

type TrendingNewsSection = {
  img: string;
  filter: string;
  header: string;
  title: string;
  continueReading: string;
  dialogDescription: string;
}

type TrendingNews = {
  title: string;
  sections: TrendingNewsSection[];
}

type LatestNewsSection = {
  img: string;
  filter: string;
  header: string;
  title: string;
  continueReading: string;
  dialogDescription: string;
}

type LatestNews = {
  mainTitle: string;
  img: string;
  filter: string;
  title: string;
  description: string;
  continueReading: string;
  dialogDescription: string;
  sections: LatestNewsSection[];
}

type MostReadSection = {
  img: string;
  filter: string;
  header: string;
  title: string;
  continueReading: string;
  dialogDescription: string;
}

type MostRead = {
  title: string;
  sections: MostReadSection[];
}
