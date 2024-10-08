import { useQuery } from "react-query";
import api from "@/services/api";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const fetchUserDetails = async (): Promise<User[]> => {
  const { data } = await api.get(`/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const users = data.users;
  return users;
};

export const useFetchUserDetails = () => {
  return useQuery<User[]>("userDetails", fetchUserDetails);
};
