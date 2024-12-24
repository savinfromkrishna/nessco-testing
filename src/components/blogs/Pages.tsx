"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic'
const Page4 = dynamic(() => import("@/components/blogs/ForYou"));
// const Page5 = dynamic(() => import("@/components/blogs/Sources"));
import Page1 from "@/components/blogs/Filter";
import Page2 from "@/components/blogs/AllBlogs";
import Page3 from "@/components/blogs/FeaturedBlogs";
import { BlogsItem } from "./types/constant";

interface BlogsProps{
  blogsData:BlogsItem;
}

const Pages:React.FC <BlogsProps>= ({blogsData}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories);
    // You can add any additional logic here if needed
    console.log("Selected Categories:", categories);
  };

  return (
    <>
      <main>
        <div className="flex lg:flex-row flex-col lg:mt-0 mt-14 bg-[#f2f2f2]">
          <div className="lg:w-[20%] ml-4 sticky top-0 lg:h-[40rem] hidden lg:block">
            <Page1 onCategorySelect={handleCategorySelect} blogsData={blogsData} />
          </div>
          <div className="flex flex-col lg:w-[80%]">
            <div className="flex lg:flex-row flex-col">
              <div id="Featured Blogs" className="lg:w-[67%]">
                <Page2 selectedCategories={selectedCategories} blogsData={blogsData} />
              </div>
              <div id="Featured Blogs" className="lg:w-[33%]">
                <Page3 blogsData={blogsData} />
              </div>
            </div>
            <div className="mb-10">
              <Page4 blogsData={blogsData} />
            </div>
            <div>
              {/* <Page5 blogsData={blogsData} /> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Pages;
