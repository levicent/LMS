import { memo } from "react";
import { BookOpen } from "lucide-react";
import { useFetchVideos } from "@/hooks/useFetchVideos";
interface VideoProps {
  key: string;
  courseId: string;
  sectionId: string;
}
const Video = memo(({ key, courseId, sectionId }: VideoProps) => {
  const { data: videos } = useFetchVideos(courseId, sectionId);
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => (
            <li
              key={key}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="h-4 w-4 text-blue-600">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-medium text-gray-900 truncate
                  cursor-pointer
                  "
                  >
                    {video.title}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No video available</p>
        )}
      </ul>
    </div>
  );
});

export default Video;
