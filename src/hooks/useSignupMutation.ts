import api from "@/services/api";
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
      const response = await api.post(`/register`, data);
      return response.data;
    },
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    }
  );
};
