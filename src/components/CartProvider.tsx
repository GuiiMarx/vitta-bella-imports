"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  qty: number;
}

interface CartContextType {
  cart: Record<string, CartItem>;
  addToCart: (product: Product) => void;
  changeQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vittaCart");
      if (saved) setCart(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("vittaCart", JSON.stringify(cart));
    } catch {}
  }, [cart, hydrated]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: existing
          ? { ...existing, qty: existing.qty + 1 }
          : { ...product, qty: 1 },
      };
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, qty: newQty } };
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => setCart({});

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, changeQty, removeItem, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
