import { useQuery } from 'react-query';
import api from '@/services/api';

const fetchCourseById = async (courseId: string) => {
    try {
        const response = await api.get(`/courses/${courseId}`);
        console.log("API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching course by ID:", error);
        throw error;
      }
};
const useFetchCourseById = (courseId: string) => {
  return useQuery(['course', courseId], () => fetchCourseById(courseId), {
    enabled: !!courseId, 
  });
};

export default useFetchCourseById;