import React from "react";
import LinkUrl from "../LinkUrl";
import BlurImage from "../ui/BlurImage";

interface SectionProps {
  number: number;
  title: string;
  description: string;
  img: string;
  button: string;
  link: string;
}

const Section: React.FC<SectionProps> = ({
  number,
  title,
  description,
  img,
  button,
  link,
}) => {
  return (
    <>
      <LinkUrl href={`/knowledge-center/${link}`}>
        <div className="group flex lg:flex-row flex-col lg:p-8 p-6 mb-6 bg-black text-white rounded-[0.8rem] shadow-md font-poppins">
          <div className="lg:w-[80%] space-y-3">
            <h2 className="lg:text-3xl text-2xl font-medium">
              {number}. {title}
            </h2>
            <div className="border-t-2 w-[45%] ml-7"></div>
            <p className="text-md lg:text-left text-justify font-regular lg:ml-7">
              {description}
            </p>
          </div>
          <div className="flex flex-col lg:w-[20%] items-center justify-center space-y-4 relative">
            <BlurImage
              src={img}
              alt=""
              width={400}
              height={400}
              className="h-20 w-auto transition-transform duration-300 ease-in-out transform group-hover:scale-110"
            />
            <LinkUrl
              href={`/knowledge-center/${link}`}
              className="flex items-center justify-center text-white lg:hover:text-[#8c52ff] lg:absolute lg:bottom-0 lg:left-1/2 lg:transform lg:-translate-x-1/2"
            >
              {button}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                className="w-4 h-4 ml-2"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="32"
                  className="fill-white group-hover:fill-[#8c52ff]"
                />
                <path
                  d="M25 20 L37 32 L25 44"
                  className="stroke-black stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round group-hover:stroke-white"
                />
              </svg>
            </LinkUrl>
          </div>
        </div>
      </LinkUrl>
    </>
  );
};

export default Section;
