export interface KnowledgeCenterItem {
  knowYourBussinessSeoData: any;
  knowledgeCenter: any;
  KnowYourBussiness: Array<{
    knowYourBussinessSeoData: KnowledgeCenterSeoData;
    Header: {
      title: string;
      description: string;
      img: string;
      link:string;
      cards: Array<{
        title: string;
        link:string;
        img: string;
        section?: Array<{
          que: string;
          ans: string;
        }>;
      }>;
    };
  }>;
}

export type KnowledgeCenterSeoData = {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
  robots: string;
  alternates: {
    canonical: string;
  };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  };
};

export type Props = {
  params: { locale: string; country: string };
};
