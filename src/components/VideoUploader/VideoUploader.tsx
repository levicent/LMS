import React, { useState } from 'react';
import { useUploadVideo } from '@/hooks/useUploadVideo';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface VideoUploadFormProps {
  courseId: string;
  sectionId: string;
  onSuccess?: () => void;
}
const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  courseId,
  sectionId,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const mutation = useUploadVideo();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error('Please select a video file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);

    try {
      await mutation.mutateAsync({
        courseId,
        sectionId,
        formData,
      });
      toast.success('Video uploaded successfully!');
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video.');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <ArrowLeft onClick={() => navigate(-1)} className='cursor-pointer text-blue-600'/>
      <h2 className="text-xl font-semibold">Upload New Video</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Video Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter video title"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter video description"
          rows={4}
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          required
          className="mt-1 block w-full"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isLoading}
          className={`px-4 py-2 rounded ${
            mutation.isLoading
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {mutation.isLoading ? 'Uploading...' : 'Upload Video'}
        </button>
      </div>
    </form>
  );
};

export default VideoUploadForm;