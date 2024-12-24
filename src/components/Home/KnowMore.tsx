"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import DecorativeImg1 from "../../../public/assets/OurExpertise/DecorativeImg1.svg";
import DecorativeImg2 from "../../../public/assets/OurExpertise/DecorativeImg2.svg";
import BackgroundSvg from "../../../public/assets/OurExpertise/BackgroundSvg.svg";
import { HomeData } from "./types/constant";
import useEmblaCarousel from "embla-carousel-react";
import BlurImage from "../ui/BlurImage";

interface KnowMoreLayoutProps {
  heroData: HomeData;
}

export default function Component({ heroData }: KnowMoreLayoutProps) {
  const knowMoreData = heroData?.home[6]?.data?.knowmore;
  const [openModal, setOpenModal] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 3000);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderCard = (item: any, index: number) => (
    <div
      key={index}
      className={`group relative transition-transform duration-500 ease-in-out ${
        isScrolled && index % 2 !== 0 ? "translate-y-20" : ""
      }`}
    >
      <Dialog
        open={openModal === index}
        onOpenChange={(isOpen) => setOpenModal(isOpen ? index : null)}
      >
        <DialogTrigger asChild>
          {index % 2 !== 0 && (
            <div className=" bg-white max-w-[325px] md:max-w-[300px] mx-auto p-2 rounded-[1.2rem] shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-sm ml-4 w-[12.5rem]">{item?.title}</h3>
                {item?.description?.split(" ").length > 20 && (
                  <svg
                    className="h-10 w-10 bg-black p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <div className="rounded-2xl bg-red-400">
            <DialogHeader className="pb-2">
              <DialogTitle className="pb-4">{item?.title}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-gray-600">{item?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
      <Card
        className={` transition-all duration-300 rounded-3xl md:shadow-md w-full max-w-[325px] md:max-w-[300px] h-[320px] mx-auto relative bg-white ${
          index % 2 !== 0 ? "mt-6" : ""
        }`}
      >
        <CardContent>
          {index % 2 === 0 ? (
            <Dialog
              open={openModal === index}
              onOpenChange={(isOpen) => setOpenModal(isOpen ? index : null)}
            >
              <DialogTrigger asChild>
                <div className="p-3 rounded-3xl bg-white h-full lg:mt-0 mt-28">
                  <BlurImage
                    src={item?.src}
                    alt={item?.title}
                    width={200}
                    height={200}
                    className="w-full h-36 object-cover rounded-2xl"
                  />
                  <div className="p-1">
                    <p className="text-sm text-center lg:text-left text-gray-600 line-clamp-6">
                      {item?.description}
                    </p>
                    {item?.description?.split(" ").length > 20 && (
                      <Button
                        variant="link"
                        className="mt-1 p-0 h-auto hover:text-[#483d73] text-center lg:text-left w-full lg:w-max"
                      >
                        Read More
                      </Button>
                    )}
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <div className="bg-white rounded-2xl">
                  <DialogHeader className="pb-2">
                    <DialogTitle>{item?.title}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-600 text-center lg:text-left">
                    {item?.description}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog
              open={openModal === index}
              onOpenChange={(isOpen) => setOpenModal(isOpen ? index : null)}
            >
              <DialogTrigger asChild>
                <div className="p-3 rounded-3xl bg-white h-full">
                  <p className="text-sm text-gray-600 line-clamp-6 text-center lg:text-left">
                    {item?.description}
                  </p>
                  {item?.description?.split(" ").length > 40 && (
                    <Button
                      variant="link"
                      className="mt-1 p-0 h-auto hover:text-[#483d73] lg:text-left text-center w-full lg:w-max"
                    >
                      Read More
                    </Button>
                  )}
                  <BlurImage
                    src={item?.src}
                    alt={item?.title}
                    width={200}
                    height={200}
                    className="w-full h-36 object-cover rounded-2xl mt-2"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-white sm:max-w-[900px] rounded-2xl flex lg:flex-row flex-col items-center justify-center">
                <div className="lg:w-1/2 w-full">
                  <BlurImage
                    src={item?.src}
                    alt={item?.title}
                    width={200}
                    height={200}
                    className="w-full object-cover rounded-2xl"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <DialogHeader className="pb-2">
                    <DialogTitle>{item?.title}</DialogTitle>
                  </DialogHeader>
                  <p className="text-sm text-gray-600 text-center lg:text-left">
                    {item?.description}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
      {index % 2 === 0 && (
        <div className="mt-6  max-w-[300px] mx-auto text-black rounded-[1.2rem] ">
          <Dialog
            open={openModal === index}
            onOpenChange={(isOpen) => setOpenModal(isOpen ? index : null)}
          >
            <DialogTrigger asChild>
              <div className="flex items-center justify-between p-2 bg-white rounded-[1.2rem] ">
                <h3 className="text-sm w-[12.5rem] ml-4">{item?.title}</h3>
                {item?.description?.split(" ").length > 40 && (
                  <svg
                    className="h-10 w-10 bg-black p-1.5 rounded-full text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[900px] rounded-2xl flex lg:flex-row flex-col items-center justify-center">
              <div className="lg:w-1/2 w-full">
                <BlurImage
                  src={item?.src}
                  alt={item?.title}
                  width={200}
                  height={200}
                  className="w-full object-cover rounded-2xl"
                />
              </div>
              <div className="lg:w-1/2 w-full">
                <DialogHeader className="pb-2">
                  <DialogTitle>{item?.title}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-600 text-center lg:text-left">
                  {item?.description}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative  h-full mb-60 mt-10 mx-auto py-8 md:px-14">
      <BlurImage
        alt="Decorative Image"
        src={DecorativeImg1}
        className="w-40 absolute top-20 right-16"
      />
      <BlurImage
        alt="Decorative Image"
        src={DecorativeImg2}
        className="w-40 absolute -bottom-48  left-12"
      />
      <BlurImage
        alt="Decorative Image"
        src={BackgroundSvg}
        className="w-full scale-80 opacity-10 absolute top-10 left-0 right-0"
      />
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-center text-[#483d73]">
          {heroData?.home[6]?.category}
        </h2>
      </div>

      {/* Desktop view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {knowMoreData?.map((item, index) => renderCard(item, index))}
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden w-full h-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex w-full space-x-6">
            {knowMoreData?.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                {renderCard(item, index)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4 px-6 items-center space-x-4">
          <Button
            onClick={scrollPrev}
            className="h-8 w-6 bg-[#9e9c9c] rounded-full hover:bg-black flex items-center justify-center"
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
          </Button>
          <Button
            onClick={scrollNext}
            className="h-8 w-6 bg-[#9e9c9c] flex hover:bg-black rounded-full items-center justify-center"
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
          </Button>
        </div>
      </div>
    </div>
  );
}
