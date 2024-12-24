"use client";
import React from "react";
import BlurImage from "../ui/BlurImage";
import Arrow from "../../../public/assets/Support/RedirectionArrowImg.svg";
import LinkUrl from "@/components/LinkUrl";
import ReusableForm from "../Contact/ReuseableForm";

interface CardsProps {
  title: string;
  description: string;
  img: string;
  cards: Card[];
  type?: string;
}

interface Card {
  link?: string;
  title: string;
  img: string;
}

const Header: React.FC<CardsProps> = ({
  title,
  img,
  cards = [],
}) => {
  

  // Split the pathname by '/' and filter out any empty strings

  // Find the index of 'in/en' in the array

  // Get the segments after 'in/en' (excluding 'in' and 'en')

  // Prepare the dynamic URL for the Link component

  return (
    <div className="bg-[#f2f2f2]">
      <div className="w-full h-full bg-white mt-14 py-4 lg:px-12 px-8 flex justify-center font-poppins">
        <div className="lg:w-1/2">
          <h1 className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent lg:text-5xl text-3xl font-medium mb-2">
            {title}
          </h1>
          {/* <p className="text-sm">{description}</p>/ */}
          {/* Learn More Button */} 
        <div className="pt-2">
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
        <div className="lg:w-1/2 flex justify-end">
          <BlurImage
            src={img}
            alt={"Parts"}
            width={400}
            height={400}
            priority
            className={`hue-rotate-90 brightness-50 contrast-100 w-auto h-[7rem] lg:h-[8rem]`}
          />
        </div>
      </div>
      <div
        className={`grid font-poppins lg:grid-cols-4 gap-10 lg:px-14 px-8 py-8`}
      >
        {cards?.map((item, idx) => (
          <LinkUrl key={idx} href={`/support/${item?.link}`} >
          <div
            
            className="relative flex flex-col justify-center items-center bg-white rounded-xl py-10 px-10 lg:px-4 space-y-16 lg:hover:shadow-2xl shadow-xl lg:hover:scale-80 transition-all duration-300 group"
          >
            <h2 className="lg:group-hover:text-[#483d73] lg:text-black text-[#483d73] lg:text-2xl text-2xl font-medium text-center">
              {item?.title}
            </h2>
            <BlurImage
              src={item?.img}
              alt={"Parts"}
              width={400}
              height={400}
              className="w-[8rem] lg:group-hover:scale-90 transition-all duration-300"
            />

              <div className="absolute bottom-2 right-2 lg:group-hover:bg-[#483d7359] p-2 rounded-full transition-all duration-300">
                <BlurImage
                  src={Arrow}
                  alt={"ReDirection Arrow"}
                  width={400}
                  height={400}
                  className="w-[1.5rem]"
                />
              </div>
            
          </div>
          </LinkUrl>
        ))}
      </div>
    </div>
  );
};

export default Header;
