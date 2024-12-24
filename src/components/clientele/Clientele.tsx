"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ClienteleItem } from "./types/constant";

interface AboutLayoutProps {
  clienteleData: ClienteleItem;
}

const Clientele: React.FC<AboutLayoutProps> = ({ clienteleData }) => {
  const homeclientData = clienteleData?.Clientele[0]?.content?.heading;

  const leftHandRef = useRef<HTMLDivElement>(null);
  const rightHandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Check screen width to determine mobile or desktop behavior
    const isMobile = window.innerWidth <= 768; // You can adjust the breakpoint

    const mobileX = 40; // Movement for mobile screens
    const desktopX = 170; // Movement for desktop screens

    const movementX = isMobile ? mobileX : desktopX;

    // Add a delay before starting the animation
    tl.to(leftHandRef.current, {
      x: movementX, // Move right
      duration: 4,
      ease: "power2.inOut",
      delay: 1, // Delay before starting the animation
    }).to(
      rightHandRef.current,
      {
        x: -movementX, // Move left
        duration: 4,
        ease: "power2.inOut",
      },
      "<"
    ); // "<" syncs the two animations
  }, []);

  return (
    <>
      <div className="lg:h-full lg:w-full h-[50rem] w-full bg-black">
        <h1 className="relative font-poppins font-medium lg:text-5xl text-3xl lg:left-8 left-4 lg:top-[5rem] top-[5rem] text-white z-10">
          {homeclientData?.title}
        </h1>
        <div className="flex justify-center items-center h-full w-full lg:mt-[6rem] -mt-[10rem] overflow-hidden">
          {/* Left Hand */}
          {/* <div className="relative lg:top-20 lg:left-[8rem] z-10" ref={leftHandRef} >
            <Image
              src={homeclientData?.lefthand}
              alt="lefthand"
              height={500}
              width={500}
              className="object-cover"
              priority // Prioritize loading this image
            />
          </div> */}

          {/* Right Hand */}
          {/* <div className="relative lg:right-[8rem] lg:top-16 -top-3" ref={rightHandRef} >
            <Image
              src={homeclientData?.righthand}
              alt="righthand"
              height={500}
              width={500}
              className="object-cover"
              priority // Prioritize loading this image
            />
          </div> */}
          {/* Left Gradient */}
          <div className="absolute lg:left-[15%] left-0 top-0 h-full w-1/4 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>

          {/* Right Gradient */}
          <div className="absolute  lg:right-[15%] right-0 top-0 h-full w-1/4 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
          <video
            id="background-video"
            className="lg:w-[70%] w-full h-auto object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://assets.nesscoindustries.com/public/assets/resources/clientel/clientele-banner.webm"
          >
            <source
              src="https://assets.nesscoindustries.com/public/assets/resources/clientel/clientele-banner.webm"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="lg:flex lg:flex-row flex-col w-full font-poppins lg:px-8 text-white relative lg:mt-[2rem] -mt-[20rem] px-2">
          <div className="lg:w-2/5 lg:text-5xl text-3xl font-medium lg:top-0 relative top-32 text-left pl-2">
            <p className="lg:w-[16rem]">{homeclientData?.boldHeading}</p>
          </div>

          <div className="lg:w-3/5 relative lg:text-right lg:pr-8 p-2 lg:p-0 lg:top-0 top-[10rem] text-left w-[80%] text-sm font-poppins font-regular">
            <p>{homeclientData?.peraOne}</p>
            <p className="font-bold pt-2 text-md">{homeclientData?.peraTwo}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientele;
