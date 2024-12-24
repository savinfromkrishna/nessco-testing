import React from "react";
import Page1 from "@/components/maintainance/Header";
import { MaintainanceItem } from "./types/constant";

interface MaintainanceProps {
  maintainanceData: MaintainanceItem;
}

const Pages: React.FC<MaintainanceProps> = ({ maintainanceData }) => {
  return (
    <>
      <Page1 maintainanceData={maintainanceData} />
    </>
  );
};

export default Pages;
