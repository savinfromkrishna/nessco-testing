import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from 'next/dynamic'
const ReusableForm = dynamic(() => import("../Contact/ReuseableForm"), {
ssr: false,});
import BlurImage from "../ui/BlurImage";

type Page1Props = {
  page1machine: { image: string; description: string; title: string };
};

const Page1: React.FC<Page1Props> = ({ page1machine }) => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleScroll = () => {
      if (window.scrollY > 0) {
        gsap.to(h1Ref.current, {
          position: "fixed",
          backdropFilter: "blur(120px)",
          width: "100%",
          paddingTop: "3.2rem",
          paddingLeft: "2vw",
          fontSize: "1.5rem",
          top: 0,
          left: 0,
          zIndex: "10",
          height: "6rem",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(span1Ref.current, {
          WebkitTextFillColor: "#424242",
          display: "inline-block",
          fontWeight: "300",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(span2Ref.current, {
          WebkitTextFillColor: "#424242",
          display: "inline-block",
          fontWeight: "300",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(h1Ref.current, {
          position: "static",
          paddingTop: 0,
          fontSize: "2.8rem",
          paddingLeft: 0,
          height: "auto",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(span1Ref.current, {
          WebkitBackgroundClip: "text", // Added for text clipping
          WebkitTextFillColor: "transparent", // Added for transparent text
          display: "block",
          fontWeight: "500",
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(span2Ref.current, {
          WebkitBackgroundClip: "text", // Added for text clipping
          WebkitTextFillColor: "transparent", // Added for transparent text
          display: "block",
          fontWeight: "600",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const checkAndAddScroll = () => {
      if (mediaQuery.matches) {
        window.addEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Check and apply the correct listener initially
    checkAndAddScroll();

    // Re-run the check if the screen size changes
    mediaQuery.addEventListener("change", checkAndAddScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", checkAndAddScroll);
    };
  }, []);

  return (
    <div className="w-full mt-14 lg:px-[2rem] px-[1rem] pt-[1rem] lg:pb-[2rem] pb-[1rem] border-solid border-b-2 border-[#d6d6d6] bg-white flex font-poppins relative ">
      <div>
        <h1
          ref={h1Ref}
          className="lg:text-5xl text-3xl lg:mb-[1rem] mb-[0.5rem] lg:leading-[3rem] leading-[2rem] bg-gradient-to-r from-[#483d73] from-5% via-red-700 via-20% to-red-700  bg-clip-text text-transparent"
        >
          <span ref={span1Ref} className="font-medium block">
            {page1machine?.title?.split(" ").slice(0, -2).join(" ")}
          </span>{" "}
          <span ref={span2Ref} className="font-semibold block">
            {page1machine?.title?.split(" ").slice(-2).join(" ")}
          </span>
        </h1>

        {/* <p className="lg:w-[52rem] md:w-[36rem] w-[16rem] text-[0.8rem] lg:text-sm text-black">
          {page1machine?.description}
        </p> */}
        <div className="mt-4">
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
      </div>
      <div className="lg:h-[9rem] h-[6rem] lg:w-[9rem] w-[6rem] absolute right-0 bottom-[1rem] lg:bottom-[2rem] overflow-hidden">
        <BlurImage
          className="p-2 h-full w-full"
          width={400}
          height={400}
          src={page1machine?.image}
          alt={page1machine?.title || "No title available"}
        />
      </div>
    </div>
  );
};

export default Page1;
