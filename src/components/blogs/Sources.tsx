"use client";
import React, { useRef } from "react";
import { BlogsItem } from "./types/constant";
import BlurImage from "../ui/BlurImage";

interface BlogsProps {
  blogsData: BlogsItem;
}

const Page5: React.FC<BlogsProps> = ({ blogsData }) => {
  const Sources = blogsData?.blogs[0]?.Sources;
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="lg:mr-[3vw] lg:ml-0 mr-[4vw] ml-[4vw] relative font-regular font-poppins">
        <div className="bg-white w-full h-[38rem] mt-[2rem] rounded-[1rem] overflow-hidden mb-[2rem] pb-[1.5rem]">
          <div className="my-[1.4rem] mx-[1.2rem] text-[1.5rem] font-poppins text-[#3a2a79] flex z-0">
            <h1>{Sources?.title}</h1>
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
          <button
            className="bg-white p-[1rem] top-[20rem] -left-4 z-20 rounded-[2rem] drop-shadow absolute"
            onClick={scrollLeft}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-7 h-7 stroke-black"
              onClick={scrollLeft}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="bg-white p-[1rem] top-[20rem] z-20 -right-4 rounded-[2rem] drop-shadow absolute"
            onClick={scrollRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-7 h-7 stroke-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            className="lg:w-[74vw] h-[33rem] overflow-x-auto scrollbar-custom scrollbar"
            ref={carouselRef}
          >
            <div className="flex w-max px-[0.5rem]">
              <div className="flex flex-col items-center justify-center h-[31.9rem] w-[18.8rem] mx-[0.5rem] overflow-hidden">
                <h1 className="text-[2rem] text-[#3a2a79]">
                  {Sources?.mainHeading}
                </h1>
                <p className="w-[12rem] text-center">
                  {Sources?.mainDescription}
                </p>
              </div>
              {Sources?.allCard?.map((item, idx) => (
                <div
                  key={idx}
                  className="border-solid border-[0.1rem] border-[#a5a5a5] rounded-[1rem] mx-[0.5rem] w-[18.8rem] overflow-hidden h-[31.9rem]"
                >
                  <h1 className="pt-[1.2rem] border-solid border-b-[0.1rem] border-[#E6E7E6] pb-2 mx-[1rem] text-[1.5rem] font-poppins text-[#3a2a79]">
                    {item?.topHeadings}
                  </h1>
                  <div className="overflow-auto scrollbar-custom scrollbar h-[28.1rem]">
                    {item?.card &&
                      item?.card?.map((cardItem, cardIdx) => (
                        <div
                          key={cardIdx}
                          className="flex justify-between mx-[1rem] my-[1.5rem] border-solid border-b-[0.1rem] border-[#E6E7E6] pb-[0.1rem]"
                        >
                          <div className="relative">
                            <div className="absolute top-0 right-0 text-lg hover:bg-[#E6E7E6] rounded-full p-1">
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
                            </div>
                            <p className="text-black text-[0.9rem] font-poppins w-[10rem]">
                              {cardItem?.description}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <BlurImage
                              src={cardItem?.img}
                              alt={"Blogs Image"}
                              width={400}
                              height={400}
                              className="lg:w-[7.5rem] lg:h-[5rem] w-[6rem] h-[5rem] rounded-[0.5rem] object-cover"
                            />
                            <button className="text-[1rem] mt-[0.4rem] p-[0.4rem] ml-[4.2rem] hover:bg-[#33246e] hover:text-white rounded-[1rem] group">
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
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page5;
