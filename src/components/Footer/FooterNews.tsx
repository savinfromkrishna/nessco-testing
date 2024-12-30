"use client";

import React, { useState } from "react";
import styles from "./footer.module.css";
import { usePathname } from "next/navigation";
import BlurImage from "../ui/BlurImage";
import LocaleSwitcher from "../Navbar/NavLayouts/CountryLayout";
import LinkUrl from "../LinkUrl";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/ScrollArea";
import Link from "next/link";
import SubscribeDialog from "./SubscribeDialog";

interface FooterProps {
  footerData: {
    stores: { address: string; link: string }[];
    businessPartners: string;
    awards: { src: string; alt: string }[];
    clients: string;
    careers: { career: string }[];
    links: { link: string; ref: string }[];
    linkstwo: { linksecond: string; ref: string }[];
    services: { service: string; ref: string }[];
    contacts: { href: string; name: string }[];
    address: string;
    copyright: string;
    socialIcons: { src: string; alt: string; imgclass?: string }[];
    privacyPolicy: string;
    storeTitle: string;
    businessTitle: string;
    languageTitle: string;
    clienteleTitle: string;
    carrersTitle: string;
    linkTitle: string;
    linkSecond: string;
    serviceTitle: string;
    subscribeTitle: string;
    contactusTitle: string;
    addressTitle: string;
    awarTitle: string;
  };
  country: string;
  langauge: string;
}

const FooterNew: React.FC<FooterProps> = ({ footerData }) => {
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

  const textColor = isDarkBackground ? "text-white" : "text-black";
  const image = isDarkBackground ? "invert" : "";
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      setIsSubscribeDialogOpen(true);
    }
  };

  return (
    <>
      <div className="border-gray-50 border"></div>
      <footer
        className={`${isDarkBackground ? "bg-[#222222]" : "bg-white"} ${
          styles.footer
        }`}
      >
        <div className={`${styles.bgimagefooter}`}>
          {isDarkBackground && <div className={`${styles.overlay}`}></div>}
        </div>
        <div className="w-full relative lg:m-auto mt-6 lg:p-0 md:p-5 z-20">
          <div className="flex flex-col lg:flex-row lg:p-5 justify-evenly items-start w-full lg:px-5 mb-[-0.10rem]">
            <div className="flex flex-col lg:flex-row lg:mt-0 w-full">
              <div
                className={`${styles.footerlistabout} lg:order-none lg:ml-[3rem] lg:mt-0 px-5 lg:px-0 w-full lg:w-1/4`}
              >
                <h4
                  className={`font-poppins text-sm md:text-xl lg:text-sm font-semibold md:w-[10rem] w-full ${textColor}`}
                >
                  {footerData?.storeTitle}
                </h4>
                <div className="flex flex-col space-y-2 font-poppins w-full font-light text-xs lg:text-xs md:text-lg">
                  {footerData?.stores?.map((store, index) => (
                    <LinkUrl key={index} href={`${store.link}`}>
                      <p className={`hover:text-red-600 ${textColor}`}>
                        {store?.address}
                      </p>
                    </LinkUrl>
                  ))}
                </div>

                <div className="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
                  <div className="flex-1">
                    <h4
                      className={`font-semibold font-poppins text-sm md:text-xl lg:text-sm ${textColor}`}
                    >
                      {footerData?.clienteleTitle}
                    </h4>
                    <div className={styles.footerlistslink}>
                      <LinkUrl href="/clientele">
                        <p
                          className={`font-poppins text-xs lg:text-xs md:text-lg font-light mt-2 hover:text-red-600 cursor-pointer ${textColor}`}
                        >
                          {footerData?.clients}
                        </p>
                      </LinkUrl>
                    </div>
                  </div>
                </div>

                <h4
                  className={`font-poppins text-sm md:text-xl lg:text-sm font-semibold mt-4 w-full ${textColor}`}
                >
                  {footerData?.languageTitle}
                </h4>
                <div
                  className={`mt-2 font-light text-xs lg:text-xs md:text-lg font-poppins hover:text-red-600 cursor-pointer w-full ${textColor}`}
                >
                  <LocaleSwitcher type="footer" />
                </div>
                <h4
                  className={`${styles.footerdesctitle} font-semibold font-poppins invert-0 text-sm md:text-xl lg:text-sm lg:mt-6 w-full ${textColor}`}
                >
                  {footerData?.awarTitle}
                </h4>
                <div className="flex flex-row h-[3rem] w-full mb-4 mt-3">
                  {footerData?.awards?.map((award, index) => (
                    <BlurImage
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

              <div className="flex flex-col lg:flex-row w-full lg:w-3/4 px-5 lg:px-0 mt-4 lg:mt-0">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                  <h4
                    className={`font-semibold text-sm md:text-xl lg:text-sm font-poppins ${textColor}`}
                  >
                    {footerData?.linkTitle}
                  </h4>
                  <div className="font-poppins text-xs lg:text-xs md:text-lg font-light space-y-2 hover:text-red-600">
                    {footerData?.links?.map((link, index) => (
                      <LinkUrl key={index} href={`${link.ref}`} passHref>
                        <p className={`${styles?.footeratags} ${textColor}`}>
                          {link?.link}
                        </p>
                      </LinkUrl>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                  <h4
                    className={`font-semibold text-sm md:text-xl lg:text-sm font-poppins ${textColor}`}
                  >
                    {footerData?.linkSecond}
                  </h4>
                  <div className="font-poppins text-xs lg:text-xs md:text-lg font-light space-y-2 hover:text-red-600">
                    {footerData?.linkstwo?.map((link, index) => (
                      <LinkUrl key={index} href={`${link.ref}`} passHref>
                        <p className={`${styles.footeratags} ${textColor}`}>
                          {link?.linksecond}
                        </p>
                      </LinkUrl>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <h4
                    className={`font-semibold font-poppins text-sm md:text-xl lg:text-sm ${textColor}`}
                  >
                    {footerData?.serviceTitle}
                  </h4>
                  <div className="font-poppins hover:text-red-600 font-light text-xs lg:text-xs md:text-lg break-normal cursor-pointer">
                    {footerData?.services?.map((service, index) => (
                      <LinkUrl key={index} href={`${service.ref}`} passHref>
                        <p className={`${styles.footeratags} ${textColor}`}>
                          {service?.service}
                        </p>
                      </LinkUrl>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/4 px-5 lg:px-0 mt-4 lg:mt-0">
                <h4
                  className={`font-poppins invert-0 text-sm md:text-xl lg:text-sm font-semibold text-left w-full ${textColor}`}
                >
                  {footerData?.subscribeTitle}
                </h4>
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 w-full mt-2">
                  <div className="relative w-full">
                    <input
                      placeholder="Enter your email address"
                      className={`w-full h-[2.3rem] rounded-xl border p-2 ${
                        isEmailValid ? "border-black" : "border-red-500"
                      } font-poppins font-light text-xs`}
                      value={email}
                      onChange={handleEmailChange}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubscribe();
                        }
                      }}
                    />
                    {!isEmailValid && (
                      <span className="absolute bottom-[-1.2rem] left-0 text-red-500 text-xs">
                        Please enter a valid email address
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className="self-end lg:self-auto mt-2 lg:mt-0"
                    disabled={!isEmailValid}
                  >
                    <BlurImage
                      src="https://assets.nesscoindustries.com/public/assets/footer/send-button.svg"
                      alt="send Button"
                      className="w-[2.5rem] h-[2.5rem]"
                      width={22}
                      height={22}
                    />
                  </button>
                </div>

                <div className="mt-4">
                  <h4
                    className={`${styles.footerdesctitle} font-semibold text-sm md:text-xl lg:text-sm font-poppins ${textColor}`}
                  >
                    {footerData?.contactusTitle}
                  </h4>
                  <div
                    className={`${styles.footerlistslink} hover:text-red-600 cursor-pointer font-poppins text-xs lg:text-xs md:text-lg font-light`}
                  >
                    {footerData?.contacts?.map((contact, index) => (
                      <div key={index}>
                        <a href={`/${contact.href}`}>
                          <p className={`${styles.footeratags} ${textColor}`}>
                            {contact?.name}
                          </p>
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className={`flex flex-row space-x-2 mt-5 ${image}`}>
                    <a
                      href="https://www.facebook.com/NesscoPaperCupMachine"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our Facebook page"
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
                      href="https://x.com/NesscoIndia"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our X (formerly Twitter) page"
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
                      href="https://www.youtube.com/c/NesscoPaperCupMachine"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our YouTube channel"
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
                      href="https://www.instagram.com/nesscoindia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our Instagram page"
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
                      href="https://www.linkedin.com/company/nesscoindia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit our LinkedIn page"
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
                </div>

                <div className="mt-4">
                  <h4
                    className={`${styles.footerdesctitle} font-poppins text-sm md:text-xl lg:text-sm font-semibold ${textColor}`}
                  >
                    {footerData?.addressTitle}
                  </h4>
                  <div className="font-poppins hover:text-red-600 cursor-pointer text-xs lg:text-xs md:text-lg font-light mt-2">
                    <p className={`hover:text-red-600 ${textColor}`}>
                      {footerData?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div
        className={`${styles.footerrights} ${
          isDarkBackground ? "bg-black" : "bg-white"
        } relative h-auto py-4`}
      >
        <div className={`${styles.footercontainerx} relative z-20 flex flex-col lg:flex-row items-center justify-between px-5`}>
          <p
            className={`font-poppins text-sm font-light ${textColor} text-center lg:text-left mb-2 lg:mb-0`}
          >
            {footerData?.copyright}
          </p>
          <div className="hidden lg:block border-l h-[2rem] border-gray-400 mx-5"></div>
          <div>
            <p
              className={`font-poppins text-sm font-light ${textColor} cursor-pointer hover:underline text-center lg:text-left`}
              onClick={() => setIsPrivacyPolicyOpen(true)}
            >
              {footerData?.privacyPolicy}
            </p>
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
                  href="https://www.nesscoindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.nesscoindia.com
                </Link>
              </p>{" "}
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
    </>
  );
};

export default FooterNew;

