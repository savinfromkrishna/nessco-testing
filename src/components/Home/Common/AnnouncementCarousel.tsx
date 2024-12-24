"use client";
import BlurImage from "@/components/ui/BlurImage";
import React, { useEffect, useRef, useState } from "react";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef?.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef?.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef?.current) {
      carouselRef?.current?.scrollBy({ left: -300, behavior: "smooth" });
      checkScrollability();
    }
  };

  const scrollRight = () => {
    if (carouselRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef?.current;
      if (scrollLeft + clientWidth >= scrollWidth) {
        // If we reach the end, reset to the beginning for infinite scrolling
        carouselRef?.current?.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef?.current?.scrollBy({ left: 300, behavior: "smooth" });
      }
      checkScrollability();
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row w-full items-center">
      <div className="flex flex-col  h-[6rem] lg:h-[5rem] w-full lg:w-[20%] gap-1 px-2 lg:px-0">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-[#483d73] to-red-700  bg-clip-text text-transparent text-center">
            Announcements
          </h2>
          <p className="text-md lg:text-lg text-center text-black font-poppins font-medium">
            Our Latest Events
          </p>
        </div>
        <div className="flex justify-around w-full lg:w-auto">
          <button
            className="bg-[#9e9c9c] hover:bg-black relative z-20 h-6 w-6 rounded-full flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            aria-label="scrollLeft"
            disabled={!canScrollLeft}
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
            className="relative z-20 h-6 w-6 bg-[#9e9c9c] hover:bg-black rounded-full flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="scrollRight"
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
      <div
        className="flex w-full lg:w-[80%] overflow-x-scroll py-6 lg:py-10 scroll-smooth [scrollbar-width:none] -mx-4 lg:mx-0 px-4 lg:px-0"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-4 lg:pl-4 max-w-7xl mx-auto">
          {items?.map((item, index) => (
            <div
              key={"card" + index}
              className="last:pr-[5%] md:last:pr-[2%] rounded-3xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CardProps {
  src: string;
  title: string;
  description: string;
  date?: string;
}

export const Card = ({ src, title, description, date }: CardProps) => {

  return (
    <div className="rounded-2xl bg-white shadow-lg  dark:bg-neutral-900 h-28 w-[18rem] md:h-[5rem] md:w-80 overflow-hidden flex items-center space-x-4 p-2">
      <div className="relative flex-shrink-0 h-12 w-12 md:h-16 md:w-16 rounded-2xl overflow-hidden">
        <BlurImage
          src={src}
          alt={title}
          height={400}
          width={400}
          className="object-fill"
        />
      </div>
      <div className="flex flex-col font-poppins h-16 md:h-16">
        <h3 className="text-black text-base  font-medium">{title}</h3>
        <p className="text-gray-600 font-light line-clamp-2 text-sm  ">
          {description}
        </p>
        <p className="text-gray-500 font-light text-sm ">{date}</p>
      </div>
    </div>
  );
};
