"use client";
import React, { useMemo, useState } from "react";
import dynamic from 'next/dynamic'
import { HomeData } from "./types/constant";

// Dynamically import components
const HomeMachineCarousel = dynamic(
  () => import("./Common/HomeMachineCarousel")
);
const Stepper = dynamic(() => import("../ui/Stepper"));

// Define the type for each card item
type CardItem = {
  category: string;
  firstname: string;
  secondname: string;
  description: string;
  image: string;
  title: string;
  speed: number;
  unit: string;
  icon: string;
  items: { className: string; text: string }[];
};

interface HomeMachineLayoutProps {
  heroData: HomeData;
}

const HomeMachine: React.FC<HomeMachineLayoutProps> = ({ heroData }) => {
  const [activeStep, setActiveStep] = useState(0);

  const categories = heroData?.home[2]?.data.stepperFilter || [];
  const productData = heroData?.home[2]?.data?.products || [];

  const filteredCardsData = useMemo(() => {
    const activeCategory = categories[activeStep] || "";
    if (activeCategory === "All paper Products") {
      return productData;
    } else {
      return productData?.filter((card: CardItem) =>
        card?.category?.split(",").includes(activeCategory?.name)
      );
    }
  }, [activeStep, categories, productData]);

  return (
    <div className="h-full w-full max-w-screen-2xl mx-auto">
      {/* Stepper to switch between categories */}
      <Stepper categories={categories} onStepChange={setActiveStep} />

      {/* Carousel displaying the filtered products */}
      <div className="h-[90%] mt-4">
        <HomeMachineCarousel
          activeStep={categories[activeStep]?.name || ""}
          filteredCardsData={filteredCardsData}
        />
      </div>
    </div>
  );
};

export default HomeMachine;
