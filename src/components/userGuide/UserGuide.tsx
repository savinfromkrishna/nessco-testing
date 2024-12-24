"use client";

import BlurImage from "../ui/BlurImage";
import React, { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserGuideItem } from "./types/constant";
import { Button } from "@/components/ui/button";
import FormFields, { FormValues } from "../Contact/FormFileds";

interface UserGuideProps {
  userGuideData: UserGuideItem;
}

export const UserGuide: React.FC<UserGuideProps> = ({ userGuideData }) => {
  const data = userGuideData?.UserGuide[0]["user-guide"];
  const [cards, setCards] = useState(data?.cards);
  const categories = data?.categories;
  const [activeCard, setActiveCard] = useState<(typeof cards)[number] | null>(
    null
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedDownloadCard, setSelectedDownloadCard] = useState<
    (typeof cards)[number] | null
  >(null);
  const id = useId();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });

  const handleCloseFilter = () => setIsFilterModalOpen(false);

  const handleOpenCardDetail = (card: (typeof cards)[number]) => {
    setActiveCard(card);
  };

  const handleCloseCardDetail = () => {
    setActiveCard(null);
  };

  const handleOpenDownloadModal = (card: (typeof cards)[number]) => {
    setSelectedDownloadCard(card);
    setIsDownloadModalOpen(true);
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
    setSelectedDownloadCard(null);
  };

  useEffect(() => {
    if (activeCard || isDownloadModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeCard, isDownloadModalOpen]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filterCards = () => {
    return data?.cards?.filter((card) => {
      const matchesSearch =
        card?.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        card?.description?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        card?.title2?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        card?.description2?.toLowerCase().includes(searchTerm?.toLowerCase());
      const matchesCategory =
        selectedCategories?.length === 0 ||
        selectedCategories?.some((cat) => card?.category?.includes(cat));
      return matchesSearch && matchesCategory;
    });
  };

  useEffect(() => {
    setCards(filterCards());
  }, [searchTerm, selectedCategories]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
          formId: "User Guide",
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      console.log('Form submitted successfully');
      handleCloseDownloadModal();
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <>
      <div className="w-full font-regular font-poppins bg-white pt-4 flex flex-col mt-14">
        <div className="w-full px-10 flex-col">
          <h1 className="lg:text-5xl text-3xl mb-2 text-center lg:text-left">
            <span className="font-medium text-[#483d73] block">
              {data?.title?.split(" ")[0]}
            </span>
            <span className="font-semibold text-black">
              {data?.title?.split(" ").slice(1, 3).join(" ")}
            </span>
          </h1>
          <p className="text-base lg:w-[40%] w-full text-black mb-8 text-center lg:text-left">
            {data?.description}
          </p>
        </div>

        <ul className="w-full bg-[#f5f5f5] bgLines bg-grid-black/[0.2] mx-auto lg:px-10 px-6 py-8 relative z-0 flex">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#f5f5f5] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>

          <div className="lg:w-[20%] p-6 lg:block hidden mt-4 bg-white rounded-2xl shadow-2xl">
            <p className="mb-2 font-poppins invisible lg:visible">
              {data?.filter}
            </p>

            {/* Search Field */}
            <div className="flex rounded-[1rem] bg-[#f5f5f5] overflow-hidden">
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black font-poppins"
              />
              <button className="mr-[0.8rem]" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="10" cy="10" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {/* By Category */}
            <div className="mt-3 lg:h-full h-[14rem] lg:overflow-auto overflow-y-scroll scrollbar-custom scrollbar">
              {categories?.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <label
                    className="font-poppins my-[0.2rem]"
                    htmlFor={item?.title}
                  >
                    {item?.title}
                  </label>
                  <input
                    type="checkbox"
                    id={item?.title}
                    name={item?.title}
                    value={item?.title}
                    checked={selectedCategories?.includes(item?.title)}
                    onChange={() => handleCategoryChange(item?.title)}
                    className="mr-1 accent-[#483d73]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[80%] w-full lg:max-h-[40rem] lg:overflow-y-scroll scrollbar-custom scrollbar lg:pl-10 mt-4 lg:pr-1">
            <div className="bg-white mb-4 shadow-xl w-full h-[3rem] lg:hidden rounded-xl flex items-center px-4 relative">
              <p className="text-xl font-normal">{data?.filter}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 absolute right-4"
              >
                <line x1="4" y1="6" x2="16" y2="6" />
                <line x1="8" y1="11" x2="20" y2="11" />
                <line x1="4" y1="16" x2="16" y2="16" />
                <circle cx="18" cy="6" r="2" />
                <circle cx="6" cy="11" r="2" />
                <circle cx="18" cy="16" r="2" />
              </svg>
            </div>

            {cards?.map((card, index) => (
              <React.Fragment key={`${card?.title}-${index}`}>
                <motion.div
                  layoutId={`card-${card?.title}-${index}-${id}`}
                  onClick={() => handleOpenCardDetail(card)}
                  className="p-5 flex flex-col lg:flex-row shadow-2xl bg-white justify-center items-center border-[0.1rem] border-[#f5f5f5] mb-4 lg:hover:border-[#483d73] rounded-xl cursor-pointer"
                >
                  <div className="flex lg:w-[45%] w-full lg:border-r-2 border-[#5d5d5e] gap-4 flex-col md:flex-row items-center">
                    <motion.div
                      layoutId={`image-${card?.title}-${index}-${id}`}
                    >
                      <BlurImage
                        width={400}
                        height={400}
                        src={card?.src}
                        alt={card?.title}
                        className="h-40 w-auto lg:w-14 lg:h-14 object-cover object-top"
                      />
                    </motion.div>
                    <div className="flex flex-col justify-center">
                      <motion.h3
                        layoutId={`title2-${card?.title2}-${index}-${id}`}
                        className="font-normal text-[#5d5d5e] dark:text-neutral-200 text-center md:text-left"
                      >
                        {card?.title2}
                      </motion.h3>
                      <motion.p
                        layoutId={`description2-${card?.description2}-${index}-${id}`}
                        className="text-black text-xl mb-4 md:mb-0 dark:text-neutral-400 font-semibold text-center md:text-left"
                      >
                        {card?.description2}
                      </motion.p>
                    </div>
                  </div>
                  <div className="lg:w-[55%] w-full flex flex-col lg:flex-row lg:justify-start justify-center items-center relative">
                    <div className="lg:ml-10">
                      <motion.h3
                        layoutId={`title-${card?.title}-${index}-${id}`}
                        className="font-normal text-[#5d5d5e] dark:text-neutral-200 text-center md:text-left"
                      >
                        {card?.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${card?.description}-${index}-${id}`}
                        className="text-black text-xl mb-4 md:mb-0 dark:text-neutral-400 font-semibold text-center md:text-left"
                      >
                        {card?.description}
                      </motion.p>
                    </div>
                    <motion.button
                      layoutId={`button-${card?.title2}-${index}-${id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDownloadModal(card);
                      }}
                      className="lg:absolute lg:right-2 lg:my-0 my-2 px-4 py-2 bg-[#483d78] text-white rounded-full font-bold text-sm flex items-center space-x-2"
                    >
                      <span>{card?.ctaText}</span>
                      <svg
                        viewBox="-0.4 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 ml-2"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M12 12V19M12 19L9.75 16.6667M12 19L14.25 16.6667M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                            stroke="currentColor"
                            className="stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </ul>

        {/* Card Detail Modal */}
        <Dialog
          open={!!activeCard}
          onOpenChange={(open) => !open && handleCloseCardDetail()}
        >
          <DialogContent className="lg:max-w-[35%] bg-white lg:h-[80vh] p-0">
            <DialogHeader>
              <DialogTitle className="sr-only">Card Details</DialogTitle>
            </DialogHeader>
            {activeCard && (
              <motion.div
                layoutId={`card-${activeCard?.title}-${activeCard?.index}-${id}`}
                className="w-full lg:h-[80vh] flex flex-col items-center bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden"
              >
                <motion.div
                  layoutId={`image-${activeCard?.title}-${activeCard?.index}-${id}`}
                >
                  <BlurImage
                    priority
                    width={200}
                    height={200}
                    src={activeCard?.src}
                    alt={activeCard?.title}
                    className="w-max lg:h-[45vh]"
                  />
                </motion.div>

                <div className="h-[35vh]">
                  <div className="flex justify-between items-start p-4 h-[10vh] mb-2">
                    <div>
                      <motion.h3
                        layoutId={`title-${activeCard?.title}-${activeCard?.index}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-200"
                        animate={{
                          transition: { duration: 0.15, ease: "easeInOut" },
                        }}
                      >
                        {activeCard?.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${activeCard?.description}-${activeCard?.index}-${id}`}
                        className="text-neutral-600 dark:text-neutral-400 font-medium"
                        animate={{
                          transition: { duration: 0.15, ease: "easeInOut" },
                        }}
                      >
                        {activeCard?.description}
                      </motion.p>
                    </div>

                    <motion.button
                      layoutId={`button-${activeCard?.title}-${activeCard?.index}-${id}`}
                      onClick={() => handleOpenDownloadModal(activeCard)}
                      className="flex cursor-pointer items-center lg:px-4 py-2 px-3 text-sm rounded-full lg:font-bold font-semibold bg-[#483d78] text-white"
                      animate={{
                        transition: { duration: 0.15, ease: "easeInOut" },
                      }}
                    >
                      {activeCard?.ctaText}
                      <svg
                        viewBox="-0.4 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 ml-2"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M12 12V19M12 19L9.75 16.6667M12 19L14.25 16.6667M6.6 17.8333C4.61178 17.8333 3 16.1917 3 14.1667C3 12.498 4.09438 11.0897 5.59198 10.6457C5.65562 10.6268 5.7 10.5675 5.7 10.5C5.7 7.46243 8.11766 5 11.1 5C14.0823 5 16.5 7.46243 16.5 10.5C16.5 10.5582 16.5536 10.6014 16.6094 10.5887C16.8638 10.5306 17.1284 10.5 17.4 10.5C19.3882 10.5 21 12.1416 21 14.1667C21 16.1917 19.3882 17.8333 17.4 17.8333"
                            stroke="currentColor"
                            className="stroke-white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </motion.button>
                  </div>
                  <div className="relative px-4 h-[22vh] pb-2 overflow-y-scroll scrollbar">
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15, ease: "easeInOut" },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.001, ease: "easeInOut" },
                      }}
                      className="text-center lg:text-md text-sm"
                    >
                      {activeCard?.content}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>

        {/* Filter Modal in Mobile */}
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-[#f5f5f5] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:mt-14">
            <div className="bg-white lg:w-[30%] w-full h-[28rem] mx-[1rem] p-[1rem] rounded-[1rem] shadow-lg">
              <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
                <div className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium">
                  <button
                    onClick={handleCloseFilter}
                    className="text-[#838282]"
                  >
                    {data?.cancel}
                  </button>
                </div>
                <div className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium">
                  <button onClick={handleCloseFilter} className="text-red-700">
                    {data?.apply}
                  </button>
                </div>
              </div>

              <div className="h-[22rem] mt-4 p-[1rem] bg-[#f5f5f5] rounded-[0.8rem] overflow-hidden">
                {/* Search field for mobile */}
                <div className="mb-4">
                  <input
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full py-2 px-3 rounded-[0.5rem] outline-none bg-white text-black font-poppins"
                  />
                </div>

                {/* By Category */}
                <div className="h-max overflow-y-scroll scrollbar-hide pb-4">
                  {categories?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <label
                        className="font-poppins my-[0.2rem]"
                        htmlFor={`mobile-${item?.title}`}
                      >
                        {item?.title}
                      </label>
                      <input
                        type="checkbox"
                        id={`mobile-${item?.title}`}
                        name={item?.title}
                        className="accent-red-700"
                        value={item?.title}
                        checked={selectedCategories?.includes(item?.title)}
                        onChange={() => handleCategoryChange(item?.title)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Dialog
          open={isDownloadModalOpen}
          onOpenChange={setIsDownloadModalOpen}
        >
          <DialogContent className="bg-white lg:max-w-[50rem] h-[70vh] p-0 overflow-hidden">
            <DialogHeader>
              <DialogTitle className="sr-only">Download</DialogTitle>
            </DialogHeader>
            {selectedDownloadCard && (
              <div className="flex w-full h-full">
                <div className="w-1/2 h-full bg-gray-50 -mt-4 lg:block hidden relative">
                  <BlurImage
                    src="https://res.cloudinary.com/dfryvystt/image/upload/v1731482365/Logo_ilp80b.png"
                    alt="Logo"
                    width={64}
                    height={64}
                    className="absolute left-4 top-4 z-10"
                  />
                  <BlurImage
                    src={selectedDownloadCard?.src}
                    alt="Selected Card"
                    height={400}
                    width={400}
                    className="absolute h-[50%] top-[20%] width-[50%] object-contain items-center inset-0"
                  />
                  <div className="absolute bottom-10 left-4 z-10 flex items-center font-normal text-xs text-black">
                    <p className="mr-2">{selectedDownloadCard?.title2}</p>
                    <p>{selectedDownloadCard?.description2}</p>
                  </div>
                  <div className="absolute bottom-6 left-4 z-10 flex items-center font-normal text-xs text-black">
                    <p className="mr-2">{selectedDownloadCard?.title}</p>
                    <p>{selectedDownloadCard?.description}</p>
                  </div>
                </div>
                <div className="lg:w-1/2 w-full h-full flex flex-col items-center justify-center px-8 py-8 overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-3 text-center w-full">
                    {data?.title}
                  </h2>
                  <p className="text-center w-full mb-4 font-regular text-sm">
                    {data?.formDescription}
                  </p>
                  <form onSubmit={handleFormSubmit} className="w-full">
                    <FormFields onChange={setFormValues} values={formValues} errors={undefined} />
                    <div className="flex justify-center mt-5">
                      <Button
                        type="submit"
                        className="text-lg font-medium bg-gradient-to-t from-[#483d73] to-black lg:hover:from-black lg:hover:to-[#483d73] text-white w-full p-2 rounded-[0.8rem]"
                      >
                        {data?.submit}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UserGuide;

