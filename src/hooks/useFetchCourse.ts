import axios from "axios";
import api from "@/services/api";
import { useQuery } from "react-query";

interface CourseData {
  _id: string;
  title: string;
  description: string;
  price: string;
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  duration: string;
  level: string;
  thumbnail: string;
  category: string;
  language: string;
  rating: string;
}

const fetchCourses = async (): Promise<CourseData[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/courses`
  );
  return response.data.courses;
};

const fetchCourseByQuery = async (query: string): Promise<CourseData[]> => {
  const response = await api.get(`/course/search?query=${query}`);
  console.log(response.data.courses);
  return response.data.courses;
};


export const useFetchCourses = () => {
  return useQuery<CourseData[]>("courses", fetchCourses);
};

export const useFetchCourseByQuery = (query: string) => {
  return useQuery<CourseData[]>(
    ["coursesByQuery", query],
    () => fetchCourseByQuery(query),
    {
      enabled: !!query,
    }
  );
};
