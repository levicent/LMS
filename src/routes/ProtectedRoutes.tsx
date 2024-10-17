import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/context/authContext";
import { toast } from "react-toastify";

interface PrivateRoutesProps {
  element: React.ReactNode;
}

function ProtectedRoutes({ element }: PrivateRoutesProps) {
  const authContext = useContext(AuthContext);

  if (!authContext?.isAuthenticated) {
    toast.error("Please sign in to view this page");
  }

  return authContext?.isAuthenticated ? element : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
