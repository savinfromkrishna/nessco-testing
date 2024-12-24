"use client";

import React, { useState, useEffect } from "react";
import { MaintainanceItem } from "./types/constant";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FormFields, { FormValues } from "@/components/Contact/FormFileds";
import { useForm } from "@/app/[country]/[locale]/context/FormContext";
import BlurImage from "../ui/BlurImage";

interface Category {
  title: string;
}

interface Card {
  title: string;
  img: string;
  button: string;
  category: string;
}

interface MaintainanceProps {
  maintainanceData: MaintainanceItem;
}

const Header: React.FC<MaintainanceProps> = ({ maintainanceData }) => {
  const Header = maintainanceData?.Maintainance[0]?.Header;
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(
    Header.categories || []
  );
  const [filteredCards, setFilteredCards] = useState<Card[]>(
    Header.cards || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { submitForm } = useForm();

  const [formData, setFormData] = useState<FormValues>({
    fullname: "",
    email: "",
    mobilenumber: "",
  });

  useEffect(() => {
    const filtered = Header.categories.filter((category) =>
      category.title.toLowerCase().includes(categorySearch.toLowerCase())
    );
    setFilteredCategories(filtered || []);
  }, [categorySearch, Header.categories]);

  useEffect(() => {
    const filtered = Header.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(mainSearch.toLowerCase()) &&
        (selectedCategories?.length === 0 ||
          card?.category
            .split(",")
            .some((cat) => selectedCategories?.includes(cat?.trim())))
    );
    setFilteredCards(filtered || []);
  }, [mainSearch, selectedCategories, Header.cards]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleFormChange = (values: FormValues) => {
    setFormData(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm(formData);
      console.log("Form submitted successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="w-full h-full mt-14 py-8 px-10 flex justify-center font-poppins">
        <div className="lg:w-1/2">
          <h1 className="font-semibold lg:text-5xl text-3xl text-[#483d73] mb-4 lg:text-left text-center">
            {Header?.title}
          </h1>
          <p className="text-center lg:text-left">{Header?.description}</p>
        </div>
        <div className="w-1/2 lg:block hidden">
          <BlurImage
            src={Header?.img}
            alt={"Machine"}
            width={400}
            height={400}
            priority
            className="float-right w-[10rem]"
          />
        </div>
      </div>
      <div className="w-full h-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1.5px),linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1.5px)] bg-[length:100%_0.8rem,0.8rem_100%] bg-white pb-4 font-poppins">
        <div>
          <div className="w-full h-full lg:pl-12 pl-4 pr-2 lg:pr-4 py-4 flex items-center space-x-4 bg-white">
            <BlurImage
              src="https://assets.nesscoindustries.com/public/assets/support/maintainance/maintenance-main-icon.svg"
              alt={"SVG"}
              width={400}
              height={400}
              priority
              className="w-[4rem]"
            />
            <div className="w-full h-full overflow-x-hidden scrollbar-hide lg:flex lg:justify-center">
              <div className="flex lg:grid lg:grid-cols-6 lg:gap-5 lg:space-x-0 space-x-6 w-max">
                {Header?.points?.map((item, idx) => (
                  <div key={idx} className="flex space-x-2 w-max">
                    <p className="text-lg font-medium">{item?.number}.</p>
                    <h3 className="text-lg font-medium text-center lg:w-[10rem]">
                      {item?.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex px-4 md:space-x-4">
            <div className="md:w-[18%] ml-4 p-4 md:block hidden mt-4 bg-white rounded-2xl shadow-2xl">
              <p className="mb-4 font-poppins invisible md:visible text-lg font-medium">
                {Header?.filter}
              </p>

              <div className="flex rounded-[0.5rem] text-sm border border-black overflow-hidden">
                <input
                  type="search"
                  placeholder="Search categories..."
                  className="w-full py-[0.3rem] px-3 outline-none bg-transparent text-black font-poppins"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
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

              <div className="mt-3 md:h-full h-[14rem] md:overflow-auto overflow-y-scroll scrollbar-custom scrollbar">
                {filteredCategories?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
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
                      onChange={() => handleCategoryToggle(item?.title)}
                      className="mr-1 accent-[#483d73]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-[82%] w-full mt-4">
              <div className="bg-white shadow-xl w-full rounded-xl px-4 py-2 flex lg:flex-row flex-col relative">
                <h3 className="text-[#464545] font-medium lg:text-2xl text-[1rem] lg:mb-0 mb-4 lg:text-left text-center">
                  {Header?.download}
                </h3>
                <div className="flex items-center space-x-3">
                  <div
                    className="lg:hidden flex items-center bg-black rounded-[0.5rem] px-2 py-1"
                    onClick={handleOpenFilter}
                  >
                    <h3 className="font-medium mr-2 text-white">
                      {Header?.filter}
                    </h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 stroke-white"
                    >
                      <line x1="4" y1="6" x2="16" y2="6" />
                      <line x1="8" y1="11" x2="20" y2="11" />
                      <line x1="4" y1="16" x2="16" y2="16" />
                      <circle cx="18" cy="6" r="2" />
                      <circle cx="6" cy="11" r="2" />
                      <circle cx="18" cy="16" r="2" />
                    </svg>
                  </div>
                  <div className="flex rounded-[0.5rem] text-sm border border-black overflow-hidden lg:absolute right-4">
                    <button className="ml-2" aria-label="Search">
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
                    <input
                      type="search"
                      placeholder="Search..."
                      className="w-full py-[0.3rem] px-3 outline-none bg-transparent text-black font-poppins"
                      value={mainSearch}
                      onChange={(e) => setMainSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-4 lg:gap-x-24 md:gap-x-16 gap-y-4 px-6">
                {filteredCards?.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-t from-[#f5f5f5] group hover:shadow-2xl transition-all duration-300 to-white rounded-t-xl rounded-b-3xl pt-6 relative shadow-xl"
                  >
                    <div className="h-[6rem] overflow-y-hidden">
                      <div className="h-full overflow-y-auto scrollbar">
                        <h3 className="text-md font-medium text-white bg-[#9e9c9c] p-3 w-[75%]">
                          {item?.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-center min-h-[15rem] max-h-full mb-10">
                      <h4 className="text-[#483d73] -ml-8 font-bold -rotate-90 text-sm">
                        {Header?.maintainance}
                      </h4>
                      <BlurImage
                        src={item?.img}
                        alt={"SVG"}
                        width={400}
                        height={400}
                        priority
                        className="w-[14rem] lg:-ml-8 -ml-10"
                      />
                    </div>
                    <button
                      onClick={handleOpenModal}
                      className="border border-black transition-all duration-300 lg:group-hover:bg-black lg:bg-white bg-black py-1 rounded-full w-full absolute bottom-0"
                    >
                      <p className="text-lg font-medium lg:text-black text-white transition-all duration-300 lg:group-hover:text-white text-center w-full">
                        {item?.button}
                      </p>
                      <div className="absolute -bottom-[0.3rem] -right-2 border-2 w-12 h-12 lg:bg-white bg-[#483d73] lg:border-black border-white rounded-full flex items-center justify-center lg:group-hover:border-white lg:group-hover:bg-[#483d73] transition-all duration-300">
                        <svg
                          viewBox="-0.4 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10"
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
                              className="lg:group-hover:stroke-white lg:stroke-black stroke-white transition-all duration-300"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isFilterModalOpen && (
          <div className="fixed inset-0 bg-[#f5f5f5] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:mt-14">
            <div className="bg-white lg:w-[30%] w-full h-[28rem] mx-[1rem] p-[1rem] rounded-[0.5rem] shadow-lg">
              <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
                <div className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium">
                  <button
                    onClick={handleCloseFilter}
                    className="text-[#838282]"
                  >
                    {Header?.cancel}
                  </button>
                </div>
                <div className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium">
                  <button onClick={handleCloseFilter} className="text-red-700">
                    {Header?.apply}
                  </button>
                </div>
              </div>

              <div className="h-[22rem] mt-4 p-[1rem] bg-[#f5f5f5] rounded-[0.5rem]">
                <div className="mb-4">
                  <input
                    type="search"
                    placeholder="Search categories..."
                    className="w-full py-2 px-3 rounded-[0.3rem] border border-gray-300"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                  />
                </div>
                <div className="h-[14rem] overflow-y-scroll scrollbar-hide">
                  {filteredCategories?.map((item, index) => (
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
                        value={item?.title}
                        checked={selectedCategories?.includes(item?.title)}
                        onChange={() => handleCategoryToggle(item?.title)}
                        className="mr-1 accent-[#483d73]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[50rem] sm:h-[28rem] p-0 bg-white overflow-hidden">
          <div className="flex h-full font-poppins">
            <div className="w-1/2 bg-[#f5f5f5] overflow-hidden  h-full hidden lg:flex flex-col relative">
              <div className="bg-[#483d73] w-full px-4 py-2 relative">
                <BlurImage
                  src="https://res.cloudinary.com/dfryvystt/image/upload/v1731482648/WhiteLOGO_h90whl.png"
                  alt="Logo"
                  width={1000}
                  height={1000}
                  className="h-max w-12 mb-1"
                />
                <h3 className="text-white font-medium text-md">
                  {Header?.cards[0]?.title}
                </h3>
                <h3 className="text-white font-medium text-sm">
                  {Header?.checkListTitle}
                </h3>
                <BlurImage
                  src="https://res.cloudinary.com/dfryvystt/image/upload/v1731482642/FormSVG_bwmh5i.svg"
                  alt="SVG"
                  width={1000}
                  height={1000}
                  className="w-16 absolute -right-2 top-3"
                />
              </div>
              <div className="flex items-center justify-center flex-grow">
                <BlurImage
                  src="https://res.cloudinary.com/dfryvystt/image/upload/v1731482658/MaintainanceCheckList_uglieb.png"
                  alt="SVG"
                  width={1000}
                  height={1000}
                  className="w-[22rem] -mt-1"
                />
              </div>
              <div className="bg-[#483d73] w-full py-1 -mt-3">
                <h3 className="text-white text-xs text-center">
                  {Header?.footer}
                </h3>
              </div>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col items-center justify-center px-8 py-6">
              <h2 className="text-2xl font-bold mb-3 text-center w-full">
                {Header?.formTitle}
              </h2>
              <p className="text-center w-full mb-4 font-regular text-sm">
                {Header?.formDescription}
              </p>
              <form onSubmit={handleSubmit} className="w-full">
                <FormFields
                  onChange={handleFormChange}
                  values={formData}
                  inline={false}
                />
                <button
                  type="submit"
                  className="w-full mt-4 text-lg font-medium bg-gradient-to-t from-[#483d73] to-black lg:hover:from-black lg:hover:to-[#483d73] text-white py-2 rounded-[0.8rem] transition-all duration-300"
                >
                  {Header?.submit}
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
