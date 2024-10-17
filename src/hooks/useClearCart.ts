import api from "@/services/api";
import { useMutation } from "react-query";

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
    throw error;
  }
};

export const useClearCart = () => {
  return useMutation(clearCart);
};
