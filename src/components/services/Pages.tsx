import React from "react";
import Page1 from "@/components/services/Header";
import { ServicesItem } from "./types/constant";

interface ServicesProps {
  servicesData: ServicesItem;
}

const Pages: React.FC<ServicesProps> = ({ servicesData }) => {
  return (
    <>
      <Page1 servicesData={servicesData} />
    </>
  );
};

export default Pages;
