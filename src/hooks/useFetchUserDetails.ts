import { useQuery } from "react-query";
import axios from "axios";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
}

const fetchUserDetails = async (): Promise<User[]> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/users`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const users = data.users;
  return users;
};

export const useFetchUserDetails = () => {
  return useQuery<User[]>("userDetails", fetchUserDetails);
};
