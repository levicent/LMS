import { useQuery } from 'react-query';
import axios from 'axios';
const fetchCoursesByCategory = async (category: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/category/${category}`);
  return response.data;
};
export const useFetchCoursesByCategory = (category: string) => {
  return useQuery(['courses', category], () => fetchCoursesByCategory(category), {
    enabled: !!category,
  });
};