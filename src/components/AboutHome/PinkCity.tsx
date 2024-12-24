"use client";
import BlurImage from "../ui/BlurImage";
import React, { useEffect, useState } from "react";
import { AboutItem } from "./types/constant";
import LinkUrl from "../LinkUrl";

const truncateText = (text: string, maxWords: number) => {
  const wordsArray = text.split(" ");
  if (wordsArray.length > maxWords) {
    return wordsArray.slice(0, maxWords).join(" ") + "...";
  }
  return text; // Return full text if it's within the limit
};
interface HomeLayoutProps{
  aboutData:AboutItem;
}

const PinkCity:React.FC <HomeLayoutProps> =({aboutData}) => {
  const [isMobile, setIsMobile] = useState(false);
  const homepinkcityData=aboutData?.About[0]?.galleryfour
  const homemisionData=aboutData?.About[0]?.missionvissionContent

  useEffect(() => {
    // Detect screen size for mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Adjust breakpoint if needed
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative mx-auto lg:h-[35rem] h-[65rem] bg-white w-full md:h-full lg:pt-10 pt-5">
      <h2 className="lg:text-3xl text-2xl font-medium text-left font-poppins text-[#312465] lg:pl-10 pl-8 ">
        {homepinkcityData?.heading}
      </h2>
      <div className="flex flex-col items-center">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-6 gap-y-6 lg:px-11 px-8 md:px-9 p-1 w-full h-full  my-10 flex flex-col items-center ">
          {homepinkcityData?.galleryImages?.map((item, index) => (
            <div
              key={index}
              className="relative lg:h-[22rem] lg:w-full lg:px-0  w-full"
            >
              {!isMobile ? (
                <div className="group relative h-full w-full overflow-hidden">
                  <BlurImage
                    src={item?.src}
                    alt={`Gallery image ${index + 1}`}
                    height={500}
                    width={500}
                    className="lg:rounded-2xl lg:object-cover h-full w-full "
                  />

                  <div className="lg:visible invisible absolute inset-0 bg-black transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 group-hover:bg-gradient-to-t from-black to-transparent bg-opacity-0"></div>
                  <div className=" absolute left-0 inset-0 flex flex-col items-center justify-center lg:transition-transform lg:duration-300 lg:transform lg:translate-y-full lg:group-hover:translate-y-0">
                    <BlurImage
                      src="https://res.cloudinary.com/dlti4o10e/image/upload/v1731561436/flower_lcqfpb.svg"
                      alt="Overlay Icon"
                      width={100}
                      height={50}
                      className="w-[16rem] h[5rem] -mt-10"
                    />
                    <p className="text-white -mt-20 lg:text-sm font-regular lg:w-[15rem] text-xs w-35vw] text-center font-poppins">
                      {item?.paragraph}
                    </p>
                    <BlurImage
                      src="https://res.cloudinary.com/dlti4o10e/image/upload/v1731561503/bottomlayer_uq6egh.svg"
                      alt="Overlay Icon"
                      width={100}
                      height={50}
                      className="lg:w-[16rem] lg:h[5rem] -mt-36"
                    />
                  </div>
                </div>
              ) : (
                // mobileview
                <div className="flex flex-col border border-black md:h-[18rem] rounded-xl overflow-hidden h-[12rem]  w-full ">
                  <div className="flex">
                    <div className="w-1/2 p-1">
                      <BlurImage
                        src={item?.src}
                        alt={`Gallery image ${index + 1}`}
                        width={300}
                        height={300}
                        className=" object-cover md:h-[19.3rem] h-[11.5rem] w-full rounded-xl "
                      />
                    </div>
                    <div className="w-1/2 flex flex-col items-center p-1 relative">
                      <BlurImage
                        src="https://res.cloudinary.com/dlti4o10e/image/upload/v1731562132/2_kkggie.svg"
                        alt="Overlay Icon"
                        width={100}
                        height={50}
                        className="top-0"
                      />
                      <p className="text-black text-xs font-bold text-center font-poppins md:text-lg w-[85%] absolute bottom-12 md:bottom-24">
                        {truncateText(item?.paragraph, 11.5)}{" "}
                        {/* Adjust maxWords as needed */}
                      </p>
                      <BlurImage
                        src="https://res.cloudinary.com/dlti4o10e/image/upload/v1731562270/24_inch_9_gioc9p.svg"
                        alt="Overlay Icon"
                        width={100}
                        height={50}
                        className=" absolute -bottom-16 md:bottom-5"
                      />
                    </div>
                  </div>
                </div>
              )}
              {index >= 0 && index < homepinkcityData?.galleryImages?.length - 1 && (
                <div className="absolute right-[-0.700rem] top-3 h-[21rem] w-[2px] bg-[#2d1f66] lg:visible invisible"></div>
              )}
            </div>
          ))}
        </div>
        <LinkUrl href="/about/the-pink-city " className="bg-slate-50 absolute bottom-3 rounded-md">
        <div>
          <button aria-label="read-more" 
          className="text-base hover:font-medium font-normal  lg:bg-gray-100 font-poppins w-[8rem] h-[2rem] items-center justify-center text-center border lg:border-[#6f6f6f] lg:hover:bg-black lg:text-[#6f6f6f] lg:hover:text-white bg-black text-white  rounded-[0.26rem] z-10 ">
            {homemisionData?.button}
          </button>
        </div>
        </LinkUrl>
      </div>
    </div>
  );
};

export default PinkCity;
