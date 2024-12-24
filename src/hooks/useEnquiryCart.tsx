"use client";

import { useState, useEffect } from 'react';

export interface EnquiryItem {
  id: string;
  name: string;
  image: string;
}

const STORAGE_KEY = 'enquiryCartItems';

export function useEnquiryCart() {
  const [cartItems, setCartItems] = useState<EnquiryItem[]>([]);

  // Load items from localStorage on initial mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        try {
          setCartItems(JSON.parse(savedItems));
        } catch (error) {
          console.error('Error parsing cart items from localStorage:', error);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addItem = (item: EnquiryItem) => {
    setCartItems((prevItems) => {
      const exists = prevItems.some((prevItem) => prevItem.id === item.id);
      if (!exists) {
        const newItems = [...prevItems, item];
        return newItems;
      }
      return prevItems;
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    cartItems,
    addItem,
    removeItem,
    clearCart,
  };
}