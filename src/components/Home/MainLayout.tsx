"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Home/Home";
import { HomeData } from "./types/constant";


interface MainLayoutProps {
  homeData: HomeData;
}

export default function MainLayout({ homeData }: MainLayoutProps) {
  const sectionRefs = {
    AnnouncementRef: useRef<HTMLDivElement>(null),
    homeMachineRef: useRef<HTMLDivElement>(null),
    aboutUsRef: useRef<HTMLDivElement>(null),
    infiniteCardsRef: useRef<HTMLDivElement>(null),
    iotRef: useRef<HTMLDivElement>(null),
    knowMoreRef: useRef<HTMLDivElement>(null),
    newsFeatureRef: useRef<HTMLDivElement>(null),
    homeTestimonialRef: useRef<HTMLDivElement>(null),
  };

  const navItems = [
    {
      text: `${homeData?.home[0]?.navItems[0]?.text}`,
      ref: sectionRefs.AnnouncementRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[1]?.text}`,
      ref: sectionRefs.homeMachineRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[2]?.text}`,
      ref: sectionRefs.aboutUsRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[3]?.text}`,
      ref: sectionRefs.infiniteCardsRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[4]?.text}`,
      ref: sectionRefs.iotRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[5]?.text}`,
      ref: sectionRefs.knowMoreRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[6]?.text}`,
      ref: sectionRefs.newsFeatureRef,
    },
    {
      text: `${homeData?.home[0]?.navItems[7]?.text}`,
      ref: sectionRefs.homeTestimonialRef,
    },
  ];

  return (
    <main className="relative bg-[#f2f2f2] my-14 gap-2 h-full">
      <div className="top-2 relative">
        <Hero heroData={homeData} />
      </div>

     
    </main>
  );
}
