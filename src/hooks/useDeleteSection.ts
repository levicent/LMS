import api from "@/services/api";
import { useMutation } from "react-query";

interface DeleteSection {
  courseId: string;
  sectionId: string;
}

export const useDeleteSection = () => {
  return useMutation(async ({ courseId, sectionId }: DeleteSection) => {
    const { data } = await api.delete(
      `/courses/${courseId}/sections/${sectionId}`
    );
    return data;
  });
};
