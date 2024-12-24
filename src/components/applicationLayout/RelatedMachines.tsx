"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Label } from "@radix-ui/react-label";
import { ApplicationLayoutItem } from "./types/constant";
import Link from "next/link";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import dynamic from 'next/dynamic'
const EnquiryCart = dynamic(() => import("@/components/ui/EnquiryCart"));
import BlurImage from "../ui/BlurImage";

gsap.registerPlugin(ScrollTrigger);

interface ApplicationLayoutProps {
  applicationLayoutData: ApplicationLayoutItem;
}

interface Page4Props {
  id: string;
  page4product: {
    imageWithDescription: {
      img: string;
      h1: string;
      h2: string;
      h3: string;
      image: string;
      information: string;
      sInformation: string;
      imageInformation: string;
      s: string;
    }[];
  };
}

type CombinedProps = ApplicationLayoutProps & Page4Props;

const Page4: React.FC<CombinedProps> = ({
  applicationLayoutData,
  page4product,
  id,
}) => {
  const RelatedMachines =
    applicationLayoutData?.ApplicationLayout[0]?.RelatedMachines;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const [enquiryItems, setEnquiryItems] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("cartItems");
    if (savedItems) {
      setEnquiryItems(JSON.parse(savedItems));
    }
  }, []);

  const scrollbarLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollbarRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  function formatString(input) {
    return input
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatStringForLink(input) {
    return input.toLowerCase().replace(/\s+/g, "-");
  }

  useEffect(() => {
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { width: "10%" },
        {
          width: "95%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "-80% 80%",
            end: "70% 85%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  const handleToggleEnquiry = (
    item: {
      h2: string;
      h1: string;
      img: string;
    },
    index: number
  ) => {
    setEnquiryItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === `${index}`
      );
      if (existingItemIndex > -1) {
        // Item exists, remove it
        const updatedItems = prevItems.filter(
          (prevItem) => prevItem.id !== `${index}`
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        const updatedItems = [
          ...prevItems,
          { id: `${index}`, name: item.h1 + " " + item.h2, image: item.img },
        ];
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  const removeEnquiryItem = (id: string) => {
    setEnquiryItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <>
      <div className="w-full lg:mt-[5rem] mt-[2rem] font-poppins">
        <div
          ref={borderRef}
          className="border-t-[0.1rem] border-solid border-[#6f6f6f] w-[10%] lg:mx-[2rem] mx-[1rem]"
        ></div>
        <div className="flex flex-col lg:my-[3rem] my-[2rem] bg-white lg:px-[2rem] px-[1rem] relative">
          <div className="pt-[1.5rem]">
            <h2 className="lg:text-[2.2rem] text-[1.5rem] font-semibold">
              <span className="text-[#483d73]">{formatString(id)}</span>{" "}
              <span className="text-red-700">
                {RelatedMachines?.title?.trim().match(/\S+$/)}
              </span>
            </h2>
            <button
              className="absolute lg:right-20 right-16 lg:bottom-4 bottom-3"
              aria-label="Left"
              onClick={scrollbarLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-10 lg:w-8 h-10 lg:h-8"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-[#cccaca] hover:fill-black cursor-pointer"
                />
                <path
                  d="M39 20 L27 32 L39 44"
                  className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                />
              </svg>
            </button>
            <button
              className="absolute lg:right-8 right-4 lg:bottom-4 bottom-3"
              aria-label="Right"
              onClick={scrollbarRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-10 lg:w-8 h-10 lg:h-8"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-[#cccaca] hover:fill-black cursor-pointer"
                />
                <path
                  d="M25 20 L37 32 L25 44"
                  className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                />
              </svg>
            </button>
          </div>

          {/* Main Carousel Container */}
          <div className="w-full h-full flex items-center overflow-hidden">
            <div
              className="overflow-auto h-full scrollbar-hide px-1 pt-[1.5rem]"
              ref={carouselRef}
            >
              <div className="w-max flex items-center justify-center space-x-8">
                {page4product?.imageWithDescription?.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative lg:mb-20 mb-16 lg:w-[20rem] w-[17rem] bg-gradient-to-b from-[#f5f5f5] to-[#f2f2f2] rounded-[0.5rem] shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <Link
                      href={`/${countryCODE}/${languageCODE}/products/${formatStringForLink(
                        item?.h1
                      )}/${item?.h2.toLocaleLowerCase()}`}
                    >
                      {/* Icons */}
                      <div className="absolute top-6 right-4 flex space-x-2">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-medium cursor-pointer relative group hover:text-red-700 text-xl">
                          {item?.s}
                          <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-md shadow-md px-2 py-1 h-max w-max z-20">
                            <p className="lg:text-[0.8rem] text-[0.7rem] text-black font-normal">
                              {item?.sInformation}
                            </p>
                          </div>
                        </div>
                        <div className="w-8 h-8 p-[0.2rem] bg-white border-solid border-[0.1rem] border-white hover:border-red-700 rounded-full flex items-center justify-center relative group">
                          <BlurImage
                            src={item?.image}
                            alt=""
                            width={400}
                            height={400}
                          />
                          <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-md shadow-md px-2 py-1 h-max w-max z-20">
                            <p className="lg:text-[0.8rem] text-[0.7rem] text-black">
                              {item?.imageInformation}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Title */}
                      <div className="pt-6 pl-6">
                        <h3 className="lg:text-[1.1rem] text-[1rem] font-semibold w-[65%]">
                          {item?.h1}
                        </h3>
                        <h3 className="lg:text-lg text-[0.9rem] font-medium">
                          {item?.h2}
                        </h3>
                        {/* <p className="lg:text-sm text-[0.8rem] text-gray-600">
                        {item?.h3}
                      </p> */}
                      </div>
                      {/* Image */}
                      <div className="flex justify-center items-center">
                        <div className="mt-[0.8rem] w-[70%] lg:h-[10rem] flex justify-center items-center">
                          <BlurImage
                            src={item?.img}
                            alt="Machine"
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      {/* Key Points or View Machine Button */}
                      <Link
                        href={`/${countryCODE}/${languageCODE}/products/${formatStringForLink(
                          item?.h1
                        )}/${item?.h2.toLocaleLowerCase()}`}
                      >
                        <div className="my-[1rem] flex lg:flex-rows flex-col items-center justify-center lg:h-[2rem]">
                          <button className="lg:text-[1rem] text-[0.9rem] w-[65%] lg:h-[2rem] h-[2rem] border-[0.1rem] border-solid font-medium rounded-[0.5rem] transition-colors duration-300 border-[#9c9c9c] hover:border-black hover:bg-black hover:text-white">
                            {RelatedMachines?.viewMachine}
                          </button>
                        </div>
                      </Link>
                      {/* Separator */}
                      <div className="w-full h-px bg-[#9c9c9c]"></div>
                      {/* Checkbox */}
                      <div className="my-4 flex items-center justify-center">
                        <div className="flex items-center cursor-pointer space-x-2">
                          <input
                            type="checkbox"
                            id={`addToEnquiry-${idx}`}
                            className="accent-red-700 cursor-pointer"
                            checked={enquiryItems.some(
                              (enquiryItem) => enquiryItem.id === `${idx}`
                            )}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleToggleEnquiry(item, idx);
                            }}
                            aria-label={`Add ${item.h1} to enquiry`}
                          />
                          <Label
                            htmlFor={`addToEnquiry-${idx}`}
                            className="text-sm cursor-pointer whitespace-nowrap"
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleEnquiry(item, idx);
                            }}
                          >
                            {enquiryItems.some(
                              (enquiryItem) => enquiryItem.id === `${idx}`
                            )
                              ? "Remove From Inquiry"
                              : "Add To Inquiry"}
                          </Label>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <EnquiryCart
        items={enquiryItems}
        onRemoveItem={removeEnquiryItem}
        maxItems={10}
      />
    </>
  );
};

export default Page4;
