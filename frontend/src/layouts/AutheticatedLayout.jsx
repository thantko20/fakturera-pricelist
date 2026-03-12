import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";

export default function AutheticatedLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
