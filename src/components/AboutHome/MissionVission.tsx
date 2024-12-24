"use client";
import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/about/carousel";
import dynamic from 'next/dynamic'
import { AboutItem } from "./types/constant";
import BlurImage from "../ui/BlurImage";
import LinkUrl from "../LinkUrl";

const Pillar = dynamic(() => import("../Icons/about/Pillar"), { ssr: false });
const Line = dynamic(() => import("../Icons/about/Line"), { ssr: false });
const Eyeicon = dynamic(() => import("../Icons/about/Eyeicon"), { ssr: false });
const tower = dynamic(() => import("../Icons/about/Tower"), { ssr: false });

const pillar = [Pillar, Pillar, Pillar, Pillar];
const sideicon = [Line, Eyeicon, tower];

interface HomeLayoutProps {
  aboutData: AboutItem;
}

const Missionvission: React.FC<HomeLayoutProps> = ({ aboutData }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const homeaboutData = aboutData?.About[0]?.missionvissionContent;


  const handleNext = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  }, [carouselApi]);

  const handlePrevious = useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  }, [carouselApi]);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("select", () => {
        setCurrentSlide(carouselApi.selectedScrollSnap());
      });
    }
  }, [carouselApi]);

  const renderDots = () => (
    <div className="flex justify-center mt-5 lg:hidden">
      {homeaboutData?.slides?.map((_, index) => (
        <button
          key={index}
          onClick={() => carouselApi?.scrollTo(index)}
          className={`w-2 h-2 rounded-full mx-2 ${
            currentSlide === index ? "bg-[#3a2a79]" : "bg-gray-300"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      ))}
    </div>
  );

  return (
    <div className="relative lg:w-full md:h-[50rem] w-full lg:h-[41rem] h-[48rem] lg:pt-10 pt-5 bg-white">
      <h2 className="lg:text-3xl font-medium text-[#3a2a79] lg:mb-8 lg:top-[10] font-poppins text-2xl lg:pl-10 pl-8">
        {homeaboutData?.title}
      </h2>

      <div className="flex w-full relative items-center p-8">
        <div className="lg:w-[70%] w-full">
          <Carousel
            className="lg:w-full lg:max-w-screen-md relative lg:h-[27rem] h-[35.5rem]"
            setApi={setCarouselApi}
          >
            <CarouselContent>
              {homeaboutData?.slides?.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 lg:h-full h-[30rem]">
                    <Card>
                      <CardContent className="lg:flex items-center justify-center p-3 relative">
                        <div className="flex flex-col">
                          <h3 className="lg:text-3xl font-poppins font-normal pl-5 lg:text-left">
                            {slide?.title}
                          </h3>
                          <div className="lg:flex lg:flex-row flex flex-col items-center justify-center lg:space-x-20 lg:mr-10 w-full lg:mt-0 -mt-5">
                            <div className="flex-shrink-0 relative lg:left-0 flex justify-center lg:justify-start lg:bottom-0">
                              <BlurImage
                                src={slide?.imageSrc}
                                alt={slide?.title}
                                height={100}
                                width={100}
                                className="w-48 h-48 object-cover lg:mb-2"
                                style={{ height: "15rem", width: "15rem" }}
                              />
                            </div>
                            <p className="lg:text-sm text-xs font-semi-medium text-center lg:w-[26rem] font-poppins lg:mb-3 lg:right-10 relative lg:bottom-0 w-[18rem]">
                              {slide?.description}
                            </p>
                          </div>

                          {slide?.points && (
                            <div className="grid grid-cols-2 gap-5 text-sm font-bold text-left p-2 z-10 w-full lg:h-[4rem] lg:gap-0 lg:flex lg:p-3 lg:w-full lg:font-bold">
                              {slide?.points?.map((point, pointIndex) => (
                                <div
                                  key={pointIndex}
                                  className="flex gap-2 lg:gap-2"
                                >
                                  <p className="lg:w-7 lg:h-7 w-[1.26rem] h-5 p-3 rounded-full bg-[#312465] text-white flex items-center justify-center lg:font-bold">
                                    {pointIndex + 1}
                                  </p>
                                  <p className="lg:w-[8rem] w-[8rem] text-left text-xs lg:text-[#6f6f6f] font-medium font-poppins lg:font-medium relative">
                                    {point?.caption}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {slide?.values && (
                            <div className="lg:flex lg:flex-row grid grid-cols-2 gap-5 lg:gap-0 text-sm lg:w-full lg:font-bold text-left lg:p-3 justify-center w-full lg:h-[4rem] p-2 z-10">
                              {slide?.values?.map((value, valueIndex) => {
                                const List = pillar[valueIndex];
                                return (
                                  <div
                                    key={valueIndex}
                                    className="flex gap-2 lg:gap-0"
                                  >
                                    <List />
                                    <p className="w-[8rem] text-left text-xs lg:text-[#6f6f6f] font-medium font-poppins lg:font-medium relative">
                                      {value?.text}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious onClick={handlePrevious} />
            <CarouselNext onClick={handleNext} />
          </Carousel>

          {/* Dots for mobile view */}
          {renderDots()}

          <div className="overflow-hidden lg:block hidden w-[30%] absolute right-0 top-0 p-5">
            {sideicon[currentSlide] && (
              <div
                className={`h-full w-full transition-transform duration-1000 ease-in-out opacity-100 transform`}
              >
                {React.createElement(sideicon[currentSlide])}
              </div>
            )}
          </div>
        </div>
      </div>

      <LinkUrl href="/about/vision">
        <div aria-label="read-more" className="flex justify-center bg-slate-50">
          <button className="absolute bottom-3 w-[8rem] text-base hover:font-medium font-normal font-poppins h-[2rem] items-center justify-center text-center border lg:border-[#6f6f6f] lg:bg-gray-100 lg:hover:bg-black lg:text-[#6f6f6f] bg-black text-white lg:hover:text-white rounded-[0.26rem] z-10">
            {homeaboutData?.button}
          </button>
        </div>
      </LinkUrl>
    </div>
  );
};

export default Missionvission;
