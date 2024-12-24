// components/PinkPage.tsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./secondpage.module.css";
const Bird = dynamic(() => import("./Bird"), { ssr: false });
import dynamic from 'next/dynamic'
import { PinkCityData } from "./types/constant";
import BlurImage from "../ui/BlurImage";
import Image from 'next/image';
interface AboutLayoutProps {
  pinkcityData: PinkCityData;
}
const PinkPage: React.FC<AboutLayoutProps> = ({ pinkcityData }) => {
  const homepinkcity = pinkcityData?.pinkcity[0]?.pinkPageContent;

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
          mandala.classList.add(styles["scales-up"]);
        },
        onLeaveBack: () => {
          mandala.classList.remove(styles["scales-up"]);
        },
      });
    }
  }, []);

  return (
    <div className="lg:h-[30rem] h-[50rem] md:h-[70rem] w-full flex lg:flex-row flex-col-reverse font-regular font-poppins my-32">
      <div className="lg:w-[50%] lg:h-full w-full h-[50%] relative flex lg:flex-col flex-col-reverse  items-center">
        {homepinkcity?.birdComponent && <Bird />}
        <div className="absolute lg:-bottom-20 z-10 h-full lg:w-[35rem] w-[20rem] md:w-[46rem] -bottom-44 md:-bottom-16">
          <BlurImage
            src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/stroke-1.svg"
            alt="Stroke"
            width={400}
            height={400}
            className="object-contain opacity-35 w-full"
          />
          <p
            className="text-gray-700 absolute lg:top-60  lg:left-16 lg:text-sm md:text-lg lg:w-[30rem] md:w-[40rem] text-xs top-32 text-center lg:text-left md:top-[18rem] md:left-24"
            style={{ fontFamily: "Georgia, serif" }}
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
      <div className="lg:w-[50%] w-full lg:h-full h-[50%] md:w-full relative flex items-center justify-center ">
        <BlurImage
          src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/hawamahal.webp"
          alt="Jaipur"
          width={400}
          height={400}
          className="rounded-full lg:w-[17rem] lg:h-[17rem] w-[13rem] h-[13rem] md:w-[17rem] md:h-[17rem]  absolute object-cover"
        />
        <Image
          src="https://assets.nesscoindustries.com/public/assets/about/pinkcity/pink-mandala.svg"
          alt="Mandala Design"
          width={400}
          height={400}
          ref={mandalaRef}
          className="object-contain z-10 lg:w-[30rem] lg:h-[30rem] w-[20.5rem] h-[20.5rem] md:h-[30rem] md:w-[30rem] absolute "
        />
      </div>
    </div>
  );
};

export default PinkPage;
