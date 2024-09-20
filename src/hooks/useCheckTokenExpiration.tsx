import { useContext, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/authContext";

interface JwtPayloadWithExp extends JwtPayload {
  exp: number;
}

function useCheckTokenExpiration() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error("AuthContext is not found");
  }

  const { logout } = authContext;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayloadWithExp>(token);
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout();
        }
      } catch (error) {
        console.error("Error decoding token", error);
        handleLogout();
      }
    }

    function handleLogout() {
      logout();
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [logout, navigate]);
}

export default useCheckTokenExpiration;
