import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  element: React.ReactNode;
}
function PrivateRoutes({ element }: PrivateRoutesProps) {
  const role = useRole();
  if (!role) {
    return <div>Loading...</div>;
  }
  return role === "admin" ? element : <Navigate to="/" />;
}

export default PrivateRoutes;
