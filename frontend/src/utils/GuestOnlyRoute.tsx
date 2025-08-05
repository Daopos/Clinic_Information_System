// src/utils/GuestOnlyRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const GuestOnlyRoute = () => {
  const user = useSelector((state: RootState) => state.user.user); // adjust based on your state

  if (!user) return <Outlet />;

  // ✅ Role-based redirection
  if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "DENTIST")
    return <Navigate to="/doctor/dashboard" replace />;
  if (user.role === "PHARMACIST")
    return <Navigate to="/pharmacist/dashboard" replace />;

  return <Navigate to="/" replace />; // fallback
};

export default GuestOnlyRoute;
