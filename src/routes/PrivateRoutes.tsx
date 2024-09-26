import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  element: React.ReactNode;
  requiredRole: "admin" | "teacher"; // Specify the roles that can access this route
}

function PrivateRoutes({ element, requiredRole }: PrivateRoutesProps) {
  const role = useRole();

  if (!role) {
    return <div>Loading...</div>;
  }

  // Check if the current role matches the required role
  if (role === requiredRole) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoutes;
