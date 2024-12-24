import React from "react";
import Page1 from "@/components/genuine-parts/Header";
const Page2 = dynamic(() => import("@/components/genuine-parts/Inventory"));
import dynamic from 'next/dynamic'
import { GenuinePartsItem } from "./types/constant";

interface GenuinePartsProps {
  genuinePartsData: GenuinePartsItem;
}

const Pages: React.FC<GenuinePartsProps> = ({ genuinePartsData }) => {
  return (
    <div className="bg-[#f2f2f2] pb-4">
      <Page1 genuinePartsData={genuinePartsData} />
      <Page2 genuinePartsData={genuinePartsData} />
    </div>
  );
};

export default Pages;
