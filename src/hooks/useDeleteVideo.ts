import api from "@/services/api";
import { useMutation, useQueryClient } from "react-query";

interface Video {
  courseId: string;
  sectionId: string;
  videoId: string;
}

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ courseId, sectionId, videoId }: Video) => {
      await api.delete(
        `/courses/${courseId}/sections/${sectionId}/videos/${videoId}`
      );
    },
    {
      onSuccess: (courseId, sectionId) => {
        queryClient.invalidateQueries(["videos", courseId, sectionId]);
      },

      onError: (error: any) => {
        console.log("Error deleting video", error);
      },
    }
  );
};
