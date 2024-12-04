

import axios from "axios";
import { useQuery } from "react-query";
const fetchUsersByRole = async (role: string) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/role/${role}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return response.data.users;
};

export const useFetchInstructors = () => {
  const role = "teacher";
  return useQuery(['users', role], () => fetchUsersByRole(role), {
    enabled: !!role,
  });
};