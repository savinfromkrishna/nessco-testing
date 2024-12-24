"use client";
import React, { useState, useEffect } from "react";
import { Category } from "./types/constant";

interface SearchBoxProps {
  filter: string;
  byCategory: string;
  placeholder: string;
  categories: Category[];
  onCategorySelect: (categories: string[]) => void;
  onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  filter,
  placeholder,
  categories,
  onCategorySelect,
  onSearch,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    onCategorySelect(selectedCategories);
  }, [selectedCategories, onCategorySelect]);

  return (
    <div className="rounded-lg p-3 mt-3 sticky top-3 z-10 bg-white"> {/* Added top-3 and z-10 */}
      <div className="lg:w-full lg:h-[29rem] lg:pr-3 lg:px-0 px-[6vw] border-[#E6E7E6] overflow-auto lg:rounded-none rounded-[0.5rem]">
        <div className="flex justify-between">
          <p className="mb-2 font-poppins invisible lg:visible text-gray-500">
            {filter}
          </p>
          <svg
            viewBox="0 0 24 24"
            fill="#f6f6f6"
            width={25}
            height={25}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 10.5A3.502 3.502 0 0 0 18.355 8H21a1 1 0 1 0 0-2h-2.645a3.502 3.502 0 0 0-6.71 0H3a1 1 0 0 0 0 2h8.645A3.502 3.502 0 0 0 15 10.5zM3 16a1 1 0 1 0 0 2h2.145a3.502 3.502 0 0 0 6.71 0H21a1 1 0 1 0 0-2h-9.145a3.502 3.502 0 0 0-6.71 0H3z"
                fill="#000000"
              ></path>
            </g>
          </svg>
        </div>

        <div className="flex rounded-[2rem] bg-white overflow-hidden border-2 border-gray-300">
          <button
            aria-label="search"
            className="relative text-black left-2 h-10 w-7 p-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              height={25}
              width={25}
              xmlns="http://www.w3.org/2000/svg"
              stroke="#f0f0f0"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>
          <input
            type="search"
            placeholder={placeholder}
            style={{ fontSize: "0.8rem" }}
            className="w-full py-[0.3rem] px-[1rem] outline-none bg-transparent text-black font-poppins"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="border relative top-4 border-gray-300"></div>

        <div className="mt-6">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-between items-center">
              <label
                className="font-poppins text-[#575555] my-[0.2rem]"
                htmlFor={category.name}
              >
                {category.name}
              </label>
              <input
                type="checkbox"
                id={category.name}
                name={category.name}
                value={category.name}
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
