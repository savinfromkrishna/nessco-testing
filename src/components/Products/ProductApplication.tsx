"use client";
import React from "react";
import { Card, Carousel } from "../ui/Product-cards-carousel";
import { ApplicationDataType } from "./types/constant";

interface ApplicationDataTypeProps {
  applicationData: ApplicationDataType[]; // Assuming this is an array of items
}

const ProductApplication: React.FC<ApplicationDataTypeProps> = ({ applicationData }) => {
  const cards = applicationData?.map((card, index) => (
    <Card key={card?.src} card={card} index={index} />
  ));

  return (
    <div className="w-full bg-white h-full lg:p-6 p-4 flex flex-col rounded-xl font-poppins">
      <h2 className="lg:text-3xl text-2xl text-red-700 font-semibold">Applications</h2>
      <Carousel items={cards} />
    </div>
  );
};

export default ProductApplication;
