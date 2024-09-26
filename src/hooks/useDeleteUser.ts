import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (userId: string) => {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDetails");
        toast.success("User deleted successfully.");
      },
      onError: (error: any) => {
        console.error("Error deleting user: ", error);
        toast.error("Error deleting user.");
      },
    }
  );
};
