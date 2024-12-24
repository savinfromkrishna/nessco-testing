"use client";
import BlurImage from "../ui/BlurImage";
import Style from "./about.module.css";
import { OurCompanyItem } from "./types/constant";
import React from "react";

interface AboutLayoutProps {
  companyData: OurCompanyItem;
}

const Grid: React.FC<AboutLayoutProps> = ({ companyData }) => {
  const grid = companyData?.Ourcompany?.[0]?.images;

  const imageStyles = [
    "lg:top-36 top-36 lg:left-[35%] left-[15%] lg:w-[10%] lg:h-[20%] h-[13%] w-[23%]",
    "lg:top-[35%] top-[37%] lg:left-[87%] left-[80%] lg:w-[6%] lg:h-[12%] h-[11%] w-[16%]",
    "lg:visible invisible lg:top-[58%] top-[52%] left-2 lg:w-[7%] w-[25%] h-[11%]",
    "lg:top-[30%] top-[34%] lg:left-16 left-2 lg:w-[20%] lg:h-[25%] h-[13%] w-[45%]",
    "lg:top-[50%] top-[50%] lg:left-[24%] left-[4%] lg:w-[28%] lg:h-[36%] h-[25%] w-[50%] image-scale-up",
    "lg:visible invisible lg:top-[70%] top-[79%] lg:left-[8%] left-[10%] lg:w-[6%] lg:h-[19%] w-[19%] h-[11%]",
    "lg:top-[57%] top-[75%] left-[56%] lg:w-[15%] lg:h-[15%] w-[33%] h-[12%] image-translate-up",
    "lg:top-[75%] lg:left-[68%] lg:w-[7%] lg:h-[12%] h-[7%] w-[20%] top-[82%] left-[24%]",
    "lg:w-[26%] lg:h-[23%] w-[50%] h-[15%] lg:left-[55%] left-[45%] lg:top-40 top-36",
    "top-[55%] lg:left-[83%] left-[70%] lg:w-[13%] lg:h-[25%] h-[16%] w-[26%] image-translate-up"
  ];



  return (
    <div className="relative h-[40rem] bg-black w-full">
      <div className="absolute inset-0 grid grid-cols-10 p-14 -ml-16 overflow-hidden group">
        <div className="border border-gray-400 mt-16"></div>
        <div className="border border-gray-400 mt-16 col-span-3"></div>
        <div className="border border-gray-400 mt-16 col-span-3"></div>
        <div className="border border-gray-400 mt-16 col-span-2 -mr-10"></div>
        <div className="border border-gray-400 mt-16 ml-10 lg:-mr-[47%] -mr-[4rem]"></div>
      </div>
      <div className="absolute w-full top-1/2 z-30">
        <h2 className="lg:text-6xl text-5xl z-30 lg:top-1/2 top-[23.5rem] lg:left-1/2 font-poppins justify-center text-center flex flex-col text-white font-medium group-hover:scale-90 transition-all duration-300">
          Gallery
        </h2>
      </div>
      {grid?.map((img, idx) => (
        <div
          key={idx}
          className={`absolute ${imageStyles[idx]} z-20 ${
            imageStyles[idx].includes("image-scale-up") ? Style.imageScaleUp : ""
          } ${
            imageStyles[idx].includes("image-translate-up")
              ? Style.imageTranslateUp
              : ""
          }`}
        >
          <BlurImage
            src={img?.src}
            alt={img?.alt}
            layout="fill"
            objectFit="cover"
            className="duration-100 rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default Grid;

