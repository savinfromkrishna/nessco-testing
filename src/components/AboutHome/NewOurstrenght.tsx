"use client";
import BlurImage from "../ui/BlurImage";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import dynamic from 'next/dynamic'
import { AboutItem } from "./types/constant";
import LinkUrl from "../LinkUrl";

interface HomeLayoutProps {
  aboutData: AboutItem;
}

const Ideaicon = dynamic(() => import("../Icons/about/Ideaicon"), {
  ssr: false,
});
const Quality = dynamic(() => import("../Icons/about/Quality"), { ssr: false });

const Customer = dynamic(() => import("../Icons/about/Customer"), {
  ssr: false,
});

const Sustainabilityicon = dynamic(
  () => import("../Icons/about/Sustainabilityicon"),
  { ssr: false }
);

const Svglist = [Ideaicon, Quality, Customer, Sustainabilityicon];

const truncateText = (text: string, maxWords: number) => {
  const wordsArray = text.split(" ");
  if (wordsArray.length > maxWords) {
    return wordsArray.slice(0, maxWords).join(" ") + "...";
  }
  return text; // Return full text if it's within the limit
};

const ExpandableCardDemo: React.FC<HomeLayoutProps> = ({ aboutData }) => {
  const [active, setActive] = useState<
    (typeof homecardData)[number] | boolean | null
  >(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const homeheadingData = aboutData?.About[0]?.Heading;
  const homecardData = aboutData?.About[0]?.cards;
  const homemisionData = aboutData?.About[0]?.missionvissionContent;

  const maxWordsForMobile = 10;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the click event from bubbling up
    setActive(null);
  };

  useEffect(() => {
    homecardData.forEach((card) => {
      const preloadimg = new window.Image();
      preloadimg.src = card.video;
    });
  }, [homecardData]);

  return (
    <div className="lg:h-[48rem] md:h-[55rem] h-[50rem] w-full bg-white overflow-hidden relative lg:pt-10 pt-5">
      <h2 className="lg:text-3xl text-2xl font-medium text-[#3a2a79] mb-2  font-poppins relative lg:pl-10 pl-8 ">
        {homeheadingData?.title}
      </h2>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100] backdrop-blur-md">
            <div className=" relative top-5">
              <motion.button
                key={`button-${active?.title}-${id}`}
                layout
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: 0.05,
                  },
                }}
                className="absolute right-0"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                >
                  <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16.414,15 c0,0,3.139,3.139,3.293,3.293c0.391,0.391,0.391,1.024,0,1.414c-0.391,0.391-1.024,0.391-1.414,0C18.139,19.554,15,16.414,15,16.414 s-3.139,3.139-3.293,3.293c-0.391,0.391-1.024,0.391-1.414,0c-0.391-0.391-0.391-1.024,0-1.414C10.446,18.139,13.586,15,13.586,15 s-3.139-3.139-3.293-3.293c-0.391-0.391-0.391-1.024,0-1.414c0.391-0.391,1.024-0.391,1.414,0C11.861,10.446,15,13.586,15,13.586 s3.139-3.139,3.293-3.293c0.391-0.391,1.024-0.391,1.414,0c0.391,0.391,0.391,1.024,0,1.414C19.554,11.861,16.414,15,16.414,15z"></path>
                </svg>
              </motion.button>

              <motion.div
                layoutId={`card-${active?.title}-${id}`}
                ref={ref}
                className="w-[20rem] lg:w-[20rem]  lg:h-[23rem] md:h-[40rem] lg:mt-8 mt-10 md:w-[35rem]  flex flex-col bg-[#f7f7f7] dark:bg-neutral-900 sm:rounded-3xl overflow-hidden rounded-xl"
              >
                <div className="relative w-full h-52 lg:h-[20rem] md:h-[17rem] sm:rounded-tr-lg sm:rounded-tl-lg overflow-hidden ">
                  {/* Background video */}
                  <video
                    className="absolute inset-0 w-full h-full object-cover bg-[#3a2a79]"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={active?.video} 
                  >
                    <source src={active?.video}  type="video/mp4" />
                  </video>

                  {/* Title */}
                  <h3 className="absolute font-poppins bottom-2 left-0 right-0 text-center font-bold text-lg md:text-xl text-white z-10">
                    {active?.title}
                  </h3>

                  {/* Overlay image */}
                  <motion.div
                    layoutId={`image-${active?.title}-${id}`}
                    className="absolute inset-0 flex items-center justify-center z-20"
                  >
                    <BlurImage
                      width={200}
                      height={200}
                      src={active?.src}
                      alt={active?.title}
                      className="w-20 h-20 md:w-36 md:h-36 lg:h-24 lg:w-24 sm:rounded-lg object-cover  filter invert-0"
                    />
                  </motion.div>
                </div>

                <div className="">
                  <div className="pt-4 relative p-12 md:p-10 top-3 text-center">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-xs md:text-xl lg:text-sm font-regular font-poppins h-40 md:h-fit flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400"
                    >
                      {typeof active?.description === "function"
                        ? active?.description
                        : active?.description}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="  lg:space-y-3 grid grid-cols-2 gap-2 lg:gap-0 lg:flex lg:flex-col lg:p-10 p-7 ">
        {homecardData?.map((card, index) => {
          const Icons = Svglist[index];
          return (
            <motion.div
              layoutId={`card-${card?.title}-${id}`}
              key={`card-${card?.title}-${id}`}
              onClick={() => setActive(card)}
              className=" lg:flex flex  flex-col-reverse lg:flex-row justify-between items-center bg-[#f7f7f7] dark:hover:bg-neutral-800 rounded-2xl cursor-pointer group lg:w-full lg:h-full h-[18rem] md:h-[20rem] relative p-3 lg:p-0"
            >
              <div className="md:flex md:flex-row gap-4 flex-col lg:flex-row lg:p-6 grid grid-cols-1  ">
                <div className=" col-span-1">
                  <motion.p
                    layoutId={`description-${card?.description}-${id}`}
                    className="text-black font-poppins text-center lg:text-left lg:w-[70vw] lg:text-sm font-regular text-xs  lg:px-0 px-2  lg:ml-0"
                  >
                    {/* Title */}
                    <span className="text-center  lg:left-0 lg:text-left lg:text-md text-sm lg:-mt-0 relative lg:-top-0  font-medium lg:text-[#3a2a79] text-black font-poppins block h-[3rem]  mb-2 lg:mb-0 lg:h-5 ">
                      {card?.title}
                    </span>

                    {/* Paragraph */}
                    <span className="block">
                      {/* Conditionally render a shorter version on mobile */}
                      <span className="block lg:hidden relative md:text-center lg:left-0  overflow-hidden h-[3rem] md:h-[]">
                        {/* Use utility function to truncate text */}
                        {truncateText(card?.description, maxWordsForMobile)}
                      </span>

                      {/* Full description for larger screens */}
                      <span className="hidden lg:block font-poppins">
                        {card?.description}
                      </span>
                    </span>
                    <span className="absolute lg:right-0 block lg:hidden text-[#3a2a79] md:right-5 top-2 right-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        fill="#483d73"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
                      </svg>
                    </span>
                    {/* <IoAddCircle
                    className="absolute lg:right-0 block lg:hidden text-[#3a2a79] md:right-5 top-2 right-2 "
                    size={30}
                  />  */}
                  </motion.p>

                  <div className=" lg:visible invisible relative  top-[1.9rem] h-[1.3px] w-[20rem] bg-[#2d1f66] rounded-sm "></div>
                </div>
              </div>
              <div className="flex  ">
                <div className=" lg:visible invisible relative -left-3  w-[2px] bg-[#2d1f66] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  key={index}
                  className=" lg:p-6 md:p-16 h-[10rem] w-[10rem] lg:w-[9rem] lg:h-[8rem] md:h-[15rem] md:w-[15rem] flex items-center justify-center  lg:bg-[#483d73] lg:rounded-tr-2xl lg:rounded-br-2xl transition-colors duration-300 p-7 group "
                >
                  <Icons className="lg:bg-transparent bg-[#483d73] rounded-[1rem] " />
                </div>
              </div>
            </motion.div>
          );
        })}
      </ul>
      <LinkUrl href="/about/our-strength">
        <div
          aria-label="read-more"
          className="flex justify-center bg-slate-50 "
        >
        <button className=" absolute bottom-3  w-[8rem] text-base hover:font-medium font-normal  lg:bg-gray-100 font-poppins h-[2rem] items-center justify-center text-center border lg:border-[#6f6f6f] lg:hover:bg-black lg:text-[#6f6f6f] lg:hover:text-white bg-black text-white rounded-[0.3rem] z-10 ">
        {homemisionData?.button}
          </button>
        </div>
      </LinkUrl>
    </div>
  );
};
export default ExpandableCardDemo;
