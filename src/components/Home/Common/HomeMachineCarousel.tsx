"use client";

import React from "react";
// import Carousel from "@/components/ui/HomeMachine-cards-carousel";
import Card from "@/components/ui/HomeMachineCard";
import dynamic from "next/dynamic";

// Dynamically import components
const Carousel = dynamic(
  () => import("@/components/ui/HomeMachine-cards-carousel")
);
// const Card = dynamic(() => import("@/components/ui/HomeMachineCard"));

// Define the CardData interface
interface CardData {
  content?: React.ReactNode;
  category: string;
  firstLink: string;
  firstname: string;
  secondname: string;
  secondLink: string;
  description: string;
  image: string;
  title: string;
  speed: number;
  unit: string;
  icon: string;
  items: { className: string; text: string }[];
}

// Define the props for HomeMachineCarousel
interface HomeMachineCarouselProps {
  filteredCardsData: CardData[];
  activeStep: string; // activeStep is a string (category name)
}

const HomeMachineCarousel: React.FC<HomeMachineCarouselProps> = ({
  filteredCardsData,
  activeStep,
}) => {
  const cards = filteredCardsData?.map((card) => (
    <Card key={card?.title} card={card} activeStep={activeStep} />
  ));

  return (
    <div className="w-full h-full -mt-14">
      <Carousel items={cards} />
    </div>
  );
};

export default HomeMachineCarousel;
