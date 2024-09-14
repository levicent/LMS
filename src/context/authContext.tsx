import React, { createContext, useEffect, useState } from "react";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { toast } from "react-toastify";
interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const { mutateAsync: loginMutation, isLoading: loginLoading } =
    useLoginMutation({
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        setError(null);
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
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.info("You have been logged out");
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading: loginLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
