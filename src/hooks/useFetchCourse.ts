import axios from "axios";
import { useQuery } from "react-query";

interface CourseData {
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
  console.log(response.data.courses);
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
