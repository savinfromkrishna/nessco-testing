"use client";

import React, { useEffect, useRef } from "react";
import Image from 'next/image';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SustainabilityData,LandingPageData } from "./types/constant";

interface MainLayoutProps {
  sustainData: SustainabilityData;
}

const getCategoryData = (sustainData: SustainabilityData, category: string) => {
  const categoryItem = sustainData?.Sustainability?.find((item) => item?.category === category);
  return categoryItem?.Data as LandingPageData | null;
};

const Page1: React.FC<MainLayoutProps> = ({ sustainData }) => {
  const data = getCategoryData(sustainData, "Landingpage");

  const butterflyRef = useRef<HTMLImageElement>(null);
  const grassRef = useRef<HTMLImageElement>(null);
  const treesRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    console.log("Sustainability Data:", data);
    if (data && typeof window !== "undefined" && window.innerWidth > 768) {
      // Initial animation for butterfly
      gsap.fromTo(
        butterflyRef.current,
        { x: 0, opacity: 0 },
        { x: 80, opacity: 1, duration: 2 }
      );

      // Scroll animation for butterfly
      gsap.fromTo(
        butterflyRef.current,
        { x: 80, opacity: 1 },
        {
          x: 0,
          opacity: 0.2,
          duration: 1,
          scrollTrigger: {
            trigger: screenRef.current,
            start: "top",
            scrub: true,
          },
        }
      );

      // Animation for trees
      gsap.fromTo(treesRef.current, { y: 0 }, { y: -290, duration: 0.5 });
      gsap.fromTo(
        treesRef.current,
        { y: -290 },
        {
          y: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: screenRef.current,
            start: "top",
            scrub: true,
          },
        }
      );

      // Animation for grass
      gsap.fromTo(
        grassRef.current,
        { y: 0, opacity: 0 },
        { y: -110, opacity: 1, duration: 0.5, delay: 0.4 }
      );
      gsap.fromTo(
        grassRef.current,
        { y: -110 },
        {
          y: 0,
          duration: 0.2,
          scrollTrigger: {
            trigger: screenRef.current,
            start: "top",
            scrub: true,
          },
        }
      );
    }
  }, [data]);

  if (!data) return null; // Render nothing if the category does not match

  return (
    <div className="mt-8 flex items-center justify-center h-full w-full" ref={screenRef}>
      <Image
        src={data?.butterfly}
        alt="butterfly"
        height={100}
        width={100}
        className="absolute top-[5rem] left-0 lg:w-[20rem] w-[10rem] z-[1]"
        ref={butterflyRef}
      />
      <div className="lg:w-full w-[70rem] lg:h-[80vh] h-[24rem] lg:mx-20 md:h-[60rem] mx-5 bg-white lg:rounded-[40px] rounded-2xl relative overflow-hidden mt-12">
        <div className="flex flex-col items-center justify-center h-full relative z-[5]">
          <h2 className="lg:text-[6.3rem] text-4xl lg:mt-0 md:text-4xl -mt-[5rem] font-black text-[#0C350F] font-poppins text-center">
            {data?.title}
          </h2>
          <h2 className="relative lg:right-[12rem] lg:-bottom-10 text-xl font-poppins font-thin">
            {data?.description}
          </h2>
        </div>
        <Image
          src={data?.grass}
          alt="grass"
          width={3000}
          height={3000}
          className="absolute left-3 lg:-bottom-[8.1rem] bottom-0"
          ref={grassRef}
        />
        <div>
          <Image
            src={data?.trees}
            alt="trees"
            width={560}
            height={352}
            className="absolute right-0 md:right-20 lg:-bottom-[19rem] -bottom-4 md:-bottom-[20rem] z-[10] lg:h-[44vh] lg:w-[35rem]"
            ref={treesRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Page1;