import React, { createContext, useContext, ReactNode } from "react";

type LocaleContextType = { country:string; locale: string };
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: LocaleContextType;
}) => {
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
