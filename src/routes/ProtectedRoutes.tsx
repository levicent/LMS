import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/context/authContext";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/Loading";

interface PrivateRoutesProps {
  element: React.ReactNode;
}

function ProtectedRoutes({ element }: PrivateRoutesProps) {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authContext) {
      setIsLoading(false);
    }
  }, [authContext]);

  if (isLoading) {
    return <Loading />
  }

  if (!authContext?.isAuthenticated) {
    toast.error("Please sign in to view this page");
    return <Navigate to="/signin" />;
  }

  return <>{element}</>;
}

export default ProtectedRoutes;
