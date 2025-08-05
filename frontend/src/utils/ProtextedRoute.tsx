import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../store/store";

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace={false} />;
  return <Outlet />;
};

export default RoleProtectedRoute;
