"use client";
import React, { useEffect, useRef, useState } from "react";
import { ProductItem } from "./types/constant";
import gsap from "gsap";
import { Label } from "@radix-ui/react-label";
import dynamic from 'next/dynamic'
const EnquiryCart = dynamic(() => import("@/components/ui/EnquiryCart"));
import Link from "next/link";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import { usePathname } from "next/navigation";
import BlurImage from "../ui/BlurImage";

interface ProductProps {
  productData: ProductItem;
}

const Page2: React.FC<ProductProps> = ({ productData }) => {
  const ProductCatalouge = productData?.Product[0]?.ProductCatalouge;
  const Header = productData?.Product[0]?.Header;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const leftBorderRef = useRef<HTMLDivElement | null>(null);
  const bottomBorderRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop] = useState<boolean>(true);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set()); // Fixed this line
  const [enquiryItems, setEnquiryItems] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);
  const pathname = usePathname();
  // Extract the last parameter from the pathname
  const lastParameter = pathname?.split("/").pop();
  const toggleExpansion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  console.log(selectedItems);

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

  const toggleReadMore = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text?.split(" ");
    return words?.length > wordLimit
      ? words?.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const wordLimit = isDesktop ? 80 : 20;

  const displayedParagraph = isExpanded
    ? Header?.description
    : truncateText(Header?.description, wordLimit);

  const removeEnquiryItem = (itemId: string) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(itemId);
      return newSelected;
    });
    setEnquiryItems((prevItems) =>
      prevItems?.filter((item) => item?.id !== itemId)
    );
  };

  const handleToggleEnquiry = (containerItem: any, containerIdx: number) => {
    const itemId = `${containerItem.h2}-${containerIdx}`;
    setEnquiryItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === itemId);
      if (itemIndex > -1) {
        // Item exists, remove it
        const updatedItems = prevItems.filter((item) => item.id !== itemId);
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        // Item doesn't exist, add it if there's room
        if (prevItems.length < 10) {
          const newItem = {
            id: itemId,
            name: `${containerItem.h1} ${containerItem.h2}`,
            image: containerItem.img,
          };
          const updatedItems = [...prevItems, newItem];
          localStorage.setItem("cartItems", JSON.stringify(updatedItems));
          return updatedItems;
        }
        return prevItems;
      }
    });
  };

  useEffect(() => {
    if (expandedIndex !== null) {
      const tl = gsap.timeline();
      const mm = gsap.matchMedia();
      mm.add("(min-width: 992px)", () => {
        tl.to(leftBorderRef.current, {
          height: "21rem",
          duration: 0.4,
          ease: "power2.out",
        })
          .to(bottomBorderRef.current, {
            width: "5.5rem",
            duration: 0.2,
            ease: "power2.out",
          })
          .to(circleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.1,
            ease: "back.out(1.7)",
          })
          .to(
            itemsRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.1,
              stagger: 0.2,
              ease: "power2.out",
            },
            "-=0.1"
          );
      });
      mm.add("(min-width: 768px) and (max-width: 991px)", () => {
        tl.to(leftBorderRef.current, {
          height: "6rem",
          duration: 0.4,
          ease: "power2.out",
        })
          .to(circleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
          })
          .to(
            itemsRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.1,
              stagger: 0.2,
              ease: "power2.out",
            },
            "-=0.1"
          );
      });
      mm.add("(max-width: 767px)", () => {
        tl.to(leftBorderRef.current, {
          height: "8rem",
          duration: 0.4,
          ease: "power2.out",
        })
          .to(circleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: "back.out(1.7)",
          })
          .to(
            itemsRef.current,
            {
              opacity: 1,
              x: 0,
              duration: 0.1,
              stagger: 0.2,
              ease: "power2.out",
            },
            "-=0.1"
          );
      });
      return () => {
        mm.revert();
      };
    }
  }, [expandedIndex]);

  function formatString(input) {
    // Ensure input is a string (default to empty string if undefined or null)
    if (!input) return "";

    return input.toLowerCase().replace(/\s+/g, "-");
  }

  return (
    <>
      <div className="w-full bgLines font-poppins bg-grid-black/[0.2] lg:px-[2rem] px-[1rem] pt-[3.5rem] pb-[4rem] flex items-center justify-center relative font-regular">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-[#f2f2f2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="bg-white w-full rounded-[0.5rem] lg:px-[2.2rem] px-[1rem] pb-[1.8rem] z-20">
          {ProductCatalouge?.card?.map((item, idx) => (
            <div key={idx} className="w-full">
              <div
                className="flex items-center cursor-pointer py-[0.4rem] relative group"
                onClick={() => toggleExpansion(idx)}
              >
                <BlurImage
                  src={item?.img}
                  alt={item?.title?.replace(/machine/gi, "").trim()}
                  width={400}
                  height={400}
                  className={`${
                    expandedIndex === idx
                      ? "lg:h-[4rem] lg:w-[4rem] h-[2rem] w-[2rem]"
                      : "lg:h-[2.5rem] lg:w-[2.5rem] h-[1.5rem] w-[1.5rem]"
                  }`}
                />
                <div
                  className={`border-r-2 border-solid border-transparent lg:h-[3rem] h-[2rem] ${
                    expandedIndex === idx
                      ? "hidden"
                      : "group-hover:border-red-700 lg:ml-[1rem] ml-[0.5rem]"
                  }`}
                ></div>
                <div>
                  <h2
                    className={` ${
                      expandedIndex === idx
                        ? "lg:text-[1.8rem] text-[1.2rem] font-semibold lg:ml-[3rem] ml-[1rem]"
                        : "lg:text-[1.2rem] text-[0.9rem] lg:ml-[1rem] ml-[0.5rem]"
                    }`}
                  >
                    {item?.title}
                  </h2>
                </div>
                {expandedIndex === idx ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-up w-10 h-10 absolute right-0"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-down w-10 h-10 absolute right-0"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                )}
              </div>
              <div className="relative">
                <div
                  className={`bg-gradient-to-r from-white via-[#dddddd] to-white h-0.5 w-full absolute top-0 ${
                    expandedIndex === idx ? "hidden" : ""
                  }`}
                ></div>
              </div>
              {expandedIndex === idx && (
                <div className="w-full relative">
                  <div className="bg-gradient-to-r from-white via-[#dddddd] to-white h-[0.1rem] w-full absolute bottom-0"></div>
                  <div className="w-full lg:pl-[8rem] relative">
                    <div
                      ref={leftBorderRef}
                      className="border-l-2 border-solid border-red-700 h-[0rem] lg:-top-[4rem] -top-[2.2rem] left-[2.2rem] lg:left-[4.7rem]  absolute"
                    ></div>
                    <div
                      ref={bottomBorderRef}
                      className="border-b-2 border-solid border-red-700 w-0 absolute left-[4.7rem] top-[17rem] lg:block hidden"
                    ></div>
                    <div
                      ref={circleRef}
                      className="border-2 border-solid border-red-700 lg:w-[1rem] lg:h-[1rem] w-[0.5rem] h-[0.5rem] lg:left-[9.5rem] left-[2rem]  lg:top-[16.6rem] md:top-[3.5rem] top-[5.5rem] absolute rounded-full bg-red-700 opacity-0 scale-0"
                    ></div>
                    <div className="lg:pl-0 pl-[3.5rem] lg:-mt-2 lg:text-sm text-[0.7rem] font-light lg:w-[48rem]">
                      <p>{item.description}</p>
                    </div>
                    <div className="w-full">
                      <div
                        className="overflow-x-scroll lg:ml-[3rem] mb-[1rem] flex items-center lg:px-10 px-2 scrollbar-hide lg:pt-[1.5rem] pt-[2rem]"
                        ref={carouselRef}
                      >
                        <div className="flex items-center justify-center lg:space-x-8 space-x-4">
                          {item?.container &&
                            item?.container?.map(
                              (containerItem, containerIdx) => (
                                <div
                                  key={containerIdx}
                                  ref={(el) => {
                                    itemsRef.current[containerIdx] = el;
                                  }}
                                  className="relative lg:mb-20 mb-16 lg:w-[18rem] w-[14rem] bg-gradient-to-b from-[#f5f5f5] to-[#f2f2f2] rounded-[0.5rem] shadow-lg lg:hover:shadow-2xl transition-all duration-300 opacity-0 -translate-x-20"
                                >
                                  <div className="absolute top-4 right-2 flex space-x-2">
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-medium cursor-pointer relative group hover:text-red-700 text-xl">
                                      {containerItem?.s}
                                      <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-[0.3rem] shadow-md px-2 py-1 h-max w-max z-20">
                                        <p className="lg:text-sm text-xs text-black font-normal">
                                          {containerItem?.sInformation}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="w-8 h-8 bg-white p-[0.2rem] border-solid border-[0.1rem] border-white hover:border-red-700 rounded-full flex items-center justify-center relative group">
                                      <BlurImage
                                        src={containerItem?.image}
                                        alt={containerItem?.imageInformation}
                                        width={400}
                                        height={400}
                                      />
                                      <div className="hidden group-hover:flex absolute bottom-7 right-0 bg-white border border-gray-300 rounded-[0.3rem] shadow-md px-2 py-1 h-max w-max z-20">
                                        <p className="lg:text-sm text-xs text-black font-normal">
                                          {containerItem?.imageInformation}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="pt-4 px-4">
                                    <Link
                                      href={`/${countryCODE}/${languageCODE}/${lastParameter}/${containerItem?.link}`}
                                    >
                                      <h3 className="lg:text-[1rem] text-[0.9rem] font-semibold lg:w-[10rem] w-[7rem]">
                                        {containerItem?.h1}
                                      </h3>
                                      <h3 className="lg:text-[0.9rem] text-[0.8rem] font-medium">
                                        {containerItem?.h2}
                                      </h3>
                                    </Link>
                                  </div>

                                  <Link
                                    href={`/${countryCODE}/${languageCODE}/${lastParameter}/${containerItem?.link}`}
                                  >
                                    <div className="flex justify-center items-center lg:h-[14rem] h-[10rem] overflow-hidden">
                                      <div className="p-2 flex justify-center items-center">
                                        <BlurImage
                                          src={containerItem?.img}
                                          alt={`${containerItem?.h2} ${containerItem?.h1}`}
                                          width={400}
                                          height={400}
                                        />
                                      </div>
                                    </div>
                                  </Link>

                                  <Link
                                    href={`/${countryCODE}/${languageCODE}/${lastParameter}/${containerItem?.link}`}
                                  >
                                    <div className="my-[0.5rem] flex lg:flex-rows flex-col items-center justify-center lg:h-[2.5rem]">
                                      <button className="lg:text-[0.9rem] text-[0.8rem] w-[65%] h-[2rem] border-[0.1rem] border-solid font-medium rounded-[0.5rem] transition-colors duration-300 border-[#9c9c9c] hover:border-black hover:bg-black hover:text-white">
                                        {ProductCatalouge?.viewMachine}
                                      </button>
                                    </div>
                                  </Link>

                                  <div className="w-full h-px bg-[#9c9c9c]"></div>

                                  <div className="py-2 flex items-center cursor-pointer justify-center">
                                    <div className="flex cursor-pointer items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`addToEnquiry-${containerItem.h2}-${containerIdx}`}
                                        className="h-4 w-4 cursor-pointer accent-red-700"
                                        checked={enquiryItems.some(
                                          (item) =>
                                            item.id ===
                                            `${containerItem.h2}-${containerIdx}`
                                        )}
                                        onChange={() =>
                                          handleToggleEnquiry(
                                            containerItem,
                                            containerIdx
                                          )
                                        }
                                      />
                                      <Label
                                        htmlFor={`addToEnquiry-${containerItem.h2}-${containerIdx}`}
                                        className="text-sm cursor-pointer whitespace-nowrap"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleToggleEnquiry(
                                            containerItem,
                                            containerIdx
                                          );
                                        }}
                                      >
                                        {enquiryItems.some(
                                          (item) =>
                                            item.id ===
                                            `${containerItem.h2}-${containerIdx}`
                                        )
                                          ? "Remove From Inquiry"
                                          : "Add To Inquiry"}
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      <div className="flex -mt-16 mb-[1rem] justify-end lg:text-3xl text-2xl z-20 space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="lg:w-7 w-6 lg:h-7 h-6"
                          onClick={scrollbarLeft}
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="32"
                            className="fill-black hover:fill-red-700"
                          />
                          <path
                            d="M39 20 L27 32 L39 44"
                            className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                          />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="lg:w-7 w-6 lg:h-7 h-6"
                          onClick={scrollbarRight}
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="32"
                            className="fill-black hover:fill-red-700 group"
                          />
                          <path
                            d="M25 20 L37 32 L25 44"
                            className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full">
                    <Link
                      href={`/${countryCODE}/${languageCODE}/products/${formatString(
                        item?.title
                      )}`}
                    >
                      <div className="group flex items-center justify-center w-max pl-3 pr-1 mb-4 bg-black rounded-full  text-white hover:text-black hover:bg-white border border-black space-x-2">
                        <button className="lg:text-[0.9rem] py-1 text-[0.8rem] font-medium ">
                          {ProductCatalouge?.viewAllMachines}
                        </button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                          className="lg:w-6 w-5 lg:h-6 h-5"
                        >
                          <circle
                            cx="32"
                            cy="32"
                            r="32"
                            className="fill-white group-hover:fill-black"
                          />
                          <path
                            d="M25 20 L37 32 L25 44"
                            className="stroke-black stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round group-hover:stroke-white"
                          />
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-black border-solid border-t-2 border-[#eeeded] bg-white px-[1rem] lg:px-[3rem] z-30">
        <p className="text-xs font-thin mt-2">{displayedParagraph}</p>
        <button
          onClick={toggleReadMore}
          aria-label="Read More"
          className="underline italic text-xs hover:text-red-700 hover:not-italic my-[1rem]"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
      <EnquiryCart
        items={enquiryItems}
        onRemoveItem={removeEnquiryItem}
        maxItems={10}
      />
    </>
  );
};

export default Page2;
