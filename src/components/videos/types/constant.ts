export interface VideosItem {
  Videos: Array<{
    videosSeoData: VideosSeoData;
    Header: VideoHeader;
  }>;
}

type VideosSeoData = {
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

type VideoHeader = {
  filter: string;
  byCategory: string;
  byApplications: string;
  title: string;
  cancel: string;
  apply: string;
  categories: VideoCategory[];
  applications: VideoApplication[];
  VideosRef: VideoReference[];
};

type VideoCategory = {
  title: string;
};

type VideoApplication = {
  title: string;
};

type VideoReference = {
  url: string;
  title: string;
  tag: string;
};
