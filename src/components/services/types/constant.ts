export interface ServicesItem {
  Services: Array<{
    servicesSeoData: ServicesSeoData;
    Header: Header;
  }>;
}

type ServicesSeoData = {
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
  paragraph: string;
  yourName: string;
  yourCompanyName: string;
  phone: string;
  yourAddress: string;
  city: string;
  country: string;
  existingCustomer: string;
  machineType: string;
  serviceType: string;
  submit: string;
}

