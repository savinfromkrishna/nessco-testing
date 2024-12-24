"use client";
import React, { useState, useEffect } from "react";
import BlurImage from "../ui/BlurImage";
import { VisionItem } from "./types/constant";

const imageWidths = [
  "lg:w-[8rem] w-[2.2rem]", // Width for the mission image
  "lg:w-[8rem] w-[2.3rem]", // Width for the vision image
  "lg:w-[11rem] w-[3rem]", // Width for the culture image
  "lg:w-[8rem] w-[2.5rem]", // Width for the csr image
];

const imageRight = [
  "lg:left-1/2 lg:transform lg:-translate-x-1/2 right-[14vw]", // Width for the mission image
  "lg:left-1/2 lg:transform lg:-translate-x-1/2 right-[14vw]", // Width for the vision image
  "lg:left-1/2 lg:transform lg:-translate-x-1/2 right-[14vw]", // Width for the culture image
  "lg:left-1/2 lg:transform lg:-translate-x-1/2 right-[14vw]", // Width for the csr image
];

const expandedImageWidths = [
  "lg:w-[17vw] w-[10rem]", // Expanded width for the mission image
  "lg:w-[17vw] w-[10rem]", // Expanded width for the vision image
  "lg:w-[20vw] w-[10rem]", // Expanded width for the culture image
  "lg:w-[17vw] w-[10rem]", // Expanded width for the csr image
];

const imageBottoms = [
  "lg:bottom-[4vh] ", // Bottom position for the mission image
  "lg:bottom-[4.5vh] ", // Bottom position for the vision image
  "lg:bottom-[1vh] ", // Bottom position for the culture image
  "lg:bottom-[3.5vh] ", // Bottom position for the csr image
];

const imageBottomsMobile = [
  "lg:bottom-[4vh] bottom-[0.5rem] lg:right-[2rem]", // Bottom position for the mission image
  "lg:bottom-[4.5vh] bottom-[0.5rem] lg:right-[2rem]", // Bottom position for the vision image
  "lg:bottom-[1vh] bottom-[0.2rem] lg:right-[2rem]", // Bottom position for the culture image
  "lg:bottom-[3.5vh] bottom-[0.5rem] lg:right-[2rem]", // Bottom position for the csr image
];

const leftClasses = [
  "lg:left-0",
  "lg:left-[24vw]",
  "lg:left-[48vw]",
  "lg:left-[71.9vw]",
];

interface VisionProps {
  visionData: VisionItem;
}

const Page2: React.FC<VisionProps> = ({ visionData }) => {
  const Cards = visionData?.Vision[0]?.Cards;
  const [expanded, setExpanded] = useState<number | null>(null);
  const [blurringIndex, setBlurringIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setBlurringIndex(index); // Set the index of the box being toggled
    setExpanded((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (blurringIndex !== null) {
      const timer = setTimeout(() => {
        setBlurringIndex(null); // Remove blur after transition
      }, 200); // Adjust the duration to match the CSS transition (300ms)

      return () => clearTimeout(timer);
    }
  }, [blurringIndex]);

  return (
    <div className="lg:mx-[3rem] flex items-center justify-center font-regular font-poppins">
      <div className="lg:mb-[4rem] lg:mt-[2rem] mb-[4rem] w-[94vw] lg:h-[70vh] flex lg:flex-row flex-col lg:relative">
        {Cards?.cards?.map((card, index) => (
          <div
            key={index}
            onClick={() => handleToggle(index)}
            className={`bg-white flex lg:flex-col flex-row justify-center items-center lg:rounded-[2rem] rounded-[1rem] lg:px-[2rem] lg:py-[3.2rem] px-[4vw] relative lg:absolute lg:my-0 my-[0.5rem] transition-all duration-300 ${
              expanded === index
                ? "lg:left-0 lg:right-0 lg:w-full lg:h-[70vh] h-[35rem] z-20"
                : `${leftClasses[index]}  lg:w-[23.5%] w-full lg:h-[70vh] h-[5rem] z-10 flex flex-col items-center`
            }`}
          >
            <button
              aria-label="Open"
              className={`text-[2rem] z-10 ${
                expanded === index ? "lg:top-4 top-[0.6rem]" : "lg:top-4"
              } absolute lg:right-4 right-2`}
            >
              {expanded === index ? (
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-5 h-5 stroke-white"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 bg-[#483d73] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 fill-white"
                  >
                    <path d="M12 4c.552 0 1 .448 1 1v6h6c.552 0 1 .448 1 1s-.448 1-1 1h-6v6c0 .552-.448 1-1 1s-1-.448-1-1v-6H5c-.552 0-1-.448-1-1s.448-1 1-1h6V5c0-.552.448-1 1-1z" />
                  </svg>
                </div>
              )}
            </button>
            <div
              className={`lg:text-[2.2rem] text-[1.5rem]  font-poppins font-extrabold text-[#483d73] absolute lg:top-[3rem] ${
                expanded === index
                  ? "lg:left-[4vw] lg:top-[6vh] top-[1vh] text-center w-[90%]"
                  : " lg:left-[5vw] left-[5vw] lg:text-center lg:w-[12vw] "
              } transition-all duration-300 ease-in-out`}
            >
              <h2>
                {expanded === 3 && index === 3 ? card?.longTitle : card?.title}
              </h2>
            </div>
            <p
              className={`lg:text-[1rem] text-[0.8rem] font-poppins absolute ${
                expanded === index
                  ? "lg:left-[4vw] lg:w-[58vw] w-[75vw] lg:top-[10rem] top-[13vh] lg:text-left text-center"
                  : "lg:w-[10rem] lg:top-[22vh] text-center"
              } transition-all duration-300 ease-in-out ${
                blurringIndex === index ? "blur-sm" : ""
              } ${
                expanded === index ? "" : "hidden lg:block" // Hide on mobile unless expanded
              }`}
            >
              {expanded === index ? card?.largeDescription : card?.description}
            </p>

            {card?.descriptionList && expanded === index && (
              <div
                className={`absolute lg:text-[1rem] text-[0.8rem] lg:left-[4vw] lg:bottom-[6vh] bottom-[12rem] flex lg:w-[58vw] w-[75vw] transition-all duration-300 ease-in-out ${
                  blurringIndex === index ? "blur-sm" : ""
                }`}
              >
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {card?.descriptionList?.map((item, idx) => (
                    <div key={idx} className="flex mx-[0.5vw]">
                      {index === 1 && (
                        <div className="flex">
                          <p className="text-[#483d73] mr-[0.5vw] font-bold lg:text-[1.2rem]">
                            {item?.listImg}
                          </p>
                          <p>{item?.point}</p>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="flex">
                          <BlurImage
                            src={item?.listImg}
                            alt={item?.point}
                            width={100}
                            height={100}
                            className="lg:w-[3vw] lg:h-[6vh] w-[8vw] h-[4vh]"
                          />
                          <p>{item?.point}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <BlurImage
              src={card?.image}
              alt="Content"
              width={100}
              height={100}
              className={`absolute ${
                expanded === index
                  ? imageBottomsMobile[index]
                  : imageRight[index]
              }  ${imageBottoms[index]} ${
                expanded === index
                  ? expandedImageWidths[index]
                  : imageWidths[index]
              } transition-all duration-300 ease-in-out`}
            />
          </div>
        ))}
      </div>
    </div>
  );
  ``;
};

export default Page2;
