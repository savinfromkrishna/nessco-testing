"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
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
    ? "text-white/80 hover:text-white"
    : "text-gray-600 hover:text-red-500";
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
      className={`relative px-4 md:px-6 lg:px-4 overflow-hidden ${textColor} ${bgColor}`}
    >
      {/* Background color */}
      <div className={`absolute inset-0 ${bgColor} -z-50`}></div>

      {/* Background image */}
      <div className={`${styles.bgimagefooter}`}>
        {/* Conditionally rendered overlay */}
        {isDarkBackground && <div className={`${styles.overlay}`}></div>}
      </div>

      <div
        className={`container border-t pt-6 z-50 mx-auto relative ${borderColor}`}
      >
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Newsletter - Top on Mobile */}
          <div>
            <h3 className="font-semibold text-base mb-3">
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
                          : "border-gray-300 focus:ring-gray-400"
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
                    : "text-gray-500 hover:text-gray-700"
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.contactusTitle}
              </h3>
              <div className="space-y-1">
                {footerData.contacts.map((contact: any, index: number) => (
                  <p key={index} className={linkColor}>
                    <a href={`/${countryCODE}/${language}${contact.href}`}>
                      {contact.name}
                    </a>
                  </p>
                ))}
              </div>
              <div className="flex space-x-3 mt-4">
                {[
                  { icon: Facebook, href: "facebook" },
                  { icon: Twitter, href: "twitter" },
                  { icon: Youtube, href: "youtube" },
                  { icon: Instagram, href: "instagram" },
                  { icon: Linkedin, href: "linkedin" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={`/${countryCODE}/${language}/${social.href}`}
                    className={linkColor}
                  >
                    <social.icon className={`h-4 w-4 ${image}`} />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-2">
                {footerData.addressTitle}
              </h3>
              <p className={linkColor}>{footerData.address}</p>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-1/2 space-y-6 pr-2">
              <div>
                <h3 className="font-semibold text-base mb-2">
                  {footerData.clienteleTitle}
                </h3>
                <ul className="space-y-1">
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
                <h3 className="font-semibold text-base mb-2">
                  {footerData.storeTitle}
                </h3>
                <ul className="space-y-1">
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
                <h3 className="font-semibold text-base mb-2">
                  {footerData.languageTitle}
                </h3>
                <CountryLayout />
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <h3 className="font-semibold text-base mb-2">
                {footerData.serviceTitle}
              </h3>
              <ul className="space-y-1">
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.linkTitle}
              </h3>
              <ul className="space-y-1">
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.linkSecond}
              </h3>
              <ul className="space-y-1">
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
            <h3 className="font-semibold text-base mb-2">
              {footerData.awarTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {footerData.awards.map((award: any, index: number) => (
                <Image
                  key={index}
                  src={award.src}
                  alt={award.alt}
                  width={40}
                  height={40}
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.storeTitle}
              </h3>
              <ul className="space-y-1">
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.languageTitle}
              </h3>
              <CountryLayout />
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">
                {footerData.awarTitle}
              </h3>
              <div className="flex flex-row h-[3rem] w-[20rem] mb-4 -m-1 mt-3">
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
            <h3 className="font-semibold text-base mb-2">
              {footerData.clienteleTitle}
            </h3>
            <ul className="space-y-1">
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
            <h3 className="font-semibold text-base mb-2">
              {footerData.linkTitle}
            </h3>
            <ul className="space-y-1">
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
            <h3 className="font-semibold text-base mb-2">
              {footerData.linkSecond}
            </h3>
            <ul className="space-y-1">
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
            <h3 className="font-semibold text-base mb-2">
              {footerData.serviceTitle}
            </h3>
            <ul className="space-y-1">
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.subscribeTitle}
              </h3>
              <div className="relative flex items-center w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full rounded-xl border p-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 ${
                    isEmailValid
                      ? `${
                          isDarkBackground
                            ? "border-white/20 focus:ring-white/40 bg-white/10 text-white"
                            : "border-gray-300 focus:ring-gray-400"
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
                      : "text-gray-500 hover:text-gray-700"
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
              <h3 className="font-semibold text-base mb-2">
                {footerData.contactusTitle}
              </h3>
              <div className="space-y-1">
                {footerData.contacts.map((contact: any, index: number) => (
                  <p key={index} className={linkColor}>
                    <a href={`/${countryCODE}/${language}${contact.href}`}>
                      {contact.name}
                    </a>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Link
                href={`/${countryCODE}/${language}/facebook`}
                className={linkColor}
              >
                <Facebook className={`h-4 w-4 ${image}`} />
              </Link>
              <Link
                href={`/${countryCODE}/${language}/twitter`}
                className={linkColor}
              >
                <Twitter className={`h-4 w-4 ${image}`} />
              </Link>
              <Link
                href={`/${countryCODE}/${language}/youtube`}
                className={linkColor}
              >
                <Youtube className={`h-4 w-4 ${image}`} />
              </Link>
              <Link
                href={`/${countryCODE}/${language}/instagram`}
                className={linkColor}
              >
                <Instagram className={`h-4 w-4 ${image}`} />
              </Link>
              <Link
                href={`/${countryCODE}/${language}/linkedin`}
                className={linkColor}
              >
                <Linkedin className={`h-4 w-4 ${image}`} />
              </Link>
            </div>

            <div>
              <h3 className="font-semibold text-base mb-2">
                {footerData.addressTitle}
              </h3>
              <p className={linkColor}>{footerData.address}</p>
            </div>
          </div>
        </div>

        <div className={`py-4 mb-10 md:mb-8 lg:mb-0 border-t ${borderColor}`}>
          <div className="flex flex-col md:flex-row justify-start items-start space-y-2 md:space-y-0 md:items-center">
            <p className={linkColor}>{footerData.copyright}</p>
            <div
              className={`hidden md:block h-6 w-1 ${
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
