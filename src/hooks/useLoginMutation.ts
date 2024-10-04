import axios from "axios";
import { useMutation } from "react-query";

export const useLoginMutation = (options: {
  onSuccess: (data: { accessToken: string }) => void;
  onError: (error: any) => void;
}) => {
  return useMutation(
    async (data: { email: string; password: string }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
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
