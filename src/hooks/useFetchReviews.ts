import axios from "axios";
import { useQuery } from "react-query";

const fetchReviews = async (id: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/courses/${id}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      }
    );
    console.log("Response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const useFetchReviews = (id: string) => {
  return useQuery(["reviews", id], () => fetchReviews(id));
};
