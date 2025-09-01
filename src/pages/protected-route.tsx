import { useUserContext } from "@/context/user-context";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useUserContext();

  console.log({ isAuthenticated });
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  return <Outlet />;
};
