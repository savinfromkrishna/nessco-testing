"use client";
import React, { useState } from "react";
import { BlogsItem } from "./types/constant";

interface BlogsProps {
  blogsData: BlogsItem;
}

interface Page1Props {
  onCategorySelect: (categories: string[]) => void;
}

type CombinedProps = BlogsProps & Page1Props;

const Page1: React.FC<CombinedProps> = ({ blogsData}) => {
  const Filter = blogsData.blogs[0]?.Filter;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected?.includes(category)
        ? prevSelected?.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  // const filterCategories = (categories: string[], searchTerm: string) => {
  //   if (!searchTerm) return categories;
  //   const filteredCategories = categories?.filter((category) =>
  //     category.toLowerCase().includes(searchTerm?.toLowerCase())
  //   );
  //   return [
  //     ...filteredCategories,
  //     ...categories?.filter(
  //       (category) => !category?.toLowerCase().includes(searchTerm?.toLowerCase())
  //     ),
  //   ];
  // };

  // const categoryTitles = Filter?.categories?.map((category) => category?.title);

  // const displayCategories = showCategories
  //   ? filterCategories(categoryTitles, searchTerm)
  //   : filterCategories(categoryTitles, searchTerm).slice(0, 6);

  // // Call onCategorySelect when selectedCategories change
  // React?.useEffect(() => {
  //   onCategorySelect(selectedCategories);
  // }, [selectedCategories]);

  return (
    <div className="lg:mt-[5.2rem] mt-[1rem] lg:ml-[3vw] lg:mr-[3vw] font-regular font-poppins">
      <div className="lg:w-full lg:h-[82vh] h-[22rem] lg:pr-8 lg:pb-0 pb-[1rem] lg:px-0 px-[1rem] lg:border-r-2 border-[#E6E7E6] sticky lg:top-[5.2rem] lg:bg-transparent bg-[#f2f2f2] lg:rounded-none  rounded-[0.5rem]">
        <p className="mb-2 font-poppins invisible lg:visible">
          {Filter?.filter}
        </p>
        <p className="mb-2 font-poppins">{Filter?.byCategory}</p>

        {/* Search Field */}
        <div className="flex rounded-[1rem]  bg-white overflow-hidden">
          <input
            type="search"
            placeholder={Filter?.placeholder}
            className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black font-poppins"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="mr-[0.8rem] text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-search"
            >
              <circle cx="10" cy="10" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        {/* By Category */}
        <div className="mt-3 lg:h-full h-[14rem] lg:overflow-auto overflow-y-scroll scrollbar-custom scrollbar">
          {Filter?.categories?.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <label className="font-poppins my-[0.2rem]" htmlFor={item?.title}>
                {item?.title}
              </label>
              <input
                type="checkbox"
                id={item?.title}
                name={item?.title}
                value={item?.title}
                className="mr-1 accent-[#483d73]"
                checked={selectedCategories.includes(item?.title)}
                onChange={() => handleCategoryChange(item?.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page1;
