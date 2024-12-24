"use client";
import React, { useRef } from "react";
import NavLinksDemo from "@/components/Home/NavLinks";
import dynamic from 'next/dynamic'
import Machine from "@/components/Products/machine/MachineHome";
const ProductDescription = dynamic(() => import("@/components/Products/ProductDescription"));
const CupFormactionProcess = dynamic(() => import("@/components/Products/CupFormactionProcess"));
const ProductApplication = dynamic(() => import("@/components/Products/ProductApplication"));
const RelatedProducts = dynamic(() => import("@/components/Products/RelatedProducts"));
const ProcessFlow = dynamic(() => import("@/components/Products/ProcessFlow"));
const TechnicalSpecifications = dynamic(() => import("@/components/Products/TechnicalSpecification"));
const FaqProducts = dynamic(() => import("./FaqSection"));
import { SignupFormDemoProduct } from "@/components/Contact/CustomProductForm";
import { MachineType } from "./types/constant";

interface ProductLayoutProps {
  id: string;
  slug: string;
  IndividualProductsData: MachineType;
}

const ProductLayout: React.FC<ProductLayoutProps> = ({
  id,
  slug,
  IndividualProductsData,
}) => {
  const machine = IndividualProductsData;

  const overviewRef = useRef<HTMLDivElement>(null);
  const productDescriptionRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const applicationRef = useRef<HTMLDivElement>(null);
  const technicalSpecificationsRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const relatedProductsRef = useRef<HTMLDivElement>(null);

  if (!slug || !id || !machine) {
    return <div>Error: Missing required data</div>;
  }

  const navLinks = [
    { text: "Overview", ref: overviewRef },
    { text: "Product Description", ref: productDescriptionRef },
    { text: "Process", ref: processRef },
    { text: "Application", ref: applicationRef },
    { text: "Technical Specifications", ref: technicalSpecificationsRef },
    { text: "FAQs", ref: faqsRef },
    { text: "Related Products", ref: relatedProductsRef },
  ];
  function transformInputValue(inputValue) {
    // Transform the value using regex to replace dashes with spaces and capitalize each word
    const transformedValue = inputValue
      .replace(/\b[a-z]/g, (char) => char.toUpperCase())
      .replace(/-/g, " ");

    return transformedValue;
  }

  // Example usage:
  const inputValue = "paper-cup-machine";
  console.log(transformInputValue(inputValue)); // Output: "Paper Cup"

  return (
    <main className="bg-[#f2f2f2] w-full h-full">
      <Machine
        name={machine.name}
        image={machine.image}
        mimage={machine.mimage}
        product_heading={machine.product_heading}
        first_name={machine.first_name}
        specification_image={machine.specification_image}
        advantages={machine.advantages}
        introduction={machine.introduction}
        technicalSpecifications={machine.technicalSpecifications}
      />
      <NavLinksDemo type="product" navItems={navLinks} />

      <div className="h-full lg:px-10 px-4 mt-16 gap-4 flex lg:flex-row flex-col-reverse w-full">
        <div className="lg:w-[66.2%] ">
          <div className=" " ref={productDescriptionRef}>
            <ProductDescription machine={machine} />
          </div>
          <div className="h-auto  mt-10" ref={processRef}>
            {machine.drawingImage && <CupFormactionProcess />}

            <ProcessFlow page4Data={machine.Page4Data} />
          </div>
          <div className="mt-10" ref={applicationRef}>
            <ProductApplication applicationData={machine.applicationData} />
          </div>
          <div
            className="mt-10 lg:block hidden"
            ref={technicalSpecificationsRef}
          >
            <TechnicalSpecifications
              technicalSpecification={
                machine.TechnicalSpecificationComponentData
              }
            />
          </div>
          <div className="mt-10" ref={faqsRef}>
            <FaqProducts faqData={machine.FAQ} />
          </div>
        </div>
        <div className="lg:w-[33%] sticky">
          <SignupFormDemoProduct
            related_product={machine.related_product}
            name={machine.name}
            image={machine.image}
            first_name={machine.first_name}
            mimage={machine.mimage}
            product_heading={machine.first_name}
          />
        </div>
      </div>

      <div className="lg:hidden px-4 pt-10">
        <SignupFormDemoProduct
          related_product={machine.related_product}
          name={machine.name}
          first_name={machine.first_name}
          image={machine.image}
          mimage={machine.mimage}
          product_heading={machine.first_name}
        />
      </div>
      <div className="lg:mt-24 -mt-44" ref={relatedProductsRef}>
        <RelatedProducts related_product={machine.related_product} />
      </div>
    </main>
  );
};

export default ProductLayout;
