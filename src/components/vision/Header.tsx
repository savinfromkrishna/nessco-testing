"use client";
import React from "react";
import BlurImage from "../ui/BlurImage";
import { VisionItem } from "./types/constant";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReusableForm from "../Contact/ReuseableForm";

gsap.registerPlugin(ScrollTrigger);

const imageWidths = [
  "lg:w-[3.5rem] w-[2rem]",
  "lg:w-[3.5rem] w-[2rem]",
  "lg:w-[8rem] w-[6rem]",
  "lg:w-[3.5rem] w-[2rem]",
  "lg:w-[3.5rem] w-[2rem]",
];
const imagebottoms = [
  "justify-end lg:mb-3 mb-2",
  "justify-end lg:mb-3 mb-2",
  "justify-start",
  "justify-end lg:mb-3 mb-2",
  "justify-end lg:mb-3 mb-2",
];

interface VisionProps {
  visionData: VisionItem;
}

const Page1: React.FC<VisionProps> = ({ visionData }) => {
  const Header = visionData?.Vision[0]?.Header;
  return (
    <>
      <div className="mb-14 lg:mt-0 mt-14 w-full font-poppins font-regular overflow-hidden">
        <div className="w-full lg:h-screen h-[34rem] relative flex items-center justify-center">
          <video
            id="background-video"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={Header?.video}
          >
            <source src={Header?.video} type="video/mp4" />
          </video>
          <div className="absolute top-0 h-full w-full bg-black opacity-50"></div>
          <div className="absolute lg:top-28 top-12 space-y-4 flex flex-col  items-center w-full">
            <h1 className="text-white font-semibold lg:text-4xl text-4xl">
              {Header?.title}
            </h1>
            <p className="font-normal lg:w-[50%] w-[85%]  text-center lg:text-[0.8rem] text-[0.7rem] text-white">
              {Header?.description}
            </p>
          </div>
          <div
            className="bg-white w-[9.5rem] h-[2.5rem] rounded-full flex items-center absolute bottom-40 lg:hidden"
            aria-label="Right"
          >
            {/* <p className="text-black text-[0.8rem] text-center w-full">
              {Header?.getaQuote}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-7 h-7"
            >
              <circle
                cx="32"
                cy="32"
                r="32"
                className="fill-[#483d73] cursor-pointer"
              />
              <path
                d="M25 20 L37 32 L25 44"
                className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
              />
            </svg> */}
            <ReusableForm
            formId="aboutPage"
            buttonText={Header?.getaQuote}
            dialogTitle="Get in Touch"
            dialogSubtitle="We'd love to hear from you!"
            imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
            showButton={true}
            secodaryButton={false}
            normalButton={true}
          />
          </div>
          <div className="absolute bottom-10 flex justify-center w-full lg:space-x-6 space-x-2">
            {Header?.image?.map((item, index) => (
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
                <p className="font-medium lg:text-sm text-xs text-white">
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

export default Page1;
