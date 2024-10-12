import { useQuery } from "react-query";
import api from "@/services/api";

const fetchCart = async () => {
  try {
    const response = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error);
  }
};

export const useFetchCart = () => {
  return useQuery("cart", fetchCart);
};
