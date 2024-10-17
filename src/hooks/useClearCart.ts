import api from "@/services/api";
import { useQuery } from "react-query";
const clearCart = async () => {
  try {
    const response = await api.get("/cart/clear", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error clearing cart", error);
  }
};

export const useClearCart = () => {
  return useQuery("clearCart", clearCart);
};
