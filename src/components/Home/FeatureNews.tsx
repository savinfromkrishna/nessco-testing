"use client";

import DecorativeImg1 from "../../../public/assets/FeaturedNews/DecorativeImg1.svg";
import DecorativeImg2 from "../../../public/assets/FeaturedNews/DecorativeImg2.svg";
import { HomeData, NewsFeatureItem } from "./types/constant";
import { Key, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { languageCODE } from "../Navbar/nav-menue";
import useEmblaCarousel from "embla-carousel-react";
import BlurImage from "../ui/BlurImage";

interface FeatureNewsLayoutProps {
  heroData: HomeData;
}

export default function FeatureNews({ heroData }: FeatureNewsLayoutProps) {
  const newsfData = heroData?.home[7]?.data?.newsData;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    img: "",
    title: "",
    description: "",
  });
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const openDialog = (content: {
    img: string;
    title: string;
    description: string;
  }) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  function formatString(input) {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  return (
    <div className="max-w-screen-2xl relative mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-14 mb-8 sm:mb-12 font-poppins">
      <BlurImage
        alt="Decorative Image"
        src={DecorativeImg1}
        className="w-48 sm:w-64 md:w-80 lg:w-[30rem] absolute top-8 sm:top-16 -left-3 opacity-50 sm:opacity-100"
      />
      <BlurImage
        alt="Decorative Image"
        src={DecorativeImg2}
        className="w-64 sm:w-80 md:w-96 lg:w-[40rem] absolute right-0 top-10 sm:top-20 opacity-50 sm:opacity-100"
      />
      <h2 className="text-3xl text-center text-[#483d73] mb-6 sm:mb-10 font-semibold relative z-10">
        {heroData?.home[7]?.category}
      </h2>
      <div className="grid grid-cols-1 lg:py-14 lg:grid-cols-2 gap-4 sm:gap-6 relative z-10">
        {/* Left side large article */}
        <div className="lg:col-span-1 bg-white shadow-lg rounded-3xl lg:h-[32rem] h-full p-3">
          <article className="relative h-full overflow-hidden flex flex-col">
            <div className="lg:h-48 relative">
              <h3 className="text-lg md:text-xl font-medium mb-2 pr-10">
                {newsfData[0]?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-0 line-clamp-3">
                {newsfData[0]?.description}
              </p>
              <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() =>
                      openDialog({
                        img: newsfData[0]?.image,
                        title: newsfData[0]?.title,
                        description: newsfData[0]?.description,
                      })
                    }
                    className="absolute top-0 right-0 bg-black text-white w-8 h-8 rounded-full text-center leading-8 text-sm flex items-center justify-center hover:bg-gray-800 transition-colors"
                    aria-label="Open article details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </DialogTrigger>
              </Dialog>
            </div>
            <div className="lg:w-[99%] lg:m-1 lg:mt-0 mt-2 lg:h-[55vh] relative rounded-2xl overflow-hidden">
              {newsfData[0]?.image &&
                (/\.(mp4|webm|ogg)$/i.test(newsfData[0]?.image) ? (
                  <video
                    className="object-contain rounded-xl"
                    autoPlay
                    loop
                    muted
                  >
                    <source
                      src={newsfData[0]?.image}
                      type={`video/${newsfData[0]?.image.split(".").pop()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <BlurImage
                    src={newsfData[0]?.image}
                    alt={newsfData[0]?.alt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl p-0"
                  />
                ))}
            </div>
          </article>
        </div>
        {/* Right side smaller articles in 2x2 grid for desktop, carousel for mobile */}
        <div className="lg:col-span-1 lg:grid lg:grid-cols-2 lg:gap-8 hidden">
          {newsfData?.slice(1)?.map((news: NewsFeatureItem, index: Key) => (
            <article
              key={index}
              className="bg-white h-full z-20 shadow-lg rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="px-4 py-2 relative">
                <h4 className="text-sm font-medium line-clamp-2 pr-8">
                  {news?.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {news?.description}
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <button
                      onClick={() =>
                        openDialog({
                          img: news?.image,
                          title: news?.title,
                          description: news?.description,
                        })
                      }
                      className="absolute top-3 right-3 bg-black text-white w-6 h-6 rounded-full text-center leading-6 text-xs flex items-center justify-center hover:bg-gray-800 transition-colors"
                      aria-label="Open article details"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </DialogTrigger>
                </Dialog>
              </div>
              <div className="px-3 pb-2">
                <div className="relative h-[8.8rem] rounded-xl overflow-hidden">
                  {news?.image &&
                    (/\.(mp4|webm|ogg)$/i.test(news?.image) ? (
                      <video
                        className="object-contain rounded-xl"
                        autoPlay
                        loop
                        muted
                      >
                        <source
                          src={news?.image}
                          type={`video/${news?.image.split(".").pop()}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <BlurImage
                        src={news?.image}
                        alt={news?.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-xl"
                      />
                    ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Embla Carousel for mobile */}
        <div className="lg:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {newsfData?.slice(1)?.map((news: NewsFeatureItem, index: Key) => (
              <article
                key={index}
                className="bg-white h-full z-20 shadow-lg rounded-2xl overflow-hidden flex flex-col flex-[0_0_80%] mr-4"
              >
                <div className="px-4 py-2 relative">
                  <h4 className="text-sm font-medium line-clamp-2 pr-8">
                    {news?.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {news?.description}
                  </p>
                  <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() =>
                          openDialog({
                            img: news?.image,
                            title: news?.title,
                            description: news?.description,
                          })
                        }
                        className="absolute top-3 right-3 bg-black text-white w-6 h-6 rounded-full text-center leading-6 text-xs flex items-center justify-center hover:bg-gray-800 transition-colors"
                        aria-label="Open article details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </button>
                    </DialogTrigger>
                  </Dialog>
                </div>
                <div className="px-3 pb-2">
                  <div className="relative h-[8.8rem] rounded-xl overflow-hidden">
                    {news?.image &&
                      (/\.(mp4|webm|ogg)$/i.test(news?.image) ? (
                        <video
                          className="object-contain rounded-xl"
                          autoPlay
                          loop
                          muted
                        >
                          <source
                            src={news?.image}
                            type={`video/${news?.image.split(".").pop()}`}
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <BlurImage
                          src={news?.image}
                          alt={news?.alt}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-xl"
                        />
                      ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[1000px] bg-white ">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="w-full h-full relative rounded-xl overflow-hidden">
              {dialogContent?.img &&
                (/\.(mp4|webm|ogg)$/i.test(dialogContent?.img) ? (
                  <video
                    className="object-contain rounded-xl"
                    autoPlay
                    loop
                    muted
                  >
                    <source
                      src={dialogContent?.img}
                      type={`video/${dialogContent?.img.split(".").pop()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <BlurImage
                    src={dialogContent?.img}
                    alt={dialogContent?.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                  />
                ))}
            </div>
            <div className="w-full lg:w-[70%] flex flex-col items-center">
              <h5 className="text-xl text-center lg:text-left mb-2 text-[#483d73] font-medium font-poppins pr-2">
                {dialogContent?.title}
              </h5>
              <div className="h-48 lg:h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <p className="font-poppins text-justify text-sm">
                  {dialogContent?.description}
                </p>
              </div>
              <Link
                href={`${languageCODE}/media-room/${formatString(
                  dialogContent?.title
                )}`}
              >
                <div className="w-max text-xs font-poppins font-medium lg:hover:text-black lg:hover:bg-white bg-black text-white py-[0.2rem] px-2 rounded-full border border-black flex items-center group transition-all duration-300">
                  <p>Read More</p>
                  <BlurImage
                    src="https://assets.nesscoindustries.com/public/assets/homepage/read-more-icon.webp"
                    alt={"ReDirection Arrow"}
                    width={400}
                    height={400}
                    className="w-4 h-4 lg:group-hover:invert ml-2 transition-all diration-300"
                  />
                </div>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
