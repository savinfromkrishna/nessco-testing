export interface BlogsLayoutItem {
    blogsLayout: {
      Header: {
        blogs: string; // Title or description of the blog section
        title: string; // Main title for the blog
        img: string; // URL for the image
        question: {
          que: string; // Question text
          ans: string; // Answer text
        }[];
      };
    }[];
  }
  
  export interface BlogsLayoutProps {
    blogsLayoutData: BlogsLayoutItem; // Data passed to the Page1 component
  }
  