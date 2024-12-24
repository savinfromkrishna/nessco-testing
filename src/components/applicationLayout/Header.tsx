"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter, usePathname } from "next/navigation";
import { ApplicationLayoutItem } from "./types/constant";
import BlurImage from "../ui/BlurImage";

gsap.registerPlugin(ScrollTrigger);

interface ApplicationLayoutProps {
  applicationLayoutData: ApplicationLayoutItem;
}

type Product = {
  image: string;
  title: string;
  img: string;
};

type Page1Props = {
  page1product?: Product;
};

type CombinedProps = ApplicationLayoutProps & Page1Props;

const Page1: React.FC<CombinedProps> = ({
  applicationLayoutData,
  page1product,
}) => {
  const Header = applicationLayoutData?.ApplicationLayout[0]?.Header;
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    page1product
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Update selected product when the route changes
  useEffect(() => {
    if (pathname) {
      const matchedProduct = Header?.icons?.find(
        (item) =>
          encodeURIComponent(item?.title).toLowerCase() ===
          pathname.split("/").pop()?.toLowerCase()
      );
      if (matchedProduct) {
        setSelectedProduct(matchedProduct);
      } else {
        setSelectedProduct(page1product);
      }
    }
  }, [pathname, page1product]);

  // Scroll left and right in the carousel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  function convertToHyphenatedString(inputString) {
    // Convert the string to lowercase and trim any leading/trailing spaces
    const cleanedString = inputString.toLowerCase().trim();
    // Replace spaces with hyphens
    const hyphenatedString = cleanedString.replace(/ +/g, "-");
    return hyphenatedString;
  }
  // Handle product click: update state and change route
  const handleProductClick = (item: Product) => {
    setSelectedProduct(item);
    router.push(
      `${encodeURIComponent(convertToHyphenatedString(item?.title))}`
    );
  };

  // Title resize on scroll
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // Adjust the breakpoint as needed

    const animateTitleAndImage = () => {
      if (mediaQuery.matches && titleRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: titleRef.current,
            start: "40% 10%",
            end: "140% 20%",
            scrub: true,
          },
        });

        tl.fromTo(
          titleRef.current,
          {
            height: "5rem",
            fontSize: "2.8rem",
            paddingTop: "0.6rem",
            paddingLeft: "0",
            boxShadow: "xl #f2f2f2",
            background: "white",
          },
          {
            height: "2.8rem",
            fontSize: "1.6rem",
            paddingTop: "0.2rem",
            paddingLeft: "1.5rem",
            background: "transparent",
            backdropFilter: "blur(30px)",
          }
        )
          .to(
            titleRef.current.querySelectorAll("span"),
            { color: "#424242", fontWeight: "500" },
            "<"
          )
          .to(titleRef.current, { boxShadow: "none" }, "<");

        // Decrease image width on scroll
        if (selectedProduct?.image) {
          tl.fromTo(
            titleRef.current.querySelector("img"),
            { width: "4rem", top: "2" },
            { width: "2.5rem", top: "0" },
            "<"
          );
        }
      }
    };

    // Initial check when the component mounts
    animateTitleAndImage();

    // Listen for viewport changes and reapply the animation if necessary
    mediaQuery.addEventListener("change", animateTitleAndImage);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", animateTitleAndImage);
    };
  }, [selectedProduct]);

  return (
    <>
      <div className="w-full">
        <div className="w-full bg-white relative top-[3.5rem] flex flex-col items-center">
          <div
            className="lg:h-[5rem] h-[3rem] w-full bg-white lg:fixed lg:text-[3rem] text-[1.8rem] z-20 shadow-xl shadow-[#f2f2f2] relative flex"
            ref={titleRef}
          >
            <h1 className="lg:ml-[0.8rem] ml-[0.8rem] font-bold whitespace-nowrap bg-gradient-to-r from-[#483d73] to-red-700  bg-clip-text text-transparent">
              <span>
                {selectedProduct?.title.trim().replace(/\s+\S+$/, "")}
              </span>{" "}
              <span>{selectedProduct?.title.trim().match(/\S+$/)}</span>
            </h1>

            {selectedProduct?.image && (
              <BlurImage
                className="h-auto lg:w-[4rem] w-[2.5rem] absolute right-2 lg:top-2"
                width={100}
                height={100}
                src={selectedProduct?.img}
                alt={selectedProduct?.title || "No title available"}
              />
            )}
          </div>

          <div className="lg:w-[82vw] w-[95vw] lg:mt-[4rem] overflow-hidden">
            <button
              className="absolute lg:bottom-[4rem] -bottom-[3rem] lg:left-4 right-16"
              aria-label="Left"
              onClick={scrollLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 68 64"
                className="w-10 lg:w-8 h-10 lg:h-8"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-[#cccaca] hover:fill-[#483d73] cursor-pointer"
                />
                <path
                  d="M39 20 L27 32 L39 44"
                  className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                />
              </svg>
            </button>
            <button
              className="absolute lg:bottom-[4rem] -bottom-[3rem] right-4"
              aria-label="Right"
              onClick={scrollRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 68 64"
                className="w-10 lg:w-8 h-10 lg:h-8"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-[#cccaca] hover:fill-[#483d73] cursor-pointer"
                />
                <path
                  d="M25 20 L37 32 L25 44"
                  className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
                />
              </svg>
            </button>
            <div
              className="flex items-center overflow-auto w-full scrollbar-hide"
              ref={carouselRef}
            >
              <div className="w-max lg:mt-[2rem] mt-[0.5rem] flex">
                {Header?.icons?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col mx-[2vw] lg:w-[6.8rem] w-[4.8rem] items-center group"
                    aria-label={item.title}
                    onClick={() => handleProductClick(item)}
                  >
                    <BlurImage
                      className={`lg:h-[5rem] w-auto h-[4rem] p-1 z-10  border-2 group-hover:border-[#483d73] group-hover:rounded-xl ${
                        selectedProduct?.title === item.title
                          ? "bg-[#f5f5f5] border-[0.2rem] border-[#483d73] rounded-xl"
                          : "border-white"
                      }`}
                      width={100}
                      height={100}
                      src={item?.image}
                      alt={item?.title}
                    />

                    <p
                      className={`text-center group-hover:text-[#483d73] group-hover:font-semibold font-poppins lg:text-[1rem] text-[0.7rem] cursor-pointer ${
                        selectedProduct?.title === item.title
                          ? "bg-gradient-to-r from-[#483d73] to-red-700  bg-clip-text text-transparent font-semibold"
                          : "text-black"
                      }`}
                    >
                      {item?.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page1;
