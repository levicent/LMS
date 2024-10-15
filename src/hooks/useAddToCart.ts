import api from "@/services/api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";


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

const addToCartApi = async (cartItem: CartItem) => {
  const response = await api.post(
    "/cart",
    { items: [cartItem] },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.data;
};

export const useAddToCart = () => {
 
  const   queryClient = useQueryClient();
  return useMutation(addToCartApi, {
    onSuccess: () => {
     queryClient.invalidateQueries('cart');
      toast.success("Course added to cart!");
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 401) {
        toast.error("Please log in to add items to your cart.");
       
      } else {
        toast.error("Failed to add course to cart. Please try again.");
      }
    },
  });
};
