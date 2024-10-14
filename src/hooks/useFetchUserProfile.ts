import { useQuery } from "react-query";
import api from "@/services/api";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  password: string;
}

const fetchUserProfile = async (): Promise<User> => {
  const { data } = await api.get(`/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const useFetchUserProfile = () => {
  return useQuery<User>("profile", fetchUserProfile, {
    retry: false,
  });
};
