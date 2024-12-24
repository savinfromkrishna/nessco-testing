import React from "react";
import { SwipeCarousel } from "./Common/slider";
import { HomeData } from "./types/constant";
import { TestimonialAnimation } from "../ui/testinomialAnimation";
interface TestinomialLayoutProps {
  heroData: HomeData;
}
const HomeTestimonial: React.FC<TestinomialLayoutProps> = ({ heroData }) => {
  const testinomialData = heroData?.home[8]?.data;

  // Provide a fallback value for `testinomialData?.testinomial`
  const testimonialItems = testinomialData?.testinomial || [];
  return (
    <div className="flex flex-col  lg:flex-row   h-full  z-20 max-w-7xl mx-auto relative overflow-hidden">
      <div className="px-2 w-full h-[45%] lg:h-full lg:w-1/3 lg:flex lg:flex-col lg:items-start lg:justify-end flex flex-col">
        <h2 className="text-[#483d73] text-center lg:text-justify  pb-3 lg:pb-0 lg:ml-6 text-3xl font-montserrat lg:leading-tight font-semibold">
          {testinomialData?.heading}
        </h2>
        <div className="flex flex-col">
          <h3 className="lg:text-5xl lg:text-left text-center font-bold ml-4 lg:mt-12 mt-4">
            {testinomialData?.subheading}
          </h3>
          <h4 className="text-5xl flex flex-row font-bold lg:ml-4 lg:mt-2">
            {testinomialData?.secondsubheading?.substring(0, 3)}
          </h4>
          <h5 className="hidden lg:block mt-10 text-lg text-center font-poppins text-[#483d73]">
            {testinomialData?.description}
          </h5>
        </div>
        <SwipeCarousel heroData={heroData} />
      </div>
      <div className="w-full h-full mt-8 lg:mt-0 lg:w-2/3 relative lg:h-full">
        <div className="ml-0 lg:ml-14 h-full  md:h-screen mask-gradient rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <TestimonialAnimation items={testimonialItems} speed="normal" />
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonial;
