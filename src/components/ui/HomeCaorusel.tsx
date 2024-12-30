"use client";

import React from "react";
import Image from "next/image";
import { HomeData } from "../Home/types/constant";

interface SimpleHeroImageProps {
  heroData?: HomeData;
}

const SimpleHeroImage: React.FC<SimpleHeroImageProps> = ({ heroData }) => {
  const imageData = heroData?.home?.[1]?.data?.images?.[0];

  return (
    <div className="relative w-full mx-auto h-full overflow-hidden rounded-2xl">
      <Image
        src="https://assets.nesscoindustries.com/public/assets/homepage/machine-images/ns-2020.webp"
        alt={imageData?.headline || "Hero image"}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" aria-hidden="true" />
      <div className="absolute top-[4rem] lg:top-1/3 lg:left-20 text-white z-10 w-full px-4 lg:px-0">
        <h1 className="lg:text-5xl md:text-5xl sm:text-4xl text-3xl text-center lg:text-left font-semibold mb-4">
          {imageData?.headline || "Welcome to our platform"}
        </h1>
        <p className="lg:text-4xl md:text-4xl lg:text-left text-center sm:text-3xl text-xl italic w-full lg:w-2/3">
          {imageData?.subheadline || "Discover amazing features and services"}
        </p>
      </div>
    </div>
  );
};

export default SimpleHeroImage;

