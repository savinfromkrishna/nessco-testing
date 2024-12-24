"use client";
import React from "react";
import Arrow from "../../../public/assets/Support/RedirectionArrowImg.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BlurImage from "../ui/BlurImage";

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

const KnowledgeCenterGeneric: React.FC<CardsProps> = ({
  title,
  description,
  img,
  cards = [],
  type,
}) => {
  function formatToSlug(input) {
    return input
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9\-]/g, "") // Remove special characters except hyphens
      .replace(/-+/g, "-") // Collapse multiple hyphens into one
      .trim(); // Remove leading/trailing whitespace
  }
  const pathname = usePathname() || "";
  const componentCode = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();
  return (
    <div className="bg-[#f2f2f2]">
      <div className="w-full h-full bg-white mt-14 py-4 px-12 flex justify-center font-poppins">
        <div className="lg:w-1/2 hidden lg:block">
          <h1 className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent lg:text-5xl text-3xl font-medium mb-2">
            {title}
          </h1>
          <p className="text-sm">{description}</p>
        </div>
        <div className="lg:w-1/2 w-full flex-col flex items-center lg:items-end">
          <h1 className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent lg:text-5xl text-3xl font-medium mb-2 lg:hidden pb-2  text-center w-full">
            {title}
          </h1>
          <BlurImage
            src={img}
            alt={"Parts"}
            width={400}
            height={400}
            priority
            className={`hue-rotate-90 brightness-50 contrast-100 w-[8rem]`}
          />
          <p className="lg:hidden pt-2 text-justify text-sm">{description}</p>
        </div>
      </div>
      <div
        className={`grid font-poppins ${
          type === "support" || type === "knowyourproduct"
            ? "lg:grid-cols-4"
            : type === "knowyourbussiness" || type === "knowyourmachine"
            ? "lg:grid-cols-2"
            : "lg:grid-cols-3"
        } gap-10 lg:px-14 px-8 py-8`}
      >
        {cards?.map((item, idx) => (
          <Link
            key={idx}
            href={`${componentCode}/${formatToSlug(item?.title)}`}
          >
            <div className="relative flex flex-col justify-center items-center bg-white rounded-xl py-10 px-10 lg:px-4 space-y-16 lg:hover:shadow-2xl shadow-xl lg:hover:scale-80 transition-all duration-300 group">
              <h2 className="lg:group-hover:text-[#483d73] lg:text-black text-[#483d73] lg:text-2xl text-2xl font-medium text-center h-[4rem]">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCenterGeneric;
