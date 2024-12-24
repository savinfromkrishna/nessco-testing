"use client";
import React from "react";

import { Machine } from "./types/constant";
import BlurImage from "../ui/BlurImage";

interface ProductDescriptionProps {
  machine: Machine;
}
const ProductDescription: React.FC<ProductDescriptionProps> = ({ machine }) => {
  return (
    <div className="h-full lg:-mt-0 -mt-32 bg-white rounded-xl font-poppins">
      <div className="h-full lg:p-8 p-4 rounded-xl flex flex-col">
        {/* Heading */}
        {(machine?.descriptionHeading ||
          machine?.descriptionSubHeading ||
          machine?.product_description) && (
          <div className="w-full h-auto justify-start mb-2">
            {machine?.descriptionHeading && (
              <span className="text-[#483d73] font-medium lg:text-3xl text-2xl">
                {machine.descriptionHeading}
              </span>
            )}
            {machine?.descriptionSubHeading && (
              <span className="text-red-700 ml-2 font-semibold lg:text-3xl text-2xl">
                {machine.descriptionSubHeading}
              </span>
            )}
            {machine?.product_description && (
              <p className="text-sm text-black font-poppins mt-4">
                {machine.product_description}
              </p>
            )}
          </div>
        )}

        <div className="relative items-center p-4 flex space-x-2 justify-center">
          {machine?.descriptionSpeed && (
            <div className="lg:h-48 h-40 flex flex-col lg:w-64 px-4 lg:space-y-2">
              <BlurImage
                src="https://assets.nesscoindustries.com/public/assets/product/product-layout-speed-icon.webp"
                alt="Speed"
                width={80}
                height={80}
                className="lg:h-16 lg:w-16 h-12 w-12 object-contain mx-auto"
              />
              <p className="text-[#483d78] text-center lg:text-xl text-md">
                {machine.descriptionSpeed}
              </p>
              <p className="lg:text-base text-xs justify-center  lg:mt-4 mt-2 text-center font-regular w-full">
                {machine?.technicalSpecifications?.specifications[0]?.title ||
                  "N/A"}
              </p>
            </div>
          )}
          {machine?.descriptionSize && (
            <div className="lg:h-48 h-40 lg:w-64 px-4 flex flex-col border-l-2 border-gray-300 border-r-2 lg:space-y-2">
              <BlurImage
                src="https://assets.nesscoindustries.com/public/assets/product/product-layout-specs-icon.webp"
                alt="Paper Specification"
                width={80}
                height={80}
                className="lg:h-16 lg:w-16 h-12 w-12 object-contain mx-auto"
              />
              <p className="text-[#483d78] text-center lg:text-xl text-md">
                {machine.descriptionSize}
              </p>
              <p className="lg:text-base text-xs lg:mt-4 mt-2  text-center font-regular w-full">
                {machine?.technicalSpecifications?.specifications[2]?.title ||
                  "N/A"}
              </p>
            </div>
          )}
          {machine?.descriptionRange && (
            <div className="lg:h-48 h-40 lg:w-64 px-4 flex flex-col lg:space-y-2">
              <BlurImage
                src="https://assets.nesscoindustries.com/public/assets/product/product-layout-range-icon.webp"
                alt="size range"
                width={80}
                height={80}
                className="lg:h-16 lg:w-16 h-12 w-12 object-contain mx-auto"
              />
              <p className="text-[#483d78] text-center lg:text-xl text-md">
                {machine.descriptionRange}
              </p>
              <p className="lg:text-base text-xs lg:mt-4 mt-2 text-center font-regular w-full">
                {machine?.technicalSpecifications?.specifications[1]?.title ||
                  "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
