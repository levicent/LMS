import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useCart } from "./cartContext";
import axios from "axios";
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  role: string | null;
  loading: boolean;
  error: string | null;
}

interface DecodedToken {
  id: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const { clearCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setRole(decoded.role);
      setIsAuthenticated(true);
    }
  }, []);

  const { mutateAsync: loginMutation, isLoading: loginLoading } =
    useLoginMutation({
      onSuccess: (data) => {
        localStorage.setItem("token", data.accessToken);
        const decoded = jwtDecode<DecodedToken>(data.accessToken);
        const role = decoded.role;
        setRole(role);
        setIsAuthenticated(true);
        setError(null);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "teacher") {
          navigate("/instructor/dashboard");
        } else if (role === "student") {
          navigate("/");
        }
      },
      onError: (err) => {
        setIsAuthenticated(false);
        setError(err.response.data.message);
      },
    });

  const login = async (data: { email: string; password: string }) => {
    await toast.promise(loginMutation(data), {
      pending: "Logging in",
      success: "Logged in successfully",
      error: "Invalid credentials",
    });
  };
  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`);
      setIsAuthenticated(false);
      setRole(null);
      localStorage.removeItem("token");
      clearCart();

      toast.info("You have been logged out");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout. Please try again.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        role,
        loading: loginLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
