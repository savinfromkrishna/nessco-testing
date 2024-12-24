"use client";

import React from "react";
import Link from "next/link";
import ReusableForm from "../Contact/ReuseableForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { countryCODE, languageCODE } from "../Navbar/nav-menue";
import Breadcrumb from "./Breadcrumb";
import BlurImage from "./BlurImage";
import { ScrollArea } from "./ScrollArea";

type Card = {
  firstLink: string;
  secondLink: string;
  unit: string;
  speed: number;
  description: string;
  items: { className: string; text: string }[];
  firstname: string;
  secondname: string;
  image: string;
  title: string;
  icon: string;
  category: string;
  content?: React.ReactNode;
};

const Card = ({ card, activeStep }: { card: Card; activeStep: string }) => {
  function formatString(input) {
    if (!input) return ""; // Return an empty string if input is undefined or null
    return input
      .replace(/-/g, " ") // Replace all '-' with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize every word's first letter
  }
  function transformString(input) {
    // Replace hyphens with spaces and then replace the word 'machine' with 'icon'
    return input.replace(/-/g, " ").replace(/\bmachine\b/, "icon");
  }
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label:
        activeStep === "All paper Products"
          ? formatString(card?.secondLink)
          : activeStep,
      href: `/products/${
        activeStep === "All paper Products"
          ? card?.secondLink
          : card?.secondLink
      }`,
    },
    { label: card?.firstname },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="h-48 rounded-3xl bg-white font-poppins  w-40 lg:h-[16rem] md:w-56 overflow-hidden flex flex-col items-start justify-start relative z-10">
          <div className="relative p-2 h-full w-full">
            <div className="absolute flex bg-white h-14 lg:h-16 w-28 lg:w-32 flex-row top-2 space-x-2 -mr-4 right-0 z-40 rounded-bl-2xl">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 absolute top-0 -left-[0.95rem]"
                >
                  <path
                    d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="flex flex-row items-center justify-center">
                {/* Icon Section */}
                <div
                  className={`h-full w-full lg:h-8 flex items-center justify-center ${
                    !card?.speed && !card?.unit ? "ml-4" : "ml-0"
                  }`}
                >
                  <BlurImage
                    src={card?.icon}
                    alt={`${transformString(card?.secondLink)}`}
                    height={100}
                    width={100}
                    loading="lazy"
                    quality={75}
                  />
                </div>

                {/* Speed and Title Section */}
                {(card?.speed || card?.unit) && (
                  <div className="flex items-center justify-center ml-2">
                    <div className="relative h-10 w-10 lg:h-11 lg:w-11 -mr-4 border-2 border-[#483d78] rounded-full bg-white inset-0 flex flex-col items-center justify-center">
                      {card?.speed && (
                        <span className="text-xs lg:text-base font-bold text-red-700 lg:mt-1">
                          {card?.speed}
                        </span>
                      )}
                      {card?.unit && (
                        <span className="-mt-1 text-[0.3rem] lg:text-[0.4rem] lg:w-[2rem] w-[1.6rem] h-[0.8rem] lg:h-[1.2rem] font-bold text-[#483d78] whitespace-normal break-words">
                          {card?.unit}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 mt-14 lg:mt-16 mr-[1.45rem]"
                >
                  <path
                    d="M20 20C20 8.95431 11.0457 0 0 0H20V20Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="bg-[#f2f2f2] overflow-hidden w-full h-full rounded-2xl flex flex-col items-center">
              <BlurImage
                src={card?.image}
                alt={`${card?.title}`}
                height={640}
                width={480}
                className="lg:h-44 h-32 w-auto rounded-xl lg:mt-10 mt-9 hover:scale-90 transition-all duration-300"
                quality={75}
              />
              <div className="font-poppins bg-gradient-to-t from-white from-30% to-transparent py-1 lg:px-4 px-2 -mt-5 h-full w-full">
                <Link
                  className="text-black font-poppins lg:text-sm text-xs text-center line-clamp-2 font-regular"
                  href={`/${countryCODE}/${languageCODE}/products/${
                    activeStep === "All paper Products"
                      ? card.secondLink
                      : card.secondLink
                  }/${card.firstLink}`}
                >
                  {card?.title}
                </Link>
              </div>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[78rem] h-[90vh] lg:h-auto rounded-3xl bg-[#F5F5F7] w-full p-2 z-[99999]">
        <ScrollArea className="h-[80vh] md:h-auto">
          <div className=" dark:bg-neutral-800 p-4 md:p-8 font-poppins font-regular  relative">
            <DialogClose className="absolute right-4 top-4"></DialogClose>
            <div className="lg:block hidden">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:mt-6">
              <div className="flex flex-col items-center md:ml-20 relative mb-4 md:mb-0">
                <Link
                  className="overflow-hidden h-auto md:h-[20rem]"
                  href={`/${countryCODE}/${languageCODE}/products/${
                    activeStep === "All paper Products"
                      ? card.secondLink
                      : card.secondLink
                  }/${card.firstLink}`}
                >
                  <BlurImage
                    src={card?.image}
                    alt={card?.title}
                    width={600}
                    height={400}
                    className="rounded-2xl object-contain w-full h-auto md:h-[25rem] -mt-6 hover:scale-80 transition-all duration-300"
                  />
                </Link>
                <div
                  className={`absolute top-0 -left-4 ${
                    !card?.speed && !card?.unit ? "ml-4" : "ml-0"
                  }`}
                >
                  <BlurImage
                    src={card?.icon}
                    className="h-16 w-auto"
                    alt="icon"
                    height={100}
                    width={100}
                    loading="lazy"
                    quality={75}
                  />
                </div>

                {/* Speed and Title Section */}
                {(card?.speed || card?.unit) && (
                  <div className="flex items-center justify-center ml-2 absolute top-0 left-12">
                    <div className="relative h-10 w-10 lg:h-14 lg:w-14 border-2 border-[#483d78] rounded-full bg-white inset-0 flex flex-col items-center justify-center">
                      {card?.speed && (
                        <span className="text-xs lg:text-[1.1rem] font-bold text-red-700 mt-3">
                          {card?.speed}
                        </span>
                      )}
                      {card?.unit && (
                        <span className="mt-1 text-[0.3rem] lg:text-[0.45rem] lg:w-[2rem] w-[1.6rem] h-[0.8rem] lg:h-[1.2rem] font-bold text-[#483d78] whitespace-normal break-words">
                          {card?.unit}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 justify-center w-full mt-4 md:mt-8">
                  <Link
                    className="w-full md:w-auto"
                    href={`/${countryCODE}/${languageCODE}/products/${
                      activeStep === "All paper Products"
                        ? card.secondLink
                        : card.secondLink
                    }/${card.firstLink}`}
                  >
                    <Button
                      className="rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-red-700 border-2 group border-red-700 w-full md:w-[14rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group relative"
                      aria-label="View all items"
                    >
                      <span className="text-red-700 group-hover:text-white mr-6 md:mr-0 text-sm md:text-lg">
                        View Machine
                      </span>
                      <span className="bg-red-700 group-hover:bg-white p-1 rounded-full absolute right-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-white group-hover:stroke-red-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                  <Link
                    className="w-full md:w-auto"
                    href={`/${countryCODE}/${languageCODE}/products/${
                      activeStep === "All paper Products"
                        ? card.secondLink
                        : card.secondLink
                    }/`}
                  >
                    <Button
                      className="rounded-full relative flex items-center justify-center bg-primary text-primary-foreground hover:bg-[#483d73] border-2 group border-[#483d73] w-full md:w-[14rem] space-x-4 py-1 text-base font-medium transition-all duration-300 ease-in-out group"
                      aria-label="View all items"
                    >
                      <span className="text-[#483d73] group-hover:text-white mr-6 md:mr-0 text-sm md:text-lg">
                        View All
                      </span>
                      <span className="bg-[#483d73] group-hover:bg-white p-1 rounded-full absolute right-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 stroke-white group-hover:stroke-[#483d73]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:pr-16">
                <div className="text-center md:text-justify">
                  <h2 className="text-xl md:text-3xl font-semibold md:font-bold mb-4 flex flex-col items-center md:items-start">
                    <div className="bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent w-full text-center md:text-left whitespace-normal">
                      {card?.secondname}
                    </div>
                    <span className="text-[#483d78] w-full text-center md:text-left">
                      {card?.firstname}
                    </span>
                  </h2>
                </div>
                <p className="text-gray-700 text-justify text-sm font-regular py-4">
                  {card?.description}
                </p>
                <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 py-4 rounded-lg">
                  {card?.items?.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        fill="#b01e23"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#b01e23"
                      >
                        <g strokeWidth="0" />
                        <g strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M236 139.313 139.313 236a16.02 16.02 0 0 1-22.627 0L20 139.313a16.02 16.02 0 0 1 0-22.627L116.687 20a16.02 16.02 0 0 1 22.627 0L236 116.687a16.02 16.02 0 0 1 0 22.626Z" />
                      </svg>
                      <span className="text-sm font-medium text-start">
                        {item?.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex w-full space-x-2 lg:space-x-8 lg:justify-end justify-center mt-2">
                  <div className="ml-1">
                    <div className="">
                      {/* <span className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700">
                        Get a Quote
                      </span>
                      <span className="bg-white group-hover:bg-gradient-to-r group-hover:from-[#483d73] group-hover:to-red-700 p-1 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="w-4 h-4 group-hover:stroke-white stroke-[#483d73]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span> */}
                      <ReusableForm
                        formId="our product"
                        buttonText="Get a Quote"
                        dialogTitle="Get in Touch"
                        dialogSubtitle="We'd love to hear from you!"
                        imageUrl="https://www.nesscoindia.com/Assets/images/resource/popup.webp"
                        showButton={true}
                        secodaryButton={true}
                        normalButton={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
