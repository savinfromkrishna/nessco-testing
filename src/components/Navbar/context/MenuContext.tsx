"use client";

import React, { createContext, useState, useContext } from 'react';

type MenuContextType = {
  active: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <MenuContext.Provider value={{ active, setActive }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};

