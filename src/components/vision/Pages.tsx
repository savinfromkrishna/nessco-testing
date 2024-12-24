import React from "react";
import Page1 from "@/components/vision/Header";
const Page2 = dynamic(() => import("@/components/vision/Cards"));
import dynamic from 'next/dynamic'
import { VisionItem } from "./types/constant";

interface VisionProps {
  visionData: VisionItem;
}

const Pages: React.FC<VisionProps> = ({ visionData }) => {
  return (
    <>
      <div className="flex flex-col items-center bg-[#f2f2f2]">
        <Page1 visionData={visionData} />
        <Page2 visionData={visionData} />
      </div>
    </>
  );
};

export default Pages;
