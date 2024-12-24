"use client";
import BlurImage from "../ui/BlurImage";
import { ApplicationItem } from "./types/constant";
import React, { useState, useEffect } from "react";

interface Product {
  img: string;
  title: string;
  description: string;
  image: string;
}



const Modal: React.FC<{
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedProduct: (product: Product) => void;
  selectedProduct: Product;
  applicationData: ApplicationItem; // Pass applicationData as a prop
}> = ({ setIsModalOpen, setSelectedProduct, selectedProduct, applicationData }) => {
  const [selectedInModal, setSelectedInModal] = useState<Product>(selectedProduct);

  const SelectProduct = applicationData.Application[0].SelectProduct;

  // Close modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSelectedInModal(selectedProduct);
  }, [selectedProduct]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-regular font-poppins">
      <div className="bg-white w-full mx-4 rounded-[0.8rem] px-5 pb-5 pt-2 flex flex-col items-end justify-center">
        <button
          aria-label="Close"
          onClick={handleClose}
          className="text-black mb-3 text-2xl font-semibold"
        >
          &times;
        </button>

        <div className="flex flex-col justify-center items-center">
          <div className="flex w-full mb-[1vh]">
            <div className="flex w-full h-[2.2rem] rounded-[2rem] bg-[#f2f2f2] border-2 border-solid border-[#f2f2f2] overflow-hidden hover:border-[#d9d9d8] mr-[0.4rem] text-[#6f6f6f] items-center">
              <button
                aria-label="Search"
                className="ml-[0.5rem] text-black text-[1.2rem]"
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
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              <input
                type="search"
                placeholder={SelectProduct?.placeholder}
                className="w-full px-[0.5rem] outline-none bg-transparent text-[0.8rem] text-[#6f6f6f]"
              />
            </div>
            {/* <div className="w-[40%] h-[2.2rem] rounded-[2rem] bg-[#f2f2f2] border-2 border-solid border-[#f2f2f2] overflow-hidden hover:border-[#d9d9d8] px-[0.5rem] flex items-center">
              <select
                id="Category"
                name="Category"
                className="w-full outline-none bg-transparent text-[#6f6f6f] text-[0.8rem]"
              >
                <option value="" disabled selected>
                  Category
                </option>
                <option value="item1">Paper Cup</option>
                <option value="item2">Paper Bowl</option>
                <option value="item3">Paper Roll</option>
              </select>
            </div> */}
          </div>
          <div className="w-full h-[52vh] px-[0.5rem] overflow-hidden">
            <div className="h-full overflow-auto scrollbar-hide">
              <div className="grid grid-cols-3 gap-x-4">
                {SelectProduct?.products?.map((item, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer mt-[0.5vh]"
                    onClick={() => handleProductClick(item)}
                  >
                    <div
                      className={`bg-[#f2f2f2] border-2 border-solid h-[10vh] w-full rounded-[0.8rem] flex items-center justify-center ${
                        selectedInModal === item
                          ? " border-[0.2rem] border-[#483d73] bg-white"
                          : "border-[#f2f2f2]"
                      }`}
                    >
                      <BlurImage
                        className="h-[8vh] w-auto"
                        width={100}
                        height={100}
                        src={item?.img}
                        alt={item?.title}
                      />
                    </div>
                    <div className="mt-[0.2vh]">
                      <p
                        className={`text-center text-[0.8rem] font-normal ${
                          selectedInModal === item
                            ? "bg-gradient-to-r from-[#483d73] to-red-700 bg-clip-text text-transparent text-center font-semibold"
                            : "text-[#c6c5c5]"
                        }`}
                      >
                        {item?.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;