import React from "react";
import { ServicesItem } from "./types/constant";
import BlurImage from "../ui/BlurImage";

interface ServicesProps {
  servicesData: ServicesItem;
}

const Page1: React.FC<ServicesProps> = ({ servicesData }) => {
  const Header = servicesData?.Services[0]?.Header;

  return (
    <>
      <div className="font-poppins font-regular flex lg:flex-row flex-col">
        <div className="lg:w-[50%] bg-white px-[2rem] lg:pt-10 pt-5 lg:h-screen h-full lg:pb-0 pb-4">
          <h1 className="mt-[4rem] lg:text-[3rem] text-3xl lg:leading-[3.2rem] w-[12rem]">
            <span className="text-[#483d73] font-semibold lg:block">
              {Header?.title?.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="text-black font-bold w-4">
              {Header?.title?.split(" ").slice(-2).join(" ")}
            </span>
          </h1>
          <p className="text-[#5d5d5e] lg:text-[1.2rem] lg:my-[2.5rem] my-5 lg:pr-[2rem]">
            {Header?.paragraph}
          </p>
          <div className="flex items-center lg:space-x-10 space-x-4">
            <BlurImage
              src="https://assets.nesscoindustries.com/public/assets/contact/contact-icon.webp"
              alt="Phone"
              width={400}
              height={400}
              priority
              className="w-[2rem]"
            />
            <div className="relative w-[9rem]">
              <BlurImage
                src="https://assets.nesscoindustries.com/public/assets/navbar-images/contact-india.webp"
                alt="India"
                width={400}
                height={400}
                priority
                className="w-[4rem] ml-10 opacity-50"
              />
              <a href="tel:+91 93584 04366 ">
                <p className="absolute top-4">+91 93584 04366</p>
              </a>
            </div>
            <div className="relative w-[9rem]">
              <BlurImage
                src="https://assets.nesscoindustries.com/public/assets/navbar-images/contact-world.webp"
                alt="World"
                width={400}
                height={400}
                priority
                className="w-[7rem] ml-6 opacity-50"
              />
              <a href="tel:+91 78499 04966">
                <p className="absolute top-10">+91 78499 04966</p>
              </a>
            </div>
          </div>
          <div className="flex lg:space-x-10 space-x-4 items-center">
            <BlurImage
              src="https://assets.nesscoindustries.com/public/assets/contact/email-icon.webp"
              alt="Email"
              width={400}
              height={400}
              priority
              className="w-[2rem]"
            />
            <a href="mailto:info@nesscoindia.com">
              <p>support@nesscoindia.com</p>
            </a>
          </div>
        </div>
        <div className="lg:w-[50%] flex h-screen pt-14 ">
          <iframe
            aria-label="𝐍𝐄𝐒𝐒𝐂𝐎 𝐂𝐔𝐒𝐓𝐎𝐌𝐄𝐑 𝐒𝐔𝐏𝐏𝐎𝐑𝐓"
            className="w-full"
            src="https://forms.zohopublic.com/daulattraders/form/NESSCOSERVICEENQUIRY/formperma/Vs3OOkRZxh7pQVR3HRP-ogpM28_gDNh5GzOoFzcy5gk"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Page1;
