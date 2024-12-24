"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./secondpage.module.css";
const DashedLineWithImage = dynamic(() => import("./Elephant"), { ssr: false });
import dynamic from 'next/dynamic'
// const Brownmandala = dynamic(() => import("../Icons/about/Brownmandala"), {
//   ssr: false,
// });
import { PinkCityData } from "./types/constant";
import BlurImage from "../ui/BlurImage";
import Image from 'next/image';
interface AboutLayoutProps{
  pinkcityData:PinkCityData
}


const SecondPage:React.FC<AboutLayoutProps> = ({pinkcityData}) => {
  const homepinkcity=pinkcityData?.pinkcity[0]?.secondPageContent;
  const mandalaRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mandala = mandalaRef.current;

    if (mandala) {
      ScrollTrigger.create({
        trigger: mandala,
        start: "top 80%",
        end: "top 20%",
        onEnter: () => {
          mandala.classList.add(styles["scale-up"]);
        },
        onLeaveBack: () => {
          mandala.classList.remove(styles["scale-up"]);
          void mandala.offsetWidth; // Trigger a reflow
          mandala.classList.add(styles["scale-up"]);
        },
      });
    }
  }, []);

  return (
    <div className="lg:h-[30rem] h-[50rem] md:h-[70rem] w-full flex lg:flex-row flex-col font-regular font-poppins lg:my-32 -mt-20">
      <div className="lg:w-[50%] lg:h-full h-[50%] w-full md:w-full relative flex items-center justify-center ">
        <BlurImage
          src={homepinkcity?.topImg}
          alt="Jaipur"
          width={400}
          height={400}
          className="rounded-2xl z-10 lg:w-[21rem] lg:h-[20rem] w-[11rem] h-[11rem] md:w-[20rem] md:h-[20rem] absolute object-cover"
        />
        <Image
          src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/second-mandala.svg"
          alt="Mandala Design"
          width={400}
          height={400}
          ref={mandalaRef}
          className=" object-contain lg:w-[30rem] lg:h-[30rem] w-[20.5rem] h-[20.5rem] md:h-[30rem] md:w-[30rem] absolute "
        />
      </div>
      <div className="lg:w-[50%] lg:h-full w-full h-[50%] relative flex lg:flex-col flex-col-reverse  items-center justify-center">
        <DashedLineWithImage />
        <div className="absolute  lg:-bottom-10 -bottom-28 z-10 h-full lg:w-[35rem] w-[20rem] md:w-[46rem] ">
          <BlurImage
            src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/stroke-2.svg"
            alt="Stroke"
            width={400}
            height={400}
            className="object-contain opacity-35 w-full mt-5"
          />
          <p className="text-gray-700 absolute lg:top-56  lg:left-16 lg:text-sm md:text-lg lg:w-[30rem] md:w-[40rem] text-xs top-32 text-center lg:text-left md:top-[18rem] md:left-[4rem]"
             style={{ fontFamily: 'Georgia, serif' }}
          >
            {homepinkcity?.description?.split(" ").map((word, index) =>
              word === "ivory" || word === "machines" ? (
                <span key={index} className="text-[#bd6165]">
                  {word}{" "}
                </span>
              ) : (
                `${word} `
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
