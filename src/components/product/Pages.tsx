import React from "react";
import Page1 from "@/components/product/Header";
import { ProductItem } from "./types/constant";
import dynamic from 'next/dynamic'
const Page2 = dynamic(() => import("@/components/product/ProductCatalouge"));

interface ProductProps {
  productData: ProductItem;
}

const Pages: React.FC<ProductProps> = ({ productData }) => {
  return (
    <>
      <Page1 productData={productData} />
      <Page2 productData={productData} />
    </>
  );
};

export default Pages;
