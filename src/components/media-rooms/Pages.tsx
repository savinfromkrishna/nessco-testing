"use client";
import React, { useState, useEffect, useRef } from "react";
import { MediaRoomItem } from "./types/constant";
import Link from "next/link";
import BlurImage from "../ui/BlurImage";

interface FilterProps {
  onSearch: (query: string) => void;
  onCategoryChange: (categories: string[]) => void;
  selectedCategories: string[];
  categorySearch: string;
  onCategorySearchChange: (query: string) => void;
  mediaRoomData: MediaRoomItem;
}

const Filter: React.FC<FilterProps> = ({
  onCategoryChange,
  selectedCategories,
  categorySearch,
  onCategorySearchChange,
  mediaRoomData,
}) => {
  const Header = mediaRoomData?.MediaRoom[0]?.Header;
  const [isPage1Visible, setPage1Visible] = useState(false);

  const togglePage1Visibility = () => {
    if (window.innerWidth < 1024) {
      setPage1Visible(!isPage1Visible);
    }
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories?.includes(category)
      ? selectedCategories?.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(updatedCategories);
  };

  const filteredCategories = Header?.categories?.filter((category) =>
    category?.title?.toLowerCase().includes(categorySearch?.toLowerCase())
  );

  return (
    <div className="font-regular font-poppins">
      <div className="w-full lg:h-[58rem] bg-white lg:p-5 p-4 rounded-[1rem] lg:mb-0 mb-4">
        <div
          className="relative flex items-center lg:mb-2"
          onClick={togglePage1Visibility}
        >
          <p className="font-poppins lg:font-normal font-medium lg:text-md text-lg">
            {Header?.filter}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 stroke-black absolute right-0 lg:hidden"
          >
            <line x1="4" y1="6" x2="16" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="16" y2="18" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
        </div>
        <p className="mb-2 font-poppins hidden lg:block">
          {Header?.byCategory}
        </p>

        <div className="lg:flex rounded-[1rem] bg-[#f2f2f2] overflow-hidden mb-4 hidden">
          <input
            aria-label="Search categories"
            type="search"
            placeholder="Search"
            className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black font-poppins"
            value={categorySearch}
            onChange={(e) => onCategorySearchChange(e.target.value)}
          />
          <button
            className="mr-[0.5rem] text-black"
            aria-label="Search categories"
          >
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

        <div className="mt-3 lg:h-full h-[14rem] lg:overflow-auto overflow-y-scroll scrollbar-custom scrollbar hidden lg:block">
          {filteredCategories?.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <label className="font-poppins my-[0.2rem]" htmlFor={item?.title}>
                {item?.title}
              </label>
              <input
                aria-label="Checkbox"
                type="checkbox"
                id={item?.title}
                name={item?.title}
                value={item?.title}
                className="mr-1"
                checked={selectedCategories?.includes(item?.title)}
                onChange={() => handleCategoryChange(item?.title)}
              />
            </div>
          ))}
        </div>

        {isPage1Visible && (
          <div className="fixed inset-0 bg-[#f2f2f2] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:hidden">
            <div className="bg-white w-full mx-[1rem] py-[1rem] px-[1rem] rounded-[0.8rem] shadow-lg">
              <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
                <div className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium">
                  <button
                    onClick={() => setPage1Visible(false)}
                    className="text-[#838282]"
                  >
                    Cancel
                  </button>
                </div>
                <div
                  className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium"
                  onClick={() => setPage1Visible(false)}
                >
                  <button className="text-red-700">Apply</button>
                </div>
              </div>
              <div className="mt-4 bg-[#f2f2f2] rounded-[0.5rem] h-[16rem] overflow-y-auto scrollbar-custom scrollbar px-6 py-2">
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
                      aria-label="Checkbox"
                      type="checkbox"
                      id={item?.title}
                      name={item?.title}
                      value={item?.title}
                      className="accent-red-700"
                      checked={selectedCategories?.includes(item?.title)}
                      onChange={() => handleCategoryChange(item?.title)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onFilterChange: (filter: string) => void;
  selectedFilter: string;
  mediaRoomData: MediaRoomItem;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchQuery,
  onFilterChange,
  selectedFilter,
  mediaRoomData,
}) => {
  const Header = mediaRoomData?.MediaRoom[0]?.Header;
  const [currentDate, setCurrentDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    const date = new Date();
    const dayName = date?.toLocaleDateString("en-US", { weekday: "long" });
    const day = String(date?.getDate()).padStart(2, "0");
    const month = date?.toLocaleString("en-US", { month: "short" });
    const year = date?.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    setCurrentDate(`${dayName} ${formattedDate}`);
  }, []);

  return (
    <div className="bg-white h-[9rem] mt-14 w-full mb-12 font-regular font-poppins lg:px-[2rem] px-[1.5rem]">
      <h1 className="lg:text-5xl text-3xl font-medium py-[1rem]">
        {Header?.title}
      </h1>
      <div className="flex items-center justify-center mt-[1rem]">
        <h2 className="w-[6rem] text-center lg:text-sm text-xs lg:mr-[2rem] mr-[1rem] font-normal">
          {currentDate}
        </h2>
        <div className="lg:mr-8 mr-4 bg-[#f2f2f2] rounded-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="lg:w-[14.5rem] w-full h-[2rem] p-3 bg-[#f2f2f2] rounded-full outline-none"
          />
        </div>

        <div className="lg:flex hidden lg:space-x-8 space-x-4 lg:mr-[2rem] mr-[1rem] w-[62%] overflow-x-scroll scrollbar-hide">
          {Header?.filters?.map((item, index) => (
            <div key={index} className="">
              <button
                className={`lg:text-lg text-sm font-normal ${
                  selectedFilter === item?.title
                    ? "text-[#483d73] font-semibold"
                    : ""
                }`}
                onClick={() => onFilterChange(item?.title)}
              >
                {item?.title}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-black w-8 h-8 px-1 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 cursor-pointer fill-white"
            onClick={handleToggleDropdown}
          >
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute lg:right-[3rem] right-[1rem] mt-2 bg-white shadow-xl rounded-md z-50 w-[8rem] h-[15rem] overflow-y-scroll scrollbar">
          <ul className="p-2">
            {Header?.filters?.map((item, index) => (
              <li key={index} className="py-2 px-4 hover:bg-gray-100">
                {item?.title}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#f5f5f5] bg-opacity-50 backdrop-blur z-50 flex items-center justify-center lg:mt-14">
          <div className="bg-white lg:w-[30%] w-full h-[28rem] mx-[1rem] p-[1rem] rounded-lg shadow-lg">
            <div className="w-full h-[3rem] flex items-center border-b-2 border-solid border-[#E6E7E6]">
              <div className="flex justify-center items-center h-full w-[50%] border-r-2 border-solid border-[#E6E7E6] mb-[0.5rem] font-poppins font-medium">
                <button
                  onClick={handleCloseModal}
                  aria-label="Cancel"
                  className="text-[#838282]"
                >
                  {Header?.cancel}
                </button>
              </div>
              <div className="flex justify-center items-center w-[50%] mb-[0.5rem] font-poppins font-medium">
                <button aria-label="Apply" className="text-red-700">
                  {Header?.apply}
                </button>
              </div>
            </div>

            <div className="h-[22rem] mt-4 p-[1rem] bg-[#f5f5f5] rounded-lg">
              <div className="h-[14rem] overflow-y-scroll scrollbar-hide">
                {Header?.categories?.map((item, index) => (
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
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface NewsProps {
  searchQuery: string;
  selectedCategories: string[];
  selectedFilter: string;
  mediaRoomData: MediaRoomItem;
}

const TrendingNews: React.FC<NewsProps> = ({
  searchQuery,
  selectedCategories,
  selectedFilter,
  mediaRoomData,
}) => {
  const TrendingNews = mediaRoomData?.MediaRoom[0]?.TrendingNews;
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollbarLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollbarRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  function formatString(input) {
    return input
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  const filteredNews = TrendingNews?.sections?.filter((item) => {
    const matchesSearch = item?.title
      .toLowerCase()
      .includes(searchQuery?.toLowerCase());
    const matchesCategory =
      selectedCategories?.length === 0 ||
      item.filter
        .split(",")
        .some((cat) => selectedCategories?.includes(cat?.trim()));
    const matchesFilter =
      selectedFilter === "All" || item?.filter?.includes(selectedFilter);
    return matchesSearch && matchesCategory && matchesFilter;
  });

  return (
    <>
      <div className="bg-white h-full w-full rounded-2xl font-poppins px-[1.5rem] pb-2">
        <h2 className="text-[#483d73] text-2xl py-4">Trending News</h2>

        <div
          ref={carouselRef}
          className="flex overflow-x-scroll space-x-4 scrollbar pb-2"
        >
          {filteredNews?.map((item, index) => (
            <Link
              href={`media-room/${formatString(item?.title)}`}
              key={index}
              className="flex lg:flex-row lg:px-0 px-4 flex-col items-center w-full lg:space-x-4 lg:space-y-0 space-y-4 lg:pr-1 bg-[#f2f2f2] lg:pl-4 rounded-[0.8rem] lg:pb-2 lg:py-0 py-4"
            >
              <div className="lg:w-[8rem] w-[14rem]">
                {item?.img &&
                  (/\.(mp4|webm|ogg)$/i.test(item?.img) ? (
                    <video className=" rounded-xl" autoPlay loop muted>
                      <source
                        src={item.img}
                        type={`video/${item.img.split(".").pop()}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <BlurImage
                      className="rounded-xl"
                      width={400}
                      height={400}
                      src={item?.img}
                      alt={""}
                    />
                  ))}
              </div>
              <div className="lg:w-[35rem] w-[15rem] relative space-y-2 flex flex-col lg:items-start items-center">
                {/* <div className="absolute top-0 right-0 text-lg lg:hover:bg-[#E6E7E6] rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </div> */}
                <p className="border border-black rounded-[0.3rem] text-center w-max px-2 lg:text-md text-sm">
                  {item?.header}
                </p>
                <h3 className="font-medium text-sm lg:w-[96%] w-full text-center lg:text-left">
                  {item?.title}
                </h3>

                <Link
                  aria-label="Open"
                  className="lg:flex w-max hidden h-6 items-center pl-2 pr-1 text-[#483d73] lg:text-sm text-xs group bg-[#E6E7E6] hover:bg-black hover:text-white rounded-full lg:py-0.5 py-1"
                  href={`media-room/${formatString(item?.title)}`}
                >
                  {item?.continueReading}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 stroke-black group-hover:stroke-white ml-2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex mt-2 justify-end lg:text-3xl text-2xl z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-6 h-6 mr-2"
            onClick={scrollbarLeft}
          >
            <circle
              cx="32"
              cy="32"
              r="32"
              className="fill-[#9e9c9c] hover:fill-black cursor-pointer"
            />
            <path
              d="M39 20 L27 32 L39 44"
              className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-6 h-6"
            onClick={scrollbarRight}
          >
            <circle
              cx="32"
              cy="32"
              r="32"
              className="fill-[#9e9c9c] hover:fill-black cursor-pointer"
            />
            <path
              d="M25 20 L37 32 L25 44"
              className="stroke-white stroke-[4px] fill-none stroke-linecap-round stroke-linejoin-round "
            />
          </svg>
        </div>
      </div>
    </>
  );
};

const LatestNews: React.FC<NewsProps> = ({
  searchQuery,
  selectedCategories,
  selectedFilter,
  mediaRoomData,
}) => {
  const LatestNews = mediaRoomData?.MediaRoom[0]?.LatestNews;

  const filteredNews = [
    {
      img: LatestNews?.img,
      filter: LatestNews?.mainTitle,
      title: LatestNews?.title,
      header: LatestNews.sections[0]?.header,
      continueReading: LatestNews?.continueReading,
      dialogDescription: LatestNews?.dialogDescription,
    },
    ...LatestNews?.sections,
  ].filter((item) => {
    const matchesSearch = item?.title
      .toLowerCase()
      .includes(searchQuery?.toLowerCase());
    const matchesCategory =
      selectedCategories?.length === 0 ||
      item?.filter
        .split(",")
        .some((cat) => selectedCategories?.includes(cat?.trim()));
    const matchesFilter =
      selectedFilter === "All" || item?.filter?.includes(selectedFilter);
    return matchesSearch && matchesCategory && matchesFilter;
  });

  function formatString(input) {
    return input
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  return (
    <>
      <div className="bg-white h-full lg:w-[70%] lg:mb-0 mb-6 rounded-2xl font-poppins lg:px-[1.5rem] pl-4 pr-2">
        <h2 className="text-[#483d73] text-2xl my-4">
          {LatestNews?.mainTitle}
        </h2>
        <div className="h-[37rem] overflow-hidden mb-4">
          <div className="overflow-y-auto scrollbar h-full space-y-4 pr-2">
            {filteredNews?.map((item, index) => (
              <Link
                href={`media-room/${formatString(item?.title)}`}
                key={index}
                className={`flex ${
                  index === 0 ? "lg:flex-row flex-col" : "items-center"
                } ${index === 0 ? "lg:space-x-6" : "space-x-4"} border-b-2 ${
                  index === 0 ? "pb-[1.2rem] mb-[1.2rem]" : "pb-[1rem]"
                }`}
              >
                <div
                  className={
                    index === 0
                      ? "lg:w-[40%] lg:mb-0 mb-4 flex items-center"
                      : "lg:w-[20%] w-[40%]"
                  }
                >
                  {" "}
                  {item?.img &&
                    (/\.(mp4|webm|ogg)$/i.test(item?.img) ? (
                      <video className=" rounded-xl" autoPlay loop muted>
                        <source
                          src={item.img}
                          type={`video/${item.img.split(".").pop()}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <BlurImage
                        className="rounded-xl"
                        width={400}
                        height={400}
                        src={item?.img}
                        alt={""}
                      />
                    ))}
                </div>
                <div
                  className={
                    index === 0
                      ? "lg:w-[60%] space-y-2 relative"
                      : "lg:w-[80%] w-[60%] space-y-2 relative"
                  }
                >
                  {/* <div className="absolute top-0 right-0 text-lg hover:bg-[#E6E7E6] rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </div> */}
                  <p className="border border-black rounded-[0.3rem] text-center w-max px-3">
                    {item?.header}
                  </p>
                  <h3
                    className={
                      index === 0
                        ? "font-medium text-md"
                        : "font-medium lg:w-[96%] w-[94%] lg:text-md text-sm"
                    }
                  >
                    {item?.title}
                  </h3>
                  {index === 0 && (
                    <p className="text-sm">{LatestNews.description}</p>
                  )}
                  <button
                    aria-label="Open"
                    className="lg:flex hidden items-center text-[#483d73] lg:text-sm text-xs group bg-[#E6E7E6] hover:bg-black hover:text-white rounded-full pl-2 pr-1 lg:py-0.5 py-1"
                  >
                    {item?.continueReading}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 ml-2 stroke-black group-hover:stroke-white"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const MostRead: React.FC<NewsProps> = ({
  searchQuery,
  selectedCategories,
  selectedFilter,
  mediaRoomData,
}) => {
  const MostRead = mediaRoomData?.MediaRoom[0]?.MostRead;

  function formatString(input) {
    return input
      .trim() // Remove extra spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  const filteredNews = MostRead?.sections?.filter((item) => {
    const matchesSearch = item?.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories?.length === 0 ||
      item?.filter
        .split(",")
        .some((cat) => selectedCategories?.includes(cat?.trim()));
    const matchesFilter =
      selectedFilter === "All" || item?.filter?.includes(selectedFilter);
    return matchesSearch && matchesCategory && matchesFilter;
  });

  return (
    <>
      <div className="bg-white h-full lg:w-[30%] rounded-2xl font-poppins lg:px-[1rem] pl-4 pr-2">
        <h2 className="text-[#483d73] text-2xl my-4">{MostRead?.title}</h2>
        <div className="h-[37rem] overflow-hidden mb-4">
          <div className="overflow-y-auto h-full scrollbar space-y-5 pr-2">
            {filteredNews?.map((item) => (
              <Link
                href={`media-room/${formatString(item?.title)}`}
                key={item?.title}
                className="flex items-center border-b-2 pb-[1.1rem] space-x-1"
              >
                <div className="w-[60%] relative space-y-2">
                  {/* <div className="absolute top-0 right-0 text-md hover:bg-[#E6E7E6] rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </div> */}
                  <p className="border border-black rounded-[0.3rem] text-center text-sm w-max px-2">
                    {item?.header}
                  </p>
                  <h3 className="font-medium text-sm lg:w-[96%] w-[94%]">
                    {item?.title}
                  </h3>
                  <button
                    aria-label="Open"
                    className="lg:flex hidden  items-center text-[#483d73] lg:text-sm text-xs group bg-[#E6E7E6] hover:bg-black hover:text-white rounded-full pl-2 pr-1 lg:py-0.5 py-1"
                  >
                    {item?.continueReading}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 ml-2 stroke-black group-hover:stroke-white"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="w-[40%]">
                  {item?.img &&
                    (/\.(mp4|webm|ogg)$/i.test(item?.img) ? (
                      <video className=" rounded-xl" autoPlay loop muted>
                        <source
                          src={item.img}
                          type={`video/${item.img.split(".").pop()}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <BlurImage
                        className="rounded-xl"
                        width={400}
                        height={400}
                        src={item?.img}
                        alt={""}
                      />
                    ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface MediaRoomProps {
  mediaRoomData: MediaRoomItem;
}

const Pages: React.FC<MediaRoomProps> = ({ mediaRoomData }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleCategorySearchChange = (query: string) => {
    setCategorySearch(query);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="bg-[#f2f2f2]">
      <Header
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
        mediaRoomData={mediaRoomData}
      />
      <div className="flex lg:flex-row flex-col lg:px-0 px-[1rem]">
        <div className="lg:w-[20%] lg:pl-[2rem] lg:pr-[1.5rem]">
          <Filter
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            selectedCategories={selectedCategories}
            categorySearch={categorySearch}
            onCategorySearchChange={handleCategorySearchChange}
            mediaRoomData={mediaRoomData}
          />
        </div>
        <div className="lg:w-[80%] w-full">
          <div className="lg:pr-[1.5rem] mb-6">
            <TrendingNews
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              selectedFilter={selectedFilter}
              mediaRoomData={mediaRoomData}
            />
          </div>
          <div className="flex lg:flex-row flex-col lg:pr-[1.5rem] lg:space-x-4 mb-6">
            <LatestNews
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              selectedFilter={selectedFilter}
              mediaRoomData={mediaRoomData}
            />
            <MostRead
              searchQuery={searchQuery}
              selectedCategories={selectedCategories}
              selectedFilter={selectedFilter}
              mediaRoomData={mediaRoomData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pages;
