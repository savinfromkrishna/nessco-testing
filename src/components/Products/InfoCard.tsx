// components/InfoCard.tsx

import { FC } from "react";
import watch from "../../../public/assets/product/watch.svg";
import BlurImage from "../ui/BlurImage";

interface InfoCardProps {
  maxCups: number;
  sizeRange: string;
  speedRoundShapes: string;
  bmp100Compact: string;
  bmp100Super?: string;
}

const InfoCard: FC<InfoCardProps> = ({
  maxCups,
  sizeRange,
  speedRoundShapes,
  bmp100Compact,
}) => {
  return (
    <div className="w-full font-poppins flex items-center lg:px-14 px-4">
      <div className="grid grid-cols-2 lg:p-2">
        <div className="border-b-2 border-r-2 border-gray-300 p-4">
          <p className="text-base font-semibold">Speed</p>
          <p className="text-sm font-medium">{speedRoundShapes}</p>{" "}
          {/* Adjusted to use speedRoundShapes */}
        </div>
        <div className="border-b-2 border-gray-300 flex items-center p-4">
          <BlurImage
            src={watch}
            alt="Icon 1"
            width={200}
            height={200}
            className="w-8 h-8 mr-2"
          />
          <div className="text-3xl font-bold text-gray-500">{maxCups}</div>
        </div>
        <div className=" border-r-2 border-gray-300 p-4">
          <p className="text-base font-semibold">Paper Specification</p>
          <p className="text-sm font-medium">{sizeRange}</p>{" "}
          {/* Adjusted to use bmp100Compact */}
        </div>
        <div className="p-4">
          <p className="text-base font-semibold">Size Range</p>
          <p className="text-sm font-medium">{bmp100Compact}</p>{" "}
          {/* Adjusted to use sizeRange */}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
