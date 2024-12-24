import BlurImage from "../ui/BlurImage";
import React from "react";
import { ContactItem } from "./types/constant";

interface MainLayoutProps{
  contactData:ContactItem;
}

const Branches: React.FC<MainLayoutProps> = ({contactData}) => {

const title=contactData?.contact[0]?.heading[0]?.title;
const highlight=contactData?.contact[0]?.heading[0]?.highlight;
const branchesData=contactData?.contact[0]?.branchesData;
  return (
    <>
      <section className="py-12 h-full w-full mt-8">
        <div className="container w-full">
          <h2 className="text-4xl font-medium font-poppins text-center ">
            {title} <span className="text-red-700">{highlight}</span>
          </h2>

          <div className="grid grid-cols-1 grid-rows-5 lg:h-[60vh] lg:grid-cols-5 gap-8 mt-12 justify-center w-full">
            {branchesData?.map((branch) => (
              <div
                key={branch?.id}
                className="bg-white text-center p-6 shadow-lg h-[24rem] rounded-[2rem] relative w-full"
              >
                <div className=" flex relative">
                  {/* Flag on the left */}
                  <div className="left-0 top-0">
                    <BlurImage
                      src={branch?.flag}
                      width={80}
                      height={80}
                      className="w-16 h-16"
                      alt={`${branch?.country} Flag`}
                    />
                  </div>

                  {/* Location image on the right, positioned at the top */}
                  <div className="absolute top-2 right-0">
                    <BlurImage
                      src="https://assets.nesscoindustries.com/public/assets/contact/location-icon1.webp"
                      width={70}
                      height={70}
                      className="w-10 h-10"
                      alt="Location"
                    />
                  </div>
                </div>

                <h3 className="text-2xl text-[#3a3a79] font-medium font-poppins text-center  top-6 relative ">
                  {branch?.office}
                </h3>
                <p className="text-black w-full px-5 text-lg font-poppins font-regular top-8 relative">
                  {branch?.address}
                </p>
                <div className="absolute bottom-0 px-5 left-0">
                  <BlurImage
                    src={branch?.image}
                    width={300}
                    height={300}
                    className=" "
                    alt="image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Branches;
