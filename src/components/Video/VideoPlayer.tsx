import { X } from 'lucide-react';
import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string;
  videoTitle: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, videoTitle, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{videoTitle}</h2>
          <X onClick={onClose} className='cursor-pointer text-gray-900'/>
          {/* <button onClick={onClose} className="text-gray-600 hover:text-gray-800 h-8 w-8">
            &times;
          </button> */}
        </div>
        <div className="p-4">
          <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;