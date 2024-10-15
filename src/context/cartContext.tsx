import React, { createContext, useContext, useState, useEffect } from "react";
import { useFetchCart } from "@/hooks/useFetchCart";
import { useAddToCart } from "@/hooks/useAddToCart";

interface CartItem {
  productId: string;
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
  clearCart: () => void;
  isCourseInCart: (id: string) => boolean;
  isAddedToCart: boolean;
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { data: cartData, isLoading } = useFetchCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { mutate: addToCartMutate } = useAddToCart();

  useEffect(() => {
    if (!isLoading && cartData) {
      setCart(cartData.items);
    }
  }, [cartData, isLoading]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
    addToCartMutate(item);
    setIsAddedToCart(true);
  };

  const isCourseInCart = (id: string) => {
    return cart.some((item) => item.productId === id);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== id));
    setIsAddedToCart(false);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isCourseInCart,
        clearCart,
        isAddedToCart,
      }}
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
