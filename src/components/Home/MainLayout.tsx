import React from "react";
import { HomeData } from "./types/constant";
import Hero from "@/components/Home/Home";
import AnnouncementSection from "@/components/Home/AnnouncementSection";
import HomeMachine from "@/components/Home/HomeMachine";
import AboutUs from "./AboutSection";
import MarqueeSection from "@/components/Home/MarqueeSection";
import IOT from "./Iot";
import KnowMore from "@/components/Home/KnowMore";
import FeatureNews from "@/components/Home/FeatureNews";
import HomeTestimonial from "@/components/Home/TestimonialsSection";
import NavLinksClient from "./NavLinksClient";
interface MainLayoutProps {
  homeData: HomeData;
}
export default function MainLayout({ homeData }: MainLayoutProps) {
  const componentOrder = [
    "AnnouncementSection",
    "HomeMachine",
    "AboutUs",
    "MarqueeSection",
    "IOT",
    "KnowMore",
    "FeatureNews",
    "HomeTestimonial",
  ];
  const navItems = componentOrder.map((componentName, index) => ({
    text: homeData?.home[0]?.navItems[index]?.text,
    ref: { current: null },
  }));
  const renderComponent = (componentName: string) => {
    const props = { heroData: homeData };
    switch (componentName) {
      case "AnnouncementSection":
        return <AnnouncementSection {...props} />;
      case "HomeMachine":
        return <HomeMachine {...props} />;
      case "AboutUs":
        return <AboutUs {...props} />;
      case "MarqueeSection":
        return <MarqueeSection {...props} />;
      case "IOT":
        return <IOT {...props} />;
      case "KnowMore":
        return <KnowMore {...props} />;
      case "FeatureNews":
        return <FeatureNews {...props} />;
      case "HomeTestimonial":
        return <HomeTestimonial {...props} />;
      default:
        return null;
    }
  };

  return (
    <main className="relative bg-[#f2f2f2] my-14 gap-2 h-full">
      <div className="top-2 relative">
        <Hero heroData={homeData} />
      </div>
      <NavLinksClient navItems={navItems} />
      <div className="h-full font-poppins">
        {componentOrder.map((componentName) => (
          <div
            key={componentName}
            className={getClassNameForComponent(componentName)}
          >
            {renderComponent(componentName)}
          </div>
        ))}
      </div>
    </main>
  );
}

function getClassNameForComponent(componentName: string): string {
  switch (componentName) {
    case "AnnouncementSection":
      return "h-auto max-w-screen-2xl lg:pl-14 mx-auto mt-10";
    case "HomeMachine":
      return "flex space-y-6 flex-col mt-20";
    case "AboutUs":
      return "h-auto max-w-screen-2xl mx-auto";
    case "MarqueeSection":
      return "max-w-screen-2xl mx-auto";
    case "IOT":
      return "max-w-screen-2xl mx-auto lg:pt-0 pt-10";
    case "KnowMore":
      return "h-auto overflow-hidden";
    case "FeatureNews":
      return "";
    case "HomeTestimonial":
      return "relative bg-gradient-to-l via-purple-200 to-transparent h-screen overflow-hidden mb-10";
    default:
      return "";
  }
}
