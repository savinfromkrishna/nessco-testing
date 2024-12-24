"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { AboutItem, GridItem, Machine } from "../AboutHome/types/constant";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import BlurImage from "../ui/BlurImage";

interface HomeLayoutProps {
  aboutData: AboutItem;
}

gsap.registerPlugin(ScrollTrigger);

const FeatureProjectPage: React.FC<HomeLayoutProps> = ({ aboutData }) => {
  const homeaboutData = aboutData?.About[0]?.Featureheading;
  const homeaboutData2 = aboutData?.About[0]?.machines;
  const homeaboutData3 = aboutData?.About[0]?.grid;
  const [selectedMachine, setSelectedMachine] = useState<Machine>(
    homeaboutData2[0]
  );
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGrid, setSelectedGrid] = useState<GridItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (grid: GridItem) => {
    setSelectedGrid(grid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGrid(null);
  };

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  const horizontalLineRef = useRef<HTMLDivElement | null>(null);
  const verticalLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMachineClick = (machine: Machine) => {
    setSelectedMachine(machine);
  };

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        horizontalLineRef.current,
        { width: 0 },
        {
          width: "100%",
          duration: 2,
          ease: "power3.out",
        }
      );

      verticalLinesRef.current.forEach((line, index) => {
        if (line) {
          tl.fromTo(
            line,
            { y: 0, height: 0 },
            {
              y: 0,
              height: "17rem",
              z: 10,
              duration: 2,
              ease: "power3.out",
              delay: 0.3,
            },
            "-=2"
          );

          const image = imagesRef.current[index];
          if (image) {
            tl.fromTo(
              image,
              { y: 10, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
              },
              "-=2"
            );
          }
        }
      });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  const formatString = (input: string) => {
    return input
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className="h-full relative overflow-hidden font-poppins bg-[#f2f2f2]">
      <div className="relative flex flex-col w-full bg-white overflow-hidden">
        <h3 className="lg:text-5xl mt-16 text-3xl bg-gradient-to-r from-[#483d73] from-2% via-red-700 via-20% to-red-700 text-transparent bg-clip-text h-[7rem] font-semibold lg:ml-[2rem] ml-4">
          <span className="block">{homeaboutData?.featuredpage}</span>
          <span>{homeaboutData?.featuredpagehighlight}</span>
        </h3>

        {isMobile ? (
          <div className="flex flex-col items-center w-full relative">
            <div className="flex flex-row items-center w-full bg-white rounded-2xl h-32 px-4">
              <div className="w-2/5 h-full">
                <BlurImage
                  src={selectedMachine?.mainImage || "/placeholder.jpg"}
                  alt={selectedMachine?.title}
                  width={300}
                  height={300}
                  priority
                  className="h-full w-full object-cover rounded-[0.8rem]"
                />
              </div>
              <div className="flex flex-col w-3/5 p-2">
                <div className="relative pl-2">
                  <h4 className="text-xl font-bold relative text-black italic font-poppins">
                    {selectedMachine?.title}
                  </h4>
                </div>
                <div className="px-2">
                  <p className="text-xs text-gray-500 mt-2 text-left font-poppins">
                    {truncateText(selectedMachine?.description, 18)}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-4 p-4">
              {homeaboutData2?.map((machine, index) => (
                <div
                  key={index}
                  className={`overflow-hidden cursor-pointer rounded-[0.5rem] 
                    ${
                      selectedMachine?.id === machine?.id
                        ? "border-2 border-red-700"
                        : ""
                    }`}
                  onClick={() => handleMachineClick(machine)}
                >
                  <BlurImage
                    src={machine.mainImage}
                    alt={machine?.title}
                    width={500}
                    height={500}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center lg:items-start h-[20rem] relative lg:space-x-8">
            <h3 className="text-2xl font-bold text-gray-600 lg:w-1/3 italic mb-6 lg:mb-0 relative pl-8">
              {selectedMachine?.title}
            </h3>
            <div className="relative flex justify-center lg:justify-center lg:w-1/3 lg:mx-0 -top-28">
              <BlurImage
                src={selectedMachine?.mainImage}
                alt={selectedMachine?.title}
                width={1000}
                height={1000}
                priority
                className="object-cover z-20 h-[18rem] rounded-2xl sm:h-[20rem] lg:h-[15rem] w-[17rem] sm:w-[24rem] lg:w-[25rem] shadow-xl"
              />
            </div>
            <div className="lg:w-1/3 z-10 lg:text-right font-poppins justify-center text-center pr-5 ml -top-10 relative">
              <p className="text-sm lg:text-xs font-regular text-black">
                {selectedMachine?.description}
              </p>
            </div>
          </div>
        )}

        <div
          ref={horizontalLineRef}
          className="relative w-full h-1 bg-[#3a2a79] -top-[14rem] lg:visible invisible"
        >
          <div className="relative w-full flex justify-around">
            {homeaboutData2?.map((machine, index) => (
              <div key={machine?.id} className="relative flex justify-center">
                <div
                  ref={(el) => {
                    verticalLinesRef.current[index] = el;
                  }}
                  className="w-[0.10rem] bg-[#b0aac5] h-[17rem] mask-gradient-featuredproject relative opacity-25"
                ></div>
                <div
                  ref={(el) => {
                    imagesRef.current[index] = el;
                  }}
                  className={`border-2 h-[8rem] w-[8rem] overflow-hidden rounded-2xl mt-${
                    [24, 10, 24, 24, 8][index % 5]
                  } -ml-${
                    [5, 12, 24, 20, 24][index % 5]
                  } z-20 bg-white cursor-pointer ${
                    selectedMachine.id === machine.id
                      ? "-ml-7 border-red-700"
                      : "-ml-10"
                  }`}
                  onClick={() => handleMachineClick(machine)}
                >
                  <BlurImage
                    src={machine?.mainImage}
                    alt={machine?.title}
                    width={1000}
                    height={1000}
                    priority
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="text-center mt-16 mb-12 px-6 font-poppins"
        ref={carouselRef}
      >
        <p className="text-2xl lg:text-3xl font-medium">
          <span className="block mb-3">{homeaboutData?.banner1}</span>
          <span
            ref={gradientRef}
            className="bg-gradient-to-r from-transparent to-[#a397d3] text-[#483d73] px-1 bg-[length:0%_100%] bg-left bg-no-repeat rounded-lg"
          >
            {homeaboutData?.banner2}
          </span>
        </p>
      </div>

      {isModalOpen && selectedGrid && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50 flex lg:flex-row flex-col justify-center items-center transition-all duration-700 ease-in-out transform"
          onClick={closeModal}
        >
          <div className="bg-white rounded-3xl flex lg:flex-row flex-col lg:w-[45rem] lg:h-[20rem] h-[40rem] w-[23rem] transition-all duration-700 ease-in-out transform">
            <div className="lg:w-1/2 lg:h-full h-1/2 p-4">
              <div className="w-full h-full overflow-hidden rounded-2xl">
                <Link href={`projects/${formatString(selectedGrid?.title)}`}>
                  <BlurImage
                    src={selectedGrid?.mainImage || "/placeholder.jpg"}
                    alt={selectedGrid?.title}
                    height={1000}
                    width={1000}
                    className="rounded-2xl h-[40rem] w-[30rem] -mt-24 object-cover"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 w-full h-1/2 lg:h-full flex flex-col justify-between relative lg:p-0 p-3">
              <div className="p-4">
                <Link href={`projects/${formatString(selectedGrid?.title)}`}>
                  <h3 className="text-md mb-2 font-poppins font-semibold text-black lg:w-[18rem] w-full">
                    {selectedGrid?.title}
                  </h3>
                </Link>
                <div className="lg:w-[18rem] w-full h-[10.5rem] mt-2 lg:h-[13rem] overflow-y-auto scroll-wrapper style-1">
                  <p className="font-poppins font-regular text-sm pl-2 text-left">
                    {selectedGrid?.description}
                  </p>
                </div>
              </div>

              <div className="absolute lg:top-2 lg:right-3 right-1 -top-[19.7rem] hover:text-[#483d73] cursor-pointer">
                <button
                  aria-label="close button"
                  className="cursor-pointer font-bold"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="35"
                    height="35"
                    fill="#483d73"
                    viewBox="0 0 30 30"
                  >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"></path>
                  </svg>
                </button>
              </div>

              <Link href={`projects/${formatString(selectedGrid?.title)}`}>
                <div className="absolute bottom-2 lg:right-14 right-6 text-xs font-poppins font-medium lg:hover:text-black lg:hover:bg-white bg-black text-white py-[0.2rem] px-2 rounded-full border border-black flex items-center group transition-all duration-300">
                  <p>Read More</p>
                  <BlurImage
                    src="https://assets.nesscoindustries.com/public/assets/homepage/read-more-icon.webp"
                    alt={"ReDirection Arrow"}
                    width={1000}
                    height={1000}
                    className="w-4 h-4 lg:group-hover:invert ml-2 transition-all duration-300"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 p-4 mt-8 relative">
        {homeaboutData3?.map((item, index) => (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-[1rem] p-1"
          >
            <BlurImage
              src={item?.mainImage}
              alt={item?.title || "Image description"}
              width={1000}
              height={1000}
              className="w-full h-44 object-cover rounded-[0.8rem]"
            />

            <h4 className="mt-2 text-sm font-medium text-gray-800 lg:w-[15rem] ml-2 md:w-[16rem]">
              {item?.title}
            </h4>
            <div className="flex-col flex space-y-4 p-2 relative -ml-7">
              <p className="text-gray-600 text-xs font-poppins font-regular mt-3 px-7 h-[5rem]">
                {truncateText(item?.description, 20)}
              </p>
            </div>
            <button
              aria-label="open-button"
              className="absolute bottom-2 right-2 hover:text-[#483d73] transition-all duration-700 ease-in-out"
              onClick={() => openModal(item)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                fill="#483d73"
                width="35"
                height="35"
                viewBox="0 0 24 24"
              >
                <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProjectPage;
