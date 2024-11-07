
import VideoUploadForm from '@/components/VideoUploader/VideoUploader';
import TeacherLayout from '@/layout/TeacherLayout';
import React from 'react';
import { useParams } from 'react-router-dom';
const VideoUploadPage: React.FC = () => {
  const { courseId, sectionId } = useParams<{ courseId: string; sectionId: string }>();
  return (
    <TeacherLayout>
    <div className="p-6">
      <VideoUploadForm courseId={courseId!} sectionId={sectionId!} />
    </div>
    </TeacherLayout>
  );
};

export default VideoUploadPage;