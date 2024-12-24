"use client";
import React, { useState, useEffect, useRef } from "react";
import { ProductItem } from "./types/constant";
import Carousal from "@/components/product/Carousal";
import dynamic from 'next/dynamic'
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
ssr: false,});

// Debounce function to limit the rate of invoking a function
const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

interface ProductProps {
  productData: ProductItem;
}

const Page1: React.FC<ProductProps> = ({ productData }) => {
  const Header = productData?.Product[0]?.Header;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const totalSlides = Header?.products?.length;

  // Function to scroll to a specific slide
  const scrollToSlide = (index: number) => {
    if (slideRef.current) {
      const slideWidth = slideRef.current.clientWidth;
      slideRef.current.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    }
  };

  // Debounced scroll handler to update the current slide index
  const handleScroll = debounce(() => {
    if (slideRef.current) {
      const scrollPosition = slideRef.current.scrollLeft;
      const slideWidth = slideRef.current.clientWidth;
      const newSlide = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(newSlide);
    }
  }, 100); // Adjust debounce delay as needed

  // Use effect to add scroll event listener
  useEffect(() => {
    const currentRef = slideRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Use effect to automatically change slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Use effect to scroll to the current slide with a slight delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToSlide(currentSlide);
    }, 300);
    return () => clearTimeout(timeout);
  }, [currentSlide]);

  return (
    <div className="bg-white w-full mt-14 flex lg:flex-row flex-col font-poppins border-b-2 border-solid border-[#cacaca] overflow-hidden">
      {/* Product Information Section */}
      <div className="lg:w-[40%] lg:px-8 px-[1.5rem]">
        <h1 className="lg:text-5xl text-[1.8rem] lg:leading-[3rem] lg:my-[0.8rem] my-[0.5rem] bg-gradient-to-r from-[#483d73] from-5% via-red-700 via-20% to-red-700  bg-clip-text text-transparent">
          <span className="font-medium block">
            {Header?.ourProduct?.trim().replace(/\s+\S+$/, "")}
          </span>{" "}
          <span className=" font-semibold">
            {Header?.ourProduct?.trim().match(/\S+$/)}
          </span>
        </h1>
        {/* <p className="lg:w-[23rem] text-sm text-black line-clamp-3">
          {Header?.description}
        </p> */}
        {/* Learn More Button */}
        <ReusableForm
          formId="product page"
          buttonText="Learn More"
          dialogTitle="Get in Touch"
          dialogSubtitle="We'd love to hear from you!"
          imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
          showButton={true}
          secodaryButton={false}
          normalButton={false}
          learnMore={true}
        />
      </div>
      {/* Decorative Elements */}
      <div>
        <div className="lg:bg-gradient-to-t lg:from-white lg:to-[#e7e7e7] bg-gradient-to-r from-white via-[#e7e7e7] to-white lg:w-[0.12rem] mt-[1.3rem] lg:h-[10rem] h-[0.12rem] w-full"></div>
      </div>
      {/* Slides Container */}
      <div className="lg:w-[60%] lg:my-0 my-[1rem] lg:px-0 px-[1.5rem] lg:block hidden">
        <h2 className="lg:text-2xl text-[1.2rem] font-medium text-red-700 my-[0.4rem] lg:pl-[1rem]">
          {Header?.Featured}
        </h2>
        <Carousal productData={productData} />
      </div>
    </div>
  );
};

export default Page1;
