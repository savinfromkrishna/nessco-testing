"use client";

import { useState, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  image: string;
};

export function useCartStorage(initialItems: CartItem[] = []) {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  // Load items from localStorage on initial mount
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      // Check if item already exists
      if (prevItems.some(i => i.id === item.id)) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    clearCart,
  };
}