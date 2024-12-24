"use client";
import React, { useEffect, useRef, useState } from "react";
import BlurImage from "../ui/BlurImage";
import { motion } from "framer-motion";
import { BlogsLayoutItem } from "../types/generic";

interface BlogsLayoutProps {
  blogsLayoutData: BlogsLayoutItem;
}

const Page1: React.FC<BlogsLayoutProps> = ({ blogsLayoutData }) => {
  const Header = blogsLayoutData?.blogsLayout[0]?.Header;
  const [activeIndex, setActiveIndex] = useState(0);
  const answerRefs = useRef<(HTMLElement | null)[]>([]); // Ref for the answers
  const rightContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the right container
  useEffect(() => {}, []);
  const handleScroll = () => {
    // Ensure rightContainerRef.current is not null before using it
    if (rightContainerRef.current) {
      answerRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerRect =
            rightContainerRef.current!.getBoundingClientRect(); // Use non-null assertion

          // Check if the top of the answer element touches or goes below the top of the container
          if (
            rect.top <= containerRect.top &&
            rect.bottom >= containerRect.top
          ) {
            setActiveIndex(idx);
          }
        }
      });
    }
  };

  useEffect(() => {
    const container = rightContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container?.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Function to handle clicking on the left side question
  const handleQuestionClick = (index: number) => {
    setActiveIndex(index);

    if (answerRefs.current[index] && rightContainerRef.current) {
      const selectedElement = answerRefs.current[index]!;
      const rightContainerTop =
        rightContainerRef?.current?.getBoundingClientRect().top;
      const selectedElementTop = selectedElement?.getBoundingClientRect().top;

      // Calculate the offset to scroll the right container content so that the selected question aligns with the top
      const offset = selectedElementTop - rightContainerTop;

      rightContainerRef.current.scrollBy({
        top: offset, // Scroll by the calculated offset
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-black rounded-t-2xl w-full mt-14 font-poppins font-regular pt-6 lg:pb-6 pb-4 ">
        <h2 className="text-white lg:text-xl text-sm lg:px-8 px-6">
          {Header?.blogs}
        </h2>
        <div className="w-full mt-4 lg:px-[14%] px-[4%]">
          <h2 className="text-white lg:text-3xl text-xl font-medium lg:text-left text-center">
            {Header?.title}
          </h2>
        </div>
      </div>
      <div className="bg-black lg:h-[7rem] h-[3rem] rounded-b-2xl lg:mb-4 mb-2 relative w-full">
        <div className="lg:px-[14%] px-[4%] absolute top-0">
          <BlurImage
            className="object-cover lg:h-[18rem] h-[8rem] rounded-3xl lg:mt-4 mt-2"
            width={1000}
            height={1000}
            priority
            src={Header?.img}
            alt={Header?.title}
          />
        </div>
      </div>
      <div className="bg-white rounded-t-2xl lg:h-[11rem] h-[5rem] w-full"></div>

      <div className="bg-white rounded-b-2xl h-full w-full lg:px-[14%] px-[5%] lg:py-12 py-8 font-regular font-poppins">
        <div className="w-full lg:h-[45rem] flex space-x-6">
          <div className="w-[25%] -ml-4 border-r-2 border-[#bcbcbc] space-y-3 lg:block hidden">
            {Header?.question?.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleQuestionClick(idx)} // Add click handler here
                className="flex items-center cursor-pointer  transition-transform duration-300 ease-in-out"
              >
                <motion.h3
                  className={`text-sm  text-right pr-6 w-full transition-all duration-300 ${
                    activeIndex === idx ? "text-black" : "text-[#7f7d7d]"
                  }`}
                  style={{ fontWeight: activeIndex === idx ? "600" : "400" }} // Scale up the font size
                >
                  {item?.que}
                </motion.h3>
                <motion.div
                  className={`h-[0.6rem] w-[0.6rem] rounded-full -mr-[0.34rem] transition-all duration-300 ${
                    activeIndex === idx ? "bg-black scale-125" : "bg-[#7f7d7d]"
                  }`}
                />
              </div>
            ))}
          </div>
          <div
            ref={rightContainerRef} // Attach ref to the right container
            className="lg:w-[75%] space-y-6 lg:overflow-y-scroll scrollbar-hide lg:pb-[35rem]"
          >
            {Header?.question?.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  answerRefs.current[idx] = el;
                }}
                className="space-y-4 "
              >
                <h3 className="text-xl normal font-semibold lg:pt-4 cursor-text">
                  {item?.que}
                </h3>
                <p className="lg:text-sm text-sm font-normal text-justify cursor-text">
                  {item?.ans}
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
