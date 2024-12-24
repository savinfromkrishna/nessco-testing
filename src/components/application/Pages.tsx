"use client";
import React, { useState } from "react";
import Page1 from "@/components/application/Header";
import dynamic from 'next/dynamic'
const Page2 = dynamic(() => import("@/components/application/SelectProduct"));
const Page3 = dynamic(() => import("@/components/application/Technology"));
const Page4 = dynamic(() => import("@/components/application/CustomizedProjects"));
import { ApplicationItem } from "./types/constant";

export interface Product {
  link?:string;
  img: string;
  title: string;
  description: string;
  image: string;
}

interface ApplicationProps {
  applicationData: ApplicationItem;
}

const Pages: React.FC<ApplicationProps> = ({ applicationData }) => {
  const SelectProduct = applicationData?.Application[0]?.SelectProduct;
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    SelectProduct.products[0]
  );

  // Function to update the selected product
  const updateData = (newData: Product) => {
    setSelectedProduct(newData);
    console.log("selected product", selectedProduct);
  };

  return (
    <>
    <div className="bg-[#f2f2f2]">
      <Page1 applicationData={applicationData} />
      <Page2
        selectedProduct={selectedProduct}
        updateData={updateData}
        applicationData={applicationData}
      />
      <Page3
        selectedProduct={selectedProduct}
        applicationData={applicationData}
      />
      <Page4
        selectedProduct={selectedProduct}
        applicationData={applicationData}
      />
      </div>
    </>
  );
};

export default Pages;