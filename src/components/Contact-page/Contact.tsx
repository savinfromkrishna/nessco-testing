// "use client";
// import React from "react";
// import Image from 'next/image';
// import { ContactItem } from "./types/constant";

// interface MainLayoutProps {
//   contactData: ContactItem;
// }

// const Contact: React.FC<MainLayoutProps> = ({ contactData }) => {
//   const Contactcaption = contactData?.contact[0]?.Contactcaption;
//   const message = contactData?.contact[0]?.message;
//   const contact = contactData?.contact[0]?.contactInfo;
//   const imagesOnSide = contactData?.contact[0]?.imagesOnSide;
//   return (
//     <div className="h-full bg-gray-100 items-center flex flex-col font-poppins relative">
//       {/* Main content */}
//       {/* <div className="mt-12 p-5">
//         {content.mainContent.map((item: MainContentItem, index: number) => (
//           <p
//             key={index}
//             className="font-poppins font-semibold lg:text-lg text-lg flex items-center justify-center w-full "
//           >
//             {item.textBeforeImage && <span>{item.textBeforeImage}</span>}
//             {<span className="ml-1">{item.textHighlighted}</span>}
//             <span className="h-[3rem] lg:w-[5rem] ml-1 lg:rounded-xl rounded-2xl">
//               <Image
//                 src={item.image.src}
//                 height={item.image.height}
//                 width={item.image.width}
//                 alt={item.image.alt}
//                 className="lg:rounded-xl rounded-2xl lg:object-cover object-cover h-full w-full"
//               />
//             </span>

//             {item.textAfterImage && <span className="text-[#483d73] ml-1 ">{item.textAfterImage}</span>}

//           </p>
//         ))}
//       </div> */}
//       <div className="mt-11 p-5 flex flex-col items-center justify-center">
//         {/* <p className="text-black font-medium text-sm">{caption}</p> */}
//         <p className="text-[#483d73] font-semibold text-5xl">
//           {Contactcaption}
//         </p>
//       </div>

//       <div className=" text-sm ">
//         <form>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div>
//               <input
//                 type="text"
//                 id="name"
//                 className="block w-[20rem] h-[4rem] border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
//                 placeholder="Name"
//               />
//             </div>
//             <div>
//               <input
//                 type="email"
//                 id="email"
//                 className="block  w-[20rem] h-[4rem]  border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
//                 placeholder="Email"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 id="phone"
//                 className="block  w-[20rem] h-[4rem]  border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
//                 placeholder="Phone"
//               />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 id="subject"
//                 className="block  w-[20rem] h-[4rem]  border-[1.75px] border-[#483d73] rounded-xl shadow-sm p-2"
//                 placeholder="Subject"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <textarea
//                 id="message"
//                 className="block  w-full border-[1.75px] border-[#483d73] h-[6rem] rounded-xl shadow-sm p-2"
//                 placeholder="Message"
//                 rows={4}
//               ></textarea>
//             </div>
//           </div>

//           <div className="mt-5">
//             <button
//               aria-label="submit button"
//               type="submit"
//               className="w-full bg-[#483d73] text-white p-3 rounded-xl transition duration-200 font-bold"
//             >
//               GET IN TOUCH
//             </button>
//           </div>
//           <p className="text-xs font-regular text-center mt-2">{message}</p>
//         </form>
//       </div>

//       <div className="lg:p-2 p-8">
//         <div className="bg-[#483d73] border flex lg:flex-row flex-col rounded-3xl p-5 lg:gap-5 gap-3">
//           {contact?.map((info: any, index: number) => (
//             <div key={index} className="flex lg:w-[33%] relative">
//               <Image
//                 src={info?.image}
//                 alt={info?.title}
//                 height={100}
//                 width={100}
//                 className="h-[2.5rem] w-[2.5rem]"
//               />
//               <div className="flex flex-col w-full">
//                 <h1 className="text-white font-semibold text-center lg:text-lg text-xs">
//                   {info?.title}
//                 </h1>
//                 <p className="text-white font-regular lg:text-sm text-xs text-center mt-3">
//                   {info?.description}
//                 </p>
//               </div>

//               {/* Add vertical border between items, except after the last one */}
//               {index < contact.length - 1 && (
//                 <div className="absolute -right-3 top-0 lg:h-[6rem] h-full border-r border-gray-100"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Render side images */}
//       {imagesOnSide?.map((img: any, index: number) => (
//         <div key={index} className={img?.className}>
//           <Image
//             src={img?.src}
//             alt={img?.alt}
//             height={img?.height}
//             width={img?.width}
//             className="object-cover"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Contact;

"use client";

import BlurImage from "../ui/BlurImage";
import styles from "./contact.module.css";
import { ContactItem } from "./types/constant";
import { useState } from "react";

import * as z from "zod";
import {
  useForm,
  FormProvider,
} from "@/app/[country]/[locale]/context/FormContext";
import { ContactFormData, contactSchema } from "@/lib/ContactSchema";

interface MainLayoutProps {
  contactData: ContactItem;
}

const Contact: React.FC<MainLayoutProps> = ({ contactData }) => {
  const { formData, setFormData, submitForm } = useForm();
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const getintouch = contactData?.contact[0]?.getintouch;
  const contactcaption = contactData?.contact[0]?.Contactcaption;
  const caption = contactData?.contact[0]?.caption;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = contactSchema.parse(formData);
      await submitForm(validatedData);
      // Reset form or show success message
      setFormData({});
      setErrors({});
      alert("Form submitted successfully!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Destination coordinates for Nessco Paper Cup Machine
          const destinationLat = 26.786439154068415; // Replace with actual latitude
          const destinationLng = 75.86478078515786; // Replace with actual longitude
          //26.786439154068415, 75.86478078515786

          // Calculate the distance between current location and destination
          const distance = calculateDistance(
            latitude,
            longitude,
            destinationLat,
            destinationLng
          );

          if (distance < 0.1) {
            // If distance is less than 100 meters
            alert("You are already at the destination!");
          } else {
            const destination = encodeURIComponent(
              "Nessco Paper Cup Machine, E-186, Riico Industrial Area Apparel Park, Mahal Rd, Jagatpura, Jaipur, Rajasthan 302022"
            );
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`;
            window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your location. Please enable location services and try again."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance; // Returns distance in km
  };

  return (
    <FormProvider>
      <section
        className={`rounded-[2rem] bg-white`}
      >
        <div className={`${styles.contactshape}`}></div>
        <div className="container mx-auto p-6">
          <p className="text-3xl font-poppins font-medium text-black mt-3">
            {getintouch}
          </p>
          <h1 className="text-3xl text-black font-poppins font-regular mt-3">
            {caption} {contactcaption}
          </h1>
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="lg:w-1/2">
              <div className="mt-8 ">
                <a
                  className="text-black font-poppins font-regular text-sm block"
                  onClick={handleGetDirections}
                  role="button"
                  style={{ cursor: "pointer" }}
                >
                  <div className="flex items-start mb-6 ">
                    <BlurImage
                      src="https://assets.nesscoindustries.com/public/assets/contact/location-icon1.webp"
                      alt="location"
                      width={80}
                      height={80}
                      className="w-10 h-10 mr-4 mt-5"
                    />
                    <div className="ml-2 w-[30rem]">
                      <h2 className="text-xl font-medium font-poppins text-[#3a2a79] mb-1">
                        {contactData?.contact[0]?.contactInfo[0]?.title}
                      </h2>
                      <a className="text-black font-poppins font-regular text-sm ">
                        {contactData?.contact[0]?.contactInfo[0]?.description
                          .split("\n")
                          .map((line, index) => (
                            <span key={index}>
                              {line}
                              <br />
                            </span>
                          ))}
                      </a>
                    </div>
                  </div>
                </a>
                <h2 className="border-gray-400 border-[0.10rem] -ml-6 lg:w-[35rem]" />
                
                  <a href="mailto:info@nesscoindia.com" className="flex items-start mb-6 w-max">
                    <BlurImage
                      src="https://assets.nesscoindustries.com/public/assets/contact/email-icon.webp"
                      alt="Email"
                      width={80}
                      height={80}
                      className="w-10 h-10 mr-4 mt-5"
                    />
                    <div className="">
                      <h2 className="text-xl font-semibold font-poppins text-[#3a2a79] mt-5 mb-1 ml-2">
                        {contactData?.contact[0]?.contactInfo[1]?.title}
                      </h2>
                      <p className="text-black ml-2 text-sm font-regular font-poppins">
                        {contactData?.contact[0]?.contactInfo[1]?.description}
                      </p>
                    </div>
                    </a>
                  
                
                <hr className="border-gray-400 border-[0.10rem] -ml-6 lg:w-[35rem]" />

                
                  <a href="tel:+91 95494 44484" className="flex items-start  h-full w-max">
                    <BlurImage
                      src="https://assets.nesscoindustries.com/public/assets/contact/contact-icon.webp"
                      alt="Phone"
                      width={80}
                      height={80}
                      className="w-10 h-10 mr-4 mt-5"
                    />
                    <div className="ml-2">
                      <h2 className="text-xl font-medium font-poppins text-[#3a2a79] mt-3 mb-1 ">
                        {contactData?.contact[0]?.contactInfo[2]?.title}
                      </h2>
                      <div>
                        <h3 className="text-black font-regular font-poppins text-sm">
                          {contactData?.contact[0]?.contactInfo[2]?.description}
                          <br />
                        </h3>
                      </div>
                    </div>
                  
                </a>
              </div>

              <div className="flex justify-center mt-10">
                <div className="flex space-x-4 items-center">
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
                      fill="#483d73"
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
                      fill="#483d73"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#483d73"
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
                      fill="#483d73"
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
                      fill="#483d73"
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
                      fill="#483d73"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:-mt-16 mt-2">
              <form className="bg-white lg:p-8 " onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="p-2 border-none rounded-xl h-[5rem] bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
                      value={formData.fullName || ""}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs">{errors.fullName}</p>
                    )}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="p-2 border-none rounded-xl bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular h-[5rem]"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="p-2 border-none rounded-xl h-[5rem] bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone}</p>
                    )}
                  </div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="p-2 border-none rounded-xl w-full h-[10rem] bg-[#f5f5f5] placeholder-black font-poppins text-sm font-regular"
                    value={formData.message || ""}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs">{errors.message}</p>
                  )}
                </div>
                <button
                  aria-label="Send Message"
                  type="submit"
                  className="mt-6 text-xl flex items-center text-white py-4 px-9 rounded-xl bg-gradient-to-b from-[#171033] to-[#300675] transition"
                >
                  <p>Send Message</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};

export default Contact;
