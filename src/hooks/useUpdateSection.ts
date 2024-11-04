import api from "@/services/api";
import { useMutation } from "react-query";

interface Section {
  courseId: string;
  sectionId: string;
  title: string;
}

export const useUpdateSection = () => {
  return useMutation(
    async ({ courseId, sectionId, title }: Section) => {
      const { data } = await api.put(
        `/courses/${courseId}/sections/update/${sectionId}`,
        { title }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
};
