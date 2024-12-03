
import api from "@/services/api";
import { useQuery } from "react-query";
const fetchUsersByRole = async (role: string) => {
  const response = await api.get(`/users/role/${role}`);
  return response.data.users;
};

export const useFetchInstructors = () => {
  const role = "teacher";
  return useQuery(['users', role], () => fetchUsersByRole(role), {
    enabled: !!role,
  });
};