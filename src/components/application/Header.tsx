"use client";
import React, { useEffect, useRef } from "react";
import { ApplicationItem } from "./types/constant";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from 'next/dynamic'
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
ssr: false,});

gsap.registerPlugin(ScrollTrigger);

interface ApplicationProps {
  applicationData: ApplicationItem;
}

const Page1: React.FC<ApplicationProps> = ({ applicationData }) => {
  const Header = applicationData?.Application[0]?.Header;
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const gradientRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.to(".page1-div", {
      scrollTrigger: {
        trigger: ".page1-h1",
        start: "top top+=1",
        end: "+=100",
        scrub: true,
      },
      height: "6.5rem",
      backdropFilter: "blur(120px)",
      background: "transparent",
      fontWeight: "300",
      paddingTop: "2.8rem",
      paddingLeft: "1.5rem",
      ease: "power1.out",
    });
    gsap.to(".page1-h1", {
      scrollTrigger: {
        trigger: ".page1-h1",
        start: "top top+=1",
        end: "+=100",
        scrub: true,
      },
      height: "6.5rem",
      fontSize: "2rem",
      color: "#424242",
      paddingTop: "3.2rem",
      paddingLeft: "1.5rem",
      ease: "power1.out",
    });
  }, []);

  useEffect(() => {
    if (borderRef.current) {
      gsap.fromTo(
        borderRef.current,
        { width: "2%" },
        {
          width: "12%",
          ease: "none",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "50% 50%",
            end: "140% 60%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    // Animate the gradient on page load, no scroll needed
    if (gradientRef.current) {
      gsap.fromTo(
        gradientRef.current,
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          duration: 1,
          ease: "power1.out",
        }
      );
    }
  }, []);

  return (
    <>
      <div className="font-regular font-poppins">
        <div className="lg:h-[8.5rem] h-[7rem] w-full bg-white lg:fixed relative z-10 page1-div font-semibold">
          <h1 className="absolute lg:bottom-0 -bottom-[0.3rem] left-4 lg:text-[3rem] text-[2.5rem] page1-h1 bg-gradient-to-r from-[#483d73] to-red-700  bg-clip-text text-transparent">
            {Header?.applicaion}
          </h1>
        </div>
        {/* Learn More Button */} 
        <div className="lg:pt-[8.5rem] pt-[1rem] pl-4 bg-white w-full pb-2 border-b-2">
          <ReusableForm
            formId="product page"
            buttonText="Learn More"
            dialogTitle="Get in Touch"
            dialogSubtitle="We'd love to hear from you!"
            imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
            showButton={true}
            secodaryButton={false}
            normalButton={false}
            learnMore={true}
          />
        </div>
        <div
          className="w-full lg:py-0 py-[4vh] relative lg:top-[4rem] lg:flex flex-col items-center justify-center hidden"
          ref={carouselRef}
        >
          <div className="lg:mb-[2rem] mb-[1rem]">
            <h2 className="lg:text-[2.8rem] text-[1.4rem] font-medium text-[#483d73]">
              {Header?.title?.split(" ").slice(0, -3).join(" ")}{" "}
              <span
                ref={gradientRef}
                className="bg-gradient-to-r from-transparent to-[#a397d3] text-[#483d73] px-1 rounded-[0.5rem] bg-[length:0%_100%] bg-left bg-no-repeat"
              >
                {Header?.title?.split(" ").slice(-3).join(" ")}
              </span>
            </h2>
          </div>
          <div className="w-[88%]">
            <p className="text-center lg:text-[1rem] text-sm">
              {Header?.paragraph}
            </p>
          </div>
          <div
            className="border-t-[0.2rem] border-solid border-red-700 w-[10rem] mt-[1rem]"
            ref={borderRef}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Page1;
