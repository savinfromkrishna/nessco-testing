"use client";
import React, { useEffect, useRef, useState } from "react";
import { ApplicationItem } from "./types/constant";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from 'next/dynamic'
const Modal = dynamic(() => import("./Modal"));
import { Product } from "./Pages";
import BlurImage from "../ui/BlurImage";
import Link from 'next/link'
gsap.registerPlugin(ScrollTrigger);
const Page2 = ({
  applicationData,
  selectedProduct,
  updateData,
}: {
  applicationData: ApplicationItem;
  selectedProduct: Product;
  updateData: (newData: Product) => void;
}) => {
  const SelectProduct = applicationData?.Application[0]?.SelectProduct;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSwipe = (direction: "left" | "right") => {
    const currentIndex = SelectProduct.products.indexOf(selectedProduct);
    if (direction === "left" && currentIndex > 0) {
      updateData(SelectProduct.products[currentIndex - 1]);
    } else if (
      direction === "right" &&
      currentIndex < SelectProduct.products.length - 1
    ) {
      updateData(SelectProduct.products[currentIndex + 1]);
    }
  };

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].screenX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
      if (touchStartX - touchEndX > 50) {
        handleSwipe("right");
      } else if (touchEndX - touchStartX > 50) {
        handleSwipe("left");
      }
    };

    const container = rightContainerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [selectedProduct]);

  useEffect(() => {
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { width: "2%" },
        {
          width: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "10% 70%",
            end: "15% 80%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (rightContainerRef.current) {
      gsap.fromTo(
        rightContainerRef.current,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [selectedProduct]);

  const handleProductClick = (product: (typeof SelectProduct.products)[0]) => {
    updateData(product);
  };

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = SelectProduct.products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.title === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="w-full lg:mt-[11rem] mt-4 px-[1rem] font-poppins flex lg:flex-row flex-col items-center justify-center overflow-hidden">
        {/* Left-side product grid */}
        <div className="lg:w-[40%] lg:mx-[1rem] lg:pl-[4rem]">
          {/* Product Grid */}
          <div
            className={`lg:w-[24.5rem] ${
              filteredProducts.length > 15 ? "lg:h-[35.5rem]" : "lg:h-auto"
            } bg-white rounded-[0.8rem] lg:px-[1rem] px-[0.5rem] py-[1rem] flex flex-col items-center justify-center`}
          >
            <div className="flex w-full">
              <div className="flex w-[60%] lg:h-[2.2rem] h-[1.8rem] rounded-[2rem] bg-[#f2f2f2] border-2 border-solid border-[#f2f2f2] overflow-hidden hover:border-[#d9d9d8] lg:mr-[1rem] mr-[0.4rem] text-[#6f6f6f] items-center">
                <button
                  aria-label="Search"
                  className="ml-[0.5rem] text-black lg:text-[1.2rem]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="feather feather-search"
                  >
                    <circle cx="10" cy="10" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <input
                  type="search"
                  placeholder={SelectProduct.placeholder}
                  className="w-full px-[0.5rem] outline-none bg-transparent lg:text-[0.9rem] text-sm text-[#5e5d5d]"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="w-[40%] lg:h-[2.2rem] h-[1.8rem] rounded-[2rem] bg-[#f2f2f2] border-2 border-solid border-[#f2f2f2] overflow-hidden hover:border-[#d9d9d8] px-[0.5rem] flex items-center">
                <select
                  id="Category"
                  name="Category"
                  className="w-full outline-none font-normal bg-transparent text-[#5e5d5d] lg:text-[0.9rem] text-sm"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">{SelectProduct.category}</option>
                  {SelectProduct.products.map((item, index) => (
                    <option key={index} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:w-full w-[86vw] mt-[1rem] overflow-hidden">
              <div className="h-full overflow-auto pt-1 lg:px-3 scrollbar-custom scrollbar">
                <div className="lg:grid lg:grid-cols-3 lg:gap-x-5 gap-x-2 flex">
                  {filteredProducts?.map((item, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer group"
                      onClick={() => handleProductClick(item)}
                    >
                      <div
                        className={`bg-[#f2f2f2] border-2 border-solid lg:group-hover:border-[#483d73] ${
                          selectedProduct === item
                            ? " border-[0.2rem] border-[#483d73] bg-white"
                            : "border-[#f2f2f2]"
                        } lg:h-[6.5rem] h-[3.7rem] lg:w-full w-[3.7rem] rounded-[0.8rem] flex items-center justify-center`}
                      >
                        <BlurImage
                          className="lg:h-[4.5rem] w-auto h-[2rem]"
                          width={100}
                          height={100}
                          src={item?.img}
                          alt={item?.title}
                        />
                      </div>
                      <div className="lg:h-[3.2rem] lg:mt-[0.4rem]">
                        <p
                          className={`text-center lg:text-[1rem] text-sm lg:group-hover:text-[#483d73] lg:group-hover:font-semibold ${
                            selectedProduct === item
                              ? "bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent text-center font-semibold"
                              : "text-black"
                          } `}
                        >
                          {item?.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-[1rem] lg:hidden">
              <button
                aria-label="View All"
                onClick={handleViewAllClick}
                className="bg-[#f2f2f2] text-[#6f6f6f] py-1 px-2 rounded-[0.5rem] text-sm"
              >
                {SelectProduct?.viewAll}
              </button>
            </div>
          </div>
        </div>

        {/* Right side container with swipe animation */}
        <div
          className="lg:w-[60%] w-full lg:mx-[1rem] lg:h-[35.5rem] lg:px-[2rem] lg:mt-0 mt-[2rem]"
          ref={rightContainerRef}
        >
          <div className="lg:h-[6rem]">
            <div>
              <h2 className="lg:text-[2.2rem] text-[1.5rem] font-semibold">
                <span className="text-[#483d73]">
                  {selectedProduct?.title?.trim().replace(/\s+\S+$/, "")}
                </span>{" "}
                <span className="text-red-700">
                  {selectedProduct?.title?.trim().match(/\S+$/)}
                </span>
              </h2>
            </div>
            <div
              className="border-t-[0.2rem] border-solid border-red-700 w-[5rem] lg:mt-[1rem] mt-[0.5rem]"
              ref={borderRef}
            ></div>
          </div>
          <div className="lg:h-[17rem] h-[12rem] flex items-center justify-start py-4">
            <BlurImage
              className="lg:h-[20rem] w-auto h-[10rem]"
              width={400}
              height={400}
              priority
              src={selectedProduct?.image}
              alt={selectedProduct?.title}
            />
          </div>
          <div className="lg:h-[8rem] flex items-center">
            <p className="lg:text-[1rem] text-sm w-[33rem]">
              {selectedProduct?.description}
            </p>
          </div>

          <div className="bg-[#483d73] border-2 border-[#483d73] lg:w-[10rem] lg:mt-0 mt-[1.5rem] w-[9rem] relative lg:h-[2.3rem] h-[2rem] rounded-[2rem] flex items-center hover:bg-white group">
            <Link
              href={`application/${selectedProduct?.link}`}
              aria-label="View More"
              className="text-white lg:text-[1.2rem] absolute left-5 whitespace-nowrap group-hover:text-[#483d73]"
            >
              {SelectProduct?.viewMore}
            </Link>
            <button aria-label="Right" className="absolute right-0 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="lg:w-6 w-5 lg:h-6 h-5 mr-1"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-[#ffffff] group-hover:fill-[#483d73] cursor-pointer"
                />
                <path
                  d="M25 20 L37 32 L25 44"
                  className="stroke-[#483d73] group-hover:stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal for view all */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setSelectedProduct={updateData}
          selectedProduct={selectedProduct}
          applicationData={applicationData}
        />
      )}
    </>
  );
};

export default Page2;
