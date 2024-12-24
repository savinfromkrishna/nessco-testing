"use client";
import React, { useState } from "react";
import india from "../../../public/assets/Services/india.svg";
import global from "../../../public/assets/Services/global.svg";
import phone from "../../../public/assets/Services/phone.svg";
import email from "../../../public/assets/Services/email.svg";
import { ServicesItem } from "./types/constant";
import BlurImage from "../ui/BlurImage";

interface ServicesProps {
  servicesData: ServicesItem;
}

const Page1: React.FC<ServicesProps> = ({ servicesData }) => {
  const Header = servicesData?.Services[0]?.Header;
  const [formContent, setFormContent] = useState<{
    name: string;
    companyName: string;
    phone: string;
    city: string;
    country: string;
    customer: string;
    machineType: string;
    serviceType: string;
  }>({
    name: "",
    companyName: "",
    phone: "",
    city: "",
    country: "",
    customer: "",
    machineType: "",
    serviceType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  // Use a function to safely check for content
  const hasContent = (field: keyof typeof formContent) =>
    formContent[field] !== "";

  return (
    <>
      <div className="font-poppins font-regular flex lg:flex-row flex-col">
        <div className="lg:w-[50%] bg-white px-[2rem] lg:pt-10 pt-5 lg:h-screen h-full">
          <h1 className="mt-[4rem] lg:text-[3rem] text-3xl lg:leading-[3.2rem] w-[12rem]">
            <span className="text-[#483d73] font-semibold lg:block">
              {Header.title.split(" ").slice(0, -2).join(" ")}
            </span>{" "}
            <span className="text-black font-bold w-4">
              {Header.title.split(" ").slice(-2).join(" ")}
            </span>
          </h1>
          <p className="text-[#5d5d5e] lg:text-[1.2rem] lg:my-[2.5rem] my-5 lg:pr-[2rem]">
            {Header.paragraph}
          </p>
          <div className="flex items-center space-x-10">
            <BlurImage
              src={phone}
              alt={"Parts"}
              width={400}
              height={400}
              priority
              className="w-[2rem]"
            />
            <div className="relative w-[9rem]">
              <BlurImage
                src={india}
                alt={"Parts"}
                width={400}
                height={400}
                priority
                className="w-[4rem] ml-10 opacity-50"
              />
              <p className="absolute top-4">+91 93584 04366</p>
            </div>
            <div className="relative w-[9rem]">
              <BlurImage
                src={global}
                alt={"Parts"}
                width={400}
                height={400}
                priority
                className="w-[7rem] ml-6 opacity-50"
              />
              <p className="absolute top-10 ">+91 78499 04966</p>
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <BlurImage
              src={email}
              alt={"Parts"}
              width={400}
              height={400}
              priority
              className="w-[2rem]"
            />
            <p>support@nesscoindia.com</p>
          </div>
        </div>
        <div className="lg:w-[50%] lg:px-[4rem] px-8 flex lg:h-screen h-full ">
          <div className="flex flex-col justify-center w-full lg:py-0 py-10 overflow-y-scroll scrollbar-hide">
            <form className="space-y-7 lg:pt-8">
              <div className="flex space-x-4">
                <div className="flex w-[50%] flex-col space-y-1 col-3">
                  <input
                    aria-label="Your Name"
                    type="text"
                    name="name"
                    id="name"
                    required
                    onChange={handleChange}
                    className={`effect-16 input w-[50%] px-2 py-1 text-sm outline-none ${
                      hasContent("name") ? "has-content" : ""
                    }`}
                  />
                  <label htmlFor="name" className="text-sm font-medium label">
                    {Header.yourName}
                  </label>
                  <span className="focus-border"></span>
                </div>
                <div className="flex w-[50%] flex-col space-y-1 col-3">
                  <input
                    aria-label="Phone Number"
                    type="number"
                    name="phone"
                    id="phone"
                    required
                    onChange={handleChange}
                    className={`effect-16 input w-[50%] px-2 py-1 text-sm outline-none ${
                      hasContent("phone") ? "has-content" : ""
                    }`}
                  />
                  <label htmlFor="phone" className="text-sm font-medium label">
                    {Header.phone}
                  </label>
                  <span className="focus-border"></span>
                </div>
              </div>
              <div className="flex flex-col space-y-1 col-3">
                <input
                  aria-label="Company Name"
                  type="text"
                  name="companyName"
                  id="companyName"
                  required
                  onChange={handleChange}
                  className={`effect-16 input w-[50%] px-2 py-1 text-sm outline-none ${
                    hasContent("companyName") ? "has-content" : ""
                  }`}
                />
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium label"
                >
                  {Header.yourCompanyName}
                </label>
                <span className="focus-border"></span>
              </div>
              <div className="flex flex-col w-full space-y-3">
                <label htmlFor="address" className="text-sm font-medium">
                  {Header.yourAddress}
                </label>
                <div className="flex w-full space-x-4">
                  <div className="flex flex-col w-[50%] space-y-1 col-3">
                    <input
                      aria-label="City"
                      type="text"
                      name="city"
                      id="city"
                      required
                      onChange={handleChange}
                      className={`effect-16 input px-2 py-1 text-sm outline-none ${
                        hasContent("city") ? "has-content" : ""
                      }`}
                    />
                    <label htmlFor="city" className="text-xs font-normal label">
                      {Header.city}
                    </label>
                    <span className="focus-border"></span>
                  </div>
                  <div className="flex flex-col w-[50%] space-y-1 col-3 h-max -mt-[1.32rem]">
                    <label htmlFor="country" className="text-xs font-normal">
                      {Header.country}
                    </label>
                    <select
                      aria-label="Country"
                      name="country"
                      id="country"
                      required
                      onChange={handleChange}
                      className={`effect-16 font-normal input px-2 py-1 text-sm outline-none ${
                        hasContent("country") ? "has-content" : ""
                      }`}
                    >
                      <option value="0">select</option>
                      <option value="1">India</option>
                      <option value="2">Japan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="customer" className="text-sm font-medium label">
                  {Header.existingCustomer}
                </label>
                <span className="focus-border"></span>
                <select
                  aria-label="Existing Customer"
                  name="customer"
                  id="customer"
                  required
                  onChange={handleChange}
                  className={`effect-16 font-normal input w-[50%] px-2 py-1 text-sm outline-none ${
                    hasContent("customer") ? "has-content" : ""
                  }`}
                >
                  <option value="0">select</option>
                  <option value="1">yes</option>
                  <option value="2">No</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1 ">
                <label htmlFor="machineType" className="text-sm font-medium">
                  {Header.machineType}
                </label>
                <select
                  aria-label="Machine Type"
                  name="machineType"
                  id="machineType"
                  required
                  onChange={handleChange}
                  className={`effect-16 input font-normal w-[50%] px-2 py-1 text-sm outline-none ${
                    hasContent("machineType") ? "has-content" : ""
                  }`}
                >
                  <option value="0">select</option>
                  <option value="1">yes</option>
                  <option value="2">No</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="serviceType"
                  className="text-sm font-medium label"
                >
                  {Header.serviceType}
                </label>
                <select
                  aria-label="Service Type"
                  name="serviceType"
                  id="serviceType"
                  required
                  onChange={handleChange}
                  className={`effect-16 input font-normal w-[50%] px-2 py-1 text-sm outline-none ${
                    hasContent("serviceType") ? "has-content" : ""
                  }`}
                >
                  <option value="0">select</option>
                  <option value="1">yes</option>
                  <option value="2">No</option>
                </select>
              </div>
              <div className="flex items-center justify-center pt-[1rem]">
                <button
                  aria-label="Submit"
                  className="bg-[#483d73] w-max text-sm text-white font-medium py-2 px-3 rounded-sm"
                >
                  {Header.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page1;
