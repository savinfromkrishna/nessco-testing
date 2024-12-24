"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface questions {
  que: string;
  ans: string;
}
interface FaqProductsData {
  questions: questions[];
  title?: string;
  subTitle?: string;
}

interface FaqProductsProps {
  faqData: FaqProductsData;
}

const FaqProducts: React.FC<FaqProductsProps> = ({ faqData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpansion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl font-poppins">
      <div className="flex lg:p-8 p-4">
        <h2 className="font-poppins lg:text-3xl text-2xl">
          <span className="text-[#483d73] font-medium">
            {(faqData?.title &&
              faqData?.title?.split(" ").slice(0, -1).join(" ")) ||
              "Frequently Asked Questions"}
          </span>{" "}
          <span className="text-red-700 font-semibold">
            {(faqData?.title && faqData?.title?.split(" ").slice(-1)) || "FAQs"}
          </span>
        </h2>
      </div>
      <div
        className="w-full flex justify-center items-center px-3 lg:px-6"
        ref={carouselRef}
      >
        <div className="lg:w-full bg-white p-2">
          <div>
            <h3 className="font-semibold lg:text-[1.5rem] lg:mt-6 text-[1.2rem]">
              {faqData?.subTitle}
            </h3>
            <div className="lg:border-t-[2px] border-t-2 border-solid border-[#dc0e2a] lg:w-[6vw] w-[18vw] -mt-4 lg:-mt-8"></div>
          </div>
          <div className="lg:h-[22.5rem] h-[18rem] lg:my-6 my-2 w-full overflow-hidden">
            <div className="h-full overflow-auto scrollbar-hide">
              {faqData?.questions?.map((item, idx) => (
                <div key={idx} className="w-full lg:pt-[3vh] pt-[1vh]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpansion(idx)}
                  >
                    <h3 className="lg:text-[1.1rem] w-[70%] text-[0.9rem] font-medium font-poppins">
                      {item?.que}
                    </h3>
                    {expandedIndex === idx ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-6 h-6 stroke-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="lg:border-t-[1px] border-[#d3d2d2] border-t-[1px] border-solid mt-[0.5vh] lg:w-[70%] w-[80%]"></div>

                  {expandedIndex === idx && (
                    <div className="ml-[2vw] text-[#9e9c9c] py-[1vh] lg:text-[1rem] text-[0.8rem] w-[90%]">
                      <p>{item?.ans}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqProducts;
