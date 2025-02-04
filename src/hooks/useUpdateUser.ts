import api from "@/services/api";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateUser = (options: {
  onSuccess: (data: { token: string }) => void;
  onError: (error: any) => void;
}) => {
   const queryClient = useQueryClient();
  return useMutation(
    async (data: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      password?: string;
    }) => {
      const response = await api.put(`/profile`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("profile");
        options.onSuccess(data);
      },
      onError: options.onError,
    }
  );
};
