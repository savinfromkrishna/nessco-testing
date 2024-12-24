import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NavbarData } from "../types/constant";
import dynamic from 'next/dynamic'
import { countryCODE, languageCODE } from "../nav-menue";

const LottieAnimation = dynamic(
  () => import("@/components/ui/LottieAnimation")
);

import Server from "../../../../public/assets/NavbarLottie/Server.json";
import Blogs from "../../../../public/assets/ResourcesNavbar/Blog.json";
import Faq from "../../../../public/assets/ResourcesNavbar/faq.json";
import News from "../../../../public/assets/ResourcesNavbar/Newspaper.json";
import Staff from "../../../../public/assets/ResourcesNavbar/Staff.json";
import Lightbulb from "../../../../public/assets/ResourcesNavbar/lightbulb.json";

const image = [Faq, Lightbulb, News, Blogs, Staff];

interface ResourceGridProps {
  navData: NavbarData;
  setActive?: (item: string | null) => void;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({ navData, setActive }) => {
  const supportData = navData?.navbar[4]?.data;
  const DataBankItem = supportData?.DataBankItem || [];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScrollability();
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth,
        behavior: "smooth",
      });
      checkScrollability();
    }
  };

  const shouldShowArrows = DataBankItem.length > 5;

  return (
    <div className="relative flex flex-row items-center mx-auto max-w-screen-2xl justify-center lg:p-4 w-full">
      {/* desktop view */}
      {shouldShowArrows && (
        <button
          className="h-12 w-16 z-30 cursor-pointer rounded-full hidden lg:flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          ←
        </button>
      )}
      <div
        className={`hidden lg:flex overflow-x-auto ${
          shouldShowArrows ? "scroll-smooth" : ""
        } [scrollbar-width:none] gap-6`}
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        {DataBankItem?.map((item, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <Link
              onClick={() => setActive(null)}
              href={`/${countryCODE}/${languageCODE}/${item.link}`}
            >
              <div className="relative flex-shrink-0 w-56 h-32 rounded-3xl p-4 flex flex-col justify-center items-center">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundImage: `url(${item.bgPic})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2,
                  }}
                ></div>

                <div className="relative w-full h-full flex justify-center items-center">
                  <LottieAnimation
                    className="h-24 w-24"
                    animationData={image[index % image.length]}
                  />
                </div>
              </div>
              <p className="relative font-poppins text-center mt-4 invert-0 font-normal hover:text-[#483d78] hover:font-semibold text-base">
                {item?.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
      {shouldShowArrows && (
        <button
          className="h-12 w-16 z-30 cursor-pointer rounded-full hidden lg:flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          →
        </button>
      )}

      {/* mobile view */}
      <div className="w-full lg:hidden">
        <div className="flex flex-col space-y-0 ">
          <Link
            href={`/${countryCODE}/${languageCODE}/resources`}
            onClick={() => setActive(null)}
            className="flex items-center border-b space-x-2 cursor-pointer text-[#483d73] bg-[#483d732a] px-2 py-2"
          >
            <LottieAnimation className="h-12" animationData={Server} />

            <p className="text-xl font-poppins pl-2 font-medium">Resources</p>
          </Link>
          {DataBankItem?.map((item, index) => (
            <Link
              key={index}
              href={`/${countryCODE}/${languageCODE}/${item.link}`}
              onClick={() => setActive(null)}
              className="w-full space-x-4 py-1 px-2 border-b flex items-center  "
            >
              <div className="flex-shrink-0 h-12 w-12  flex justify-center items-center">
                <LottieAnimation
                  className="h-full w-full"
                  animationData={image[index % image.length]}
                />
              </div>
              <p className="font-poppins font-medium text-base flex-1 text-gray-800 hover:text-[#483d78]">
                {item?.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceGrid;
