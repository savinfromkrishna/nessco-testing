import BlurImage from "../ui/BlurImage";
import { gsap } from "gsap";
import dynamic from 'next/dynamic'
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
ssr: false,});
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OurCompanyItem } from "./types/constant";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const imageWidths = [
  "lg:w-[3.5rem] w-[2rem]",
  "lg:w-[3.5rem] w-[2rem]",
  "lg:w-[10rem] w-[5rem]",
  "lg:w-[3.5rem] w-[2rem]",
  "lg:w-[3.5rem] w-[2rem]",
];
const imagebottoms = [
  "justify-end mb-0",
  "justify-end mb-0",
  "justify-start",
  "justify-end mb-0",
  "justify-end mb-0",
];

interface AboutLayoutProps {
  companyData: OurCompanyItem;
}

const Home: React.FC<AboutLayoutProps> = ({ companyData }) => {
  const homecompanyData = companyData?.Ourcompany[0]?.Page1Data;
  return (
    <>
      <div className="mb-14  lg:mt-0 w-full font-poppins font-regular overflow-hidden">
        <div className="w-full lg:h-screen h-[44rem] relative flex items-center justify-center">
          <video
            id="background-video"
            className="w-full lg:h-screen h-full  object-cover"
            autoPlay
            playsInline
            loop
            muted
            preload="metadata"
            poster={homecompanyData?.video}
          >
            <source src={homecompanyData?.video} type="video/mp4" />
          </video>
          <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>

          <div className="absolute top-0 h-full w-full bg-black opacity-50"></div>
          <div className="absolute lg:top-28 top-20 mt-10 lg:mt-0 space-y-4 flex  flex-col  items-center w-full ">
            <h1 className="text-white font-semibold lg:text-3xl text-4xl">
              {homecompanyData?.title}
            </h1>
            <p className="font-normal lg:w-[50%] w-[85%]  text-center lg:text-[0.8rem] text-[0.7rem] text-white">
              {homecompanyData?.description}
            </p>
          </div>
          {/* <button className="bg-white w-[8rem] h-[2rem] rounded-[1rem] flex items-center absolute bottom-40 lg:hidden">
            <p className="text-black text-[0.8rem] text-center w-full">
              {homecompanyData?.getaQuote}
            </p>
            <div className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-5 h-5"
              >
                <circle cx="32" cy="32" r="32" className="fill-[#483d73]" />
                <path
                  d="M25 20l12 12-12 12"
                  className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round"
                />
              </svg>
            </div>
          </button> */}
          <div className="bg-white w-[9.5rem] h-[2.5rem] rounded-full flex items-center absolute bottom-40 lg:hidden">
          <ReusableForm
            formId="aboutPage"
            buttonText={homecompanyData?.getaQuote}
            dialogTitle="Get in Touch"
            dialogSubtitle="We'd love to hear from you!"
            imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
            showButton={true}
            secodaryButton={false}
            normalButton={true}
          />
          </div>
          <div className="absolute bottom-10 flex justify-center w-full  lg:space-x-1 space-x-1">
            {homecompanyData?.images?.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${imagebottoms[index]}`}
              >
                <BlurImage
                  src={item?.img}
                  alt="Content"
                  width={100}
                  height={100}
                  className={`${imageWidths[index]}`}
                />
                <p className="font-medium lg:text-sm text-[0.5rem] text-white lg:w-[8rem] w-[4rem] text-center">
                  {item?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
