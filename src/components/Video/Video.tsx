import  { useState } from 'react';
import { memo } from 'react';
import { BookOpen } from 'lucide-react';
import { useFetchVideos } from '@/hooks/useFetchVideos';
import VideoPlayer from './VideoPlayer';

interface VideoProps {
  key: string;
  courseId: any;
  sectionId: any;
}

const Video = memo(({ courseId, sectionId }: VideoProps) => {
  const { data: videos } = useFetchVideos(courseId, sectionId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string } | null>(null);

  const handleVideoClick = (video: { url: string; title: string }) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video) => (
            <li
              key={video._id}
              className="p-4 hover:bg-gray-50 transition-colors duration-150"
              onClick={() => handleVideoClick({ url: video.url, title: video.title })}
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
                  <p className="text-sm font-medium text-gray-900 truncate cursor-pointer">
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