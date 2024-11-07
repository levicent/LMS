import { useMutation, useQueryClient } from 'react-query';
import { uploadVideo } from '@/services/videoApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface UploadVideoVariables {
  courseId: any;
  sectionId: any;
  formData: FormData;
}

export const useUploadVideo = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    ({ courseId, sectionId, formData }: UploadVideoVariables) =>
      uploadVideo({ courseId, sectionId, formData }),
    {
      onSuccess: (_data, variables) => {
        const { courseId, sectionId } = variables;
        queryClient.invalidateQueries(['videos', courseId, sectionId]);
        navigate(`/instructor/dashboard/course/${courseId}`);
      },
      onError: (error: any) => {
        console.error('Upload failed:', error);
        toast.error('Failed to upload video.');
      },
    }
  );
};