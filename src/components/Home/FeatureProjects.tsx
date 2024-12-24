"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { HomeData } from "./types/constant";
import Link from "next/link";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import BlurImage from "../ui/BlurImage";

interface FeatureProjectLayoutProps {
  heroData: HomeData;
}

const AUTO_SCROLL_SPEED = 1;
const RESUME_DELAY = 2000;

const FeatureProjects: React.FC<FeatureProjectLayoutProps> = ({ heroData }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isManualScrolling, setIsManualScrolling] = useState<boolean>(false);
  const [resumeTimeoutId, setResumeTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  function transformString(input) {
    // Check if input is a string and not null or undefined
    if (typeof input !== "string" || input === null) {
      return ""; // Return an empty string if input is not a valid string
    }

    // Convert the entire string to lowercase, replace hyphens with spaces,
    // and replace the word 'machine' with 'icon'.
    return input
      .toLowerCase() // Convert to lowercase
      .replace(/-/g, " ") // Replace hyphens with spaces
      .replace(/\bmachine\b/, "icon"); // Replace 'machine' with 'icon'
  }

  const scrollLeft = useCallback(() => {
    if (carouselRef.current) {
      setIsManualScrolling(true);
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => setIsManualScrolling(false), 1000); // Reset after animation
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      setIsManualScrolling(true);
      const scrollAmount = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
      setTimeout(() => setIsManualScrolling(false), 1000); // Reset after animation
    }
  }, []);

  const relatedProduct = heroData?.home[4]?.data;

  useEffect(() => {
    let animationFrameId: number;

    const continuousScroll = () => {
      if (carouselRef.current && !isHovered && !isManualScrolling) {
        carouselRef.current.scrollLeft += AUTO_SCROLL_SPEED;
        if (
          carouselRef.current.scrollLeft >=
          carouselRef.current.scrollWidth / 2
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(continuousScroll);
    };

    continuousScroll();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isManualScrolling]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (resumeTimeoutId) {
      clearTimeout(resumeTimeoutId);
      setResumeTimeoutId(null);
    }
  };

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setIsHovered(false);
    }, RESUME_DELAY);
    setResumeTimeoutId(timeoutId);
  };

  return (
    <div className="w-full h-full px-4 md:px-14 font-poppins max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row rounded-3xl mt-2 md:my-4 bg-white p-2">
        {/* Text Section */}
        <div className="w-full md:w-[20%] flex flex-col justify-center items-center lg:mb-2 md:mb-0">
          <div className="text-center flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-0">
            <h2 className="text-lg sm:text-xl md:text-3xl bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold">
              {relatedProduct?.title?.trim().replace(/\s+\S+$/, "") ||
                "Default Title"}
            </h2>
            <h2 className="text-lg sm:text-xl md:text-3xl bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent font-semibold">
              {relatedProduct?.title?.trim().match(/\S+$/) ||
                "Default Subtitle"}
            </h2>
          </div>
          <p className="text-center text-xs lg:block hidden md:text-md font-medium pt-1 w-full md:w-[60%]">
            {relatedProduct?.description || "No description available."}
          </p>
          <div className="lg:flex justify-center space-x-4 sm:space-x-8 lg:mt-2 hidden">
            <button
              className="h-6 w-6 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center"
              onClick={scrollLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="h-6 w-6 bg-[#9e9c9c] hidden md:flex hover:bg-black rounded-full items-center justify-center"
              onClick={scrollRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-4 h-4 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div
          className="w-full h-[11rem] md:h-[13.2rem] flex items-center overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="overflow-auto scrollbar-hide h-full px-1 flex"
            ref={carouselRef}
          >
            <div className="w-max flex items-center justify-center space-x-2">
              {[
                ...relatedProduct?.imageWithDescription,
                ...relatedProduct?.imageWithDescription,
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`carousel-item relative h-full w-[150px] sm:w-[180px] md:w-[11.5rem] bg-gradient-to-b from-[#f5f5f5] to-[#f2f2f2] rounded-2xl transition-all duration-300 ${
                    hoveredCardIndex === idx ? "bg-[#f0f0f0]" : ""
                  }`}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <div className="absolute top-1 right-1 sm:right-2 flex space-x-1 sm:space-x-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center relative group">
                      <BlurImage
                        src={item?.image}
                        alt={`${transformString(item?.h1)}`}
                      
                        width={400}
                        height={400}
                        className="hover:scale-90 transition-all duration-300"
                      />
                      <div className="hidden group-hover:flex absolute top-8 left-4  bg-white border border-gray-300 shadow-md px-2 py-1 z-20 w-max">
                        <p className="text-[0.6rem] sm:text-[0.7rem] text-black">
                          {item?.information}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 h-14 font-poppins">
                    <h3 className="text-[0.6rem] sm:text-xs font-semibold w-[65%]">
                      {item?.h1}
                    </h3>
                  </div>

                  <Link
                    href={`/${countryCODE}/${languageCODE}/products/${item.link}`}
                    className="flex justify-center items-center"
                  >
                    <div className="w-full px-1 sm:px-2 hover:px-0 transition-all duration-300 h-[6rem] sm:h-[7rem] md:h-[8rem] flex justify-center items-center">
                      <BlurImage
                        className="object-cover"
                        src={item?.img}
                        alt={item?.h1}
                        width={400}
                        height={400}
                      />
                    </div>
                  </Link>

                  {hoveredCardIndex === idx && (
                    <Link
                      className="flex bg-black rounded-b-full w-full items-center justify-center absolute bottom-0"
                      href={`/${countryCODE}/${languageCODE}/products/${item.link}`}
                    >
                      <button className="text-[0.6rem] sm:text-xs text-white font-medium mr-1">
                        View Machine
                      </button>
                    </Link>
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

export default React.memo(FeatureProjects);
