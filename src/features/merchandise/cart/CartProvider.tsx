"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { CartItem } from "@/types";
import { getAllMerchandise } from "@/data/merchandise.data";
import {
  loadCartFromStorage,
  saveCartToStorage,
  hydrateCartItems,
  getCartItemKey,
} from "./cart.utils";
import { CartContextValue } from "./cart.types";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage safely after client mount (zero SSR mismatch)
  useEffect(() => {
    const stored = loadCartFromStorage();
    if (stored.length > 0) {
      const validated = hydrateCartItems(stored);
      setItems(validated);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever items change post-hydration
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (
      productId: string,
      size?: string,
      variant?: string,
      quantity: number = 1
    ) => {
      const allMerch = getAllMerchandise();
      const product = allMerch.find(
        (p) => p.id === productId || p.slug === productId
      );

      if (!product) {
        return;
      }

      setItems((prevItems) => {
        const itemKey = getCartItemKey(product.id, size, variant);
        const existingIndex = prevItems.findIndex(
          (item) => getCartItemKey(item.productId, item.size, item.variant) === itemKey
        );

        if (existingIndex > -1) {
          const updated = [...prevItems];
          const newQty = Math.min(10, updated[existingIndex].quantity + quantity);
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          return updated;
        }

        const newItem: CartItem = {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "/images/gallery/tank-gloves-macro.jpg",
          size,
          variant,
          quantity: Math.max(1, Math.min(10, quantity)),
        };

        return [...prevItems, newItem];
      });

      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, size?: string, variant?: string) => {
      const itemKey = getCartItemKey(productId, size, variant);
      setItems((prev) =>
        prev.filter(
          (item) =>
            getCartItemKey(item.productId, item.size, item.variant) !== itemKey
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (
      productId: string,
      size: string | undefined,
      variant: string | undefined,
      quantity: number
    ) => {
      if (quantity <= 0) {
        removeItem(productId, size, variant);
        return;
      }

      const itemKey = getCartItemKey(productId, size, variant);
      const safeQty = Math.min(10, quantity);

      setItems((prev) =>
        prev.map((item) => {
          if (
            getCartItemKey(item.productId, item.size, item.variant) === itemKey
          ) {
            return { ...item, quantity: safeQty };
          }
          return item;
        })
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const total = subtotal;

  const value: CartContextValue = useMemo(
    () => ({
      items,
      isOpen,
      totalItems,
      subtotal,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      totalItems,
      subtotal,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const defaultCartContext: CartContextValue = {
  items: [],
  isOpen: false,
  totalItems: 0,
  subtotal: 0,
  total: 0,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  return context || defaultCartContext;
};
