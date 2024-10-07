import api from "@/services/api";
import { useMutation } from "react-query";

export const useLoginMutation = (options: {
  onSuccess: (data: { accessToken: string; refreshToken: string }) => void;
  onError: (error: any) => void;
}) => {
  return useMutation(
    async (data: { email: string; password: string }) => {
      const response = await api.post(`/login`, data);
      return response.data;
    },
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    }
  );
};
