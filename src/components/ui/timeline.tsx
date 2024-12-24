"use client";
import {  useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import BlurImage from "../ui/BlurImage";
import { OurCompanyItem } from "../AboutCompany/types/constant";

interface AboutLayoutProps{
  companyData:OurCompanyItem;
}

const Timeline:React.FC<AboutLayoutProps> = ({companyData}) => {
  const homecompanyData=companyData?.Ourcompany[0]?.Data;

  // No need to pass it as props anymore
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full">
      <div className="w-full dark:bg-neutral-950 font-sans" ref={containerRef}>
        <div className="max-w-8xl mx-auto py-5 md:py-9 px-4 md:px-8 lg:px-10 bg-black sticky top-0 z-50">
          <h2 className="text-2xl lg:text-3xl font-poppins font-medium text-white dark:text-white text-center lg:mt-9 mt-10">
            Our <span className="text-red-600"> History </span>
          </h2>
        </div>

        <div className="sticky-gradient-wrapper w-full">
          <div className="mass-gradient-timeline"></div>
        </div>

        <div ref={ref} className="relative max-w-8xl mx-auto lg:pb-20 md:px-10  -mt-[7rem]">
          {homecompanyData?.map((item, index) => (
            <div key={index} className="flex justify-start pt-10 md:pt-20 md:gap-10">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 lg:w-[30rem] h-[5rem] lg:h-[10rem] md:w-[18rem] lg:pl-[1rem] pl-[1.2rem] lg:-ml-9 md:-ml-10">
                <div className="h-7 relative lg:left- w-7 rounded-full bg-black dark:bg-black flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
                </div>
                <h3 className="hidden md:block text-xl lg:pl-5 md:pl-6 md:text-5xl font-bold text-white dark:text-neutral-500">
                  {item?.title}
                </h3>
              </div>

              <div className="pl-20 pr-4 md:pl-4 w-full h-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                  {item?.title}
                </h3>
                <div className="lg:flex lg:flex-row flex flex-col relative h-[25rem]">
                  <div className="lg:w-2/5 w-2/3 md:w-1/2 h-full absolute lg:left-0">

                  {item?.image &&
            (/\.(mp4|webm|ogg)$/i.test(item?.image) ? (
              <video
                className="object-contain rounded-xl"
                autoPlay
                loop
                muted
              >
      <source src={item.image} type={`video/${item.image.split('.').pop()}`} />
      Your browser does not support the video tag.
              </video>
            ) : (
                    <BlurImage
                      src={item?.image}
                      alt={item.title || "banner"}
                      height={290}
                      width={290}
                      className="object-contain rounded-xl"
                    />
            ))}
                  </div>
                  <div className="lg:w-3/5 md:w-1/2 text-[0.60rem] lg:text-sm text-justify md:text-xs md:p-0 md:px-7 absolute md:top-0 md:right-0 lg:right-0 bottom-0 lg:top-0 px-6 text-white font-regular font-poppins">
                    <p className="-ml-4">{item?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-[] left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
