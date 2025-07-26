import { createBrowserRouter } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Appointment from "./pages/admin/Appointment";
import Patient from "./pages/admin/Patient";
import Medicine from "./pages/admin/Medicine";
import Login from "./pages/auth/Login";
import Employees from "./pages/admin/Employees";
import RoleProtectedRoute from "./utils/ProtextedRoute";
import GuestOnlyRoute from "./utils/GuestOnlyRoute";
const router = createBrowserRouter([
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <RoleProtectedRoute allowedRoles={["ADMIN"]} />, // 👈 protect this group
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "appointments", element: <Appointment /> },
          { path: "medicines", element: <Medicine /> },
          { path: "patients", element: <Patient /> },
          { path: "employees", element: <Employees /> },
        ],
      },
    ],
  },
]);
export default router;
