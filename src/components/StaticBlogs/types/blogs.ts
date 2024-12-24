export interface Author {
  id?: string;
  name?: string;
  avatar?: string;
}

export interface Header {
  id?: string;
  heading?: string;
  headingImage?: string;
  subheading?: string;
}

export interface Tag {
  id?: string;
  name?: string;
}

export type ListFormat = "disc" | "number" | "square";

export type ListItem = {
  text: string;
  subItems?: ListContent;
};

export type ListContent = {
  format: ListFormat;
  items: (string | ListItem)[] | ContentBlock[];
};

export type ContentBlock = {
  type?: "text" | "image" | "table" | "list" | "section" | "code" | "video";
  content?:
    | string
    | { src: string; alt: string }
    | string[][]
    | ListContent
    | SectionContent
    | { language: string; code: string }
    | { src?: string };
  heading?: string;
  subheading?: string;
  image?: string;
};

export type SectionContent = {
  intro?: string;
  blocks: ContentBlock[]; // This is the key part that should hold blocks of content
};

export interface BlogPost {
  id?: string;
  title?: string;
  slug?: string;
  date?: string;
  author?: Author;
  tags?: Tag[];
  excerpt?: string;
  content?: ContentBlock[]; // This should be an array of content blocks
  readingTime?: number;
  header?: Header;
}
