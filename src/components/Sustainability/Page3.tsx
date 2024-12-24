"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SustainabilityData, ThirdPageData } from "./types/constant";
import BlurImage from "../ui/BlurImage";

interface MainLayoutProps {
  sustainData: SustainabilityData;
}

gsap.registerPlugin(ScrollTrigger);

const getCategoryData = (sustainData: SustainabilityData, category: string) => {
  const categoryItem = sustainData?.Sustainability?.find(
    (item) => item?.category === category
  );
  return categoryItem?.Data as ThirdPageData | null;
};

const Page3: React.FC<MainLayoutProps> = ({ sustainData }) => {
  const data = getCategoryData(sustainData, "secondpage");

  const globeRef = useRef(null);
  const screen = useRef(null);

  useEffect(() => {
    gsap.fromTo(globeRef.current, { x: -120 }, { x: 0, duration: 3 });
    // Scroll animation
    gsap.fromTo(
      globeRef.current,
      { x: 0 },
      {
        x: -120,
        duration: 3,
        scrollTrigger: {
          trigger: screen.current,
          start: "30% bottom",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div className="flex items-center justify-center h-full overflow-hidden lg:mt-[10rem] mt-[10rem] md:mt-0 font-poppins lg:mb-5">
        <div
          className="bg-[#388E3C] lg:h-[29rem] h-[43rem] relative lg:w-full w-[22rem] md:w-full mx-4 mt-[10rem] lg:mx-[5rem] lg:ounded-[2rem] rounded-2xl"
          ref={screen}
        >
          <BlurImage
            src="https://assets.nesscoindustries.com/public/assets/about/sustainability/sustainability-bushes.webp"
            alt="branchLeaves"
            height={2000}
            width={2000}
            className="absolute lg:-top-[9.1rem] lg:-left-[5rem] -top-10 -left-5 z-[300]"
          />

          <div className="flex absolute lg:left-[3.3rem] lg:top-[1.5rem] top-16 font-poppins">
            <h2 className="lg:text-[3.3rem] md:text-6xl font-medium text-white z-[301] text-4xl pl-16 lg:pl-0">
              Sustainable
            </h2>
            <h2 className="absolute top-[4.5rem] whitespace-nowrap lg:text-[3.3rem] md:text-3xl text-2xl lg:pl-0 pl-5 md:pl-16 font-medium text-black z-[301]">
              Manufacturing practices
            </h2>
          </div>
          <div className=" flex absolute top-[12rem] lg:left-[3.3rem] font-poppins text-center lg:text-left">
            <p className="w-full max-w-[50rem] text-white font-normal md:text-xl leading-[1.3rem] lg:text-[1rem] text-sm z-[301] px-4">
              {data?.description}
            </p>
          </div>
          <video
            className="overflow-hidden absolute bottom-[1rem] lg:right-[2rem] -right-[5rem] lg:w-[10rem] w-[8rem] -rotate-45"
            ref={globeRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://assets.nesscoindustries.com/public/assets/about/sustainability/sustainability-globe-gif.webm"
          >
            <source
              src="https://assets.nesscoindustries.com/public/assets/about/sustainability/sustainability-globe-gif.webm"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  );
};

export default Page3;
