import useRole from "@/hooks/useRole";
import { Navigate } from "react-router-dom";
import Loading from "@/components/Loading/Loading";

interface PrivateRoutesProps {
  element: React.ReactNode;
}

function PrivateRoutes({ element }: PrivateRoutesProps) {
  const { role } = useRole();

  if (!role) {
    return <Loading />
  }

  return role === "admin" ? element : <Navigate to="/signin" />;
}

export function InstructorPrivateRoutes({ element }: PrivateRoutesProps) {
  const { role } = useRole();

  if (!role) {
    return <Loading />
  }

  return role === "teacher" ? element : <Navigate to="/signin" />;
}

export default PrivateRoutes;
