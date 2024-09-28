import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
}

export const useGetUserId = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserId(decoded.id);
      } catch (error) {
        console.log("Error decoding token: ", error);
        setUserId(null);
      }
    } else {
      setUserId(null);
    }
    setIsLoading(false);
  }, []);
  return { userId, isLoading };
};
