"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface EnquiryItem {
  id: string;
  name: string;
  image: string;
}

interface EnquiryCartContextType {
  enquiryItems: EnquiryItem[];
  addToEnquiry: (item: EnquiryItem) => void;
  removeFromEnquiry: (id: string) => void;
  clearEnquiry: () => void;
  isInEnquiry: (id: string) => boolean;
}

const EnquiryCartContext = createContext<EnquiryCartContextType | undefined>(
  undefined
);

export const useEnquiryCart = () => {
  const context = useContext(EnquiryCartContext);
  if (!context) {
    throw new Error(
      "useEnquiryCart must be used within an EnquiryCartProvider"
    );
  }
  return context;
};

export const EnquiryCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [enquiryItems, setEnquiryItems] = useState<EnquiryItem[]>([]);

  // Load items from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("enquiryItems");
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          if (Array.isArray(parsedItems)) {
            setEnquiryItems(parsedItems);
          }
        } catch (error) {
          console.error(
            "Error parsing enquiry items from localStorage:",
            error
          );
        }
      }
    }
  }, []);

  // Save items to localStorage whenever enquiryItems changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("enquiryItems", JSON.stringify(enquiryItems));
      } catch (error) {
        console.error("Error saving enquiry items to localStorage:", error);
      }
    }
  }, [enquiryItems]);

  const addToEnquiry = (item: EnquiryItem) => {
    setEnquiryItems((prevItems) => {
      if (!prevItems.some((prevItem) => prevItem.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromEnquiry = (id: string) => {
    setEnquiryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearEnquiry = () => {
    setEnquiryItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("enquiryItems");
    }
  };

  const isInEnquiry = (id: string) => {
    return enquiryItems.some((item) => item.id === id);
  };

  return (
    <EnquiryCartContext.Provider
      value={{
        enquiryItems,
        addToEnquiry,
        removeFromEnquiry,
        clearEnquiry,
        isInEnquiry,
      }}
    >
      {children}
    </EnquiryCartContext.Provider>
  );
};
