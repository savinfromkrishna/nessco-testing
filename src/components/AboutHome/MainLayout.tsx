"use client";
import {  useRef } from "react";
import dynamic from 'next/dynamic'
const Missionvission = dynamic(() => import("@/components/AboutHome/MissionVission"));
const OurCompany = dynamic(() => import("@/components/AboutHome/OurCompany"));
const PinkCity = dynamic(() => import("@/components/AboutHome/PinkCity"));
const FeatureProject = dynamic(() => import("@/components/AboutHome/FeatureProject"));
const Awards = dynamic(() => import("@/components/AboutHome/Awards"));
const ExpandableCardDemo = dynamic(() => import("@/components/AboutHome/NewOurstrenght"));
const NewSustainability = dynamic(() => import("@/components/AboutHome/NewSustainability"));
import Homenew from "@/components/AboutHome/Homenew";
import { AboutItem } from "./types/constant";

interface MainLayoutProps {
  aboutData: AboutItem;
}

export default function MainLayout({ aboutData }: MainLayoutProps) {
  const missionRef = useRef<HTMLDivElement>(null);
  const ourcompanyRef = useRef<HTMLDivElement>(null);
  const ourstrenghtRef = useRef<HTMLDivElement>(null);
  const pinkcityRef = useRef<HTMLDivElement>(null);
  const sustainableRef = useRef<HTMLDivElement>(null);
  const featureprojectRef = useRef<HTMLDivElement>(null);
  const awardRef = useRef<HTMLDivElement>(null);
 

  return (
    <main className=" overflow-hidden bg-[#f2f2f2]">
      {/* <Home /> */}
      <Homenew aboutData={aboutData} />
      <div className="">{/* <NavLinksDemo navItems={navItems}  /> */}</div>
      <div id="mission and vission" className="" ref={missionRef}>
        <Missionvission aboutData={aboutData} />
      </div>
      

      <div
        id="Our Company"
        className="lg:mt-28 md:mt-28 mt-28"
        ref={ourcompanyRef}
      >
        <OurCompany  aboutData={aboutData} />
      </div>

      <div id="Our Strenght" ref={ourstrenghtRef} className="mt-28">
        <ExpandableCardDemo aboutData={aboutData} />
      </div>

      <div id="The Pink City" ref={pinkcityRef} className="mb-10 mt-28 z-10">
        <PinkCity aboutData={aboutData} />
      </div>
      <div className="mt-28" id="Sustainability" ref={sustainableRef}>
        <NewSustainability aboutData={aboutData} />
      </div>

      <div className="mt-28" id="Featured Projects" ref={featureprojectRef}>
        <FeatureProject aboutData={aboutData} />
      </div>
      <div className="mt-32 " id="OurAwards" ref={awardRef}>
        <Awards aboutData={aboutData} />
      </div>
    </main>
  );
}
