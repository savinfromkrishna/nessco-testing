"use client";
import React from "react";
import { SustainabilityData } from "./types/constant";
import Page1 from "./Page1"
import dynamic from 'next/dynamic'
const Page2 = dynamic(() => import("./Page2"));
const Page3 = dynamic(() => import("./Page3"));

interface MainLayoutProps{
  sustainData:SustainabilityData;
}

const Pages:React.FC<MainLayoutProps> = ({sustainData}) => {
  
  return (
    <div className=" overflow-hidden bg-[#f2f2f2]">
      <Page1 sustainData={sustainData}/>
      <Page2 sustainData={sustainData}/>
      <Page3 sustainData={sustainData}/>
    </div>
  );
};

export default Pages;
