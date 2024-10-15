// useRemoveFromCart.js
import { useMutation,useQueryClient } from "react-query";
import api from "@/services/api";
import { toast } from "react-toastify";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (productId: string) => {  // Accept productId as a string
      const response = await api.delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {

        queryClient.invalidateQueries('cart');
        toast.success("Item removed from cart!");
      },
      onError: (error) => {
        toast.error("Failed to remove item from cart. Please try again.");
      },
    }
  );
};
