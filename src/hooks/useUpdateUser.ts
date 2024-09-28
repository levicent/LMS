import axios from "axios";
import { useMutation } from "react-query";

export const useUpdateUser = (options: {
  onSuccess: (data: { token: string }) => void;
  onError: (error: any) => void;
}) => {
  return useMutation(
    async (data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      password?: string;
    }) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    }
  );
};
