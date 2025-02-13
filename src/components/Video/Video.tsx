import { useState, memo } from "react";
import { useQueryClient } from "react-query";
import { BookOpen, Trash, Upload } from "lucide-react";
import { useFetchVideos } from "@/hooks/useFetchVideos";
import { useDeleteVideo } from "@/hooks/useDeleteVideo";
import VideoPlayer from "./VideoPlayer";
import { toast } from "react-toastify";
import useRole from "@/hooks/useRole";
import { useNavigate } from "react-router-dom";

interface VideoProps {
  courseId: any;
  sectionId: any;
}

interface DeleteVideoProps {
  courseId: string;
  sectionId: string;
  videoId: string;
}

const Video = memo(({ courseId, sectionId }: VideoProps) => {
  const { data: videos } = useFetchVideos(courseId, sectionId);
  const { mutate: deleteVideo } = useDeleteVideo();
  const queryClient = useQueryClient();
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);
  const { role } = useRole();
  const navigate = useNavigate();

  const handleVideoClick = (video: { url: string; title: string }) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleDeleteVideo = ({ courseId, sectionId, videoId }: DeleteVideoProps) => {
    deleteVideo(
      { courseId, sectionId, videoId },
      {
        onSuccess: () => {
          toast.success("Video deleted successfully");
          queryClient.invalidateQueries(["videos"]);
        },
        onError: (error: any) => {
          console.error("Error deleting video", error);
          toast.error("Error deleting video");
        },
      }
    );
  };

  // New function: navigate to the dedicated PDF upload page for this video.
  const handleUploadPdf = (video: { videoId: string }) => {
    navigate(`/upload-pdf/${courseId}/${sectionId}/${video.videoId}`);
  };

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => (
            <li
              key={video._id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              onClick={() => handleVideoClick({ url: video.url, title: video.title })}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-gray-900 truncate cursor-pointer dark:text-white">
                      {video.title}
                    </p>
                    {role === "teacher" && (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUploadPdf(video);
                          }}
                          className="ml-2 flex items-center bg-white text-black p-2 rounded-md"
                        >
                          <Upload className="w-5 h-5" />
                          <span className="text-sm ml-1">Upload PDF</span>
                        </button>
                        <Trash
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVideo({
                              courseId,
                              sectionId,
                              videoId: video.videoId,
                            });
                          }}
                          className="w-6 h-6 text-gray-500 cursor-pointer"
                        />

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="p-2">No video available</p>
        )}
      </ul>

      {selectedVideo && (
        <VideoPlayer
          videoUrl={selectedVideo.url}
          videoTitle={selectedVideo.title}
          onClose={closeModal}
        />
      )}
    </div>
  );
});

export default Video;
