import React from "react";

import dynamic from 'next/dynamic'
import { HomeData } from "./types/constant"
// const FeatureProjects=dynamic(()=>import ("./FeatureProjects"))
import FeatureProjects from "./FeatureProjects";
import VideoCarousel from "../ui/HomeCaorusel";
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
  ssr: false,
});
// const VideoCarousel = dynamic(() => import("../ui/HomeCaorusel"));

interface HeroLayoutProps {
  heroData: HomeData;
}

const Home: React.FC<HeroLayoutProps> = ({ heroData }) => {
  // Extract countryCode and languageCode from pathname

  return (
    <>
      <div className="relative max-w-screen-2xl mx-auto h-full w-full flex flex-col items-center overflow-hidden">
        <div className="relative px-4 md:px-4 lg:px-14 w-full">
          <div className="w-full flex justify-center items-center h-[38vh] sm:h-[50vh] rounded-3xl">
            <VideoCarousel heroData={heroData} />
          </div>
        </div>
        <div className="absolute flex flex-col w-1/2 sm:w-[20rem] sm:h-[5rem] sm:rounded-tl-[2rem] rounded-tl-[1.5rem] right-0 bg-[#f2f2f2] bottom-0 text-3xl font-poppins text-white text-center">
          <div className="-mt-[0.9rem] sm:-mt-6 flex mr-2  md:mr-2 lg:mr-12 justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 20 20"
              fill="none"
              className="flex h-4 w-8 sm:h-6 sm:w-10"
            >
              <path
                d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                fill="#f2f2f2"
                transform="rotate(90 10 10)"
              ></path>
            </svg>
          </div>
          <div className="w-full mt-4 ml-8 flex justify-start">
            <div className="absolute bottom-2 lg:bottom-1 lg:left-4 left-2 w-[10rem] lg:w-[15rem]">
              <ReusableForm
                formId="homePage"
                buttonText={heroData?.home[1]?.data?.buttonText}
                dialogTitle="Get in Touch"
                dialogSubtitle="We'd love to hear from you!"
                imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
                showButton={true}
                secodaryButton={true}
              />
            </div>
          </div>

          <div className="z-50 mt-[2.6rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              viewBox="0 0 20 20"
              fill="none"
              className="sm:-ml-[2rem] -ml-6 h-4 w-8 sm:h-6 sm:w-10"
            >
              <path
                d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                fill="#f2f2f2"
                transform="rotate(90 10 10)"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <FeatureProjects heroData={heroData} />
    </>
  );
};

Home.displayName = "Hero";
export default React.memo(Home);
