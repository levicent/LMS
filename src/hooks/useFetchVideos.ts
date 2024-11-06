import { useQuery } from "react-query";
import api from "@/services/api";

interface Video {
  videoId: string;
  title: string;
  url: string;
  publicId: string;
}

const fetchVideos = async (
  courseId: string,
  sectionId: string
): Promise<Video[]> => {
  try {
    const { data } = await api.get(
      `/courses/${courseId}/sections/${sectionId}/videos`
    );
    console.log("videos", data);
    return data;
  } catch (error) {
    console.error("Error getting videos", error);
    throw error;
  }
};

export const useFetchVideos = (courseId: string, sectionId: string) => {
  return useQuery<Video[]>(
    "videos",
    () => fetchVideos(courseId, sectionId),

    {
      enabled: !!courseId && !!sectionId,
    }
  );
};
