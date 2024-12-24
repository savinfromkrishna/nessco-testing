"use client";
import React, { useState } from "react";
import { BlogsItem } from "./types/constant";
import Page1 from "./Filter";
import Link from "next/link";
import BlurImage from "../ui/BlurImage";

interface Page2Props {
  selectedCategories: string[];
}

interface BlogsProps {
  blogsData: BlogsItem;
}

type CombinedProps = BlogsProps & Page2Props;

interface BlogType {
  img: string;
  title: string;
  description: string;
  fullCoverage: string;
  dialogImg?: string;
  dialogTitle?: string;
  dialogDescription?: string;
}

const CategoryHeading: React.FC<{
  categories: string[];
  blogsData: BlogsItem;
}> = ({ categories, blogsData }) => {
  const AllBlogs = blogsData.blogs[0]?.AllBlogs;
  if (categories.length === 0 || categories.includes("All Categories")) {
    return <h1>{AllBlogs.blogs.headBlogs.allBlogs}</h1>;
  }

  return (
    <h1>
      {categories?.map((category, index) => (
        <React.Fragment key={category}>
          {index > 0 && <span className="text-gray-400 mx-2">&gt;</span>}
          {category}
        </React.Fragment>
      ))}
    </h1>
  );
};

const Page2: React.FC<CombinedProps> = ({ blogsData, selectedCategories }) => {
  const AllBlogs = blogsData.blogs[0]?.AllBlogs;
  const Filter = blogsData.blogs[0]?.Filter;
  const [isPage1Visible, setPage1Visible] = useState(false);

  const togglePage1Visibility = () => {
    if (window.innerWidth < 1024) {
      setPage1Visible(!isPage1Visible);
    }
  };

  // Get the heading data based on selectedCategories
  const getHeadingData = () => {
    if (selectedCategories.length === 1) {
      switch (selectedCategories[0]) {
        case "Salad Bowls":
          return AllBlogs?.saladBowls?.headSaladBowls;
        case "Popcorn Tub":
          return AllBlogs?.popcornTub?.headPopcornTub;
        case "Ice Cream Cup":
          return AllBlogs?.iceCreamCup?.headIceCreamCup;
        case "Sustainability":
          return AllBlogs?.sustainability?.headSustainability;
        case "Fries Bowls":
          return AllBlogs?.friesBowls?.headFriesBowls;
        case "Bowls":
          return AllBlogs?.bowls?.headBowls;
        default:
          return AllBlogs?.blogs?.headBlogs;
      }
    }
    return AllBlogs?.blogs?.headBlogs; // Default if multiple categories or none are selected
  };

  // Filter data based on selectedCategories
  const getFilteredData = (): BlogType[] => {
    let filteredData: BlogType[] = [];

    if (
      selectedCategories?.length === 0 ||
      selectedCategories?.includes("All Categories")
    ) {
      return AllBlogs?.blogs?.subBlogs;
    }

    selectedCategories.forEach((category) => {
      switch (category) {
        case "Salad Bowls":
          filteredData = [
            ...filteredData,
            ...AllBlogs?.saladBowls?.subSaladBowls,
          ];
          break;
        case "Popcorn Tub":
          filteredData = [
            ...filteredData,
            ...AllBlogs?.popcornTub?.subPopcornTub,
          ];
          break;
        case "Ice Cream Cup":
          filteredData = [
            ...filteredData,
            ...AllBlogs?.iceCreamCup?.subIceCreamCup,
          ];
          break;
        case "Sustainability":
          filteredData = [
            ...filteredData,
            ...AllBlogs?.sustainability?.subSustainability,
          ];
          break;
        case "Fries Bowls":
          filteredData = [
            ...filteredData,
            ...AllBlogs?.friesBowls?.subFriesBowls,
          ];
          break;
        case "Bowls":
          filteredData = [...filteredData, ...AllBlogs?.bowls?.subBowls];
          break;
        default:
          filteredData = [...filteredData, ...AllBlogs?.blogs?.subBlogs];
          break;
      }
    });

    return filteredData;
  };

  const headingData = getHeadingData();

  function formatString(input) {
    return input
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  return (
    <>
      <div className="flex lg:flex-row flex-col lg:mx-0 mx-[4vw] lg:mt-0 mt-14 font-regular font-poppins">
        <div className="bg-white lg:h-max lg:mt-[5.2rem] md:mt-4 -mt-4 rounded-[1rem] lg:ml-0 lg:mr-[1.5vw] overflow-hidden">
          {/* Filters */}
          <div
            className="w-[86vw] mx-[1rem] mb-[1rem] h-[3rem] relative flex items-center justify-center lg:hidden border-solid border-b-2 border-[#E6E7E6] text-[#483d73] cursor-pointer"
            onClick={togglePage1Visibility}
          >
            <p className="font-poppins text-[1.3rem] absolute left-2">
              {Filter?.filter}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 stroke-black absolute right-2"
            >
              <line x1="4" y1="6" x2="16" y2="6" />
              <line x1="8" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="16" y2="18" />
              <circle cx="18" cy="6" r="2" />
              <circle cx="6" cy="12" r="2" />
              <circle cx="18" cy="18" r="2" />
            </svg>
          </div>

          {/* Render Page1 component as a modal only if isPage1Visible is true and only on mobile */}
          {isPage1Visible && (
            <div className="fixed inset-0 bg-[#f2f2f2] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:hidden">
              <div className="bg-white w-full h-[28rem] mx-[1rem] py-[1rem] px-[1rem] rounded-[0.8rem] shadow-lg">
                <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
                  <div
                    className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium"
                    onClick={() => setPage1Visible(false)}
                  >
                    <button className="text-[#838282]">
                      {AllBlogs?.cancel}
                    </button>
                  </div>
                  <div
                    className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium"
                    onClick={() => setPage1Visible(false)}
                  >
                    <button className="text-red-700">{AllBlogs?.apply}</button>
                  </div>
                </div>
                <Page1
                  blogsData={blogsData}
                  onCategorySelect={(categories) => console.log(categories)}
                />
              </div>
            </div>
          )}

          {/* Heading */}
          <div className="my-[1.4rem] mx-[1.2rem] text-[1.5rem] font-poppins text-[#3a2a79] flex items-center">
            <CategoryHeading
              categories={selectedCategories}
              blogsData={blogsData}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-8 h-8 stroke-[#483d73] ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Filtered Data Display */}
          <div className="overflow-auto scrollbar-custom scrollbar h-full">
            <Link
              href={`blog/${formatString(headingData?.imgTitle)}`}
              className="mx-[1rem] relative flex lg:flex-row flex-col border-solid border-b-2 border-[#E6E7E6] mb-[0.8rem]"
            >
              <div className="lg:w-[40%] w-full relative flex items-start justify-center">
                {/* <video className="w-full h-[13rem] lg:mb-0 mb-[0.5rem] rounded-[0.5rem] object-cover lg:top-0 lg:absolute">
                  <source src={headingData?.machineBg} type="video/mp4" />
                </video> */}
                <BlurImage
                  src={headingData?.machineImg}
                  alt={"MachineImg"}
                  width={200}
                  height={200}
                  className="w-full rounded-xl"
                />
              </div>

              <div className="font-poppins lg:w-[60%]">
                <div className="flex flex-col items-start">
                  <p className="text-black text-[1.1rem] lg:text-left text-center lg:mx-[1rem] font-poppins font-medium">
                    {headingData?.imgTitle}
                  </p>
                  <p className="mb-[0.5rem] text-sm lg:ml-[1rem] lg:mr-[1.5rem] lg:text-left text-center">
                    {headingData?.imgParagraph}
                  </p>
                  {/* <div
                    className="text-lg absolute right-1 hover:bg-[#E6E7E6] rounded-full p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </div> */}
                </div>
                {/* {headingData?.paragraphList?.map((item, index) => (
                  <ul
                    key={index}
                    className="list-disc ml-[3rem] mr-[1rem] hidden lg:block"
                  >
                    <li className="text-black">{item?.title}</li>
                  </ul>
                ))} */}
                <div className="lg:flex hidden  justify-end">
                  <Link
                    href={`blog/${formatString(headingData?.imgTitle)}`}
                    className="flex items-center justify-center lg:mt-[1rem] bg-[#E6E7E6] w-[8.2rem] rounded-[1rem] mb-[1vh] py-[0.3rem] hover:bg-[#33246e] hover:text-white group"
                  >
                    <svg
                      width="200"
                      height="200"
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      className="w-4 h-4"
                    >
                      <rect
                        x="20"
                        y="20"
                        width="160"
                        height="160"
                        rx="10"
                        ry="10"
                        fill="none"
                        stroke="black"
                        strokeWidth="10"
                        className="group-hover:stroke-white"
                      />
                      <rect
                        x="40"
                        y="40"
                        width="40"
                        height="40"
                        fill="black"
                        className="group-hover:fill-white"
                      />
                      <rect
                        x="90"
                        y="40"
                        width="80"
                        height="10"
                        fill="black"
                        className="group-hover:fill-white"
                      />
                      <rect
                        x="90"
                        y="60"
                        width="80"
                        height="10"
                        fill="black"
                        className="group-hover:fill-white"
                      />
                      <rect
                        x="40"
                        y="90"
                        width="130"
                        height="10"
                        fill="black"
                        className="group-hover:fill-white"
                      />
                      <rect
                        x="40"
                        y="110"
                        width="130"
                        height="10"
                        fill="black"
                        className="group-hover:fill-white"
                      />
                      <rect
                        x="40"
                        y="130"
                        width="130"
                        height="10"
                        fill="black"
                        className="group-hover:fill-white"
                      />
                    </svg>
                    <p className="text-[0.7rem] ml-2">
                      {headingData?.fullCoverage}
                    </p>
                  </Link>
                </div>
              </div>
            </Link>

            {/* Blogs List */}
            <div className="w-full lg:max-h-[58rem] lg:overflow-y-auto overflow-x-auto scrollbar-custom scrollbar">
              <div className="lg:w-full lg:space-x-0 space-x-4 w-max flex lg:flex-col flex-row overflow-x-hidden px-[1rem]">
                {getFilteredData().map((item, idx) => (
                  <Link
                    href={`blog/${formatString(item?.title)}`}
                    key={idx}
                    className="flex lg:flex-row flex-col items-start w-full my-[1.5vh] lg:border-solid lg:border-b-2 lg:border-[#E6E7E6] lg:pb-[0.5rem] lg:p-0 p-2 lg:bg-transparent bg-[#f2f2f2] lg:rounded-none rounded-[0.8rem]"
                  >
                    <BlurImage
                      src={item?.img}
                      alt="Blogs Image"
                      width={400}
                      height={400}
                      className="lg:w-[7.5rem] lg:h-[6rem] w-full h-[8rem] rounded-[0.5rem] object-cover"
                    />
                    <div className="flex w-full flex-col justify-end relative">
                      {/* <div className="absolute top-0 right-0 text-lg hover:bg-[#E6E7E6] rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </div> */}
                      <div className="flex flex-col lg:ml-[1rem] lg:w-full w-[14.2rem]">
                        <h2 className="text-black lg:mb-[0.2rem] font-medium lg:text-lg font-poppins lg:w-[92%] lg:text-left text-center">
                          {item?.title}
                        </h2>
                        <p className="lg:block hidden text-black font-normal lg:text-sm pr-10 text-[0.8rem] lg:mb-0 mb-[0.5rem] font-poppins">
                          {item?.description}
                        </p>
                      </div>
                      <div className="lg:flex hidden justify-end">
                        <Link
                          className="flex items-center justify-center bg-[#E6E7E6] w-[8.2rem] rounded-[1rem] py-[0.3rem] hover:bg-[#33246e] hover:text-white group"
                          href={`blog/${formatString(item?.title)}`}
                        >
                          <svg
                            width="200"
                            height="200"
                            viewBox="0 0 200 200"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="black"
                            className="w-4 h-4"
                          >
                            <rect
                              x="20"
                              y="20"
                              width="160"
                              height="160"
                              rx="10"
                              ry="10"
                              fill="none"
                              stroke="black"
                              strokeWidth="10"
                              className="group-hover:stroke-white"
                            />
                            <rect
                              x="40"
                              y="40"
                              width="40"
                              height="40"
                              fill="black"
                              className="group-hover:fill-white"
                            />
                            <rect
                              x="90"
                              y="40"
                              width="80"
                              height="10"
                              fill="black"
                              className="group-hover:fill-white"
                            />
                            <rect
                              x="90"
                              y="60"
                              width="80"
                              height="10"
                              fill="black"
                              className="group-hover:fill-white"
                            />
                            <rect
                              x="40"
                              y="90"
                              width="130"
                              height="10"
                              fill="black"
                              className="group-hover:fill-white"
                            />
                            <rect
                              x="40"
                              y="110"
                              width="130"
                              height="10"
                              fill="black"
                              className="group-hover:fill-white"
                            />
                            <rect
                              x="40"
                              y="130"
                              width="130"
                              height="10"
                              fill="black"
                              className="group-hover:fill-white"
                            />
                          </svg>
                          <p className="text-[0.7rem] ml-2">
                            {item?.fullCoverage}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page2;
