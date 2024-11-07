import { useQuery } from "react-query";
import { fetchVideos } from "@/services/videoApi";

interface Video {
  _id: string;
  title: string;
  url: string;
  videoId: string;
}

export const useFetchVideos = (courseId: number, sectionId: number) => {
  return useQuery<Video[]>(
    ["videos", courseId, sectionId],
    () => fetchVideos(courseId, sectionId),
    {
      enabled: !!courseId && !!sectionId,
      staleTime: 1000 * 60 * 5,
    }
  );
};
