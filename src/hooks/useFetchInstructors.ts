import axios from "axios";
import { useQuery } from "react-query";

interface Instructor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const fetchInstructors = async (): Promise<Instructor[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/instructors`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const instructors = response.data.instructors;
  return instructors;
};

export const useFetchInstructors = () => {
  return useQuery<Instructor[]>("instructors", fetchInstructors);
};
