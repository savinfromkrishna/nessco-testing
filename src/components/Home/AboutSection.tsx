"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedText from "../ui/AnimatedText";
import styles from "../ui/AnimatedText.module.css";
import { HomeData } from "./types/constant";
import { usePathname } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import BlurImage from "../ui/BlurImage";

interface Card {
  image: string;
  title: string;
  link: string;
}

interface AboutSectionLayoutProps {
  heroData: HomeData;
}

const AboutUs: React.FC<AboutSectionLayoutProps> = ({ heroData }) => {
  const aboutData = heroData?.home[3]?.data;
  const [machinesSold, setMachinesSold] = useState(0);
  const [readyStockMachines, setReadyStockMachines] = useState(0);
  const [machinesSoldComplete, setMachinesSoldComplete] = useState(false);
  const [readyStockMachinesComplete, setReadyStockMachinesComplete] =
    useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || "";
  const countryCode = pathname?.split("/")[1]?.toLowerCase();
  const languageCode = pathname?.split("/")[2]?.toLowerCase();
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  useEffect(() => {
    if (!aboutData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry) => {
          if (entry?.isIntersecting) {
            // Reset completion flags before starting animation
            setMachinesSoldComplete(false);
            setReadyStockMachinesComplete(false);

            // Start counter animations
            animateCount(
              setMachinesSold,
              aboutData?.stats?.machinesSold,
              setMachinesSoldComplete
            );
            animateCount(
              setReadyStockMachines,
              aboutData?.stats?.readyStockMachines,
              setReadyStockMachinesComplete
            );

            observer?.unobserve(entry?.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef?.current) {
      observer?.observe(statsRef?.current);
    }

    return () => {
      if (statsRef?.current) {
        observer?.unobserve(statsRef?.current);
      }
    };
  }, [aboutData]);

  const animateCount = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    endValue: number,
    completionSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let startTime: number;
    const duration = 1500; // 1.5 seconds
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math?.min((timestamp - startTime) / duration, 1);
      setter(Math?.floor(progress * endValue));
      if (progress < 1) {
        window?.requestAnimationFrame(step);
      } else {
        completionSetter(true); // Mark animation as complete
      }
    };

    window?.requestAnimationFrame(step);
  };

  if (!aboutData) return null;

  return (
    <div className="flex mt-8 pb-12 h-full max-w-screen-2xl mx-auto flex-col items-center px-4 lg:px-14 bg-gradient-to-b from-transparent  to-[#ece9f5] relative">
      <div className="absolute top-48 h-full w-full bg-[radial-gradient(#9e9c9c_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      <h2 className="text-3xl font-medium text-[#483d78] flex justify-center z-10">
        <span className="text-3xl font-semibold">
          {aboutData?.title?.trim().replace(/\s+\S+$/, "")}
        </span>
        <span className="text-3xl font-semibold ml-2">
          {aboutData?.title?.trim().match(/\S+$/)}
        </span>
      </h2>

      <h2 className="text-lg lg:text-2xl w-full text-center font-poppins lg:px-72 py-3">
        {aboutData?.heading.split(" ").map((word, index) =>
          word === "Machine" ? (
            <Link
              key={index}
              className="text-[#483d78] cursor-pointer"
              href={`/${countryCode}/${languageCode}/products`}
            >
              {word}{" "}
            </Link>
          ) : (
            word + " "
          )
        )}
      </h2>

      <div className="text-center flex flex-col w-full lg:max-w-6xl z-10">
        <p className="font-poppins flex lg:hidden text-sm lg:text-base font-light py-4 text-center w-full lg:w-3/5 leading-6">
          {aboutData?.description}
        </p>
        <div
          ref={statsRef}
          className="flex flex-row justify-between items-center w-full mt-4"
        >
          <div className="lg:text-center w-[50%] lg:w-1/5 md:mb-0">
            <h3 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#483d73]  to-red-700 to-90% bg-clip-text text-transparent ">
              {machinesSold}
              {machinesSoldComplete && "+"}
            </h3>
            <p className="text-sm lg:text-base font-regular font-poppins">
              {aboutData?.leftstats}
            </p>
          </div>
          <p className="font-poppins hidden lg:flex text-sm lg:text-sm md:px-6 py-4 text-center font-regular w-full md:w-3/5 leading-6">
            {aboutData?.description}
          </p>
          <div className="lg:text-center flex flex-col justify-end w-[50%] lg:w-1/5 md:mt-0">
            <h3 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-[#483d73]  to-red-700 to-90% bg-clip-text text-transparent ">
              {readyStockMachines}
              {readyStockMachinesComplete && "+"}
            </h3>
            <p className="lg:text-base font-regular text-sm font-poppins">
              {aboutData?.rightstats}
            </p>
          </div>
        </div>

        <Link
          href={`/${countryCode}/${languageCode}/about`}
          className="bg-gradient-to-r from-[#483d73]  to-red-700 to-90% bg-clip-text text-transparent  text-center font-poppins text-base hover:font-semibold mt-4"
        >
          {aboutData?.readmore}
        </Link>
      </div>

      <div className="w-full mt-8">
        {/* Desktop view */}
        <div className="hidden md:flex flex-row w-full items-end gap-4">
          {aboutData?.cards?.map((card: Card, index: number) => (
            <Link
              key={index}
              className={`relative w-full group flex flex-col items-center ${
                index === 1 ? "z-10 lg:w-[40%]" : "lg:w-1/3"
              }`}
              href={`/${countryCode}/${languageCode}/about/${card.link}`}
            >
              <div className="w-full">
                <div
                  className={`relative overflow-hidden rounded-md transition-transform transform group-hover:scale-95 ${
                    index === 1 ? "h-58" : "h-52"
                  }`}
                >
                  <BlurImage
                    src={card?.image}
                    alt={card?.title}
                    width={600}
                    height={250}
                    className={`w-full rounded-2xl border-2 object-cover ${
                      index === 1
                        ? "h-[15rem] lg:w-full w-full md:w-full"
                        : "h-52"
                    }`}
                  />
                  <div className="absolute bottom-0 left-0 p-4 flex justify-between items-end w-full">
                    <div className={styles?.container}>
                      <div className={styles?.box}>
                        <div className={styles?.title}>
                          <span className={styles?.block}></span>
                          <AnimatedText text={`${card?.title}`} />
                        </div>
                      </div>
                    </div>
                    <svg
                      className="h-10 w-10 bg-white p-1.5 rounded-full text-black group-hover:text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]"
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
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view with Embla Carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {aboutData?.cards?.map((card: Card, index: number) => (
              <div key={index} className="flex-[0_0_80%] mr-4 last:mr-0">
                <Link
                  className="relative group flex flex-col items-center"
                  href={`/${countryCode}/${languageCode}/about/${card.link}`}
                >
                  <div className="w-full">
                    <div className="relative overflow-hidden rounded-md transition-transform transform group-hover:scale-95 h-40">
                      <BlurImage
                        src={card?.image}
                        alt={card?.title}
                        width={300}
                        height={160}
                        className="w-full h-full object-cover rounded-2xl border-2"
                      />
                      <div className="absolute bottom-0 left-0 p-4 flex justify-between items-end w-full">
                        <div className={styles?.container}>
                          <div className={styles?.box}>
                            <div className={styles?.title}>
                              <span className={styles?.block}></span>
                              <AnimatedText text={`${card?.title}`} />
                            </div>
                          </div>
                        </div>
                        <svg
                          className="h-8 w-8 bg-white p-1.5 rounded-full text-black group-hover:text-white transform transition-transform duration-300 ease-in-out group-hover:rotate-45 group-hover:bg-[#483d73]"
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
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

<style jsx>{`
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
`}</style>;
