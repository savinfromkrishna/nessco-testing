// context/HomeContext.tsx
"use client";

import React, { createContext, useContext } from "react";
import { HomeData } from "@/components/Home/types/constant";

interface HomeContextProps {
  homeData: HomeData | null;
  countryName: string | null;
  languageCode: string | null;
}

const HomeContext = createContext<HomeContextProps | undefined>(undefined);

export const HomeProvider: React.FC<{
  homeData?: HomeData | null;
  countryName?: string | null;
  languageCode?: string | null;
  children: React.ReactNode;
}> = ({ homeData, countryName, languageCode, children }) => {
  return (
    <HomeContext.Provider value={{ homeData, countryName, languageCode }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
