"use client";
import React from "react";
import Hero from "@/components/Home/Home";
import { HomeData } from "./types/constant";


interface MainLayoutProps {
  homeData: HomeData;
}


export default function MainLayout({ homeData }: MainLayoutProps) {
  

  return (
    <main className="relative bg-[#f2f2f2] my-14 gap-2 h-full">
      <div className="top-2 relative">
        <Hero heroData={homeData} />
      </div>

    
    </main>
  );
}

