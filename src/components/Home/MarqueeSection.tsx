"use client";
import React from "react";
import DecorativeImg1 from "../../../public/assets/Marquee/DecorativeImg1.svg";
import DecorativeImg2 from "../../../public/assets/Marquee/DecorativeImg2.svg";
import { InfiniteMovingCards } from "../ui/marqueeCardAnimation";
import { HomeData } from "./types/constant";
import BlurImage from "../ui/BlurImage";
interface MarqueeLayoutProps {
  heroData: HomeData;
}
export default function MarqueeSection({ heroData }: MarqueeLayoutProps) {
  // Memoize brand section to avoid recomputation
  const brandSection = heroData?.home[5]?.data;

  // Return early if no brand section is found or data is missing
  if (!brandSection) return null;

  const { trusted, partners } = heroData?.home[5]?.data;

  return (
    <div className="h-[40rem] px-14 flex flex-col justify-center gap-12 overflow-hidden bg-gradient-to-b from-[#ece9f5]  via-white via-20% to-transparent relative font-poppins font-regular">
      <BlurImage
        alt="Decorative Image"
        src={DecorativeImg1}
        className="w-52 rotate-12 absolute top-4 -right-14"
      />
      <BlurImage
        alt="Decorative Image"
        src={DecorativeImg2}
        className="w-[20rem] absolute -bottom-16 left-10"
      />
      <div className="h-1/3 w-full flex flex-col justify-center items-center space-y-4">
        <h2 className="text-[#483d73] font-semibold text-center text-3xl">
          Trusted Partners & Brands
        </h2>
        <p className="text-[#483d73] font-extralight text-center w-[16rem]">
          “Building lasting partnerships with trusted brands worldwide.”
        </p>
      </div>
      <div className="relative h-1/3 flex flex-col lg:flex-row items-center">
        {/* Heading Section */}
        <div className="flex text-[#483d73] flex-col">
          <h2 className="text-sm lg:absolute lg:top-5 lg:text-xl bg-[#D3CFE2] px-4 py-2 rounded-3xl font-medium lg:mt-0 -mt-8  font-poppins whitespace-nowrap text-center w-max">
            {heroData?.home[5]?.heading1}
          </h2>
          <h2 className="lg:mt-0 mt-[5rem] lg:absolute  top-28 right-0 text-sm bg-[#D3CFE2] px-4 py-2 rounded-3xl lg:text-xl font-medium font-poppins whitespace-nowrap text-center w-max">
            {heroData?.home[5]?.heading2}
          </h2>
        </div>

        {/* Marquee Cards */}
        <div className=" mask-gradient-marquee">
          <div className=" w-full md:w-[85%] md:ml-48">
            <InfiniteMovingCards
              items={trusted}
              direction="left"
              className="w-full"
            />
          </div>
          <div className="mt-6 lg:mt-2 w-full md:w-[83%]">
            <InfiniteMovingCards
              items={partners}
              direction="right"
              className="w-full"
            />
          </div>
        </div>
      </div>
      {/* Description Section */}
      {heroData?.home[5]?.description?.text && (
        <div className="relative flex flex-col h-1/3 items-center text-center">
          <p className="text-sm text-[#483d73] lg:text-xl mx-4 w-full lg:w-[62%] font-poppins font-normal lg:leading-8">
            {heroData?.home[5]?.description?.text}
          </p>
        </div>
      )}
    </div>
  );
}
