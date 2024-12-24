"use client";

import React, { useState } from "react";
import { Category } from "./types/constant";

interface ContentCardProps {
  categories: Category[];
}

const ContentCard: React.FC<ContentCardProps> = ({ categories }) => {
  const [expandedIndices, setExpandedIndices] = useState<Set<string>>(
    new Set()
  );

  const toggleExpansion = (categoryIndex: number, faqIndex: number) => {
    const index = `${categoryIndex}-${faqIndex}`;
    setExpandedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col gap-4 px-[1vw] overflow-visible">
      {categories?.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="bg-white rounded-lg shadow-lg p-10 lg:min-h-[30.5rem] md:min-h-[20rem]"
        >
          <h1 className="text-2xl text-gray-600">
            Questions Related to{" "}
            <span className="text-red-700 font-bold">{category?.name}</span>
          </h1>
          <div className="lg:border-t-[0.2rem] border-t-2 border-solid border-red-700 lg:w-[8vw] w-[18vw] mt-[0.6rem]"></div>
          <div className="mt-[2vh]">
            {category?.faqs?.map((faq, faqIndex) => {
              const index = `${categoryIndex}-${faqIndex}`;
              const isExpanded = expandedIndices.has(index);
              return (
                <div key={`${categoryIndex}-${faqIndex}`} className="mb-[1rem]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpansion(categoryIndex, faqIndex)}
                  >
                    <h2 className="lg:text-[1.1rem] text-[0.9rem] font-medium font-poppins w-[70%]">
                      {faq?.que}
                    </h2>
                    {isExpanded ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black font-bold"
                      >
                        <rect x="3" y="11" width="18" height="2" fill="black" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-black"
                      >
                        <line
                          x1="12"
                          y1="5"
                          x2="12"
                          y2="19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="5"
                          y1="12"
                          x2="19"
                          y2="12"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="lg:border-t-[0.2rem] border-[#d3d2d2] border-t-2 border-solid mt-[0.5vh] lg:w-[70%] w-[80%]"></div>

                  <div
                    className={`overflow-hidden transition-all ease-in-out duration-500 transform origin-top ${
                      isExpanded
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 scale-y-0 opacity-0"
                    }`}
                  >
                    <div
                      className="no-scrollbar ml-[2vw] text-gray-600 py-[1vh] lg:text-sm text-[0.8rem] w-[90%]"
                      style={{ height: "10-rem" }}
                    >
                      <p>{faq?.ans}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentCard;
