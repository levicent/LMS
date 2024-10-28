import api from './api';
export const fetchSections = (courseId: number) => api.get(`/courses/${courseId}/sections`);
export const addSection = (courseId: number, title: string) => api.post(`/courses/${courseId}/sections`, { title });
interface UploadVideoParams {
  courseId: number;
  sectionId: number;
  formData: FormData;
}
export const uploadVideo = ({ courseId, sectionId, formData }: UploadVideoParams) =>
  api.post(`/courses/${courseId}/sections/${sectionId}/videos`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });