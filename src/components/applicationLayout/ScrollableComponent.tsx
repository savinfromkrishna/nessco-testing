"use client";
import React from "react";
import BlurImage from "../ui/BlurImage";

interface Page2Props {
  page2product: {
    title: string;
    description: string;
    image: string;
  };
}

const Page2: React.FC<Page2Props> = ({ page2product }) => {
  return (
    <>
      <div className="w-full lg:h-[24rem] lg:mt-[5rem] mt-[6rem] mb-[1rem] lg:px-[4rem] lg:py-[2rem] px-[1rem] py-[2rem] flex lg:flex-row flex-col-reverse">
        <div className="lg:w-[50%] w-full h-full bg-white mr-[3rem] rounded-[1rem] flex items-center justify-center  py-[1.5rem] px-[2rem]">
          <div className="h-full lg:h-[16rem] relative w-full overflow-auto scroll-wrapper style-1 ">
            <p className="font-poppins lg:text-[1rem] text-left text-[0.8rem] lg:ml-[1.5rem] ml-[1rem]">
              {page2product?.description}
            </p>
          </div>
        </div>

        <BlurImage
          className="lg:w-[50%] h-full w-full mb-[1rem] lg:mb-0  rounded-[1rem]"
          width={600}
          height={600}
          priority
          src={page2product?.image}
          alt="Product"
        />
      </div>
    </>
  );
};

export default Page2;
