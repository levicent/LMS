import api from './api';
export const fetchSections = (courseId: number) => api.get(`/courses/${courseId}/sections`);
export const addSection = (courseId: number, title: string) => api.post(`/courses/${courseId}/sections`, { title });
interface UploadVideoParams {
  courseId: number;
  sectionId: number;
  formData: FormData;
}

interface Video {
  _id: string;
  title: string;
  url: string;
  description: string;
}

export const uploadVideo = ({ courseId, sectionId, formData }: UploadVideoParams) =>
  api.post(`/courses/${courseId}/sections/${sectionId}/videos`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  export const fetchVideos = async (courseId: number, sectionId: number): Promise<Video[]> => {
    try {
      const { data } = await api.get(`/courses/${courseId}/sections/${sectionId}/videos`);
      return data;
    } catch (error) {
      console.error('Error getting videos', error);
      throw error;
    }
  };