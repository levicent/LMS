import axios from "axios";
import { useMutation } from "react-query";
export const useSignupMutation = (options: {
  onSuccess: (data: { token: string }) => void;
  onError: (error: any) => void;
}) => {
  return useMutation(
    async (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string;
    }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        data
      );
      return response.data;
    },
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    }
  );
};
