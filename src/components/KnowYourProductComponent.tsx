"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { motion } from "framer-motion";
import { KnowYourBusiness, KnowYourMachine, KnowYourProduct, Header, Card, Section } from "./types/nessco";

type KnowYourData = KnowYourBusiness | KnowYourMachine | KnowYourProduct;

interface KnowYourComponentProps {
  data: KnowYourData;
}

const KnowYourComponent: React.FC<KnowYourComponentProps> = ({ data }) => {
  const header: Header = (data as any)[Object.keys(data)[0]][0].Header;
  const [activeCard, setActiveCard] = useState<Card>(header.cards[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const answerRefs = useRef<(HTMLElement | null)[]>([]);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (rightContainerRef.current) {
      answerRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerRect = rightContainerRef.current!.getBoundingClientRect();

          if (rect.top <= containerRect.top && rect.bottom >= containerRect.top) {
            setActiveIndex(idx);
          }
        }
      });
    }
  };

  useEffect(() => {
    const container = rightContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleQuestionClick = (index: number) => {
    setActiveIndex(index);

    if (answerRefs.current[index] && rightContainerRef.current) {
      const selectedElement = answerRefs.current[index]!;
      const rightContainerTop = rightContainerRef.current.getBoundingClientRect().top;
      const selectedElementTop = selectedElement.getBoundingClientRect().top;

      const offset = selectedElementTop - rightContainerTop;

      rightContainerRef.current.scrollBy({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="bg-black rounded-t-2xl w-full mt-14 font-poppins font-regular pt-6 lg:pb-6 pb-4 ">
        <h2 className="text-white lg:text-xl text-sm lg:px-8 px-6">
          {Object.keys(data)[0].replace(/([A-Z])/g, ' $1').trim()}
        </h2>
        <div className="w-full mt-4 lg:px-[14%] px-[4%]">
          <h1 className="text-white lg:text-3xl text-xl font-medium lg:text-left text-center">
            {header.title}
          </h1>
        </div>
      </div>
      <div className="bg-black lg:h-[7rem] h-[3rem] rounded-b-2xl lg:mb-4 mb-2 relative w-full">
        <div className="lg:px-[14%] px-[4%] absolute top-0">
          <Image
            className="object-cover lg:h-[18rem] h-[8rem] rounded-3xl lg:mt-4 mt-2"
            width={1000}
            height={1000}
            priority
            src={header.img}
            alt={header.title}
          />
        </div>
      </div>
      <div className="bg-white rounded-t-2xl lg:h-[11rem] h-[5rem] w-full"></div>

      <div className="bg-white rounded-b-2xl h-full w-full lg:px-[14%] px-[5%] lg:py-12 py-8 font-regular font-poppins">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {header.cards.map((card, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(card)}
              className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                activeCard.title === card.title
                  ? "bg-gray-200"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Image
                src={card.img}
                alt={card.title}
                width={48}
                height={48}
                className="mb-2"
              />
              <span className="text-sm text-center">{card.title}</span>
            </button>
          ))}
        </div>
        <div className="w-full lg:h-[45rem] flex space-x-6">
          <div className="w-[25%] -ml-4 border-r-2 border-[#bcbcbc] space-y-3 lg:block hidden">
            {activeCard.section && activeCard.section.map((item: Section, idx: number) => (
              <div
                key={idx}
                onClick={() => handleQuestionClick(idx)}
                className="flex items-center cursor-pointer transition-transform duration-300 ease-in-out"
              >
                <motion.h3
                  className={`text-sm text-right pr-6 w-full transition-all duration-300 ${
                    activeIndex === idx ? "text-black" : "text-[#7f7d7d]"
                  }`}
                  style={{ fontWeight: activeIndex === idx ? "600" : "400" }}
                >
                  {item.que}
                </motion.h3>
                <motion.div
                  className={`h-[0.6rem] w-[0.6rem] rounded-full -mr-[0.34rem] transition-all duration-300 ${
                    activeIndex === idx ? "bg-black scale-125" : "bg-[#7f7d7d]"
                  }`}
                />
              </div>
            ))}
          </div>
          <div
            ref={rightContainerRef}
            className="lg:w-[75%] space-y-6 lg:overflow-y-scroll scrollbar-hide lg:pb-[35rem]"
          >
            {activeCard.section && activeCard.section.map((item: Section, idx: number) => (
              <div
                key={idx}
                ref={(el) => {
                  answerRefs.current[idx] = el;
                }}
                className="space-y-4"
              >
                <h3 className="text-xl normal font-semibold lg:pt-4 cursor-text">
                  {item.que}
                </h3>
                <p className="lg:text-sm text-sm font-normal text-justify cursor-text">
                  {item.ans}
                </p>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default KnowYourComponent;

