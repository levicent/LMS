import api from "@/services/api";
import { useQuery } from "react-query";

const fetchReviews = async (id: string) => {
  try {
    const response = await api.get(`/courses/${id}/reviews`);
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const useFetchReviews = (id: string) => {
  return useQuery(["reviews", id], () => fetchReviews(id));
};
