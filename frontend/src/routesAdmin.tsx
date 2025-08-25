import AdminLayout from "./layouts/AdminLayout";
import Appointment from "./pages/admin/Appointment";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Medicine from "./pages/admin/Medicine";
import Patient from "./pages/admin/Patient";
import Profile from "./pages/admin/Profile";
import RoleProtectedRoute from "./utils/ProtextedRoute";

const AdminRoutes = {
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
        { path: "profile", element: <Profile /> },
      ],
    },
  ],
};

export default AdminRoutes;
