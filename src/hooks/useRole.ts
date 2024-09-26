import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
}

const useRole = () => {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setRole(decoded.role);
      } catch (error) {
        console.log("Error decoding token: ", error);
        setRole(null);
      }
    } else {
      setRole(null);
    }
    setIsLoading(false);
  }, []);
  return { role, isLoading };
};

export default useRole;
