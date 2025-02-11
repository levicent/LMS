import api from "@/services/api";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteProfilePicture = (options: {
  onSuccess: (data: { message: string }) => void;
  onError: (error: any) => void;
}) => {
    const queryClient = useQueryClient();
  return useMutation(
    async () => {
      const response = await api.delete("/delete-profile-picture", {
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
