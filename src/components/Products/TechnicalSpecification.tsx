import React, { useEffect } from "react";
import SpecificationTable from "./SpecificationTable";
import { TechnicalSpecificationComponentDataType } from "./types/constant";
import BlurImage from "../ui/BlurImage";
interface TechnicalSpecificationProps {
  technicalSpecification: TechnicalSpecificationComponentDataType;
}
const TechnicalSpecifications: React.FC<TechnicalSpecificationProps> = ({
  technicalSpecification,
}) => {
  useEffect(() => {
    console.log("I AM IMAG ONE ", technicalSpecification);
  }, []);
  return (
    <div className="w-full h-full flex flex-row font-poppins">
      {/* Left Side: Specification and Image */}
      <div className="flex-grow bg-white p-8 rounded-2xl flex flex-col justify-between">
        <div className="mb-6">
          <h2 className="font-poppins text-3xl font-medium text-[#483d73]">
            {technicalSpecification?.title}
          </h2>
        </div>
        <div className=" flex flex-row items-center justify-center space-x-4">
          <SpecificationTable technicalSpecification={technicalSpecification} />
          <div className="w-[50%] h-full flex items-center justify-center">
            <BlurImage
              src={technicalSpecification?.src}
              width={400}
              height={400}
              alt="Specification Glass"
              className="w-full h-max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TechnicalSpecifications;
