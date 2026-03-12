import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/use-auth";

export default function AuthLayout() {
  const { isAuthenticated, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/price-list" replace />;
  }

  return <Outlet />;
}
