"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Hero from "@/components/Home/Home";
import { HomeData } from "./types/constant";

const IOT = dynamic(() => import("./Iot"));
const AboutUs = dynamic(() => import("./AboutSection"), { ssr: false });
const NavLinksDemo = dynamic(() => import("@/components/Home/NavLinks"), {
  ssr: true,
});
const FeatureNews = dynamic(() => import("@/components/Home/FeatureNews"), {
  ssr: true,
});
const AnnouncementSection = dynamic(
  () => import("@/components/Home/AnnouncementSection")
);
const MarqueeSection = dynamic(
  () => import("@/components/Home/MarqueeSection"),
  { ssr: true }
);
const KnowMore = dynamic(() => import("@/components/Home/KnowMore"), {
  ssr: true,
});
const HomeMachine = dynamic(() => import("@/components/Home/HomeMachine"), {
  ssr: true,
});
const HomeTestimonial = dynamic(
  () => import("@/components/Home/TestimonialsSection"),
  { ssr: true }
);

interface MainLayoutProps {
  homeData: HomeData;
}

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default function MainLayout({ homeData }: MainLayoutProps) {
  const sectionRefs = {
    AnnouncementRef: useRef<HTMLDivElement>(null),
    aboutUsRef: useRef<HTMLDivElement>(null),
    infiniteCardsRef: useRef<HTMLDivElement>(null),
    knowMoreRef: useRef<HTMLDivElement>(null),
    homeMachineRef: useRef<HTMLDivElement>(null),
    newsFeatureRef: useRef<HTMLDivElement>(null),
    iotRef: useRef<HTMLDivElement>(null),
    ourexpertiseRef: useRef<HTMLDivElement>(null),
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
    { text: `${homeData?.home[0]?.navItems[4]?.text}`, ref: sectionRefs.iotRef },
    {
      text: `${homeData?.home[0]?.navItems[5]?.text}`,
      ref: sectionRefs.ourexpertiseRef,
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

      <NavLinksDemo navItems={navItems} />

      <div className="h-full font-poppins">
        <FadeInSection>
          <div
            ref={sectionRefs.AnnouncementRef}
            className="h-auto max-w-screen-2xl lg:pl-14 mx-auto mt-10"
          >
            <AnnouncementSection heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div
            id="machines"
            className="flex space-y-6 flex-col mt-20"
            ref={sectionRefs.homeMachineRef}
          >
            <div className="flex justify-center text-3xl items-center space-x-2">
              <h2 className="text-[#483d73] font-semibold">
                {homeData?.home[0]?.homeMachineSection?.title
                  .trim()
                  .replace(/\s+\S+$/, "")}
                <span className="font-semibold ml-1">
                  {homeData?.home[0]?.homeMachineSection?.title
                    .trim()
                    .match(/\S+$/)}
                </span>
              </h2>
            </div>
            <div className="text-sm w-full lg:w-full flex items-center justify-center">
              <p className="lg:w-[50%] text-sm lg:px-0 px-2 lg:text-base font-regular text-center">
                {homeData?.home[0]?.homeMachineSection?.subheading}
              </p>
            </div>
            <HomeMachine heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div
            id="aboutUs"
            ref={sectionRefs.aboutUsRef}
            className="h-auto max-w-screen-2xl mx-auto"
          >
            <AboutUs heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div
            id="clientele"
            className="max-w-screen-2xl mx-auto"
            ref={sectionRefs.infiniteCardsRef}
          >
            <MarqueeSection heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div
            ref={sectionRefs.iotRef}
            className="max-w-screen-2xl mx-auto lg:pt-0 pt-10"
          >
            <IOT heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div
            id="knowMore"
            className="h-auto overflow-hidden"
            ref={sectionRefs.ourexpertiseRef}
          >
            <KnowMore heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div id="news" ref={sectionRefs.newsFeatureRef}>
            <FeatureNews heroData={homeData} />
          </div>
        </FadeInSection>

        <FadeInSection>
          <div
            id="testimonials"
            className="relative bg-gradient-to-l via-purple-200 to-transparent h-screen overflow-hidden mb-10 "
            ref={sectionRefs.homeTestimonialRef}
          >
            <HomeTestimonial heroData={homeData} />
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}