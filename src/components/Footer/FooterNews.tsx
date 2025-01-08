"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Send,
} from "lucide-react";
import CountryLayout from "../Navbar/NavLayouts/CountryLayout";
import styles from "./footer.module.css";
import { ScrollArea } from "../ui/ScrollArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import SubscribeDialog from "./SubscribeDialog";
import { useForm } from "@/app/[country]/[locale]/context/FormContext";
import { usePathname } from "next/navigation";
import { countryCODE } from "../Navbar/nav-menue";

interface FooterProps {
  footerData: any;
  country?: string;
  language: string;
}

export default function Footer({ footerData, language }: FooterProps) {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const pathname = usePathname() || "";
  const componentCode = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.toLowerCase();
  const componentCodeourCompany = componentCode;
  const isDarkBackground =
    ["knowledge-center", "clientele", "our-company"].includes(componentCode) ||
    ["our-company"].includes(componentCodeourCompany) ||
    ["knowledge-center"].includes(componentCodeourCompany) ||
    ["clientele"].includes(componentCodeourCompany);

  // Theme classes
  const bgColor = isDarkBackground ? "bg-black" : "bg-white";
  const textColor = isDarkBackground ? "text-white" : "text-black";
  const linkColor = isDarkBackground
    ? "text-white/80 hover:text-red-500"
    : "text-black hover:text-red-500";
  const image = isDarkBackground ? "invert" : "";
  const borderColor = isDarkBackground ? "border-white/20" : "border-gray-200";

  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const { submitForm } = useForm();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handleSubscribe = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateEmail(email)) {
      setIsSubscribeDialogOpen(true);
      await submitForm({ email });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubscribe();
    }
  };

  return (
    <footer
      className={`relative px-2 md:px-6 lg:px-4 overflow-hidden ${textColor} ${bgColor}`}
    >
      {/* Background color */}
      <div className={`absolute inset-0 ${bgColor} -z-50`}></div>

      {/* Background image */}
      <div className={`${styles.bgimagefooter}`}>
        {/* Conditionally rendered overlay */}
        {isDarkBackground && <div className={`${styles.overlay}`}></div>}
      </div>

      <div
        className={`container border-t pt-4 z-50 mx-auto relative ${borderColor}`}
      >
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Newsletter - Top on Mobile */}
          <div>
            <h3 className="font-semibold font-poppins text-sm mb-3 text-center ">
              {footerData.subscribeTitle}
            </h3>
            <div className="relative flex items-center w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full rounded-xl border p-2 px-6 text-sm focus:outline-none focus:ring-2 ${
                  isEmailValid
                    ? `${
                        isDarkBackground
                          ? "border-white/20 focus:ring-white/40 bg-white/10 text-white"
                          : "border-black focus:ring-gray-400"
                      }`
                    : "border-red-500 focus:ring-red-500"
                } font-poppins`}
                value={email}
                onChange={handleEmailChange}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleSubscribe}
                disabled={!isEmailValid}
                className={`absolute right-3 ${
                  isDarkBackground
                    ? "text-white/80 hover:text-white"
                    : "text-black hover:text-gray-700"
                } transition-colors duration-300 disabled:opacity-50`}
              >
                <Send className={`h-5 w-5 ${image}`} />
              </button>
              {!isEmailValid && (
                <span className="absolute bottom-[-1.2rem] left-3 text-red-500 text-xs">
                  Please enter a valid email address
                </span>
              )}
            </div>
          </div>

          {/* Contact and Address - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm font-poppins mb-2">
                {footerData.contactusTitle}
              </h3>
              <div className="space-y-3 font-poppins text-xs">
                {footerData.contacts.map((contact: any, index: number) => (
                  <p key={index} className={linkColor}>
                    <a href={`/${countryCODE}/${language}${contact.href}`}>
                      {contact.name}
                    </a>
                  </p>
                ))}
              </div>
              <div className={`flex space-x-3 mt-4 ${image}`}>
              <a
                href={`https://www.facebook.com/NesscoPaperCupMachine`}
                className={linkColor}
              >
               <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 30 30"
                        >
                          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
                        </svg>
              </a>
              <a
                href={`https://x.com/NesscoIndia`}
                className={linkColor}
              >
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#212121"
                            fillRule="evenodd"
                            d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                            clipRule="evenodd"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                          ></path>
                          <polygon
                            fill="#fff"
                            points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                          ></polygon>
                          <polygon
                            fill="#fff"
                            points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                          ></polygon>
                        </svg>
              </a>
              <a
                href={`https://www.youtube.com/c/NesscoPaperCupMachine`}
                className={linkColor}
              >
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                        </svg>
              </a>
              <a
                href={`https://www.instagram.com/nesscoindia/`}
                className={linkColor}
              >
                 <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 64 64"
                        >
                          <path d="M 31.820312 12 C 13.438312 12 12 13.439312 12 31.820312 L 12 32.179688 C 12 50.560688 13.438313 52 31.820312 52 L 32.179688 52 C 50.561688 52 52 50.560688 52 32.179688 L 52 32 C 52 13.452 50.548 12 32 12 L 31.820312 12 z M 43.994141 18 C 45.099141 17.997 45.997 18.889141 46 19.994141 C 46.003 21.099141 45.110859 21.997 44.005859 22 C 42.900859 22.003 42.003 21.110859 42 20.005859 C 41.997 18.900859 42.889141 18.003 43.994141 18 z M 31.976562 22 C 37.498562 21.987 41.987 26.454563 42 31.976562 C 42.013 37.498562 37.545437 41.987 32.023438 42 C 26.501437 42.013 22.013 37.545437 22 32.023438 C 21.987 26.501437 26.454563 22.013 31.976562 22 z M 31.986328 26 C 28.672328 26.008 25.992 28.701625 26 32.015625 C 26.008 35.328625 28.700672 38.008 32.013672 38 C 35.327672 37.992 38.008 35.299328 38 31.986328 C 37.992 28.672328 35.299328 25.992 31.986328 26 z"></path>
                        </svg>
              </a>
              <a
                href={`https://www.linkedin.com/company/nesscoindia/`}
                className={linkColor}
              >
                 <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 30 30"
                        >
                          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                        </svg>
              </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold font-poppins text-sm mb-2">
                {footerData.addressTitle}
              </h3>
              <p className={`${linkColor} font-poppins text-xs`}>{footerData.address}</p>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 space-y-6 pr-2">
              <div>
                <h3 className="font-semibold font-poppins text-sm mb-2">
                  {footerData.clienteleTitle}
                </h3>
                <ul className="space-y-1 font-poppins text-xs">
                  <li>
                    <Link
                      href={`/${countryCODE}/${language}/clientele`}
                      className={linkColor}
                    >
                      {footerData.clients}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm  mb-2 font-poppins">
                  {footerData.storeTitle}
                </h3>
                <ul className="space-y-3 font-poppins text-xs ">
                  {footerData.stores.map((store: any, index: number) => (
                    <li key={index}>
                      <Link
                        href={`/${countryCODE}/${language}${store.link}`}
                        className={linkColor}
                      >
                        {store.address}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold font-poppins text-sm mb-2 ">
                  {footerData.languageTitle}
                </h3>
                <CountryLayout />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <h3 className="font-semibold text-sm font-poppins mb-2">
                {footerData.serviceTitle}
              </h3>
              <ul className="space-y-3 font-poppins text-xs">
                {footerData.services.map((service: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/${countryCODE}/${language}${service.ref}`}
                      className={linkColor}
                    >
                      {service.service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-row space-x-4">
            <div className="w-1/2">
              <h3 className="font-semibold text-sm font-poppins mb-2">
                {footerData.linkTitle}
              </h3>
              <ul className="space-y-3 font-poppins text-xs">
                {footerData.links.map((link: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/${countryCODE}/${language}${link.ref}`}
                      className={linkColor}
                    >
                      {link.link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <h3 className="font-semibold text-sm font-poppins mb-2">
                {footerData.linkSecond}
              </h3>
              <ul className="space-y-3 font-poppins text-xs">
                {footerData.linkstwo.map((link: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/${countryCODE}/${language}${link.ref}`}
                      className={linkColor}
                    >
                      {link.linksecond}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-semibold font-poppins text-sm mb-2">
              {footerData.awarTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {footerData.awards.map((award: any, index: number) => (
                <Image
                  key={index}
                  src={award.src}
                  alt={award.alt}
                  width={300}
                  height={300}
                  className={`rounded ${image}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-1">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-sm font-poppins mb-2">
                {footerData.storeTitle}
              </h3>
              <ul className="space-y-3 font-poppins font-light text-xs text-black">
                {footerData.stores.map((store: any, index: number) => (
                  <li key={index}>
                    <Link
                      href={`/${countryCODE}/${language}${store.link}`}
                      className={linkColor}
                    >
                      {store.address}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm font-poppins">
                {footerData.languageTitle}
              </h3>
              <CountryLayout />
            </div>

            <div>
              <h3 className="font-semibold  mb-2 font-poppins text-sm">
                {footerData.awarTitle}
              </h3>
              <div className="flex flex-row h-[3rem] w-[20rem] mb-4 -m-1 mt-3 ">
                {footerData?.awards?.map((award: any, index: number) => (
                  <Image
                    key={index}
                    height={300}
                    width={300}
                    src={award?.src}
                    alt={award?.alt}
                    className={`w-full h-full ${image}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold  mb-2 font-poppins text-sm">
              {footerData.clienteleTitle}
            </h3>
            <ul className="space-y-1 font-poppins text-xs">
              <li>
                <Link
                  href={`/${countryCODE}/${language}/clientele`}
                  className={linkColor}
                >
                  {footerData.clients}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-poppins text-sm mb-2">
              {footerData.linkTitle}
            </h3>
            <ul className="space-y-3 font-poppins text-xs">
              {footerData.links.map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    href={`/${countryCODE}/${language}${link.ref}`}
                    className={linkColor}
                  >
                    {link.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-poppins text-sm mb-2">
              {footerData.linkSecond}
            </h3>
            <ul className="space-y-3 font-poppins text-xs">
              {footerData.linkstwo.map((link: any, index: number) => (
                <li key={index}>
                  <Link
                    href={`/${countryCODE}/${language}${link.ref}`}
                    className={linkColor}
                  >
                    {link.linksecond}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 font-poppins text-sm">
              {footerData.serviceTitle}
            </h3>
            <ul className="space-y-3 font-poppins text-xs ">
              {footerData.services.map((service: any, index: number) => (
                <li key={index}>
                  <Link
                    href={`/${countryCODE}/${language}${service.ref}`}
                    className={linkColor}
                  >
                    {service.service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold font-poppins text-sm mb-2">
                {footerData.subscribeTitle}
              </h3>
              <div className="relative flex items-center w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full rounded-xl border p-2 pl-2 pr-10 text-sm focus:outline-none focus:ring-2 ${
                    isEmailValid
                      ? `${
                          isDarkBackground
                            ? "border-white/20 focus:ring-white/40 bg-white/10 text-white"
                            : "border-black focus:ring-gray-400"
                        } font-light text-[0.700rem]`
                      : "border-red-500 focus:ring-red-500"
                  } font-poppins`}
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={!isEmailValid}
                  className={`absolute right-3 ${
                    isDarkBackground
                      ? "text-white/80 hover:text-white"
                      : "text-black hover:text-gray-700"
                  } transition-colors duration-300 disabled:opacity-50`}
                >
                  <Send className={`h-5 w-5 ${image}`} />
                </button>
                {!isEmailValid && (
                  <span className="absolute bottom-[-1.2rem] left-3 text-red-500 text-xs">
                    Please enter a valid email address
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-semibold font-poppins text-sm mb-2">
                {footerData.contactusTitle}
              </h3>
              <div className="space-y-3 font-poppins text-xs">
                {footerData.contacts.map((contact: any, index: number) => (
                  <p key={index} className={linkColor}>
                    <a href={`/${countryCODE}/${language}${contact.href}`}>
                      {contact.name}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className={`flex space-x-3 ${image}`}>
              <a
                href={`https://www.facebook.com/NesscoPaperCupMachine`}
                className={linkColor}
              >
               <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                        >
                          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611C16,9.339,17.486,8,20.021,8 c1.214,0,1.856,0.09,2.16,0.131V11h-1.729C19.376,11,19,11.568,19,12.718V14h3.154l-0.428,3H19v9h5c1.105,0,2-0.895,2-2V6 C26,4.895,25.104,4,24,4z"></path>
                        </svg>
              </a>
              <a
                href={`https://x.com/NesscoIndia`}
                className={linkColor}
              >
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#212121"
                            fillRule="evenodd"
                            d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                            clipRule="evenodd"
                          ></path>
                          <path
                            fill="#fff"
                            d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                          ></path>
                          <polygon
                            fill="#fff"
                            points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                          ></polygon>
                          <polygon
                            fill="#fff"
                            points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                          ></polygon>
                        </svg>
              </a>
              <a
                href={`https://www.youtube.com/c/NesscoPaperCupMachine`}
                className={linkColor}
              >
                <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 50 50"
                        >
                          <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
                        </svg>
              </a>
              <a
                href={`https://www.instagram.com/nesscoindia/`}
                className={linkColor}
              >
                 <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 64 64"
                        >
                          <path d="M 31.820312 12 C 13.438312 12 12 13.439312 12 31.820312 L 12 32.179688 C 12 50.560688 13.438313 52 31.820312 52 L 32.179688 52 C 50.561688 52 52 50.560688 52 32.179688 L 52 32 C 52 13.452 50.548 12 32 12 L 31.820312 12 z M 43.994141 18 C 45.099141 17.997 45.997 18.889141 46 19.994141 C 46.003 21.099141 45.110859 21.997 44.005859 22 C 42.900859 22.003 42.003 21.110859 42 20.005859 C 41.997 18.900859 42.889141 18.003 43.994141 18 z M 31.976562 22 C 37.498562 21.987 41.987 26.454563 42 31.976562 C 42.013 37.498562 37.545437 41.987 32.023438 42 C 26.501437 42.013 22.013 37.545437 22 32.023438 C 21.987 26.501437 26.454563 22.013 31.976562 22 z M 31.986328 26 C 28.672328 26.008 25.992 28.701625 26 32.015625 C 26.008 35.328625 28.700672 38.008 32.013672 38 C 35.327672 37.992 38.008 35.299328 38 31.986328 C 37.992 28.672328 35.299328 25.992 31.986328 26 z"></path>
                        </svg>
              </a>
              <a
                href={`https://www.linkedin.com/company/nesscoindia/`}
                className={linkColor}
              >
                 <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                        >
                          <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                        </svg>
              </a>
            </div>

            <div>
              <h3 className="font-semibold font-poppins text-sm mb-2">
                {footerData.addressTitle}
              </h3>
              <p className={`${linkColor} font-poppins text-xs`}>{footerData.address}</p>
            </div>
          </div>
        </div>

        <div className={`py-8 lg:py-4 mb-14 md:mb-8 lg:mb-0  ${borderColor}`}>
          <div className="flex flex-col md:flex-row justify-start lg:items-start items-center space-y-2 md:space-y-0 md:items-center  text-sm font-poppins text-black">
            <p className={linkColor}>{footerData.copyright}</p>
            <div
              className={`hidden md:block h-6 w-[0.1rem]  ${
                isDarkBackground ? "bg-white/20" : "bg-gray-300"
              } mx-2 lg:mx-4`}
            ></div>
            <div
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className={`cursor-pointer ${linkColor}`}
            >
              {footerData.privacyPolicy}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isPrivacyPolicyOpen} onOpenChange={setIsPrivacyPolicyOpen}>
        <DialogContent className="sm:max-w-[625px] bg-white p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Privacy Policy
            </DialogTitle>
            <DialogDescription>
              Please read our privacy policy carefully to understand how we
              collect, use, and protect your personal information.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="mt-4 h-[60vh] pr-4">
            <div className="text-sm leading-relaxed space-y-4">
              <p>
                Our website address is:{" "}
                <Link
                  href={`/${countryCODE}/${language}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.nesscoindia.com
                </Link>
              </p>
              <h3 className="text-lg font-semibold">
                What personal data we collect and why we collect it
              </h3>
              <h4 className="font-medium mt-2">Comments</h4>
              <p>
                When visitors leave comments on the site we collect the data
                shown in the comments form, and also the visitor&apos;s IP
                address and browser user agent string to help spam detection.
              </p>
              <h3 className="text-lg font-semibold">Media</h3>
              <p>
                If you upload images to the website, you should avoid uploading
                images with embedded location data (EXIF GPS) included. Visitors
                to the website can download and extract any location data from
                images on the website.
              </p>
              <h3 className="text-lg font-semibold">Cookies</h3>
              <p>
                If you leave a comment on our site you may opt-in to saving your
                name, email address, and website in cookies. These are for your
                convenience so that you do not have to fill in your details
                again when you leave another comment. These cookies will last
                for one year.
              </p>
              <p>
                If you visit our login page, we will set a temporary cookie to
                determine if your browser accepts cookies. This cookie contains
                no personal data and is discarded when you close your browser.
              </p>
              <p>
                When you log in, we will also set up several cookies to save
                your login information and your screen display choices. Login
                cookies last for two days, and screen options cookies last for a
                year. If you select &quot;Remember Me&quot;, your login will
                persist for two weeks. If you log out of your account, the login
                cookies will be removed.
              </p>
              <p>
                If you edit or publish an article, an additional cookie will be
                saved in your browser. This cookie includes no personal data and
                simply indicates the post ID of the article you just edited. It
                expires after 1 day.
              </p>
              <h3 className="text-lg font-semibold">
                How long we retain your data
              </h3>
              <p>
                If you leave a comment, the comment and its metadata are
                retained indefinitely. This is so we can recognize and approve
                any follow-up comments automatically instead of holding them in
                a moderation queue.
              </p>
              <p>
                For users that register on our website (if any), we also store
                the personal information they provide in their user profile. All
                users can see, edit, or delete their personal information at any
                time (except they cannot change their username). Website
                administrators can also see and edit that information.
              </p>
              <h3 className="text-lg font-semibold">
                What rights you have over your data
              </h3>
              <p>
                If you have an account on this site, or have left comments, you
                can request to receive an exported file of the personal data we
                hold about you, including any data you have provided to us. You
                can also request that we erase any personal data we hold about
                you. This does not include any data we are obliged to keep for
                administrative, legal, or security purposes.
              </p>
              <h3 className="text-lg font-semibold">Where we send your data</h3>
              <p>
                Visitor comments may be checked through an automated spam
                detection service.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <SubscribeDialog
        isOpen={isSubscribeDialogOpen}
        onClose={() => setIsSubscribeDialogOpen(false)}
        email={email}
      />
    </footer>
  );
}
