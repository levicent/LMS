import { useQuery } from "react-query";
import axios from "axios";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  password: string;
}

const fetchUserProfile = async (): Promise<User> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

export const useFetchUserProfile = () => {
  return useQuery<User>("profile", fetchUserProfile, {
    retry: false,
  });
};
