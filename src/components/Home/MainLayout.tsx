// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import { HomeData } from "./types/constant";

// // Components that are always loaded
// import Hero from "@/components/Home/Home";
// import NavLinksDemo from "@/components/Home/NavLinks";

// // Dynamically imported components
// const AnnouncementSection = dynamic(() => import("@/components/Home/AnnouncementSection"), { ssr: false });
// const HomeMachine = dynamic(() => import("@/components/Home/HomeMachine"), { ssr: false });
// const AboutUs = dynamic(() => import("./AboutSection"), { ssr: false });
// const MarqueeSection = dynamic(() => import("@/components/Home/MarqueeSection"), { ssr: false });
// const IOT = dynamic(() => import("./Iot"), { ssr: false });
// const KnowMore = dynamic(() => import("@/components/Home/KnowMore"), { ssr: false });
// const FeatureNews = dynamic(() => import("@/components/Home/FeatureNews"), { ssr: false });
// const HomeTestimonial = dynamic(() => import("@/components/Home/TestimonialsSection"), { ssr: false });

// interface MainLayoutProps {
//   homeData: HomeData;
// }

// export default function MainLayout({ homeData }: MainLayoutProps) {
//   const [loadedComponents, setLoadedComponents] = useState<string[]>([]);
//   const observerRefs = useRef<{ [key: string]: IntersectionObserver }>({});

//   const sectionRefs = {
//     AnnouncementSection: useRef<HTMLDivElement>(null),
//     HomeMachine: useRef<HTMLDivElement>(null),
//     AboutUs: useRef<HTMLDivElement>(null),
//     MarqueeSection: useRef<HTMLDivElement>(null),
//     IOT: useRef<HTMLDivElement>(null),
//     KnowMore: useRef<HTMLDivElement>(null),
//     FeatureNews: useRef<HTMLDivElement>(null),
//     HomeTestimonial: useRef<HTMLDivElement>(null),
//   };

//   const componentOrder = [
//     "AnnouncementSection",
//     "HomeMachine",
//     "AboutUs",
//     "MarqueeSection",
//     "IOT",
//     "KnowMore",
//     "FeatureNews",
//     "HomeTestimonial",
//   ];

//   const navItems = componentOrder.map((componentName, index) => ({
//     text: homeData?.home[0]?.navItems[index]?.text,
//     ref: sectionRefs[componentName as keyof typeof sectionRefs],
//   }));

//   useEffect(() => {
//     // Load the first two components initially
//     setLoadedComponents(componentOrder.slice(0, 2));

//     // Set up intersection observers for each component
//     componentOrder.forEach((componentName, index) => {
//       const ref = sectionRefs[componentName as keyof typeof sectionRefs];
//       if (ref.current) {
//         observerRefs.current[componentName] = new IntersectionObserver(
//           (entries) => {
//             if (entries[0].isIntersecting && !loadedComponents.includes(componentName)) {
//               setLoadedComponents((prev) => [
//                 ...prev,
//                 componentName,
//                 componentOrder[index + 1],
//               ].filter(Boolean));
//             }
//           },
//           { threshold: 0.1 }
//         );
//         observerRefs.current[componentName].observe(ref.current);
//       }
//     });

//     // Cleanup function
//     return () => {
//       Object.values(observerRefs.current).forEach((observer) => observer.disconnect());
//     };
//   }, []);

//   const renderComponent = (componentName: string) => {
//     if (!loadedComponents.includes(componentName)) {
//       return null;
//     }

//     const props = { heroData: homeData };
//     switch (componentName) {
//       case "AnnouncementSection":
//         return <AnnouncementSection {...props} />;
//       case "HomeMachine":
//         return <HomeMachine {...props} />;
//       case "AboutUs":
//         return <AboutUs {...props} />;
//       case "MarqueeSection":
//         return <MarqueeSection {...props} />;
//       case "IOT":
//         return <IOT {...props} />;
//       case "KnowMore":
//         return <KnowMore {...props} />;
//       case "FeatureNews":
//         return <FeatureNews {...props} />;
//       case "HomeTestimonial":
//         return <HomeTestimonial {...props} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <main className="relative bg-[#f2f2f2] my-14 gap-2 h-full">
//       <div className="top-2 relative">
//         <Hero heroData={homeData} />
//       </div>
//       <NavLinksDemo navItems={navItems} />
//       <div className="h-full font-poppins">
//         {componentOrder.map((componentName) => (
//           <div
//             key={componentName}
//             ref={sectionRefs[componentName as keyof typeof sectionRefs]}
//             className={getClassNameForComponent(componentName)}
//           >
//             {renderComponent(componentName)}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// function getClassNameForComponent(componentName: string): string {
//   switch (componentName) {
//     case "AnnouncementSection":
//       return "h-auto max-w-screen-2xl lg:pl-14 mx-auto mt-10";
//     case "HomeMachine":
//       return "flex space-y-6 flex-col mt-20";
//     case "AboutUs":
//       return "h-auto max-w-screen-2xl mx-auto";
//     case "MarqueeSection":
//       return "max-w-screen-2xl mx-auto";
//     case "IOT":
//       return "max-w-screen-2xl mx-auto lg:pt-0 pt-10";
//     case "KnowMore":
//       return "h-auto overflow-hidden";
//     case "FeatureNews":
//       return "";
//     case "HomeTestimonial":
//       return "relative bg-gradient-to-l via-purple-200 to-transparent h-screen overflow-hidden mb-10";
//     default:
//       return "";
//   }
// }
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


