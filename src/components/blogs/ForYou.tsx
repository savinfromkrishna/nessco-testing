"use client";
import React from "react";
import { BlogsItem } from "./types/constant";
import Link from "next/link";
import BlurImage from "../ui/BlurImage";

interface BlogsProps {
  blogsData: BlogsItem;
}

const Page4: React.FC<BlogsProps> = ({ blogsData }) => {
  const ForYou = blogsData?.blogs[0]?.ForYou;

  function formatString(input) {
    return input
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  return (
    <>
      <div className="lg:mr-[3vw] lg:ml-0 mr-[4vw] ml-[4vw] font-regular font-poppins">
        <div className="bg-white w-full lg:h-[30.5rem] h-max mt-[2rem] rounded-[1rem] overflow-hidden">
          <div className="mt-[1.4rem] mb-[0.5rem] mx-[1.2rem] text-[1.5rem] font-poppins text-[#3a2a79] flex">
            <h1>{ForYou?.title}</h1>
            <p className="mt-[0.3rem]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-8 h-8 stroke-[#483d73]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
          </div>
          <div className="lg:h-[25.3rem] w-full overflow-hidden">
            <div className="lg:grid lg:grid-cols-2 lg:grid-rows-[auto] flex h-full w-full lg:overflow-y-auto overflow-x-auto scrollbar-custom scrollbar">
              {ForYou?.for?.map((item, idx) => (
                <Link
                  href={`blog/${formatString(item?.title)}`}
                  key={idx}
                  className="flex lg:flex-row flex-col-reverse mx-[1rem] mt-[1rem] mb-2 lg:mb-0 h-max lg:border-solid lg:border-b-2 lg:border-[#E6E7E6] pb-[0.2rem] lg:bg-transparent bg-[#f2f2f2] p-2 lg:p-0 lg:rounded-none rounded-[0.8rem]"
                >
                  <div className="flex flex-col pb-2 lg:w-full w-[55vw] lg:mr-[0.8rem] relative">
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
                    <h2 className="text-black mb-[0.2rem] lg:w-[94%] w-full font-medium lg:text-lg font-poppins lg:text-left text-center">
                      {item?.title}
                    </h2>
                    <p className="lg:block hidden text-black font-normal text-sm w-full font-poppins">
                      {item?.description}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <BlurImage
                      src={item?.img}
                      alt={"Blogs Image"}
                      width={400}
                      height={400}
                      className="lg:w-[7.5rem] lg:h-[5rem] w-full h-[8rem] rounded-[0.5rem] object-cover"
                    />
                    <button className="lg:block hidden text-[1rem] mt-[0.4rem] ml-[4.2rem] p-[0.4rem] hover:bg-[#33246e] hover:text-white rounded-[1rem] group">
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
                          stroke-width="10"
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
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page4;
