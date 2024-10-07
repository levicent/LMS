import axios from "axios";
import { useQuery } from "react-query";

interface CourseData {
  title: string;
  courseDescription: string;
  coursePrice: number;
  instructorId: string;
  duration: number;
  level: string;
  thumbnail: string;
  category: string;
  tags: string[];
  language: string;
}

const fetchCourses = async (): Promise<CourseData[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/courses`
    // {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    // }
  );
  return response.data.courses;
};

const fetchCourseByQuery = async (query: string): Promise<CourseData[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/courses?query=${query}`
  );
  return response.data.courses;
};

export const useFetchCourses = () => {
  return useQuery<CourseData[]>("courses", fetchCourses);
};

export const useFetchCourseByQuery = (query: string) => {
  return useQuery<CourseData[]>("courses", () => fetchCourseByQuery(query));
};
