"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OurCompanyItem } from "./types/constant";

interface AboutLayoutProps{
  companyData:OurCompanyItem;
}

const TeamPage:React.FC<AboutLayoutProps> =({companyData})=> {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (video && container) {
      gsap.registerPlugin(ScrollTrigger);

      const updateVideoTime = () => {
        const duration = video.duration;
        const scrollY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollFraction = scrollY / maxScroll;
        const videoTime = duration * scrollFraction;
        video.currentTime = videoTime;
      };

      window.addEventListener("scroll", updateVideoTime);

      return () => {
        window.removeEventListener("scroll", updateVideoTime);
      };
    }
  }, []);

  const homecompanyData=companyData?.Ourcompany[0]?.teampage;

  return (
    <div
      className="relative lg:h-[40rem] h-[37rem] md:h-[55rem] w-full overflow-hidden lg:top-0 top-10"
      ref={containerRef}
    >
      <div className="absolute top-12 w-full text-center z-10 ">
        {/* <h1 className="lg:text-3xl text-2xl font-medium  font-poppins text-white">
         {homecompanyData?.heading} <span className="text-red-600">{homecompanyData?.highlight}</span>
        </h1> */}
        <h1 className="lg:text-lg text-2xl font-regular font-poppins text-white">
         {homecompanyData?.quote}
        </h1>
      </div>
      <video
      id="background-video"
        ref={videoRef}
        className="absolute lg:top-0 top-24 left-0 lg:w-full lg:h-[40rem]  object-cover w-full "
        src={homecompanyData?.video}
        muted
        playsInline
      />
      
      <div className=" items text-center text-white  absolute bottom-14  lg:hidden ">
       
        <p className="text-center font-poppins  ">{homecompanyData?.description} </p>
        </div>
     
    </div>
  );
}
export default TeamPage;