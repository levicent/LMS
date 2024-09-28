import axios from "axios";
import { useMutation } from "react-query";

interface CreateCourseData {
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  instructorId: string;
  duration: number;
  level: string;
  category: string;
  tags: string[];
  language: string;
}

export const useCreateCourse = (options: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) => {
  return useMutation(
    async (data: CreateCourseData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/course`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: options.onSuccess,
      onError: options.onError,
    }
  );
};
