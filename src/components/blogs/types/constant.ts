export interface BlogsItem {
  blogs: Array<{
    blogsSeoData: BlogsSeoData;
    Filter: FilterData;
    AllBlogs: AllBlogsData;
    FeaturedBlogs: FeaturedBlogsData;
    ForYou: ForYouData;
    Sources: SourcesData;
  }>;
}

type BlogsSeoData = {
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

type FilterData = {
  filter: string;
  byCategory: string;
  placeholder: string;
  categories: Category[];
  moreCategories: string;
};

type Category = {
  title: string;
};

type AllBlogsData = {
  cancel: string;
  apply: string;
  blogs: BlogsDetails;
  saladBowls: BlogSection;
  popcornTub: BlogSection;
  bowls: BlogSection;
  iceCreamCup: BlogSection;
  sustainability: BlogSection;
  friesBowls: BlogSection;
};

type BlogsDetails = {
  headBlogs: BlogHead;
  subBlogs: BlogSub[];
};

type BlogHead = {
  allBlogs: string;
  fullCoverage: string;
  machineImg: string;
  machineBg: string;
  imgTitle: string;
  imgParagraph: string;
  paragraphList: Paragraph[];
};

type Paragraph = {
  title: string;
};

type BlogSub = {
  img: string;
  title: string;
  description: string;
  fullCoverage: string;
};

type BlogSection = {
  headPopcornTub?: BlogHead;
  headIceCreamCup?: BlogHead;
  headSustainability?: BlogHead;
  headFriesBowls?: BlogHead;
  headBowls?: BlogHead;
  subIceCreamCup?: BlogSub[];
  subSustainability?: BlogSub[];
  subFriesBowls?: BlogSub[];
  subBowls?: BlogSub[];
  subPopcornTub?: BlogSub[];
  headSaladBowls?: BlogHead; 
  subSaladBowls?: BlogSub[]; 
};

type FeaturedBlogsData = {
  featuredBlogs: string;
  picksForYou: string;
  featured: FeaturedBlog[];
  feature: FeaturedBlog[];
};

type FeaturedBlog = {
  img: string;
  description: string;
};

type ForYouData = {
  title: string;
  for: ForYouItem[];
};

type ForYouItem = {
  img: string;
  title: string;
  description: string;
};

type SourcesData = {
  title: string;
  mainHeading: string;
  mainDescription: string;
  allCard: AllCard[];
};

type AllCard = {
  card: CardItem[];
  topHeadings: string;
};

type CardItem = {
  img: string;
  description: string;
};
