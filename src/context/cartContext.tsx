import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchCart } from "@/hooks/useFetchCart";

interface CartItem {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  duration: string;
  level: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  isCourseInCart: (id: string) => boolean;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: cartData, isLoading } = useFetchCart();

  useEffect(() => {
    if (!isLoading && cartData) {
      setCart(cartData.items);
    }
  }, [cartData, isLoading]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const isCourseInCart = (id: string) => {
    return cart.some((item) => item.id === id);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, isCourseInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;
