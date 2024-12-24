"use client";

import React, { useState } from "react";
import Link from "next/link";
import { countryCODE, languageCODE, Menu } from "./nav-menue";
import dynamic from 'next/dynamic'
const MenuItem = dynamic(() => import("./nav-menue"));
const ContactForm = dynamic(() => import("../Contact/Contact"));
const SVGComponent = dynamic(() => import("./BlueLogo"));
const CountryLayout = dynamic(() => import("./NavLayouts/CountryLayout"), {
  ssr: false,
});
import AboutLayout from "@/components/Navbar/NavLayouts/AboutLayout";
import ApplicationLayout from "@/components/Navbar/NavLayouts/ApplicationLayout";
import ProductLayout from "@/components/Navbar/NavLayouts/ProductLayout";
import ResourceGrid from "@/components/Navbar/NavLayouts/ResourceLayout";
import SupportGrid from "@/components/Navbar/NavLayouts/SupportLayout";
import VideoGrid from "@/components/Navbar/NavLayouts/VideoLayout";
import { NavbarData } from "./types/constant";
import PlusSvg from "../ui/PlusSvg";
import BlurImage from "../ui/BlurImage";

interface NavbarItem {
  name: string;
  link: string;
  component?: React.ReactNode;
  type?: string;
  hasComponent: boolean;
}

interface navLayoutProps {
  navData: NavbarData;
}

export default function NavbarDemo({ navData }: navLayoutProps) {
  return (
    <div className="relative lg:h-auto lg:mt-0 flex items-center justify-between lg:justify-center">
      <Navbar navData={navData} className="top-0" />
    </div>
  );
}

interface NavbarProps {
  className?: string;
  navData: NavbarData;
}

function Navbar({ className, navData }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedItem(null);
    }
  };

  const expandItem = (item: string) =>
    setExpandedItem(expandedItem === item ? null : item);

  const navbarItems: NavbarItem[] = [
    {
      name: `${navData?.navbar[0]?.category}`,
      link: "about",
      component: <AboutLayout navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[1]?.category}`,
      link: "products",
      component: (
        <ProductLayout
          setHoveredItem={() => {}}
          setHeading={() => {}}
          setIsVisible={() => {}}
          navData={navData}
        />
      ),
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[2]?.category}`,
      link: "application",
      component: (
        <ApplicationLayout
          navData={navData}
          setActive={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ),
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[3]?.category}`,
      link: "support",
      component: <SupportGrid navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[4]?.category}`,
      link: "resources",
      component: <ResourceGrid navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[5]?.category}`,
      link: "videos",
      component: <VideoGrid navData={navData} />,
      hasComponent: true,
    },
    {
      name: `${navData?.navbar[6]?.category}`,
      link: "contact",
      hasComponent: false,
    },
  ];

  return (
    <div
      className={`fixed flex w-full bg-white text-black h-14 font-poppins lg:mt-0 items-center inset-x-0 mx-auto z-[999] ${className}`}
    >
      {/* Desktop Menu */}
      <div className="hidden px-12 lg:flex w-full">
        <div className="w-1/5 flex items-center">
          <Link
            href={`/${countryCODE}/${languageCODE}`}
            className="w-20 h-full flex items-center"
          >
            <SVGComponent />
          </Link>
        </div>
        <div className="w-3/5 flex items-center justify-center">
          <Menu>
            {navbarItems?.map((item) => (
              <MenuItem
                key={item?.name}
                setActive={setActive}
                active={active}
                item={item?.name}
                setPosition={() => {}}
                link={item?.link}
              >
                {item?.component}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="w-1/5 flex justify-end items-center gap-4">
          <div>
            <CountryLayout />
          </div>
          <ContactForm />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex w-full">
        <div className="lg:hidden w-full flex justify-between items-center p-4">
          <Link
            href={`/${countryCODE}/${languageCODE}`}
            className="h-20 w-20  flex items-center"
          >
            <SVGComponent />
          </Link>
          <button
            className="ml-2 text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-300/90 backdrop-blur-[80px] h-screen shadow-lg z-50">
            <div className="flex bg-white cursor-pointer h-full p-4 flex-col space-y-3">
              {navbarItems?.map((item) => (
                <div key={item?.name}>
                  <div
                    onClick={(e) => {
                      if (item?.name === "Contact") {
                        return; // Prevent expandItem for Contact
                      }
                      e.preventDefault();
                      setActive(null);
                      expandItem(item?.name);
                    }}
                    className="flex -mt-3 justify-between items-center py-2 border-b"
                  >
                    {item?.name === "Contact" ? (
                      <Link
                        href={`/${countryCODE}/${languageCODE}/contact`}
                        className="flex w-full items-center justify-between"
                      >
                        <span>{item?.name}</span>
                        <div className="inline-block h-5 w-5 mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="lucide lucide-phone"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        </div>
                      </Link>
                    ) : (
                      <span>{item?.name}</span>
                    )}

                    {item.hasComponent && item?.name !== "Contact" && (
                      <button className="text-gray-500 pr-2">
                        {expandedItem === item?.name ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-minus"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        ) : (
                          <PlusSvg />
                        )}
                      </button>
                    )}
                  </div>

                  {item.hasComponent && expandedItem === item?.name && (
                    <div className="absolute h-screen inset-0 bg-white z-50 flex flex-col">
                      <div className="flex border-b-2 bg-[#f2f2f2] justify-between items-center">
                        <span className="text-lg pl-4 text-[#483d73] font-semibold">
                          {item?.name}
                        </span>
                        <button
                          className="invert-0 p-4"
                          onClick={() => expandItem(item?.name)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-minus"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm text-gray-700">
                          {item?.component}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="w-full -ml-4">
                <CountryLayout />
              </div>
              <div className="flex lg:hidden flex-col w-full mt-4 relative">
                <p className="invert-0 text-lg font-poppins font-medium">
                  Give us a Call:
                </p>
                <BlurImage
                  src="https://assets.nesscoindustries.com/public/assets/contact/contact-icon.webp"
                  alt="Phone"
                  width={400}
                  height={400}
                  className="rounded-xl h-6 w-6 absolute top-[4.2rem]"
                />
                <div className="flex items-center border-b-2 h-20 flex-row pt-6">
                  <div className="flex items-center justify-center w-1/2">
                    <a
                      href={`tel:+ 91 99822 00038`}
                      className="invert-0 text-md -ml-16 w-12 h-12 whitespace-nowrap flex flex-row gap-2 items-center"
                      style={{
                        backgroundImage:
                          "url('https://assets.nesscoindustries.com/public/assets/navbar-images/contact-india.webp')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      + 91 99822 00038
                    </a>
                  </div>
                  <div className="w-1 h-14 border-l-2"></div>
                  <div className="flex items-center justify-center w-1/2">
                    <a
                      href={`tel:+ 91 95494 44484`}
                      className="invert-0 text-md -ml-16 whitespace-nowrap w-16 h-16 flex flex-row gap-2 items-center"
                      style={{
                        backgroundImage:
                          "url('https://assets.nesscoindustries.com/public/assets/navbar-images/contact-world.webp')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      + 91 95494 44484
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center lg:hidden w-full mt-4">
                <BlurImage
                  src="https://assets.nesscoindustries.com/public/assets/contact/email-icon.webp"
                  alt="email"
                  width={400}
                  height={400}
                  className="rounded-xl h-6 w-6 mr-2"
                />
                <a href="mailto:info@nesscoindia.com" className="text-inherit">
                  info@nesscoindia.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
